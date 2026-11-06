---
title: 'Runtime'
description: 'About the EAUploader runtime'
---
# Interested in Development?
Project EAUploader is always looking for development members!
Even if you just want to talk to us!
Please visit our project's Discord server.
[Join here](https://discord.gg/yYFru7brra)
* * *
* * *
This page explains the `EAUploader` assembly in the `Runtime` folder.

This document is based on EAUploader v1.6.2.

## Overview
* * *
The `EAUploader` assembly contains components that are added to avatars (prefabs).
Because components are saved in scenes and prefabs, they are defined in an assembly for all platforms, separate from the editor-only `EAUploader.Editor` assembly.

| File | Class | Contents |
| ---- | ---- | ---- |
| `Runtime/Components/AvatarTagComponent.cs` | `EAUploader.Components.AvatarTagComponent` | Base class for components added to avatars |
| `Runtime/Components/EAUploaderMeta.cs` | `EAUploader.Components.EAUploaderMeta` | Information EAUploader uses to manage prefabs |
| `Runtime/Components/EAUploaderOutfit.cs` | `EAUploader.Components.EAUploaderOutfit` | Information about outfits put on with Dress Up (Compatible Outfits) |

## AvatarTagComponent
* * *
An abstract base class for components that EAUploader adds to avatars. It is based on `AvatarTagComponent` from [Modular Avatar](https://github.com/bdunderscore/modular-avatar) (MIT License).

* When VRChat SDK - Avatars is installed (when `VRC_SDK3A` is defined), it implements `VRC.SDKBase.IEditorOnly`. This excludes the component from the VRChat SDK's allowlist check, and it is removed from the avatar when building for upload.
* It has `[ExecuteAlways]` and `[DefaultExecutionOrder(-9990)]`.

## EAUploaderMeta
* * *
A component that EAUploader adds to the root of a managed Prefab Variant. Because of `[DisallowMultipleComponent]`, only one can be added to a prefab.

```csharp
namespace EAUploader.Components
{
    [DisallowMultipleComponent]
    public class EAUploaderMeta : AvatarTagComponent
    {
        public enum PrefabStatus { Show , Hidden, Pinned }
        public enum PrefabType { VRChat, VRM, Other }
        public enum PrefabGenre { Avatar, Cloth, Accessory, Other }

        public PrefabStatus status;
        public PrefabType type;
        public PrefabGenre genre;

        public long lastModifiedTicks;

        public bool genreConfirmed;

        [TextArea(3, 10)]
        public string memo;

        public List<string> tags = new List<string>();
    }
}
```

| Field | Contents |
| ---- | ---- |
| `status` | Display state in the list. `Show`, `Hidden`, `Pinned` |
| `type` | Type of prefab, detected from components (`VRC_AvatarDescriptor` → `VRChat`, `VRMMeta` → `VRM`, otherwise `Other`) |
| `genre` | User-facing category. `Avatar`, `Cloth`, `Accessory`, `Other` |
| `lastModifiedTicks` | Time EAUploader imported or refreshed the item (UTC ticks). `0` falls back to the file timestamp |
| `genreConfirmed` | Whether the genre was decided at import |
| `memo` | Memo |
| `tags` | Tags attached to the item |

`EAUploaderMeta` is added only to the root of managed Prefabs (under `Assets/EAUploader/Prefabs/`), and only the one on the root is read.

:::note
Compared to v1.4 and earlier, the order of `PrefabStatus` has changed and `Other` has been removed. `EAUploaderMeta` that older versions attached to source Prefabs is moved to managed Prefab Variants by the migration on startup.
:::

## EAUploaderOutfit
* * *
A component added to the root of outfits put on an avatar with Dress Up (Compatible Outfits).

```csharp
namespace EAUploader.Components
{
    [DisallowMultipleComponent]
    public class EAUploaderOutfit : AvatarTagComponent
    {
        public enum SetupMode { ModularAvatar, BoneMerge, AttachToBone }

        public string sourcePrefabGuid;
        public SetupMode mode;
    }
}
```

| Field | Contents |
| ---- | ---- |
| `sourcePrefabGuid` | GUID of the outfit (managed Prefab) that was put on |
| `mode` | How the outfit is set up. `ModularAvatar` (bones merged by Modular Avatar), `BoneMerge` (bones merged by EAUploader at upload time), `AttachToBone` (attached to a bone) |

Outfits in `BoneMerge` mode are merged into the avatar's bones only in the copy being uploaded, by the VRChat SDK build preprocessing (`OutfitBuildHook`, `IVRCSDKPreprocessAvatarCallback`, order −12000, before NDMF).

## Coexistence with Other Tools
* * *
### AAO: Avatar Optimizer
AvatarOptimizer optimizes avatars based on information about which properties each component references or modifies.
In `Editor/Scripts/Coexistence/`, EAUploader registers information about `EAUploaderMeta` and `EAUploaderOutfit` using AvatarOptimizer's API (`ComponentInformation`). This code is enabled only when `HAS_AAO` is defined.

When adding or changing runtime components, also check coexistence with non-destructive tools such as AvatarOptimizer.
