---
title: '디렉터리와 namespace 구조'
description: 'EAUploader의 디렉터리와 namespace 구조'
---
# 개발에 관심이 있으신가요?
Project EAUploader는 개발 멤버를 항상 모집하고 있습니다!
이야기만 들어 보셔도 괜찮습니다!
꼭 프로젝트의 Discord 서버에 와 주세요.
[참여하기](https://discord.gg/yYFru7brra)
* * *
* * *
이 문서는 EAUploader v1.6.2의 내용을 기준으로 합니다.

## 디렉터리 구조
* * *
EAUploader는 VPM 패키지 `tech.uslog.eauploader`로 배포됩니다. 패키지의 주요 디렉터리 구조는 다음과 같습니다.

```
tech.uslog.eauploader/
├── package.json                  패키지 정보(버전, 의존성)
├── CHANGELOG.md                  변경 이력
├── Docs/                         사양서(영어)
├── Editor/                       에디터 확장(EAUploader.Editor 어셈블리)
│   ├── EAUploader.Editor.asmdef
│   ├── Public EAUploader API/    외부 도구용 공개 API(클래스 하나당 파일 하나)
│   ├── Scripts/
│   │   ├── EAUploaderCore.cs           시작·초기화 처리, 전역 상태
│   │   ├── EAUploaderEditorManager.cs  편집 도구 등록 관리
│   │   ├── EAUPluginAttribute.cs       [EAUPlugin] 속성
│   │   ├── AvatarUploader.cs           빌드·업로드 처리
│   │   ├── AssetProcessor.cs           에셋 가져오기 시 처리
│   │   ├── Config.cs                   설정 파일(settings.json)
│   │   ├── LanguageUtility.cs, T7e.cs  다국어 지원
│   │   ├── ThemeUtility.cs             테마
│   │   ├── CustomPrefabUtility/        관리용 Prefab Variant, 태그, 미리보기, 셰이더 확인, VRM 변환, 이전, 삭제
│   │   ├── Coexistence/                AvatarOptimizer와의 공존
│   │   ├── VRCSDK/                     아바타 성능 계산
│   │   └── Feedback/, SubWindow/       피드백 전송·환영 화면(현재 미사용)
│   └── Resources/
│       ├── Localization/         UI 번역 파일(ja.json, ko.json)
│       ├── Message/              도움말 메시지(언어별)
│       ├── Shaders/              AlwaysShow.shader(미리보기 마커), TextureAdjust.shader(텍스처 편집)
│       └── UI/
│           ├── EAUploader.cs           메인 창
│           ├── MainWindow.uxml
│           ├── styles.uss / tailwind.uss
│           ├── Components/             자체 UI 컴포넌트
│           ├── Modals/                 창 안에 표시하는 모달
│           ├── TabContents/
│           │   ├── AvatarList/         아바타 목록
│           │   ├── Setup/              편집 화면
│           │   │   └── Editor/         기본 편집 도구(Common, ViewpointPositionEditor, ShapeKeyEditor, TextureEditor, OutfitTool)
│           │   ├── Upload/             업로드 폼
│           │   └── ImportSettings/     EA Library 기사(현재 화면에 표시되지 않음)
│           └── Windows/                대화상자, 오류 보고, VRM 변환 창
├── Runtime/                      런타임 컴포넌트(EAUploader 어셈블리)
│   ├── EAUploader.asmdef
│   └── Components/               EAUploaderMeta, EAUploaderOutfit, AvatarTagComponent
└── .vpm/, .github/               VPM 저장소 생성·배포용
```

## 어셈블리
* * *
| 어셈블리 | 위치 | 대상 플랫폼 | 내용 |
| ---- | ---- | ---- | ---- |
| `EAUploader.Editor` | `Editor/` | Editor | EAUploader 본체. UI, 아이템 관리, 편집 도구, 업로드 처리, 공개 API |
| `EAUploader` | `Runtime/` | 모두 | 아바타에 붙이는 컴포넌트 |

`EAUploader.Editor`는 다음 Version Defines를 정의합니다.

| 심볼 | 패키지 | 조건 |
| ---- | ---- | ---- |
| `HAS_VRM` | `jp.pokemori.vrm-converter-for-vrchat` | 41.1.0 이상 |
| `HAS_AAO` | `com.anatawa12.avatar-optimizer` | 1.7.0 이상 |
| `HAS_MA` | `nadena.dev.modular-avatar` | 1.9.0 이상 |

`EAUploader`(Runtime)는 VRChat SDK - Avatars(`com.vrchat.avatars`)가 있을 때 `VRC_SDK3A`를 정의합니다.

## namespace
* * *
| namespace | 주요 클래스 | 내용 |
| ---- | ---- | ---- |
| `EAUploader` | `EAUploaderCore`, `EAUploaderEditorManager`, `EditorRegistration`, `EAUPluginAttribute`, `AvatarUploader`, `LanguageUtility`, `T7e`, `Config` | 시작 처리, 편집 도구 등록, 업로드, 다국어 지원 등의 핵심 기능 |
| `EAUploader.CustomPrefabUtility` | `ManagedPrefabs`, `PrefabManager`, `PrefabInfo`, `TagManager`, `PrefabPreview`, `ShaderChecker`, `Utility`, `VRMImporter` | 관리용 Prefab Variant, 메타데이터, 태그, 미리보기 이미지, 셰이더 확인, VRM 변환, 이전, 삭제 |
| `EAUploader.UI` | `EAUploader`, `ThemeUtility` | 메인 창과 화면 전환, 테마 |
| `EAUploader.UI.AvatarList` | `Main` | 아바타 목록(internal) |
| `EAUploader.UI.Setup` | `Main`, `ViewpointPositionEditor` | 편집 화면과 뷰포인트 위치 에디터 |
| `EAUploader.UI.Setup.EditTools` | `EditToolModal`, `EditToolSession`, `ToolModalFrame`, `EditToolUtility` 등 | 기본 편집 도구와 공통 기반(internal) |
| `EAUploader.UI.Upload` | `UploadForm` | 업로드 폼(internal) |
| `EAUploader.UI.Modals` | `ImportModal`, `SettingsModal`, `ClothSettingModal`, `TagFilterModal`, `TagSettingsModal`, `PrefabPreviewModal` 등 | 창 안에 표시하는 모달 |
| `EAUploader.UI.Components` | `Modal`, `ToastManager`, `ShadowButton`, `MaterialIcon`, `HelpButton`, `DropdownFieldPro`, `Preview` 등 | 자체 UI 컴포넌트 |
| `EAUploader.UI.Windows` | `DialogPro`, `Logger` | 대화상자, 오류 보고, 로그 출력 |
| `EAUploader.Editor.API` | `CoreAPI`, `LanguageAPI`, `UploadAPI` | 공개 API |
| `EAUploader.Editor.Plugin.API` | `PluginAPI` | 공개 API(확장 기능 등록) |
| `EAUploader.Editor.Prefab.API` | `PrefabAPI`, `PrefabPreviewAPI`, `ShaderAPI`, `PrefabUtilityAPI`, `VRMAPI` | 공개 API(프리팹 조작) |
| `EAUploader.Editor.Resource.API` | `EAUResourceAPI`, `HelpButtonAPI`, `LinkAPI`, `MaterialIconAPI` 등 | 공개 API(스타일, UI 컴포넌트) |
| `EAUploader.Components` | `AvatarTagComponent`, `EAUploaderMeta`, `EAUploaderOutfit` | 런타임 컴포넌트 |

`EAUploader.Editor.*.API`는 외부 도구에서 사용하는 것을 전제로 한 공개 API입니다. 내부 구현(`EAUploader`나 `EAUploader.CustomPrefabUtility`)을 얇게 감쌉니다. 자세한 내용은 'API 레퍼런스'를 참조하세요.

## 클래스 관계
* * *
주요 클래스의 관계는 다음과 같습니다.

```
EAUploaderCore([InitializeOnLoad])
├── EAUploaderEditorManager …… 편집 도구(EditorRegistration) 등록·보관
├── ShaderChecker ………………… 프리팹의 셰이더 확인
├── PrefabManager ………………… 관리용 Prefab Variant 목록(PrefabInfo)과 메타데이터
│   ├── ManagedPrefabs ……… Variant 생성·복제·경로 관리
│   ├── TagManager ………… 태그와 태그 그룹
│   └── PrefabPreview ……… 미리보기 이미지 생성·저장
└── UI.EAUploader(메인 창)
    ├── UI.AvatarList.Main …… 아바타 목록
    ├── UI.Setup.Main ……………… 편집 화면(편집 도구 목록, 항목 정보)
    │   └── UI.Upload.UploadForm → AvatarUploader → VRChat SDK
    └── modal / toasts ……………… 공통 모달과 알림
```

각 화면은 `EAUploaderCore.selectedPrefabPath`(선택한 아이템의 경로)를 공유합니다.

처리 흐름의 자세한 내용은 '[Editor](/ko/for_dev/editor/)'를 참조하세요.
