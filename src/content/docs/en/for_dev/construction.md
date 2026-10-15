---
title: 'Directory and Namespace Structure'
description: 'About the directory and namespace structure of EAUploader'
---
# Interested in Development?
Project EAUploader is always looking for development members!
Even if you just want to talk to us!
Please visit our project's Discord server.
[Join here](https://discord.gg/yYFru7brra)
* * *
* * *
This document is based on EAUploader v1.4.6.

## Directory Structure
* * *
EAUploader is distributed as the VPM package `tech.uslog.eauploader`. The main directory structure of the package is as follows.

```
tech.uslog.eauploader/
├── package.json                  Package information (version, dependencies)
├── Editor/                       Editor extension (EAUploader.Editor assembly)
│   ├── EAUploader.Editor.asmdef
│   ├── Public EAUploader API/    Public API for external tools
│   ├── Scripts/                  Main logic
│   │   ├── EAUploaderCore.cs           Startup and initialization
│   │   ├── EAUploaderEditorManager.cs  Registration of extensions (edit tools)
│   │   ├── EAUPluginAttribute.cs       Attribute for initializing extensions
│   │   ├── AvatarUploader.cs           Build and upload
│   │   ├── AssetProcessor.cs           Processing on asset import
│   │   ├── Config.cs                   Reading and writing the settings file
│   │   ├── LanguageUtility.cs          Localization
│   │   ├── T7e.cs                      Getting translated strings
│   │   ├── CustomPrefabUtility/        Prefab management, previews, shader checks, VRM conversion
│   │   ├── Coexistence/                Code for coexisting with other tools
│   │   ├── Feedback/                   Sending feedback (currently suspended)
│   │   ├── SubWindow/                  Sub windows (currently unused)
│   │   └── VRCSDK/                     Avatar performance calculation
│   └── Resources/
│       ├── Localization/         UI translation files (ja.json, ko.json)
│       ├── Message/              Help messages (per language)
│       ├── Shaders/              Shaders used by EAUploader
│       └── UI/                   UI Toolkit UXML, USS, and C#
│           ├── EAUploader.cs           Main window
│           ├── MainWindow.uxml
│           ├── styles.uss / tailwind.uss
│           ├── Components/             Custom UI components
│           ├── TabContents/            Screens for each tab
│           │   ├── ImportSettings/     Import/Settings tab (including EA Library)
│           │   ├── Setup/              Setup tab (including Viewpoint Position Editor)
│           │   └── Upload/             Upload tab
│           └── Windows/                Windows such as dialogs and the error report
├── Runtime/                      Runtime components (EAUploader assembly)
│   ├── EAUploader.asmdef
│   └── Components/
└── .vpm/, .github/               For generating and distributing the VPM repository
```

## Assemblies
* * *
| Assembly | Location | Platforms | Contents |
| ---- | ---- | ---- | ---- |
| `EAUploader.Editor` | `Editor/` | Editor | The main body of EAUploader. UI, prefab management, upload, public API |
| `EAUploader` | `Runtime/` | All | Components added to avatars |

`EAUploader.Editor` defines the following Version Defines.

| Symbol | Package | Condition |
| ---- | ---- | ---- |
| `HAS_VRM` | `jp.pokemori.vrm-converter-for-vrchat` | 41.1.0 or later |
| `HAS_AAO` | `com.anatawa12.avatar-optimizer` | 1.7.0 or later |

`EAUploader` (Runtime) defines `VRC_SDK3A` when VRChat SDK - Avatars (`com.vrchat.avatars`) is present.

## Namespaces
* * *
| Namespace | Main classes | Contents |
| ---- | ---- | ---- |
| `EAUploader` | `EAUploaderCore`, `EAUploaderEditorManager`, `EditorRegistration`, `EAUPluginAttribute`, `AvatarUploader`, `LanguageUtility`, `T7e`, `Config` | Core features such as startup, extension registration, upload, and localization |
| `EAUploader.CustomPrefabUtility` | `PrefabManager`, `PrefabPreview`, `ShaderChecker`, `Utility`, `PrefabInfo`, `RenamePrefabWindow`, `VRMImporter` | Prefab management, preview image generation, shader checks, VRM conversion |
| `EAUploader.UI` | `EAUploader` | Main window |
| `EAUploader.UI.ImportSettings` | `Main`, `Import`, `ManageModels`, `EALibrary` | Import/Settings tab (internal) |
| `EAUploader.UI.Setup` | `Main`, `ViewpointPositionEditor` | Setup tab and the built-in edit tool |
| `EAUploader.UI.Upload` | `Main`, `UploadForm` | Upload tab (internal) |
| `EAUploader.UI.Components` | `ShadowButton`, `MaterialIcon`, `HelpButton`, `SlideToggle`, `TextFieldPro`, `Preview`, etc. | Custom UI components |
| `EAUploader.UI.Windows` | `DialogPro`, `Logger`, `PrefabPreviewer` | Dialogs, error report, logging |
| `EAUploader.Editor.API` | `CoreAPI`, `LanguageAPI`, `UploadAPI` | Public API |
| `EAUploader.Editor.Plugin.API` | `PluginAPI` | Public API (extension registration) |
| `EAUploader.Editor.Prefab.API` | `PrefabAPI`, `PrefabPreviewAPI`, `ShaderAPI`, `PrefabUtilityAPI`, `VRMAPI` | Public API (prefab operations) |
| `EAUploader.Editor.Resource.API` | `EAUResourceAPI`, `HelpButtonAPI`, `LinkAPI`, `MaterialIconAPI`, etc. | Public API (styles, UI components) |
| `EAUploader.Components` | `AvatarTagComponent`, `EAUploaderMeta` | Runtime components |

`EAUploader.Editor.*.API` is the public API intended for use by external tools. It is a thin wrapper around the internal implementation (`EAUploader` and `EAUploader.CustomPrefabUtility`). See "API Reference" for details.

## Class Relationships
* * *
The relationships between the main classes are as follows.

```
EAUploaderCore ([InitializeOnLoad])
├── EAUploaderEditorManager ...... Registers and holds extensions (EditorRegistration)
├── ShaderChecker ................ Checks prefab shaders
├── PrefabManager ................ Manages the prefab list (PrefabInfo)
│   └── PrefabPreview ............ Generates and saves preview images
└── UI.EAUploader (main window)
    ├── UI.ImportSettings.Main ... Import / ManageModels / EALibrary
    ├── UI.Setup.Main ............ Edit tool list (from EAUploaderEditorManager)
    └── UI.Upload.Main ........... UploadForm → AvatarUploader → VRChat SDK
```

The tabs share `EAUploaderCore.selectedPrefabPath` (the path of the selected prefab). An avatar selected in the Setup tab is also selected in the Upload tab.

See "[Editor](/en/for_dev/editor/)" for details on the processing flow.
