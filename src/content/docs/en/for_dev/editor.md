---
title: 'Editor'
description: 'About the EAUploader editor'
---
# Interested in Development?
Project EAUploader is always looking for development members!
Even if you just want to talk to us!
Please visit our project's Discord server.
[Join here](https://discord.gg/yYFru7brra)
* * *
* * *
This page explains the processing flow of the `EAUploader.Editor` assembly, the main body of EAUploader.

This document is based on EAUploader v1.4.6.

## Startup
* * *
EAUploader's startup is handled by `EAUploaderCore` (`Editor/Scripts/EAUploaderCore.cs`).

### 1. Static Constructor
`EAUploaderCore` has the `[InitializeOnLoad]` attribute, so its static constructor runs every time Unity starts or scripts are recompiled (domain reload).

1. Registers the log output handler to `Application.logMessageReceived`.
2. Decides the name of the log file to write.
3. Logs environment information (date, log file GUID, EAUploader version, Unity version, platform, list of VPM packages).
4. Registers a wait for initialization to `EditorApplication.update`.

### 2. Initialization
Once Unity is neither compiling nor in play mode, `PerformInitialization` runs only once.

1. `InitializeEAUploader` ― Creates the `Assets/EAUploader` folder and `PrefabManager.json` if they do not exist.
2. `EAUploaderEditorManager.OnEditorManagerLoad` ― Initializes the extension registration information (`EditorsManage.json`).
3. `ShaderChecker.CheckShaders` ― Checks all prefabs in `Assets` for missing shaders.
4. `PrefabManager.Initialize` ― Updates the prefab list and generates preview images for prefabs that do not have one.
5. `CheckAvailablePackages` ― Reads `Packages/packages-lock.json` and determines whether VRM Converter (`HasVRM`) and AvatarOptimizer (`HasAAO`) are installed.
6. Finds static methods with the `[EAUPlugin]` attribute in all assemblies and calls them. (Extension registration)
7. Opens the EAUploader window via `EditorApplication.delayCall`. If it is already open, focuses it.

If an exception occurs during initialization, a dialog prompting a restart of EAUploader is shown. Pressing "Restart" re-imports `Packages/tech.uslog.eauploader`.

### Reload
"EAUploader" → "Reload" in the menu (`EAUploaderCore.ReloadSDK`) clears the selected prefab, initializes the extension registration information, updates the prefab list, and checks the integrated packages again.

## Data Storage
* * *
EAUploader saves data in the following locations in the project.

| Path | Contents | Class |
| ---- | ---- | ---- |
| `Assets/EAUploader/settings.json` | Display language (`language`), open/closed state of EA Library (`isLibraryOpen`) | `Config`, `LanguageUtility` |
| `Assets/EAUploader/PrefabManager.json` | Prefab list (a list of `PrefabInfo`) | `PrefabManager` |
| `Assets/EAUploader/EditorsManage.json` | Information about registered extensions | `EAUploaderEditorManager` |
| `Assets/EAUploader/PrefabPreviews/{prefab name}.png` | Preview images (1080×1080) | `PrefabPreview` |
| `EAUploaderLog/` | Log files | `UI.Windows.Logger` |
| EditorPrefs `EAUploader.Theme` | Theme (`white` / `dark`) | `ThemeUtility` |

`PrefabInfo` holds the following information.

| Field | Contents |
| ---- | ---- |
| `Path` | Path of the prefab |
| `Name` | Name of the prefab (file name without extension) |
| `LastModified` | Last modified date and time |
| `Type` | `VRChat` (has VRC_AvatarDescriptor), `VRM` (has VRMMeta), `Other` |
| `Status` | `Pinned`, `Show`, `Hidden`, `Other` |

:::caution
Preview images are saved based on the prefab's file name, so prefabs with the same name in different folders share a preview image.
:::

## Prefab Management
* * *
### Processing on Import
`AssetImportProcessor` (an `AssetPostprocessor`) detects `.prefab` imports and does the following.

1. `ShaderChecker.CheckShadersInPrefabs` ― Shows a dialog if shaders are missing. The dialog's "Why am I seeing this?" button opens "[Shader not found error](/en/faq/missing_shader/)" in this documentation (`https://eauploader-docs.uslog.tech/faq/missing_shader`).
2. `PrefabManager.ImportPrefab` ― Adds an `EAUploaderMeta` component to the prefab if it does not have one, generates a preview image, and updates the Manage Model list.

:::danger
Since it is linked from the shader dialog, do not change the URL of the `faq/missing_shader` page.
:::

### Shader Check
`ShaderChecker` treats a shader as missing for any material of any `Renderer` in the prefab whose shader is `Hidden/InternalErrorShader` or cannot be found with `Shader.Find`.

The shader list shown by "Show existing shaders" groups shaders by the part of the shader name before the first `/` (the group name). Groups included in `ShaderChecker.UNSUPPORTED_SHADERS` are excluded.

### Upload Eligibility
Each screen determines whether an avatar can be uploaded with the following three conditions.

| Check | Method |
| ---- | ---- |
| Has a VRC_AvatarDescriptor | `Utility.CheckAvatarHasVRCAvatarDescriptor` |
| No shaders are missing | `ShaderChecker.CheckAvatarHasShader` |
| Is not a VRM avatar | `Utility.CheckAvatarIsVRM` |

## UI
* * *
EAUploader's UI is built with UI Toolkit (UXML / USS).

* The main window is `UI.EAUploader` (menu "EAUploader" → "Open EAUploader"). It loads `MainWindow.uxml` and calls each tab's `Main.ShowContent` according to the tab button (`settings` / `setup` / `upload`).
* Styles use `styles.uss` (EAUploader's own styles) and `tailwind.uss` (Tailwind CSS-like utility classes such as `flex-row`, `p-4`, `text-xl`, and `font-bold`).
* UXML is loaded with `Resources.Load`, so place it under `Editor/Resources`.
* Custom UI components are in `Editor/Resources/UI/Components`. In UXML, declare `xmlns:eau="EAUploader.UI.Components"` to use them. See "[UI Components](/en/for_tooldev/ui_components/)" for details.

### Localization
The main window runs `LanguageUtility.Localization` every 100ms and translates the strings of all `TextElement`s in the window. Therefore, write English strings directly in UXML and add the corresponding translations to the translation files.
To set strings from C#, use `T7e.Get("English text")`. See "[Localization and Resources](/en/for_dev/localization/)" for details.

## Upload
* * *
Build and upload are handled by `AvatarUploader` (`Editor/Scripts/AvatarUploader.cs`). It gets `IVRCSdkAvatarBuilderApi` from the VRChat SDK control panel and uses it.

### Build as Test (`BuildAndTestAsync`)
1. Opens the VRChat SDK control panel.
2. Removes components that cannot be used in VRChat with `AvatarValidation.FindIllegalComponents`.
3. Builds with `builder.BuildAndTest`.

### Upload (`UploadAvatarAsync`)
1. Removes components that cannot be used in VRChat.
2. Gets the avatar information on VRChat with `GetVRCAvatar`, based on the `blueprintId` of `PipelineManager`.
3. If the avatar does not exist on VRChat (new):
   1. Builds with `builder.Build`.
   2. Checks that the asset bundle size does not exceed the limit.
   3. Assigns a `blueprintId` if there is none.
   4. Uploads with `VRCApi.CreateNewAvatar`.
4. If the avatar exists on VRChat (update):
   1. Builds with `builder.Build` and updates the asset bundle with `VRCApi.UpdateAvatarBundle`.
   2. If a thumbnail is specified, updates it with `VRCApi.UpdateAvatarImage`.
   3. If the name, description, visibility, or tags have changed, updates them with `VRCApi.UpdateAvatarInfo`.

Upload progress is notified with the `ProgressChanged` event, and completion with the `OnComplete` event.
To update only the avatar information, use `UpdateVRCAvatar`.

### Avatar Performance
The avatar performance in the Upload tab is calculated by `PerformanceInfoComputer` (`Editor/Scripts/VRCSDK/PerformanceInfo.cs`) using the VRChat SDK's `AvatarPerformance`. It currently uses the PC (Windows) criteria.

### Automatic Optimization
When AvatarOptimizer is installed (`HAS_AAO`), turning on "Automatic avatar optimizing" in the Upload tab adds a `TraceAndOptimize` component to the root of the avatar. Turning it off removes it.

## Extension (Edit Tool) Management
* * *
`EAUploaderEditorManager` holds the `EditorRegistration`s registered by extensions with `RegisterEditor`.
The Setup tab's "Edit tool" is displayed based on the list obtained with `GetRegisteredEditors`. Pressing a button executes the menu in `EditorRegistration.MenuName` with `EditorApplication.ExecuteMenuItem`.

See "[Quick Start Guidance](/en/for_tooldev/extension/)" for how to create extensions.

## Logging
* * *
See "[Logging Function Specification](/en/for_dev/logging/)" for logging and the error report.
