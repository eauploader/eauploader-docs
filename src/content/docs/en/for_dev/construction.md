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
This document is based on EAUploader v1.6.2.

## Directory Structure
* * *
EAUploader is distributed as the VPM package `tech.uslog.eauploader`. The main directory structure of the package is as follows.

```
tech.uslog.eauploader/
├── package.json                  Package information (version, dependencies)
├── CHANGELOG.md                  Change history
├── Docs/                         Specifications (English)
├── Editor/                       Editor extension (EAUploader.Editor assembly)
│   ├── EAUploader.Editor.asmdef
│   ├── Public EAUploader API/    Public API for external tools (one class per file)
│   ├── Scripts/
│   │   ├── EAUploaderCore.cs           Startup, initialization, global state
│   │   ├── EAUploaderEditorManager.cs  Registration of edit tools
│   │   ├── EAUPluginAttribute.cs       [EAUPlugin] attribute
│   │   ├── AvatarUploader.cs           Build and upload
│   │   ├── AssetProcessor.cs           Processing on asset import
│   │   ├── Config.cs                   Settings file (settings.json)
│   │   ├── LanguageUtility.cs, T7e.cs  Localization
│   │   ├── ThemeUtility.cs             Themes
│   │   ├── CustomPrefabUtility/        Managed Prefab Variants, tags, previews, shader checks, VRM conversion, migration, deletion
│   │   ├── Coexistence/                Coexistence with AvatarOptimizer
│   │   ├── VRCSDK/                     Avatar performance calculation
│   │   └── Feedback/, SubWindow/       Feedback sender and welcome window (currently unused)
│   └── Resources/
│       ├── Localization/         UI translation files (ja.json, ko.json)
│       ├── Message/              Help messages (per language)
│       ├── Shaders/              AlwaysShow.shader (preview markers), TextureAdjust.shader (Texture Editor)
│       └── UI/
│           ├── EAUploader.cs           Main window
│           ├── MainWindow.uxml
│           ├── styles.uss / tailwind.uss
│           ├── Components/             Custom UI components
│           ├── Modals/                 Modals shown inside the window
│           ├── TabContents/
│           │   ├── AvatarList/         Avatar List
│           │   ├── Setup/              Edit screen
│           │   │   └── Editor/         Built-in edit tools (Common, ViewpointPositionEditor, ShapeKeyEditor, TextureEditor, OutfitTool)
│           │   ├── Upload/             Upload form
│           │   └── ImportSettings/     EA Library articles (currently not shown on screen)
│           └── Windows/                Dialogs, error report, VRM conversion window
├── Runtime/                      Runtime components (EAUploader assembly)
│   ├── EAUploader.asmdef
│   └── Components/               EAUploaderMeta, EAUploaderOutfit, AvatarTagComponent
└── .vpm/, .github/               For generating and distributing the VPM repository
```

## Assemblies
* * *
| Assembly | Location | Platforms | Contents |
| ---- | ---- | ---- | ---- |
| `EAUploader.Editor` | `Editor/` | Editor | The main body of EAUploader. UI, item management, edit tools, upload, public API |
| `EAUploader` | `Runtime/` | All | Components added to avatars |

`EAUploader.Editor` defines the following Version Defines.

| Symbol | Package | Condition |
| ---- | ---- | ---- |
| `HAS_VRM` | `jp.pokemori.vrm-converter-for-vrchat` | 41.1.0 or later |
| `HAS_AAO` | `com.anatawa12.avatar-optimizer` | 1.7.0 or later |
| `HAS_MA` | `nadena.dev.modular-avatar` | 1.9.0 or later |

`EAUploader` (Runtime) defines `VRC_SDK3A` when VRChat SDK - Avatars (`com.vrchat.avatars`) is present.

## Namespaces
* * *
| Namespace | Main classes | Contents |
| ---- | ---- | ---- |
| `EAUploader` | `EAUploaderCore`, `EAUploaderEditorManager`, `EditorRegistration`, `EAUPluginAttribute`, `AvatarUploader`, `LanguageUtility`, `T7e`, `Config` | Core features such as startup, edit tool registration, upload, and localization |
| `EAUploader.CustomPrefabUtility` | `ManagedPrefabs`, `PrefabManager`, `PrefabInfo`, `TagManager`, `PrefabPreview`, `ShaderChecker`, `Utility`, `VRMImporter` | Managed Prefab Variants, metadata, tags, preview images, shader checks, VRM conversion, migration, deletion |
| `EAUploader.UI` | `EAUploader`, `ThemeUtility` | Main window, screen switching, themes |
| `EAUploader.UI.AvatarList` | `Main` | Avatar List (internal) |
| `EAUploader.UI.Setup` | `Main`, `ViewpointPositionEditor` | Edit screen and the Viewpoint Position Editor |
| `EAUploader.UI.Setup.EditTools` | `EditToolModal`, `EditToolSession`, `ToolModalFrame`, `EditToolUtility`, etc. | Built-in edit tools and their shared base (internal) |
| `EAUploader.UI.Upload` | `UploadForm` | Upload form (internal) |
| `EAUploader.UI.Modals` | `ImportModal`, `SettingsModal`, `ClothSettingModal`, `TagFilterModal`, `TagSettingsModal`, `PrefabPreviewModal`, etc. | Modals shown inside the window |
| `EAUploader.UI.Components` | `Modal`, `ToastManager`, `ShadowButton`, `MaterialIcon`, `HelpButton`, `DropdownFieldPro`, `Preview`, etc. | Custom UI components |
| `EAUploader.UI.Windows` | `DialogPro`, `Logger` | Dialogs, error report, logging |
| `EAUploader.Editor.API` | `CoreAPI`, `LanguageAPI`, `UploadAPI` | Public API |
| `EAUploader.Editor.Plugin.API` | `PluginAPI` | Public API (extension registration) |
| `EAUploader.Editor.Prefab.API` | `PrefabAPI`, `PrefabPreviewAPI`, `ShaderAPI`, `PrefabUtilityAPI`, `VRMAPI` | Public API (prefab operations) |
| `EAUploader.Editor.Resource.API` | `EAUResourceAPI`, `HelpButtonAPI`, `LinkAPI`, `MaterialIconAPI`, etc. | Public API (styles, UI components) |
| `EAUploader.Components` | `AvatarTagComponent`, `EAUploaderMeta`, `EAUploaderOutfit` | Runtime components |

`EAUploader.Editor.*.API` is the public API intended for use by external tools. It is a thin wrapper around the internal implementation (`EAUploader` and `EAUploader.CustomPrefabUtility`). See "API Reference" for details.

## Class Relationships
* * *
The relationships between the main classes are as follows.

```
EAUploaderCore ([InitializeOnLoad])
├── EAUploaderEditorManager ...... Registers and holds edit tools (EditorRegistration)
├── ShaderChecker ................ Checks prefab shaders
├── PrefabManager ................ List (PrefabInfo) and metadata of managed Prefab Variants
│   ├── ManagedPrefabs ........... Creating, duplicating, and locating Variants
│   ├── TagManager ............... Tags and tag groups
│   └── PrefabPreview ............ Generates and saves preview images
└── UI.EAUploader (main window)
    ├── UI.AvatarList.Main ....... Avatar List
    ├── UI.Setup.Main ............ Edit screen (edit tool list, item info)
    │   └── UI.Upload.UploadForm → AvatarUploader → VRChat SDK
    └── modal / toasts ........... Shared modal and notifications
```

The screens share `EAUploaderCore.selectedPrefabPath` (the path of the selected item).

See "[Editor](/en/for_dev/editor/)" for details on the processing flow.
