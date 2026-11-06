---
title: 'Editor'
description: 'EAUploader의 에디터에 대해'
---
# 개발에 관심이 있으신가요?
Project EAUploader는 개발 멤버를 항상 모집하고 있습니다!
이야기만 들어 보셔도 괜찮습니다!
꼭 프로젝트의 Discord 서버에 와 주세요.
[참여하기](https://discord.gg/yYFru7brra)
* * *
* * *
이 페이지에서는 EAUploader 본체인 `EAUploader.Editor` 어셈블리의 처리 흐름을 설명합니다.
더 자세한 사양은 저장소의 `Docs/` 폴더에 있는 사양서(영어)도 참조하세요.

이 문서는 EAUploader v1.6.2의 내용을 기준으로 합니다.

## 시작 처리
* * *
EAUploader의 시작 처리는 `EAUploaderCore`(`Editor/Scripts/EAUploaderCore.cs`)가 담당합니다.

### 1. 정적 생성자
`EAUploaderCore`에는 `[InitializeOnLoad]` 속성이 붙어 있어 Unity 시작 시나 스크립트 재컴파일(도메인 리로드) 때마다 정적 생성자가 실행됩니다.

1. `Application.logMessageReceived`에 로그 출력 처리를 등록합니다.
2. 출력할 로그 파일 이름을 정하고 환경 정보(날짜, 로그 파일 GUID, EAUploader 버전, Unity 버전, 플랫폼, VPM 패키지 목록)를 로그에 출력합니다.
3. `EditorApplication.update`에 초기화 대기를 등록합니다.

### 2. 초기화 처리
Unity가 컴파일 중도 플레이 모드 전환 중도 아닌 상태가 되면 `PerformInitialization`이 한 번만 실행됩니다.

1. `InitializeEAUploader` ― `Assets/EAUploader` 폴더와 `PrefabManager.json`이 없으면 만듭니다.
2. `AvatarUploader.CleanupLeftoverBuildInstances` ― 중단된 멀티 플랫폼 빌드로 씬에 남은 업로드용 임시 인스턴스를 삭제합니다.
3. `EAUploaderEditorManager.OnEditorManagerLoad` ― 편집 도구 등록 정보(`EditorsManage.json`)를 초기화합니다.
4. `ShaderChecker.CheckShaders` ― 셰이더가 부족한 프리팹을 확인합니다.
5. `PrefabManager.Initialize` ― 관리 폴더를 준비하고, 이전 버전에서의 이전(후술)을 하고, 부족한 미리보기 이미지를 생성합니다.
6. `CheckAvailablePackages` ― `Packages/packages-lock.json`을 읽어 `HasVRM`, `HasAAO`, `HasMA`를 설정합니다.
7. `[EAUPlugin]` 속성이 붙은 static 메서드를 모든 어셈블리에서 찾아 호출합니다.(편집 도구·확장 기능 등록)
8. `EditorApplication.delayCall`로 EAUploader 창을 엽니다.

초기화 중 예외가 발생하면 EAUploader 재시작을 권하는 대화상자를 표시합니다. '다시 시작'을 누르면 `Packages/tech.uslog.eauploader`를 다시 가져옵니다.

메뉴의 'EAUploader' → 'Reload'(`EAUploaderCore.ReloadSDK`)는 선택을 해제하고 위의 3~6단계를 다시 실행합니다.

### 전역 상태
| 멤버 | 내용 |
| ---- | ---- |
| `EAUploaderCore.selectedPrefabPath` | 선택한 아이템의 경로. 바꾸면 `SelectedPrefabPathChanged`가 발생합니다. 모든 화면과 편집 도구는 이 아이템에 대해 동작합니다. |
| `EAUploaderCore.HasVRM` / `HasAAO` / `HasMA` | 연계 패키지가 설치되어 있는지 |
| `EAUploaderCore.GetVersion()` | `package.json`에서 버전을 가져옵니다 |

## 데이터 저장
* * *
| 경로 | 내용 | 담당 클래스 |
| ---- | ---- | ---- |
| `Assets/EAUploader/settings.json` | `language`, `isLibraryOpen`, `showErrorReportWindow`, `managedPrefabsMigrated` | `Config` |
| `Assets/EAUploader/PrefabManager.json` | 이전 버전과의 호환용(빈 파일 생성) | `EAUploaderCore` |
| `Assets/EAUploader/EditorsManage.json` | 등록된 편집 도구(시작할 때마다 다시 만듦) | `EAUploaderEditorManager` |
| `Assets/EAUploader/tags.json` | 태그 이름과 태그 그룹 | `TagManager` |
| `Assets/EAUploader/Prefabs/<아이템>/<Variant>.prefab` | 관리용 Prefab Variant | `ManagedPrefabs` |
| `Assets/EAUploader/Prefabs/<아이템>/Textures/`, `Materials/` | 텍스처 편집으로 생성한 에셋 | 텍스처 편집 |
| `Assets/EAUploader/PrefabPreviews/<GUID>.png` | 미리보기 이미지(1200×900). 파일 이름이 Prefab의 GUID이므로 이름을 바꿔도 유지됩니다 | `PrefabPreview` |
| `EAUploaderLog/`(프로젝트 바로 아래) | 로그 파일(합계 100MB까지) | `UI.Windows.Logger` |
| EditorPrefs `EAUploader.Theme` | 테마(`white` / `dark` / `pastel`) | `ThemeUtility` |
| EditorPrefs `EAUploader.CardWidth` | 아바타 목록의 카드 너비 | 아바타 목록 |

## 아이템 관리
* * *
### 관리용 Prefab Variant
EAUploader는 사용자가 가져온 Prefab을 변경하지 않습니다. 가져온 Prefab마다 **Prefab Variant**를 만들고 그 Variant만 관리·편집합니다.

```
Assets/EAUploader/Prefabs/<아이템 이름>/<Variant 이름>.prefab
```

* `ManagedPrefabs.ROOT`는 `Assets/EAUploader/Prefabs`입니다. 가져온 아이템마다 폴더를 만듭니다.
* Variant는 원본 Prefab을 임시 미리보기 씬에 인스턴스화하고 `EAUploaderMeta`를 추가한 뒤 `PrefabUtility.SaveAsPrefabAsset`으로 저장하여 만듭니다. 열려 있는 씬에는 영향을 주지 않습니다.
* `EAUploaderMeta`는 Variant에만 추가됩니다.
* 편집 도구 등으로 생성한 에셋은 아이템 폴더에 저장합니다.

| `ManagedPrefabs` 메서드 | 내용 |
| ---- | ---- |
| `IsManaged(path)` | `ROOT/` 아래의 경로인지 |
| `IsInEAUploaderFolder(path)` | `Assets/EAUploader/` 아래의 경로인지(가져오기 대상 외) |
| `CreateVariant(sourcePath, configure)` | 새 아이템 폴더에 Variant를 만듭니다 |
| `DuplicateVariant(variantPath)` | 같은 아이템 폴더 안에 Variant를 복제합니다 |
| `GetSourcePath(variantPath)` | Variant의 원본 Prefab을 가져옵니다 |
| `RenameItemFolder(variantPath, name)` | 폴더 안에 그 Prefab만 있을 때 폴더 이름을 바꿉니다 |

### 메타데이터(`EAUploaderMeta`)
Variant 루트에 추가되는 `EAUploaderMeta`에 목록 표시 상태(`status`), 종류(`type`), 장르(`genre`), 최종 업데이트 시각(`lastModifiedTicks`), 메모(`memo`), 태그(`tags`) 등을 저장합니다. 자세한 내용은 '[Runtime](/ko/for_dev/runtime/)'을 참조하세요.

`PrefabInfo`는 관리용 Prefab의 정보를 UI용으로 정리한 스냅샷(경로, 이름, 최종 업데이트 시각, 종류, 상태, 장르, 태그, 메모, 미리보기 이미지)입니다.

### 가져오기 시 처리
`AssetImportProcessor`(`Editor/Scripts/AssetProcessor.cs`)가 가져온 `.prefab`마다 다음 처리를 합니다.

1. `ShaderChecker.CheckShadersInPrefabs` ― 셰이더가 부족하면 대화상자를 표시합니다. 대화상자의 '왜 이를 보고 있습니까?' 버튼은 이 문서의 '[셰이더를 찾을 수 없음 오류](/ko/faq/missing_shader/)'(`https://eauploader-docs.uslog.tech/faq/missing_shader`)를 엽니다.
2. `PrefabManager.ImportPrefab` ― 관리용 Variant를 만들거나 업데이트합니다.
3. 장르 결정이 필요한 아바타 이외의 아이템을 모아 다음 `delayCall`에서 `ClothSettingModal`을 표시합니다(메인 창이 열려 있을 때만).

:::danger
셰이더 대화상자에서 링크되어 있으므로 `faq/missing_shader` 페이지의 URL은 바꾸지 마세요.
:::

`PrefabManager.ImportPrefab(path)`의 동작은 다음과 같습니다.

* **관리되지 않는 Prefab**(`Assets/` 밖, `Assets/EAUploader/` 안, 이미 Variant가 있는 것, `SuppressAutoVariantCreation`이 설정된 동안은 대상 외)
  * Variant를 만들고 `type`과 `lastModifiedTicks`를 설정합니다.
  * 아바타(`VRC_AvatarDescriptor`를 가짐)는 `genre = Avatar`, `genreConfirmed = true`로 합니다.
  * 그 외는 `genre = Cloth`, `genreConfirmed = false`로 하고 장르 선택 모달의 대상으로 합니다.
  * 미리보기 이미지를 저장하고 목록을 업데이트합니다.
* **관리되는 Prefab**
  * `type`을 다시 판정합니다. 아바타는 `genre = Avatar`로 합니다.
  * 기록된 시각이 5초 이상 전인 경우에만 `lastModifiedTicks`를 업데이트합니다(저장이 다시 가져오기 처리를 호출해 루프하지 않도록).
  * 변경이 있으면 미리보기 이미지를 저장합니다.

### 목록
`PrefabManager.GetAllPrefabs()`는 `EAUploaderMeta`를 가진 관리용 Variant를 스캔하고 결과를 2초간 캐시합니다. `InvalidateCache()`로 강제로 다시 스캔합니다.
`GetAllPrefabsWithPreview()`는 숨긴 아이템을 제외하고, `GetAllPrefabsIncludingHidden()`은 포함합니다. 둘 다 고정을 맨 앞으로, 최신 순으로 정렬합니다.

### 태그(`TagManager`)
* 태그 이름과 그룹은 프로젝트 전체로 `Assets/EAUploader/tags.json`에 저장하고, 아이템에 붙인 태그는 `EAUploaderMeta.tags`에 저장합니다.
* 대소문자를 구별하지 않고 비교합니다. 대소문자만 다른 새 태그는 기존 태그의 표기를 사용합니다.
* 태그 이름과 그룹 이름은 32자까지(`MAX_TAG_LENGTH`)입니다.
* 하나의 태그는 하나의 그룹에만 속합니다. 태그를 삭제하면 모든 Prefab에서 떨어지고, 그룹을 삭제해도 태그는 남습니다.

### 삭제
`PrefabManager.ShowDeletePrefabDialog(path, completed)`는 창 안의 삭제 확인 모달을 엽니다.

1. Variant의 원본 Prefab, 머티리얼, 텍스처를 검색합니다. 참조 확인은 `Assets/` 아래의 `.prefab/.unity/.controller/.overridecontroller/.anim/.asset/.mat`를 대상으로 하며, 다른 에셋에서 사용하는 것은 삭제 대상에서 제외합니다.
2. 삭제될 내용을 읽기 전용 목록으로 표시합니다. 검색이 끝나면 삭제를 확정할 수 있습니다.
3. 검색 결과는 에셋 데이터베이스가 바뀌지 않는 동안 재사용합니다. 에셋이 바뀌면 삭제 전에 다시 검색하고, 대상이 바뀌면 다시 확인을 요구합니다.
4. 삭제 후 비어 있는 아이템 폴더를 삭제하고, 필요하면 선택을 해제한 뒤 `completed(true)`를 호출합니다. 취소하면 `completed(false)`를 호출합니다.

### 이전 버전에서의 이전(`LegacyPrefabMigration`)
이전 버전에서는 가져온 Prefab에 직접 `EAUploaderMeta`를 추가했습니다. 시작할 때 `managedPrefabsMigrated`가 설정되지 않았고 관리 폴더 밖에 그런 Prefab이 있으면 사용자에게 이전을 확인합니다.

1. 원본 Prefab에서 메타데이터를 읽습니다.
2. 원본 Prefab에서 `EAUploaderMeta`를 삭제합니다(Variant에 상속되지 않도록 Variant를 만들기 전에 합니다).
3. 메타데이터를 가진 Variant를 만들고, 이전 형식(이름 기준)의 미리보기 이미지를 GUID 기준 경로로 옮깁니다.

만들기에 실패하면 원본 Prefab의 데이터를 복원합니다. 모든 아이템이 성공한 경우에만 이전 완료로 하며, '나중에'를 고르면 다음 시작 때 다시 확인합니다.

## UI
* * *
EAUploader의 UI는 UI Toolkit(UXML / USS)으로 만들어져 있습니다.

* 메인 창은 `UI.EAUploader`(메뉴 'EAUploader' → 'Open EAUploader', 기본 크기 1280×640, 최소 1080×640) 하나뿐입니다.
* `CreateGUI()`에서 `UI/styles.uss`와 `UI/tailwind.uss`를 불러오고, `MainWindow.uxml`(`contentRoot`만)을 복제하고, 공통 `Modal`과 알림(`ToastManager`)을 추가하고, 테마를 적용합니다.
* 화면은 탭이 아니라 `contentRoot`에 하나씩 구성합니다. `EAUploader.Navigate(screen)`으로 전환하고, `EAUploader.RefreshCurrentScreen()`으로 현재 화면을 다시 구성합니다.

| `EAUploaderScreen` | 구성 | 내용 |
| ---- | ---- | ---- |
| `AvatarList` | `UI.AvatarList.Main.ShowContent` | 아바타 목록 |
| `Setup` | `UI.Setup.Main.ShowContent` | 편집 화면 |
| `Upload` | `UI.Setup.Main.ShowContent`(업로드 시트를 연 상태) | 업로드 |

* 업로드는 독립된 화면이 아니라 편집 화면의 시트로 `UI.Upload.UploadForm`을 표시합니다.
* 자체 UI 컴포넌트는 `Editor/Resources/UI/Components`, 모달은 `Editor/Resources/UI/Modals`에 있습니다. UXML에서는 `xmlns:eau="EAUploader.UI.Components"`를 선언하여 사용합니다. 자세한 내용은 '[UI 컴포넌트](/ko/for_tooldev/ui_components/)'를 참조하세요.

### 다국어 지원
메인 창은 100ms마다 `LanguageUtility.Localization`을 실행하여 창 안의 `TextElement` 문자열을 번역합니다. USS 클래스 `no-translate`를 가진 요소(이름이나 태그 등 사용자가 입력한 문자열)와 텍스트 입력란의 내용은 번역하지 않습니다.
UXML에는 영어 문자열을 그대로 작성하고, C#에서 문자열을 설정할 때는 `T7e.Get("English text")`를 사용합니다. 자세한 내용은 '[다국어 지원과 리소스](/ko/for_dev/localization/)'를 참조하세요.

## 업로드 처리
* * *
빌드와 업로드는 `AvatarUploader`(`Editor/Scripts/AvatarUploader.cs`)가 담당합니다. VRChat SDK의 빌더 API(`IVRCSdkAvatarBuilderApi`)를 사용합니다. 업로드할 수 있는 것은 장르가 `Avatar`인 아이템뿐입니다.

### 빌드용 인스턴스
테스트와 업로드 모두 `CreateBuildInstance(prefabPath)`로 빌드용 인스턴스를 만듭니다.

1. 관리용 Prefab을 불러오고, Blueprint ID가 없으면 할당하여 Prefab에 저장합니다(플랫폼 전환에 따른 도메인 리로드를 거쳐도 연결을 유지하기 위해).
2. 활성 씬에 인스턴스화하고 **Prefab과의 연결을 완전히 해제**합니다. 이를 통해 Modular Avatar나 AvatarOptimizer(NDMF) 같은 비파괴 도구가 빌드 시 처리할 수 있으며, 빌드 시 변경이 Prefab 에셋에 다시 쓰이지 않습니다.
3. 이름을 `<이름> (EAUploader Upload)`로 합니다.

인스턴스는 빌드 후 삭제됩니다. VRChat SDK의 멀티 플랫폼 빌드 중에는 계속 사용하므로 남겨 두고, 다음 시작 때 `CleanupLeftoverBuildInstances`로 삭제합니다.

### 테스트(`BuildAndTestAsync`)
VRChat SDK의 컨트롤 패널을 열고 `builder.BuildAndTest`로 빌드한 뒤 결과를 `DialogPro`로 표시합니다. 빌드와 업로드는 동시에 하나만 실행할 수 있습니다.

### 업로드(`UploadAvatarAsync`)
1. 빌드할 플랫폼을 정합니다(Windows를 먼저, 선택되었고 빌드 지원이 설치된 플랫폼).
2. 빌드용 인스턴스를 만들고 Blueprint ID로 기존 `VRCAvatar`를 가져옵니다. 없으면 새로 만듭니다.
3. 플랫폼이 하나면 `builder.BuildAndUpload`, 여러 개면 SDK의 멀티 플랫폼 타겟을 설정하고 `builder.BuildAndUploadMultiPlatform`을 호출합니다(Windows → 추가 플랫폼 → 원래 플랫폼 순. 도중에 도메인 리로드가 일어날 수 있습니다).
4. SDK가 할당한 Blueprint ID를 Prefab 에셋에 다시 씁니다.
5. 성공·취소·실패를 표시하고 `OnComplete`를 발생시킵니다.

진행 상황은 SDK 이벤트(`OnSdkBuildProgress`, `OnSdkUploadProgress`)에서 `AvatarUploader.ProgressChanged`로 전달됩니다. `CancelUpload()`로 업로드를 중지합니다.

### 아바타 성능
업로드 시트의 아바타 성능은 `PerformanceInfoComputer`(`Editor/Scripts/VRCSDK/PerformanceInfo.cs`)가 VRChat SDK의 `AvatarPerformance`를 사용해 계산합니다. 현재는 PC(Windows)용 기준으로 계산합니다.

### 자동 최적화
AvatarOptimizer가 설치된 경우(`HAS_AAO`), '자동 아바타 최적화'를 켜면 아바타 루트에 `TraceAndOptimize` 컴포넌트를 추가합니다. 끄면 삭제합니다.

## 편집 도구
* * *
`EAUploaderEditorManager`는 `RegisterEditor`로 등록된 `EditorRegistration`을 보관하고 `Assets/EAUploader/EditorsManage.json`에도 씁니다. 편집 화면의 '편집 도구'는 `GetRegisteredEditors`로 가져온 목록을 바탕으로 표시하며, 버튼을 누르면 `EditorRegistration.MenuName`의 메뉴를 `EditorApplication.ExecuteMenuItem`으로 실행합니다.

기본 편집 도구는 `Editor/Resources/UI/TabContents/Setup/Editor/Common/`의 공통 기반(namespace `EAUploader.UI.Setup.EditTools`)을 사용합니다.

| 형식 | 역할 |
| ---- | ---- |
| `EditToolSession` | 관리용 Prefab을 `PrefabUtility.LoadPrefabContents`로 독립된 미리보기 씬에 열고, 변경 여부를 관리하며, `PrefabUtility.SaveAsPrefabAsset`으로 저장(Variant는 Variant 그대로), 다시 불러오기(되돌리기), 대상 전환을 합니다. |
| `EditToolModal` | 기본 편집 도구의 추상 기본 클래스. 헤더(도구 이름, 아이템 이름, '저장되지 않은 변경 사항', 돌아가기), 사이드 패널, 라이브 미리보기, 푸터(되돌리기, 적용)의 공통 레이아웃으로 도구를 EAUploader 창 안의 모달로 표시합니다. 동시에 하나의 도구만 열 수 있습니다. |
| `ToolModalFrame` | 뷰포인트 위치 에디터를 포함한 모든 도구에 공통인 모달 틀. |
| `EditToolUtility` | 생성 에셋 폴더, 파일 이름 정리, 저장 후 업데이트(`OnPrefabSaved`), 공통 UI 부품, 사용 조건 판정. |

* 도구에 저장되지 않은 변경이 있으면 EAUploader 창은 `hasUnsavedChanges`를 보고하고, 창을 닫을 때 저장을 확인합니다.
* 저장하면 `EditToolUtility.OnPrefabSaved`가 `PrefabManager` 캐시를 무효화하고, 미리보기 이미지를 다시 만들고, 목록과 편집 화면을 업데이트합니다.
* 도구의 미리보기는 공통 `Preview` 컴포넌트의 라이브 모드(`new Preview(container, session.Root)`)를 사용합니다.

기본 편집 도구 동작의 자세한 내용은 저장소의 `Docs/EditTools.md`를 참조하세요. 확장 기능을 만드는 방법은 '[빠른 시작 가이드](/ko/for_tooldev/extension/)'를 참조하세요.

## 로그 출력
* * *
로그 출력과 오류 보고는 '[로그 출력 기능 사양서](/ko/for_dev/logging/)'를 참조하세요.
