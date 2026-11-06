---
title: 'UI Components'
description: 'How to use EAUploader styles and custom UI components in extensions'
---

This document explains how to use EAUploader's stylesheets and custom UI components to create UI in your extension that looks the same as EAUploader.

EAUploader's UI is built with UI Toolkit (UXML / USS). Custom UI components are implemented under `Packages/tech.uslog.eauploader/Editor/Resources/UI/Components`.

This document is based on EAUploader v1.6.2.

## Applying Stylesheets
* * *
EAUploader uses the following two stylesheets.

| Stylesheet | Contents |
| ---- | ---- |
| `UI/styles` | EAUploader's own styles. Defines buttons, tabs, the Material Icons font, and more. |
| `UI/tailwind` | Tailwind CSS-like utility classes. You can use classes such as `flex-row`, `p-4`, `text-xl`, `font-bold`, and `border-zinc-300`. |

Add the stylesheets to your window's `rootVisualElement`.

```csharp
public void CreateGUI()
{
    rootVisualElement.styleSheets.Add(Resources.Load<StyleSheet>("UI/styles"));
    rootVisualElement.styleSheets.Add(Resources.Load<StyleSheet>("UI/tailwind"));
}
```

They can also be obtained from `EAUResourceAPI.EAUStyles` and `EAUResourceAPI.EAUTailwind` in the public API. However, these are loaded when EAUploader's main window is shown, so they are `null` if the main window has never been shown.

:::note
`MaterialIcon` uses the font defined in `UI/styles`. When using `MaterialIcon`, always apply `UI/styles`.
:::

### Matching the Theme
EAUploader's color schemes (Light, Dark, Pastel) are switched by a USS class (`white`, `dark`, `pastel`) on the window root.
To give your own window the same colors as EAUploader, use `EAUploader.UI.ThemeUtility`.

```csharp
using EAUploader.UI;

ThemeUtility.ApplyTheme(rootVisualElement, ThemeUtility.GetCurrentTheme());
```

### Commonly Used Utility Classes
| Class | Contents |
| ---- | ---- |
| `flex-row` / `flex-col` | Arrange children horizontally / vertically |
| `flex-1` | Fill the remaining space |
| `items-center` / `justify-between` / `self-center` | Alignment of children or self |
| `p-4` / `px-4` / `pb-2` / `m-4` / `mb-2` | Spacing (numbers are in units of 4px) |
| `w-one-quarter` / `w-one-half` | Set width to 25% / 50% |
| `text-lg` / `text-xl` / `text-2xl` | Text size |
| `font-bold` | Bold |
| Colors such as `text-red-600` | Text color (Tailwind CSS color names) |
| `border-r` / `border-b` / `border-zinc-300` | Borders |
| `hidden` | Hide |

## Using in UXML
* * *
To use custom UI components in UXML, declare the `EAUploader.UI.Components` namespace as `eau`.

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

## Component List
* * *
All of the following components are in the `EAUploader.UI.Components` namespace.

### ShadowButton
A button with a shadow. Used for EAUploader's main buttons.

| Member | Contents |
| ---- | ---- |
| `text` | The button's text (`text` attribute in UXML) |
| `clicked` | `Action` called when clicked |

Adding `MaterialIcon` or `Label` as children shows them inside the button.

```csharp
var button = new ShadowButton { text = "Apply" };
button.clicked += () => Debug.Log("clicked");
rootVisualElement.Add(button);
```

In the public API, you can create it with `ShadowButtonAPI.CreateShadowButton(text, clickAction)`.

### MaterialIcon
Shows an icon from [Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons).

| Member | Contents |
| ---- | ---- |
| `icon` | Name of the icon (e.g., `settings`, `upload`, `help`, `warning`). `icon` attribute in UXML |

```csharp
var icon = new MaterialIcon("warning");
```

The available icon names are listed in `UI/Components/codepoints.txt`. In the public API, you can create it with `MaterialIconAPI.CreateMaterialIcon(iconName)`.

### SlideToggle
A sliding toggle switch. It inherits from `BaseField<bool>`.

```csharp
var toggle = new SlideToggle("Enable");
toggle.RegisterValueChangedCallback(evt => Debug.Log(evt.newValue));
```

### TextFieldPro
A text field that supports placeholders and required input. It inherits from `TextField`.

| Member | Contents |
| ---- | ---- |
| `placeholder` | String shown when empty (`placeholder` attribute in UXML). When specified in UXML, it is translated with EAUploader's translation files. |
| `required` | Whether input is required (`required` attribute in UXML). When empty, the border is shown in red. |
| `GetValue()` | Gets the entered string. Returns `null` when empty (when the placeholder is shown). |
| `ClearValue()` | Clears the input and shows the placeholder. |

:::caution
`TextFieldPro` shows the placeholder as its `value`. To get the entered value, use `GetValue()` instead of `value`.
:::

### Link
A label that opens a URL when clicked. It inherits from `Label`.

```csharp
var link = new Link("Open the website") { href = "https://example.com" };
```

In the public API, you can create it with `LinkAPI.CreateLink(text, url)`.

### HelpButton
A "Help" button. When pressed, it shows the help message with the number specified in `msg-id`.

```xml
<eau:HelpButton msg-id="113" />
```

:::note
Help messages are loaded from `Editor/Resources/Message` of EAUploader itself and shown as a modal inside the EAUploader window. As of v1.6.2, extensions cannot add their own help messages.
:::

### Preview
Shows a preview of an avatar. You can rotate, move, and zoom with the mouse. Used for the previews in EAUploader's Setup and Upload tabs.

```csharp
var preview = new Preview(previewRoot, CoreAPI.SelectedPrefabPath);
preview.ShowContent();

// Change the prefab to show
preview.UpdatePreview(otherPrefabPath);
```

| Method | Contents |
| ---- | ---- |
| `ShowContent()` | Shows the preview. If the prefab is not found, shows a message. |
| `UpdatePreview(prefabPath)` | Changes the prefab to show. |
| `ResetPreview()` | Resets the zoom and position. |

Passing a `GameObject`, as in `new Preview(container, gameObject)`, lets you preview an object being edited that is not an asset (live mode). Call `Refresh()` after changing the object's structure, `Repaint()` to only redraw, and `Dispose()` when you are done.

In the public API, the same operations are available from `PreviewAPI`.

### PrefabItemButton
A button that shows a prefab's preview image and name. Used in EAUploader's avatar lists.
For avatars that cannot be uploaded, it shows a warning, and when `disabled` is `true`, the button cannot be pressed.

```csharp
foreach (var prefab in PrefabManager.GetAllPrefabsWithPreview())
{
    var item = new PrefabItemButton(prefab, () => Debug.Log(prefab.Path), disabled: true);
    list.Add(item);
}
```

In the public API, you can create it with `PrefabItemButtonAPI.CreatePrefabItemButton(prefab, clickAction, disabled)`.

### DropdownFieldPro
A dropdown matching EAUploader's design. Specify the options with `choices` and the selected item with `index`. Set `multiSelect` to `true` to allow multiple selection, and receive selection changes with the `selectionChanged` event.

```csharp
var dropdown = new DropdownFieldPro("", new List<string> { "Avatar", "Cloth" }, 0);
dropdown.RegisterValueChangedCallback(evt => Debug.Log(evt.newValue));
```

### CheckBox
A check box matching EAUploader's design. It inherits from `BaseField<bool>`.

```csharp
var checkBox = new CheckBox("I agree");
checkBox.RegisterValueChangedCallback(evt => Debug.Log(evt.newValue));
```

### ContentWarningsField
A field for selecting VRChat Content Warnings tags.

| Member | Contents |
| ---- | ---- |
| `Tags` | List of selected tags (`content_sex`, `content_adult`, `content_violence`, `content_gore`, `content_horror`) |
| `SetTags(tags)` | Sets the tags to select. |
| `OnToggleTag` | Event raised when the tag selection changes |

## Showing Dialogs, Modals, and Notifications
* * *
EAUploader's dialogs, modals, and notifications are shown inside EAUploader's main window. Use them while the EAUploader window is open.

### DialogPro
With `EAUploader.UI.Windows.DialogPro`, you can show dialogs that look the same as EAUploader's.

```csharp
using EAUploader.UI.Windows;

DialogPro.Show(DialogPro.DialogType.Success, "Done", "The process has been completed.");

// Specify the OK button text and the action when pressed
DialogPro.Show(DialogPro.DialogType.Info, "Confirm", "Do you want to continue?", "Continue", () =>
{
    Debug.Log("continue");
});
```

`DialogType` can be `Info`, `Warning`, `Error`, or `Success`.
If a dialog is already shown, a new dialog is not shown.

### Modal
`EAUploader.UI.EAUploader.modal` is the shared modal shown inside the EAUploader window. Show it by specifying a title, content, and buttons at the bottom.

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

### Notifications (Toasts)
With `EAUploader.UI.EAUploader.toasts`, you can show a short notification at the edge of the screen.

```csharp
using EAUploader.UI.Components;
using EAUploaderWindow = EAUploader.UI.EAUploader;

EAUploaderWindow.toasts?.Show("Saved", type: ToastType.Success);
```

`ToastType` can be `Info`, `Success`, `Warning`, `Error`, or `Loading`.

## Localization
* * *
Strings in your UI can be translated with `LanguageAPI.LocalizeFromJsonFile` (or `LanguageUtility.LocalizationFromJsonFile`). See "[Quick Start Guidance](/en/for_tooldev/extension/#localization)" for details.
