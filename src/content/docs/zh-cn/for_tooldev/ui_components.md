---
title: 'UI组件'
description: '在扩展功能中使用EAUploader的样式和自定义UI组件的方法'
---

本文档将介绍如何使用EAUploader的样式表和自定义UI组件，在扩展功能中制作与EAUploader外观相同的UI。

EAUploader的UI使用UI Toolkit（UXML / USS）制作。自定义UI组件实现在`Packages/tech.uslog.eauploader/Editor/Resources/UI/Components`下。

本文档基于EAUploader v1.6.2编写。

## 应用样式表
* * *
EAUploader使用以下两个样式表。

| 样式表 | 内容 |
| ---- | ---- |
| `UI/styles` | EAUploader自身的样式。定义了按钮、标签页、Material Icons字体等。 |
| `UI/tailwind` | 类似Tailwind CSS的工具类。可以使用`flex-row`、`p-4`、`text-xl`、`font-bold`、`border-zinc-300`等类。 |

请将样式表添加到窗口的`rootVisualElement`中。

```csharp
public void CreateGUI()
{
    rootVisualElement.styleSheets.Add(Resources.Load<StyleSheet>("UI/styles"));
    rootVisualElement.styleSheets.Add(Resources.Load<StyleSheet>("UI/tailwind"));
}
```

也可以通过公开API中的`EAUResourceAPI.EAUStyles`、`EAUResourceAPI.EAUTailwind`获取。但它们是在EAUploader主窗口显示时加载的，因此如果主窗口从未显示过，则为`null`。

:::note
`MaterialIcon`使用`UI/styles`中定义的字体。使用`MaterialIcon`时，请务必应用`UI/styles`。
:::

### 与主题保持一致
EAUploader的配色（Light、Dark、Pastel）通过窗口根元素上的USS类（`white`、`dark`、`pastel`）切换。
如果想让自己的窗口与EAUploader配色相同，请使用`EAUploader.UI.ThemeUtility`。

```csharp
using EAUploader.UI;

ThemeUtility.ApplyTheme(rootVisualElement, ThemeUtility.GetCurrentTheme());
```

### 常用的工具类
| 类 | 内容 |
| ---- | ---- |
| `flex-row` / `flex-col` | 将子元素横向 / 纵向排列 |
| `flex-1` | 填满剩余空间 |
| `items-center` / `justify-between` / `self-center` | 子元素或自身的对齐方式 |
| `p-4` / `px-4` / `pb-2` / `m-4` / `mb-2` | 间距（数字以4px为单位） |
| `w-one-quarter` / `w-one-half` | 将宽度设为25% / 50% |
| `text-lg` / `text-xl` / `text-2xl` | 文字大小 |
| `font-bold` | 粗体 |
| `text-red-600`等颜色 | 文字颜色（Tailwind CSS的颜色名称） |
| `border-r` / `border-b` / `border-zinc-300` | 边框 |
| `hidden` | 隐藏 |

## 在UXML中使用
* * *
要在UXML中使用自定义UI组件，请将`EAUploader.UI.Components`命名空间声明为`eau`。

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

## 组件列表
* * *
以下组件都位于`EAUploader.UI.Components`命名空间中。

### ShadowButton
带阴影的按钮。用于EAUploader的主要按钮。

| 成员 | 内容 |
| ---- | ---- |
| `text` | 按钮的文字（UXML中为`text`属性） |
| `clicked` | 点击时调用的`Action` |

将`MaterialIcon`或`Label`添加为子元素后，会显示在按钮内。

```csharp
var button = new ShadowButton { text = "Apply" };
button.clicked += () => Debug.Log("clicked");
rootVisualElement.Add(button);
```

在公开API中，可以通过`ShadowButtonAPI.CreateShadowButton(text, clickAction)`创建。

### MaterialIcon
显示[Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons)的图标。

| 成员 | 内容 |
| ---- | ---- |
| `icon` | 图标名称（如`settings`、`upload`、`help`、`warning`）。UXML中为`icon`属性 |

```csharp
var icon = new MaterialIcon("warning");
```

可用的图标名称记载在`UI/Components/codepoints.txt`中。在公开API中，可以通过`MaterialIconAPI.CreateMaterialIcon(iconName)`创建。

### SlideToggle
滑动式开关。继承自`BaseField<bool>`。

```csharp
var toggle = new SlideToggle("Enable");
toggle.RegisterValueChangedCallback(evt => Debug.Log(evt.newValue));
```

### TextFieldPro
支持占位符和必填输入的文本框。继承自`TextField`。

| 成员 | 内容 |
| ---- | ---- |
| `placeholder` | 为空时显示的字符串（UXML中为`placeholder`属性）。在UXML中指定时，会使用EAUploader的翻译文件进行翻译。 |
| `required` | 是否为必填（UXML中为`required`属性）。为空时边框显示为红色。 |
| `GetValue()` | 获取输入的字符串。为空时（显示占位符时）返回`null`。 |
| `ClearValue()` | 清空输入并显示占位符。 |

:::caution
`TextFieldPro`会将占位符作为`value`显示。获取输入值时，请使用`GetValue()`而不是`value`。
:::

### Link
点击后打开URL的标签。继承自`Label`。

```csharp
var link = new Link("Open the website") { href = "https://example.com" };
```

在公开API中，可以通过`LinkAPI.CreateLink(text, url)`创建。

### HelpButton
"帮助"按钮。按下后，会显示`msg-id`中指定编号的帮助消息。

```xml
<eau:HelpButton msg-id="113" />
```

:::note
帮助消息从EAUploader本体的`Editor/Resources/Message`中读取，并以模态窗口的形式显示在EAUploader窗口内。截至v1.6.2，扩展功能无法添加自己的帮助消息。
:::

### Preview
显示Avatar的预览。可以用鼠标旋转、移动和缩放。用于EAUploader的Setup和Upload标签页中的预览。

```csharp
var preview = new Preview(previewRoot, CoreAPI.SelectedPrefabPath);
preview.ShowContent();

// 更改要显示的预制体
preview.UpdatePreview(otherPrefabPath);
```

| 方法 | 内容 |
| ---- | ---- |
| `ShowContent()` | 显示预览。找不到预制体时显示消息。 |
| `UpdatePreview(prefabPath)` | 更改要显示的预制体。 |
| `ResetPreview()` | 重置缩放和位置。 |

像`new Preview(container, gameObject)`这样传入`GameObject`，可以预览不是素材的、正在编辑中的对象（实时模式）。更改对象结构后请调用`Refresh()`，只需重绘时调用`Repaint()`，使用结束后调用`Dispose()`。

在公开API中，可以通过`PreviewAPI`进行相同的操作。

### PrefabItemButton
显示预制体预览图和名称的按钮。用于EAUploader的Avatar列表。
对于无法上传的Avatar会显示警告，`disabled`为`true`时按钮无法按下。

```csharp
foreach (var prefab in PrefabManager.GetAllPrefabsWithPreview())
{
    var item = new PrefabItemButton(prefab, () => Debug.Log(prefab.Path), disabled: true);
    list.Add(item);
}
```

在公开API中，可以通过`PrefabItemButtonAPI.CreatePrefabItemButton(prefab, clickAction, disabled)`创建。

### DropdownFieldPro
符合EAUploader设计的下拉菜单。通过`choices`指定选项，通过`index`指定所选项目。将`multiSelect`设为`true`可以多选，通过`selectionChanged`事件接收选择的变化。

```csharp
var dropdown = new DropdownFieldPro("", new List<string> { "Avatar", "Cloth" }, 0);
dropdown.RegisterValueChangedCallback(evt => Debug.Log(evt.newValue));
```

### CheckBox
符合EAUploader设计的复选框。继承自`BaseField<bool>`。

```csharp
var checkBox = new CheckBox("I agree");
checkBox.RegisterValueChangedCallback(evt => Debug.Log(evt.newValue));
```

### ContentWarningsField
用于选择VRChat内容警告（Content Warnings）标签的字段。

| 成员 | 内容 |
| ---- | ---- |
| `Tags` | 所选标签的列表（`content_sex`、`content_adult`、`content_violence`、`content_gore`、`content_horror`） |
| `SetTags(tags)` | 设置要选择的标签。 |
| `OnToggleTag` | 标签选择发生变化时触发的事件 |

## 显示对话框、模态窗口和通知
* * *
EAUploader的对话框、模态窗口和通知显示在EAUploader主窗口内。请在EAUploader窗口打开时使用。

### DialogPro
使用`EAUploader.UI.Windows.DialogPro`，可以显示与EAUploader外观相同的对话框。

```csharp
using EAUploader.UI.Windows;

DialogPro.Show(DialogPro.DialogType.Success, "Done", "The process has been completed.");

// 指定OK按钮的文字和按下时的处理
DialogPro.Show(DialogPro.DialogType.Info, "Confirm", "Do you want to continue?", "Continue", () =>
{
    Debug.Log("continue");
});
```

`DialogType`可以是`Info`、`Warning`、`Error`、`Success`。
如果已经显示了对话框，则不会显示新的对话框。

### 模态窗口（Modal）
`EAUploader.UI.EAUploader.modal`是显示在EAUploader窗口内的通用模态窗口。指定标题、内容和下方的按钮后显示。

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

### 通知（Toast）
使用`EAUploader.UI.EAUploader.toasts`，可以在界面边缘显示简短的通知。

```csharp
using EAUploader.UI.Components;
using EAUploaderWindow = EAUploader.UI.EAUploader;

EAUploaderWindow.toasts?.Show("Saved", type: ToastType.Success);
```

`ToastType`可以是`Info`、`Success`、`Warning`、`Error`、`Loading`。

## 多语言支持
* * *
UI中的字符串可以通过`LanguageAPI.LocalizeFromJsonFile`（或`LanguageUtility.LocalizationFromJsonFile`）进行翻译。详情请参阅"[快速入门指南](/zh-cn/for_tooldev/extension/#多语言支持)"。
