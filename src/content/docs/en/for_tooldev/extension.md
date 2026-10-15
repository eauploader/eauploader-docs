---
title: 'Quick Start Guidance'
description: 'How to create extensions that support EAUploader'
---

# EAUploader Extension Development Quick Start Guidance

This document explains how to develop extensions for EAUploader.
Extensions are added to "Edit tool" in EAUploader's "Setup" tab, and can perform any processing on the avatar selected by the user.

For implementation details, please refer to the "Viewpoint Position Editor" extension that comes built into EAUploader.
Its code can be found under `Packages/tech.uslog.eauploader/Editor/Resources/UI/TabContents/Setup/Editor/ViewpointPositionEditor`.

This document is based on EAUploader v1.4.6.

## How Extensions Work
* * *
1. At startup (when Unity starts or after scripts are recompiled), EAUploader finds static methods with the `EAUPlugin` attribute and calls them.
2. In that method, the extension calls `EAUploaderEditorManager.RegisterEditor` to register its own information (editor registration information).
3. EAUploader lists the registered extensions in "Edit tool" in the Setup tab.
4. When the user presses an extension's button, the Unity menu specified in `MenuName` of the editor registration information is executed. The extension opens its own window from that menu.

## 1. Create a Folder for the Package
* * *
Create a folder to store the source code and other files created in the following steps.

Create it inside your project's Assets folder or directly under Packages.
Any name is fine.

## 2. Add the Source Code
* * *
### Sample Source

Add source code like the following to the folder created in step 1.
Below, based on this sample source, we explain the code you should write when developing an extension.
*This is an excerpt of the parts of ViewpointPositionEditor.cs needed for the explanation, so it will not work if copied and pasted as is.*
Please use it only as a reference. For a minimal sample that works as is, see "[Minimal Sample](#minimal-sample)" below.

ViewpointPositionEditor.cs

```csharp
using UnityEditor;
using UnityEngine;
using UnityEngine.UIElements;
using EAUploader.CustomPrefabUtility;
using System;

namespace EAUploader.UI.Setup
{
    public class ViewpointPositionEditor : EditorWindow
    {
        private const string LOCALIZATION_FOLDER_PATH = "Packages/tech.uslog.eauploader/Editor/Resources/UI/TabContents/Setup/Editor/ViewpointPositionEditor/Localization";
        private ViewpointPositionEditorUI _editorUI;
        private PreviewRenderer _previewRenderer;
        private GameObject _gameObject;

        [EAUPlugin]
        private static void Initialize()
        {
            string editorName = LanguageUtility.T7eFromJsonFile("Viewpoint Position Editor", LOCALIZATION_FOLDER_PATH);
            string description = LanguageUtility.T7eFromJsonFile("A powerful viewpoint position editor for Unity.", LOCALIZATION_FOLDER_PATH);
            string requirementDescription = LanguageUtility.T7eFromJsonFile("The selected model must have a VRCAvatarDescriptor component.", LOCALIZATION_FOLDER_PATH);

            var editorRegistration = new EditorRegistration
            {
                MenuName = "EAUploader/ViewpointPositionEditor",
                EditorName = editorName,
                Description = description,
                Version = "0.1.0",
                Author = "USLOG",
                Url = "https://uslog.tech/eauploader",
                Requirement = CheckAvatarHasVRCAvatarDescriptor,
                RequirementDescription = requirementDescription
            };

            EAUploaderEditorManager.RegisterEditor(editorRegistration);
        }

        [MenuItem("EAUploader/ViewpointPositionEditor")]
        public static void Popup()
        {
            ViewpointPositionEditor editor = GetWindow<ViewpointPositionEditor>();
            editor.titleContent = new GUIContent("Viewpoint Position Editor");
            editor.minSize = new Vector2(800, 600);
            editor.position = new Rect(100, 100, 1200, 600);
        }

        public void OnEnable()
        {
            _gameObject = PrefabManager.GetPrefab(EAUploaderCore.selectedPrefabPath);

            if (_gameObject == null)
            {
                return;
            }

            _previewRenderer = new PreviewRenderer(_gameObject);
        }

        public void CreateGUI()
        {
            if (_gameObject == null)
            {
                Close();
                return;
            }

            _editorUI = new ViewpointPositionEditorUI(_previewRenderer);
            rootVisualElement.Add(_editorUI.Root);

            // Localization file path
            var localizationFolderPath = "Packages/tech.uslog.eauploader/Editor/Resources/UI/TabContents/Setup/Editor/ViewpointPositionEditor/Localization";
            LanguageUtility.LocalizationFromJsonFile(rootVisualElement, localizationFolderPath);
        }

        private void OnDisable()
        {
            _previewRenderer?.Dispose();
            _editorUI?.Dispose();
        }

        private static bool CheckAvatarHasVRCAvatarDescriptor(string prefabPath)
        {
            GameObject gameObject = PrefabManager.GetPrefab(prefabPath);
            return Utility.CheckAvatarHasVRCAvatarDescriptor(gameObject);
        }
    }
}
```

### Making EAUploader Recognize the Extension

To make EAUploader recognize the extension, you need to write the following code.
*The role of LanguageUtility.T7eFromJsonFile is explained in detail later.*

```csharp
        [EAUPlugin]
        private static void Initialize()
        {
            string editorName = LanguageUtility.T7eFromJsonFile("Viewpoint Position Editor", LOCALIZATION_FOLDER_PATH);
            string description = LanguageUtility.T7eFromJsonFile("A powerful viewpoint position editor for Unity.", LOCALIZATION_FOLDER_PATH);
            string requirementDescription = LanguageUtility.T7eFromJsonFile("The selected model must have a VRCAvatarDescriptor component.", LOCALIZATION_FOLDER_PATH);

            // Create the editor registration information
            var editorRegistration = new EditorRegistration
            {
                // Menu path shown in Unity
                // Must match the string of the MenuItem attribute described later.
                MenuName = "EAUploader/ViewpointPositionEditor",
                // Name of the editor shown in EAUploader
                EditorName = editorName,
                // Description of the editor shown in EAUploader
                Description = description,
                // Version of the extension
                Version = "0.1.0",
                // Author of the extension
                Author = "USLOG",
                // A support URL for the extension, if any, can be written here.
                Url = "https://uslog.tech/eauploader",
                // Specifies a method that decides whether the extension can be used.
                // The method receives the path of the selected prefab as its argument
                // and must return a bool indicating whether the extension can be used.
                // True: can be used, False: cannot be used
                Requirement = CheckAvatarHasVRCAvatarDescriptor,

                // Message shown to the user when the extension cannot be used.
                RequirementDescription = requirementDescription
            };

            // Register the editor
            EAUploaderEditorManager.RegisterEditor(editorRegistration);
        }

```

1. Add the EAUPlugin attribute to any static method.
   - In this sample, the EAUPlugin attribute is added to the Initialize method. Methods with this attribute are called automatically when EAUploader starts.
   - The method must be a static method with no parameters. It may be private.
2. In the method with the attribute, create the editor registration information and call EAUploaderEditorManager.RegisterEditor with it as the argument.
   - Calling EAUploaderEditorManager.RegisterEditor adds the extension to EAUploader.
   - For details on the editor registration information, see the comments in the source code above or the table below.

| Property | Type | Required | Contents |
| ---- | ---- | ---- | ---- |
| `MenuName` | `string` | ○ | Path of the menu executed when the extension's button is pressed. Must match the string of the `MenuItem` attribute. |
| `EditorName` | `string` | ○ | Name shown in the edit tool list |
| `Description` | `string` | | Description (shown when ▼ is pressed) |
| `Version` | `string` | | Version (shown when ▼ is pressed) |
| `Author` | `string` | | Author (shown when ▼ is pressed) |
| `Url` | `string` | | URL of a support page, etc. When specified, an "Open the link" button is shown. |
| `Requirement` | `Func<string, bool>` | | Method that decides whether the extension can be used. The path of the selected prefab is passed as the argument. If `null`, it can always be used. |
| `RequirementDescription` | `string` | | Message shown when the extension cannot be used |

:::caution[About the EAUPlugin attribute]
Use `EAUploader.EAUPluginAttribute` in the `EAUploader` namespace for the `EAUPlugin` attribute.
As of v1.4.6, methods with `EAUploader.Editor.Plugin.API.PluginAPI.EAUPluginAttribute` from the public API are not called when EAUploader starts.
You can also use `PluginAPI.RegisterEditor` instead of `EAUploaderEditorManager.RegisterEditor` to register the editor registration information.
:::

:::note
Give `EditorName` a name that does not overlap with other extensions. EAUploader manages the open/closed state of ▼ in the list based on `EditorName`, so if there are extensions with the same name, the display will not toggle correctly.
:::

### Implementing the Method Called from EAUploader

Add the MenuItem attribute to any method as shown below.
This is the method called when the user presses the extension editor's button.

```csharp
        [MenuItem("EAUploader/ViewpointPositionEditor")]
        public static void Popup()
        {
            ViewpointPositionEditor editor = GetWindow<ViewpointPositionEditor>();
            editor.titleContent = new GUIContent("Viewpoint Position Editor");
            editor.minSize = new Vector2(800, 600);
            editor.position = new Rect(100, 100, 1200, 600);
        }

```

With the steps above, the extension's button will be shown in EAUploader's screen.

### Getting the Selected Avatar

The path of the avatar (prefab) selected by the user in EAUploader can be obtained with `EAUploaderCore.selectedPrefabPath` (`CoreAPI.SelectedPrefabPath` in the public API).
The prefab's `GameObject` can be obtained with `PrefabManager.GetPrefab` (`PrefabAPI.GetPrefab` in the public API).

```csharp
        public void OnEnable()
        {
            _gameObject = PrefabManager.GetPrefab(EAUploaderCore.selectedPrefabPath);
        }
```

To detect when the selected avatar changes, use the `CoreAPI.SelectedPrefabPathChanged` event.

### Implement CreateGUI, OnEnable, and Other Methods as Needed

Implement CreateGUI, OnEnable, and other methods as needed.
If you want to create UI with the same look as EAUploader, see "[UI Components](/en/for_tooldev/ui_components/)".

## 3. Create an Assembly
* * *
Right-click the folder created in step 1 and click "Create - Assembly Definition".
An .asmdef file is created in the folder.

Configure the created .asmdef file as follows.

1. Uncheck Auto Referenced.
2. Add EAUploader.Editor to Assembly Definition References.
   * If you use VRChat SDK types such as `VRCAvatarDescriptor`, also add the VRChat SDK assemblies (such as `VRC.SDK3A`).
3. Set Platforms according to where the source code is placed. (Since extensions are editor extensions, usually check only `Editor`.)
4. Add Version Defines with the following values. Change the Define and Expression values as appropriate.
   * Resource: tech.uslog.eauploader
   * Define: EAUploader
   * Expression: 1.4.0

Step 4 enables conditional compilation.
For example, writing the following enables the code only when EAUploader version 1.4.0 or later is present.

```csharp
#if EAUploader
    using EAUploader;
#endif
```

If you want the extension to work in projects without EAUploader, wrap the EAUploader-related code in `#if EAUploader` ... `#endif`.

## Minimal Sample
* * *
A minimal extension sample that works as is. It shows the name and viewpoint height of the selected avatar.

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
                Description = "Shows information about the selected avatar.",
                Version = "0.1.0",
                Author = "Your Name",
                Url = "https://example.com",
                Requirement = prefabPath => PrefabUtilityAPI.CheckAvatarHasVRCAvatarDescriptor(PrefabAPI.GetPrefab(prefabPath)),
                RequirementDescription = "Please select an avatar that has a VRCAvatarDescriptor."
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
                rootVisualElement.Add(new Label("No avatar is selected."));
                return;
            }

            rootVisualElement.Add(new Label("Avatar: " + avatar.name));
            rootVisualElement.Add(new Label("Viewpoint height: " + PrefabUtilityAPI.GetAvatarHeight(avatar) + "m"));
#else
            rootVisualElement.Add(new Label("EAUploader is required."));
#endif
        }
    }
}
```

Configure the assembly as described in "3. Create an Assembly".

## 4. Distribute the Extension
* * *
Export the folder you created (source code and .asmdef file) as a `.unitypackage`, or distribute it as a VPM package.

* For a `.unitypackage`, users can import it with the "Import extentions" button in the Setup tab.
* For a VPM package, you can declare the dependency on EAUploader by specifying `tech.uslog.eauploader` in `vpmDependencies` of `package.json`.

Please let us know about extensions you have distributed on [Project EAUploader's Discord server](https://discord.gg/yYFru7brra).

## EAUploader API Quick Reference
* * *
### Localization

EAUploader achieves localization by creating JSON files that map English strings to strings in any language, and loading those JSON files at an appropriate time. Strings in any language can always be obtained using English as the key.

### JSON File Format

The JSON files must be stored in the following format. You need to add one JSON file per supported language.

- (any folder)
  - ja.json
  - ko.json
  - [language code].json

Each JSON file has content like the following.

```json
{
  "name": "日本語",
  "items": [
    {
      "key": "Apply",
      "value": "適用"
    },
    {
      "key": "Close",
      "value": "閉じる"
    },
    {
      "key": "Actual View",
      "value": "実際のビュー"
    },
    {
      "key": "Viewpoint Position Editor",
      "value": "ビューポイント位置エディタ"
    },
    {
      "key": "A powerful viewpoint position editor for Unity.",
      "value": "Unity用の強力なビューポイント位置エディタ"
    },
    {
      "key": "The selected model must have a VRCAvatarDescriptor component.",
      "value": "選択したモデルにはVRCAvatarDescriptorコンポーネントが必要です。"
    }
  ]
}
```

:::caution
Prepare JSON files for all languages EAUploader supports (`ja` and `ko` as of v1.4.6).
`LanguageUtility.LocalizationFromJsonFile` throws an error if the JSON file for any language does not exist. For languages you cannot translate, place an empty file such as `"items": []`. (The English strings will be shown as is.)
:::

### Applying Directly to rootVisualElement

You can apply the created JSON files directly to rootVisualElement.
To apply them, use the LanguageUtility.LocalizationFromJsonFile method.
Specify the rootVisualElement to apply to as the first argument, and the path of the folder containing the JSON files created above as the second argument.
This method replaces the Text values of all components derived from TextElement (e.g., Label, Button) in rootVisualElement according to the values in the JSON file. For example, `text="Actual View"` in the following UXML works as if it were loaded as `text="実際のビュー"` when the language is set to Japanese.

```xml
<ui:Label text="Actual View" class="self-center text-lg font-bold" />
```

Note that the explanation above is only an image; the strings in the UXML file are not actually rewritten. LanguageUtility.LocalizationFromJsonFile only replaces the values in rootVisualElement.

In the sample code, this is done in the CreateGUI method.

```csharp
        public void CreateGUI()
        {
            if (_gameObject == null)
            {
                Close();
                return;
            }

            _editorUI = new ViewpointPositionEditorUI(_previewRenderer);
            rootVisualElement.Add(_editorUI.Root);

            // Localization file path
            var localizationFolderPath = "Packages/tech.uslog.eauploader/Editor/Resources/UI/TabContents/Setup/Editor/ViewpointPositionEditor/Localization";
            LanguageUtility.LocalizationFromJsonFile(rootVisualElement, localizationFolderPath);
        }

```

In the public API, `LanguageAPI.LocalizeFromJsonFile` does the same.

### Getting a String in Any Language Directly from the JSON File

With the LanguageUtility.T7eFromJsonFile method, you can specify an English string and get the string for the currently set language.
In the sample code, it is used in the Initialize method.

```csharp
        [EAUPlugin]
        private static void Initialize()
        {
            string editorName = LanguageUtility.T7eFromJsonFile("Viewpoint Position Editor", LOCALIZATION_FOLDER_PATH);
            string description = LanguageUtility.T7eFromJsonFile("A powerful viewpoint position editor for Unity.", LOCALIZATION_FOLDER_PATH);
            string requirementDescription = LanguageUtility.T7eFromJsonFile("The selected model must have a VRCAvatarDescriptor component.", LOCALIZATION_FOLDER_PATH);

```

Specify the English string as the first argument, and the path of the folder containing the JSON files as the second argument.
It returns the string for the currently set language. If no corresponding string is found, the English string of the first argument is returned as is.

In the public API, `LanguageAPI.GetLocalizedTextFromJsonFile` does the same.

:::note
Values such as `EditorName` shown in the edit tool list are registered when EAUploader starts. Therefore, if you change the language, they are shown in the previous language until EAUploader restarts.
:::

### Getting the Current Language

Use the LanguageUtility.GetCurrentLanguage method.
Example:

```csharp
string language = LanguageUtility.GetCurrentLanguage();

```

It returns a string representing the current language.

- ja: Japanese is set as the display language.
- ko: Korean is set as the display language.
- en: English is set as the display language.

### UI

EAUploader's custom UI components are under Editor/Resources/UI/Components.
See "[UI Components](/en/for_tooldev/ui_components/)" for how to use them.

### Other APIs

EAUploader provides public APIs (such as `EAUploader.Editor.API`) intended for use by external tools.
See "API Reference" for details.
