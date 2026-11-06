---
title: '빠른 시작 가이드'
description: 'EAUploader에 대응하는 확장 기능을 만드는 방법'
---

# EAUploader 확장 기능 개발 빠른 시작 가이드

이 문서에서는 EAUploader의 확장 기능을 개발하는 방법을 설명합니다.
확장 기능은 EAUploader 편집 화면의 '편집 도구'에 추가되며, 사용자가 선택한 아이템에 대해 임의의 처리를 할 수 있습니다.

등록 구현 예로 EAUploader에 기본 탑재된 확장 기능인 '뷰포인트 위치 에디터'도 참고하세요.
`Packages/tech.uslog.eauploader/Editor/Resources/UI/TabContents/Setup/Editor/ViewpointPositionEditor` 아래에 구현 코드가 있습니다.

이 문서는 EAUploader v1.6.2의 내용을 기준으로 합니다.

## 확장 기능의 구조
* * *
1. EAUploader는 시작할 때(Unity 시작 시나 스크립트 재컴파일 후) `EAUPlugin` 속성이 붙은 static 메서드를 찾아 호출합니다.
2. 확장 기능은 그 메서드 안에서 `EAUploaderEditorManager.RegisterEditor`를 호출하여 자신의 정보(에디터 등록 정보)를 등록합니다.
3. EAUploader는 등록된 확장 기능을 편집 화면의 '편집 도구'에 목록으로 표시합니다.
4. 사용자가 확장 기능의 버튼을 누르면 에디터 등록 정보의 `MenuName`에 지정한 Unity 메뉴가 실행됩니다. 확장 기능은 그 메뉴에서 자신의 창을 엽니다.

:::note
EAUploader에 기본 탑재된 편집 도구는 EAUploader 창 안에 겹쳐서 표시되지만, 이 구조는 내부용(internal)이므로 확장 기능에서는 사용할 수 없습니다. 확장 기능은 일반 `EditorWindow`로 자신의 창을 여세요.
:::

## 1. 패키지를 만들 폴더 만들기
* * *
이후 단계에서 만들 소스 코드 등을 저장할 폴더를 만듭니다.

프로젝트의 Assets 안 또는 Packages 바로 아래에 만듭니다.
이름은 자유롭게 정해도 됩니다.

## 2. 소스 코드 추가하기
* * *
### EAUploader가 확장 기능을 인식하게 하기

EAUploader가 확장 기능을 인식하게 하려면 다음과 같은 코드를 작성해야 합니다.
다음 코드는 ViewpointPositionEditor.cs에서 등록에 관한 부분을 발췌한 것입니다.
※LanguageUtility.T7eFromJsonFile의 역할은 나중에 자세히 설명합니다.

```csharp
        [EAUPlugin]
        private static void Initialize()
        {
            string editorName = LanguageUtility.T7eFromJsonFile("Viewpoint Position Editor", LOCALIZATION_FOLDER_PATH);
            string description = LanguageUtility.T7eFromJsonFile("A powerful viewpoint position editor for Unity.", LOCALIZATION_FOLDER_PATH);
            string requirementDescription = LanguageUtility.T7eFromJsonFile("The selected model must have a VRCAvatarDescriptor component.", LOCALIZATION_FOLDER_PATH);

            // 에디터 등록 정보 생성
            var editorRegistration = new EditorRegistration
            {
                // Unity에 표시되는 메뉴 문자열
                // 뒤에서 설명할 MenuItem 속성의 문자열과 일치해야 합니다.
                MenuName = "EAUploader/ViewpointPositionEditor",
                // EAUploader에 표시되는 에디터 이름
                EditorName = editorName,
                // EAUploader에 표시되는 에디터 설명
                Description = description,
                // 확장 기능의 버전
                Version = "0.1.0",
                // 확장 기능의 제작자
                Author = "USLOG",
                // 확장 기능의 지원 URL 등이 있으면 여기에 작성할 수 있습니다.
                Url = "https://uslog.tech/eauploader",
                // 확장 기능을 사용할 수 있는지 판단하는 메서드를 지정합니다.
                // 지정하는 메서드는 선택한 프리팹의 경로를 인수로 받아
                // 사용 가능 여부를 나타내는 bool 값을 반환해야 합니다.
                // True: 사용 가능, False: 사용 불가
                Requirement = CheckAvatarHasVRCAvatarDescriptor,

                // 확장 기능을 사용할 수 없을 때 사용자에게 표시할 메시지를 지정합니다.
                RequirementDescription = requirementDescription
            };

            // 에디터 등록 정보 추가
            EAUploaderEditorManager.RegisterEditor(editorRegistration);
        }

        private static bool CheckAvatarHasVRCAvatarDescriptor(string prefabPath)
        {
            GameObject gameObject = PrefabManager.GetPrefab(prefabPath);
            return Utility.CheckAvatarHasVRCAvatarDescriptor(gameObject);
        }
```

1. 임의의 static 메서드에 EAUPlugin 속성을 붙입니다.
   - 이 샘플 코드에서는 Initialize 메서드에 EAUPlugin 속성을 붙였습니다. 이 속성을 붙인 메서드는 EAUploader 시작 시 자동으로 호출됩니다.
   - 메서드는 인수가 없는 static 메서드여야 합니다. 접근 제한자는 private여도 됩니다.
2. 속성을 붙인 메서드 안에서 에디터 등록 정보를 생성하고, 이를 인수로 EAUploaderEditorManager.RegisterEditor 메서드를 호출합니다.
   - EAUploaderEditorManager.RegisterEditor를 호출하면 EAUploader에 확장 기능이 추가됩니다.
   - 에디터 등록 정보의 자세한 내용은 위 소스 코드의 주석 또는 아래 표를 참조하세요.

| 속성 | 형식 | 필수 | 내용 |
| ---- | ---- | ---- | ---- |
| `MenuName` | `string` | ○ | 확장 기능의 실행 버튼을 눌렀을 때 실행할 메뉴 경로. `MenuItem` 속성의 문자열과 일치시킵니다. |
| `EditorName` | `string` | ○ | 편집 도구 목록에 표시할 이름 |
| `Description` | `string` | | 설명(▼를 누르면 표시) |
| `Version` | `string` | | 버전(▼를 누르면 표시) |
| `Author` | `string` | | 제작자(▼를 누르면 표시) |
| `Url` | `string` | | 지원 페이지 등의 URL. 지정하면 '링크를 엽니다' 버튼이 표시됩니다. |
| `Requirement` | `Func<string, bool>` | | 사용 가능 여부를 판단하는 메서드. 인수로 선택한 프리팹의 경로가 전달됩니다. `null`이면 항상 사용할 수 있습니다. |
| `RequirementDescription` | `string` | | 사용할 수 없을 때 표시할 메시지 |

:::caution[EAUPlugin 속성에 대해]
`EAUPlugin` 속성은 `EAUploader` 네임스페이스의 `EAUploader.EAUPluginAttribute`를 사용하세요.
v1.6.2 시점에서는 공개 API의 `EAUploader.Editor.Plugin.API.PluginAPI.EAUPluginAttribute`를 붙인 메서드가 EAUploader 시작 시 호출되지 않습니다.
에디터 등록 정보를 등록할 때는 `EAUploaderEditorManager.RegisterEditor` 대신 `PluginAPI.RegisterEditor`를 사용할 수도 있습니다.
:::

:::note
`EditorName`, `Description`, `RequirementDescription`은 목록에 표시할 때 EAUploader 본체의 번역 파일로 번역됩니다. EAUploader 본체의 번역 파일에 없는 문자열은 그대로 표시되므로, 확장 기능 고유의 문자열은 뒤에서 설명할 `LanguageUtility.T7eFromJsonFile`로 번역한 후 등록하세요.

또한 `EditorName`은 다른 확장 기능과 겹치지 않는 이름을 붙이세요. EAUploader는 `EditorName`을 기준으로 목록의 ▼ 열림/닫힘 상태를 관리하므로, 같은 이름의 확장 기능이 있으면 표시가 올바르게 전환되지 않습니다.
:::

### EAUploader에서 호출할 메서드 구현하기

다음과 같이 임의의 메서드에 MenuItem 속성을 지정합니다.
사용자가 확장 에디터의 실행 버튼을 눌렀을 때 호출되는 메서드입니다.

```csharp
        [MenuItem("Tools/My Avatar Tool")]
        public static void Open()
        {
            var window = EditorWindow.GetWindow<MyAvatarTool>();
            window.titleContent = new GUIContent("My Avatar Tool");
            window.minSize = new Vector2(800, 600);
        }
```

이 단계를 거치면 EAUploader 화면에 확장 기능 실행 버튼이 표시됩니다.

### 선택한 아이템 가져오기

사용자가 EAUploader에서 선택한 아이템(프리팹)의 경로는 `EAUploaderCore.selectedPrefabPath`(공개 API에서는 `CoreAPI.SelectedPrefabPath`)로 가져올 수 있습니다.
프리팹의 `GameObject`는 `PrefabManager.GetPrefab`(공개 API에서는 `PrefabAPI.GetPrefab`)으로 가져올 수 있습니다.

선택한 아이템이 바뀐 것을 감지하려면 `CoreAPI.SelectedPrefabPathChanged` 이벤트를 사용합니다.

### 선택한 아이템 변경하기

선택한 아이템의 경로는 EAUploader가 관리하는 Prefab Variant(`Assets/EAUploader/Prefabs/<아이템 이름>/<아이템 이름>.prefab`)의 경로입니다.
EAUploader는 사용자가 가져온 원본 Prefab을 변경하지 않고 이 Prefab Variant만 변경하는 방침으로 만들어졌습니다. 확장 기능에서도 선택한 경로의 Prefab만 변경하세요.

* Prefab을 변경할 때는 `PrefabUtility.LoadPrefabContents`로 열고 `PrefabUtility.SaveAsPrefabAsset`으로 같은 경로에 저장하는 것을 추천합니다. 변경 사항은 Prefab Variant의 오버라이드로 저장됩니다.
* 저장하면 EAUploader가 가져오기를 감지하여 목록 정보와 미리보기 이미지를 자동으로 업데이트합니다.
* 확장 기능에서 만든 텍스처나 메시 등의 에셋은 아이템 폴더(`Assets/EAUploader/Prefabs/<아이템 이름>/`) 안에 저장하는 것을 추천합니다. 아이템을 삭제하면 그 아이템에서만 사용하는 에셋은 함께 삭제됩니다.

### 그 밖에 필요에 따라 CreateGUI, OnEnable 메서드 등 구현하기

필요에 따라 CreateGUI 메서드나 OnEnable 메서드를 구현하세요.
EAUploader와 같은 모양의 UI를 만들고 싶다면 '[UI 컴포넌트](/ko/for_tooldev/ui_components/)'를 참조하세요.

## 3. 어셈블리 만들기
* * *
1에서 만든 폴더를 오른쪽 클릭하고 'Create - Assembly Definition'을 클릭하세요.
폴더 안에 .asmdef 파일이 만들어집니다.

만든 .asmdef 파일에 다음 설정을 하세요.

1. Auto Referenced 체크 해제
2. Assembly Definition References에 EAUploader.Editor 추가
   * `VRCAvatarDescriptor` 등 VRChat SDK의 형식을 사용하는 경우 VRChat SDK 어셈블리(`VRC.SDK3A` 등)도 추가하세요.
3. 소스 코드 위치에 따라 Platform 설정(확장 기능은 에디터 확장이므로 일반적으로 `Editor`만 체크합니다)
4. Version Defines 추가. 설정값은 다음과 같습니다. Define, Expression 값은 상황에 맞게 바꿔 적용하세요.
   * Resource: tech.uslog.eauploader
   * Define: EAUploader
   * Expression: 1.6.0

4단계를 통해 조건부 컴파일을 할 수 있습니다.
예를 들어 다음과 같이 작성하면 버전 1.6.0 이상의 EAUploader가 있을 때만 코드를 활성화할 수 있습니다.

```csharp
#if EAUploader
    using EAUploader;
#endif
```

EAUploader가 설치되지 않은 프로젝트에서도 확장 기능을 사용할 수 있게 하려면 EAUploader 관련 코드를 `#if EAUploader` ~ `#endif`로 감싸세요.

## 최소 구성 샘플
* * *
그대로 동작하는 최소 구성의 확장 기능 샘플입니다. 선택한 아이템의 이름과 시점 높이를 표시합니다.

```csharp
using UnityEditor;
using UnityEngine;
using UnityEngine.UIElements;
#if EAUploader
using EAUploader;
using EAUploader.Editor.API;
using EAUploader.Editor.Prefab.API;
#endif

namespace MyTool.Editor
{
    public class MyAvatarTool : EditorWindow
    {
        private const string MENU_NAME = "Tools/My Avatar Tool";

#if EAUploader
        [EAUPlugin]
        private static void RegisterToEAUploader()
        {
            EAUploaderEditorManager.RegisterEditor(new EditorRegistration
            {
                MenuName = MENU_NAME,
                EditorName = "My Avatar Tool",
                Description = "선택한 아바타의 정보를 표시합니다.",
                Version = "0.1.0",
                Author = "Your Name",
                Url = "https://example.com",
                Requirement = prefabPath => PrefabUtilityAPI.CheckAvatarHasVRCAvatarDescriptor(PrefabAPI.GetPrefab(prefabPath)),
                RequirementDescription = "VRCAvatarDescriptor를 가진 아바타를 선택하세요."
            });
        }
#endif

        [MenuItem(MENU_NAME)]
        public static void Open()
        {
            GetWindow<MyAvatarTool>("My Avatar Tool");
        }

        public void CreateGUI()
        {
#if EAUploader
            var prefabPath = CoreAPI.SelectedPrefabPath;
            var avatar = string.IsNullOrEmpty(prefabPath) ? null : PrefabAPI.GetPrefab(prefabPath);
            if (avatar == null)
            {
                rootVisualElement.Add(new Label("아바타가 선택되지 않았습니다."));
                return;
            }

            rootVisualElement.Add(new Label("아바타: " + avatar.name));
            rootVisualElement.Add(new Label("시점 높이: " + PrefabUtilityAPI.GetAvatarHeight(avatar) + "m"));
#else
            rootVisualElement.Add(new Label("EAUploader가 필요합니다."));
#endif
        }
    }
}
```

어셈블리는 '3. 어셈블리 만들기'대로 설정하세요.

## 4. 확장 기능 배포하기
* * *
만든 폴더(소스 코드와 .asmdef 파일)를 `.unitypackage`로 내보내거나 VPM 패키지로 배포하세요.

* `.unitypackage`의 경우 사용자는 Unity 메뉴의 'Assets' → 'Import Package' → 'Custom Package...'에서 가져올 수 있습니다.
* VPM 패키지의 경우 `package.json`의 `vpmDependencies`에 `tech.uslog.eauploader`를 지정하여 EAUploader 의존성을 명시할 수 있습니다.

:::note
v1.6.0 이후 편집 화면의 '확장 기능 가져오기', '다른 확장 기능을 찾습니다' 버튼은 일시적으로 숨겨져 있습니다.
:::

배포한 확장 기능은 꼭 [Project EAUploader의 Discord 서버](https://discord.gg/yYFru7brra)에서 알려 주세요.

## EAUploader API 간이 레퍼런스
* * *
### 다국어 지원

EAUploader에서는 영어 문자열과 임의 언어 문자열의 대응을 작성한 JSON 파일을 만들고, 적절한 시점에 그 JSON 파일을 읽어 다국어 지원을 구현합니다. 임의 언어 문자열은 모두 영어를 키로 가져올 수 있습니다.

### 작성할 JSON 파일 형식

JSON 파일은 다음 형식으로 저장해야 합니다. 지원하는 언어마다 JSON 파일을 하나씩 추가해야 합니다.

- (임의의 폴더)
  - ja.json
  - ko.json
  - [언어를 나타내는 문자열].json

각 JSON 파일의 내용은 예를 들어 다음과 같습니다.

```json
{
  "name": "한국어",
  "items": [
    {
      "key": "Apply",
      "value": "적용"
    },
    {
      "key": "Close",
      "value": "닫기"
    },
    {
      "key": "Actual View",
      "value": "실제 보기"
    },
    {
      "key": "Viewpoint Position Editor",
      "value": "뷰포인트 위치 에디터"
    },
    {
      "key": "A powerful viewpoint position editor for Unity.",
      "value": "Unity를 위한 강력한 뷰포인트 위치 에디터"
    },
    {
      "key": "The selected model must have a VRCAvatarDescriptor component.",
      "value": "선택된 모델에는 VRCAvatarDescriptor 컴포넌트가 필요합니다."
    }
  ]
}
```

:::caution
EAUploader가 지원하는 모든 언어(v1.6.2 시점에서는 `ja`, `ko`)의 JSON 파일을 준비하세요.
`LanguageUtility.LocalizationFromJsonFile`은 어느 언어의 JSON 파일이라도 없으면 오류가 발생합니다. 번역을 준비할 수 없는 언어는 `"items": []`처럼 빈 파일을 두세요.(영어 문자열이 그대로 표시됩니다)
:::

### rootVisualElement에 직접 적용하기

만든 JSON 파일을 rootVisualElement에 직접 적용할 수 있습니다.
적용하려면 LanguageUtility.LocalizationFromJsonFile 메서드를 사용합니다.
첫 번째 인수에 적용할 rootVisualElement, 두 번째 인수에 앞에서 만든 JSON 파일이 들어 있는 폴더 경로를 지정합니다.
이 메서드는 rootVisualElement 안에 있는 TextElement 클래스를 부모로 가진 컴포넌트(예: Label, Button)의 Text 속성 값을 JSON 파일에 적힌 값에 따라 모두 바꿉니다. 예를 들어 다음 UXML의 `text="Actual View"`는 언어 설정이 한국어인 경우 `text="실제 보기"`로 바뀌어 읽히는 것과 같은 동작을 합니다.

```xml
<ui:Label text="Actual View" class="self-center text-lg font-bold" />
```

다만 이 설명은 이미지일 뿐이며, 실제로 UXML 파일의 문자열을 바꾸는 것은 아니라는 점에 주의하세요. LanguageUtility.LocalizationFromJsonFile 메서드가 바꾸는 것은 어디까지나 rootVisualElement 안의 값입니다.

```csharp
        public void CreateGUI()
        {
            var visualTree = Resources.Load<VisualTreeAsset>("MyAvatarTool");
            visualTree.CloneTree(rootVisualElement);

            // Localization file path
            var localizationFolderPath = "Assets/MyAvatarTool/Localization";
            LanguageUtility.LocalizationFromJsonFile(rootVisualElement, localizationFolderPath);
        }
```

공개 API에서는 `LanguageAPI.LocalizeFromJsonFile`이 같은 동작을 합니다.

### JSON 파일에서 임의 언어 문자열을 직접 가져오기

LanguageUtility.T7eFromJsonFile 메서드를 사용하면 영어 문자열을 지정하여 현재 설정된 언어에 맞는 문자열을 가져올 수 있습니다.
샘플 코드에서는 Initialize 메서드 안에서 사용합니다.

```csharp
        [EAUPlugin]
        private static void Initialize()
        {
            string editorName = LanguageUtility.T7eFromJsonFile("Viewpoint Position Editor", LOCALIZATION_FOLDER_PATH);
            string description = LanguageUtility.T7eFromJsonFile("A powerful viewpoint position editor for Unity.", LOCALIZATION_FOLDER_PATH);
            string requirementDescription = LanguageUtility.T7eFromJsonFile("The selected model must have a VRCAvatarDescriptor component.", LOCALIZATION_FOLDER_PATH);

```

첫 번째 인수에는 영어 문자열을, 두 번째 인수에는 JSON 파일이 들어 있는 폴더 경로를 지정합니다.
반환값으로 현재 설정된 언어에 맞는 문자열을 돌려줍니다. 해당하는 문자열을 찾지 못하면 첫 번째 인수의 영어 문자열을 그대로 돌려줍니다.

공개 API에서는 `LanguageAPI.GetLocalizedTextFromJsonFile`이 같은 동작을 합니다.

:::note
`EditorName` 등의 에디터 등록 정보는 EAUploader 시작 시 등록됩니다. 따라서 `T7eFromJsonFile`로 번역한 문자열은 언어를 바꿔도 EAUploader가 다시 시작될 때까지 이전 언어로 표시됩니다.
:::

### 현재 설정된 언어 가져오기

LanguageUtility.GetCurrentLanguage 메서드를 사용합니다.
사용 예:

```csharp
string language = LanguageUtility.GetCurrentLanguage();

```

반환값으로 현재 설정된 언어를 나타내는 문자열을 돌려줍니다.

- ja: 표시 언어로 일본어가 설정되어 있습니다.
- ko: 표시 언어로 한국어가 설정되어 있습니다.
- en: 표시 언어로 영어가 설정되어 있습니다.

### UI 관련

Editor/Resources/UI/Components 아래에 EAUploader가 자체적으로 구현한 UI 컴포넌트가 있습니다.
사용 방법은 '[UI 컴포넌트](/ko/for_tooldev/ui_components/)'를 참조하세요.

### 기타 API

EAUploader는 외부 도구에서 사용하는 것을 전제로 한 공개 API(`EAUploader.Editor.API` 등)를 제공합니다.
자세한 내용은 'API 레퍼런스'를 참조하세요.
