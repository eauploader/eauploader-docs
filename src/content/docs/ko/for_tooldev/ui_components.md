---
title: 'UI 컴포넌트'
description: 'EAUploader의 스타일과 자체 UI 컴포넌트를 확장 기능에서 사용하는 방법'
---

이 문서에서는 EAUploader와 같은 모양의 UI를 확장 기능에서 만들기 위해 EAUploader의 스타일시트와 자체 UI 컴포넌트를 사용하는 방법을 설명합니다.

EAUploader의 UI는 UI Toolkit(UXML / USS)으로 만들어져 있습니다. 자체 UI 컴포넌트는 `Packages/tech.uslog.eauploader/Editor/Resources/UI/Components` 아래에 구현되어 있습니다.

이 문서는 EAUploader v1.6.2의 내용을 기준으로 합니다.

## 스타일시트 적용하기
* * *
EAUploader는 다음 두 가지 스타일시트를 사용합니다.

| 스타일시트 | 내용 |
| ---- | ---- |
| `UI/styles` | EAUploader 자체 스타일. 버튼, 탭, Material Icons 글꼴 등을 정의합니다. |
| `UI/tailwind` | Tailwind CSS 스타일의 유틸리티 클래스. `flex-row`, `p-4`, `text-xl`, `font-bold`, `border-zinc-300` 등의 클래스를 사용할 수 있습니다. |

창의 `rootVisualElement`에 스타일시트를 추가하세요.

```csharp
public void CreateGUI()
{
    rootVisualElement.styleSheets.Add(Resources.Load<StyleSheet>("UI/styles"));
    rootVisualElement.styleSheets.Add(Resources.Load<StyleSheet>("UI/tailwind"));
}
```

공개 API의 `EAUResourceAPI.EAUStyles`, `EAUResourceAPI.EAUTailwind`에서도 가져올 수 있습니다. 단, 이들은 EAUploader 메인 창이 표시될 때 불러오므로, 메인 창이 한 번도 표시되지 않았다면 `null`입니다.

:::note
`MaterialIcon`은 `UI/styles`에 정의된 글꼴을 사용합니다. `MaterialIcon`을 사용할 때는 반드시 `UI/styles`를 적용하세요.
:::

### 테마 맞추기
EAUploader의 색 구성(라이트·다크·파스텔)은 창 루트에 붙인 USS 클래스(`white`, `dark`, `pastel`)로 전환됩니다.
자신의 창도 EAUploader와 같은 색 구성으로 하고 싶다면 `EAUploader.UI.ThemeUtility`를 사용합니다.

```csharp
using EAUploader.UI;

ThemeUtility.ApplyTheme(rootVisualElement, ThemeUtility.GetCurrentTheme());
```

### 자주 사용하는 유틸리티 클래스
| 클래스 | 내용 |
| ---- | ---- |
| `flex-row` / `flex-col` | 자식 요소를 가로 / 세로로 배치 |
| `flex-1` | 남은 영역을 채움 |
| `items-center` / `justify-between` / `self-center` | 자식 요소나 자신의 배치 |
| `p-4` / `px-4` / `pb-2` / `m-4` / `mb-2` | 여백(숫자는 4px 단위) |
| `w-one-quarter` / `w-one-half` | 너비를 25% / 50%로 |
| `text-lg` / `text-xl` / `text-2xl` | 글자 크기 |
| `font-bold` | 굵게 |
| `text-red-600` 등의 색 | 글자 색(Tailwind CSS 색 이름) |
| `border-r` / `border-b` / `border-zinc-300` | 테두리 |
| `hidden` | 숨기기 |

## UXML에서 사용하기
* * *
UXML에서 자체 UI 컴포넌트를 사용하려면 `EAUploader.UI.Components` 네임스페이스를 `eau`로 선언합니다.

```xml
<ui:UXML
    xmlns:ui="UnityEngine.UIElements"
    xmlns:uie="UnityEditor.UIElements"
    xmlns:eau="EAUploader.UI.Components"
    editor-extension-mode="True">
    <ui:VisualElement class="p-4">
        <ui:Label text="My Tool" class="text-xl font-bold pb-2" />
        <eau:ShadowButton name="apply" class="button-with-icons">
            <eau:MaterialIcon icon="check" />
            <ui:Label text="Apply" />
        </eau:ShadowButton>
        <eau:SlideToggle label="Enable" name="enable" />
        <eau:TextFieldPro name="name" label="Name" placeholder="Please enter a name" required="true" />
        <eau:Link text="Open the website" href="https://example.com" />
    </ui:VisualElement>
</ui:UXML>
```

## 컴포넌트 목록
* * *
다음 컴포넌트는 모두 `EAUploader.UI.Components` 네임스페이스에 있습니다.

### ShadowButton
그림자가 있는 버튼입니다. EAUploader의 주요 버튼에 사용됩니다.

| 멤버 | 내용 |
| ---- | ---- |
| `text` | 버튼 문자열(UXML에서는 `text` 속성) |
| `clicked` | 클릭 시 호출되는 `Action` |

자식 요소로 `MaterialIcon`이나 `Label`을 추가하면 버튼 안에 표시됩니다.

```csharp
var button = new ShadowButton { text = "Apply" };
button.clicked += () => Debug.Log("clicked");
rootVisualElement.Add(button);
```

공개 API에서는 `ShadowButtonAPI.CreateShadowButton(text, clickAction)`으로 만들 수 있습니다.

### MaterialIcon
[Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons)의 아이콘을 표시합니다.

| 멤버 | 내용 |
| ---- | ---- |
| `icon` | 아이콘 이름(예: `settings`, `upload`, `help`, `warning`). UXML에서는 `icon` 속성 |

```csharp
var icon = new MaterialIcon("warning");
```

사용할 수 있는 아이콘 이름은 `UI/Components/codepoints.txt`에 적혀 있습니다. 공개 API에서는 `MaterialIconAPI.CreateMaterialIcon(iconName)`으로 만들 수 있습니다.

### SlideToggle
슬라이드식 토글 스위치입니다. `BaseField<bool>`을 상속합니다.

```csharp
var toggle = new SlideToggle("Enable");
toggle.RegisterValueChangedCallback(evt => Debug.Log(evt.newValue));
```

### TextFieldPro
플레이스홀더와 필수 입력을 지원하는 텍스트 필드입니다. `TextField`를 상속합니다.

| 멤버 | 내용 |
| ---- | ---- |
| `placeholder` | 입력하지 않았을 때 표시할 문자열(UXML에서는 `placeholder` 속성). UXML에서 지정하면 EAUploader의 번역 파일로 번역됩니다. |
| `required` | 필수 입력 여부(UXML에서는 `required` 속성). 입력하지 않으면 테두리가 빨갛게 표시됩니다. |
| `GetValue()` | 입력한 문자열을 가져옵니다. 입력하지 않은(플레이스홀더가 표시된) 경우 `null`을 반환합니다. |
| `ClearValue()` | 입력을 지우고 플레이스홀더를 표시합니다. |

:::caution
`TextFieldPro`는 플레이스홀더를 `value`로 표시합니다. 입력값을 가져올 때는 `value`가 아니라 `GetValue()`를 사용하세요.
:::

### Link
클릭하면 URL을 여는 레이블입니다. `Label`을 상속합니다.

```csharp
var link = new Link("Open the website") { href = "https://example.com" };
```

공개 API에서는 `LinkAPI.CreateLink(text, url)`로 만들 수 있습니다.

### HelpButton
'도움말' 버튼입니다. 누르면 `msg-id`로 지정한 번호의 도움말 메시지를 표시합니다.

```xml
<eau:HelpButton msg-id="113" />
```

:::note
도움말 메시지는 EAUploader 본체의 `Editor/Resources/Message`에서 불러오며, EAUploader 창 안에 모달로 표시됩니다. v1.6.2 시점에서는 확장 기능에서 자체 도움말 메시지를 추가할 수 없습니다.
:::

### Preview
아바타의 미리보기를 표시합니다. 마우스로 회전, 이동, 확대/축소할 수 있습니다. EAUploader 편집 화면의 미리보기에 사용됩니다.

```csharp
var preview = new Preview(previewRoot, CoreAPI.SelectedPrefabPath);
preview.ShowContent();

// 표시할 프리팹 변경
preview.UpdatePreview(otherPrefabPath);
```

| 메서드 | 내용 |
| ---- | ---- |
| `ShowContent()` | 미리보기를 표시합니다. 프리팹을 찾지 못하면 메시지를 표시합니다. |
| `UpdatePreview(prefabPath)` | 표시할 프리팹을 바꿉니다. |
| `ResetPreview()` | 확대율과 위치를 초기화합니다. |

`new Preview(container, gameObject)`처럼 `GameObject`를 전달하면 에셋이 아닌 편집 중인 오브젝트를 미리 볼 수 있습니다(라이브 모드). 오브젝트 구조를 바꿨을 때는 `Refresh()`, 표시만 갱신할 때는 `Repaint()`를 호출하고, 다 쓰면 `Dispose()`를 호출하세요.

공개 API에서는 `PreviewAPI`에서 같은 조작을 할 수 있습니다.

### PrefabItemButton
프리팹의 미리보기 이미지와 이름을 표시하는 버튼입니다.
업로드할 수 없는 아바타는 경고를 표시하고, `disabled`가 `true`이면 버튼을 누를 수 없는 상태로 만듭니다.

```csharp
foreach (var prefab in PrefabManager.GetAllPrefabsWithPreview())
{
    var item = new PrefabItemButton(prefab, () => Debug.Log(prefab.Path), disabled: true);
    list.Add(item);
}
```

공개 API에서는 `PrefabItemButtonAPI.CreatePrefabItemButton(prefab, clickAction, disabled)`로 만들 수 있습니다.

### DropdownFieldPro
EAUploader 디자인에 맞춘 드롭다운입니다. `choices`로 선택지를, `index`로 선택한 항목을 지정합니다. `multiSelect`를 `true`로 하면 여러 개를 선택할 수 있으며, 선택 변경은 `selectionChanged` 이벤트로 받을 수 있습니다.

```csharp
var dropdown = new DropdownFieldPro("", new List<string> { "Avatar", "Cloth" }, 0);
dropdown.RegisterValueChangedCallback(evt => Debug.Log(evt.newValue));
```

### CheckBox
EAUploader 디자인에 맞춘 체크박스입니다. `BaseField<bool>`을 상속합니다.

```csharp
var checkBox = new CheckBox("I agree");
checkBox.RegisterValueChangedCallback(evt => Debug.Log(evt.newValue));
```

### ContentWarningsField
VRChat의 콘텐츠 경고(Content Warnings) 태그를 선택하는 필드입니다.

| 멤버 | 내용 |
| ---- | ---- |
| `Tags` | 선택한 태그 목록(`content_sex`, `content_adult`, `content_violence`, `content_gore`, `content_horror`) |
| `SetTags(tags)` | 선택할 태그를 설정합니다. |
| `OnToggleTag` | 태그 선택이 바뀌었을 때 발생하는 이벤트 |

## 대화상자·모달·알림 표시하기
* * *
EAUploader의 대화상자, 모달, 알림은 EAUploader 메인 창 안에 표시됩니다. EAUploader 창이 열려 있는 상태에서 사용하세요.

### DialogPro
`EAUploader.UI.Windows.DialogPro`를 사용하면 EAUploader와 같은 모양의 대화상자를 표시할 수 있습니다.

```csharp
using EAUploader.UI.Windows;

DialogPro.Show(DialogPro.DialogType.Success, "Done", "The process has been completed.");

// OK 버튼의 문자열과 눌렀을 때의 처리를 지정
DialogPro.Show(DialogPro.DialogType.Info, "Confirm", "Do you want to continue?", "Continue", () =>
{
    Debug.Log("continue");
});
```

`DialogType`에는 `Info`, `Warning`, `Error`, `Success`를 지정할 수 있습니다.
이미 대화상자가 표시되어 있으면 새 대화상자는 표시되지 않습니다.

### Modal
`EAUploader.UI.EAUploader.modal`은 EAUploader 창 안에 표시되는 공통 모달입니다. 제목, 내용, 아래쪽 버튼을 지정하여 표시합니다.

```csharp
using EAUploader.UI.Components;
using EAUploaderWindow = EAUploader.UI.EAUploader;

var modal = EAUploaderWindow.modal;
modal.Initialize();
modal.setTitle("My Tool");
modal.setContent(new Label("Hello"));
modal.setFooter(new[]
{
    new Modal.ActionButton("Close", () => modal.Hide())
});
modal.Show();
```

### 알림(토스트)
`EAUploader.UI.EAUploader.toasts`를 사용하면 화면 가장자리에 짧은 알림을 표시할 수 있습니다.

```csharp
using EAUploader.UI.Components;
using EAUploaderWindow = EAUploader.UI.EAUploader;

EAUploaderWindow.toasts?.Show("Saved", type: ToastType.Success);
```

`ToastType`에는 `Info`, `Success`, `Warning`, `Error`, `Loading`을 지정할 수 있습니다.

## 다국어 지원
* * *
만든 UI의 문자열은 `LanguageAPI.LocalizeFromJsonFile`(또는 `LanguageUtility.LocalizationFromJsonFile`)로 번역할 수 있습니다. 자세한 내용은 '[빠른 시작 가이드](/ko/for_tooldev/extension/#다국어-지원)'를 참조하세요.
