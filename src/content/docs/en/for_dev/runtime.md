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

This document is based on EAUploader v1.4.6.

## Overview
* * *
The `EAUploader` assembly contains components that are added to avatars (prefabs).
Because components are saved in scenes and prefabs, they are defined in an assembly for all platforms, separate from the editor-only `EAUploader.Editor` assembly.

| File | Class | Contents |
| ---- | ---- | ---- |
| `Runtime/Components/AvatarTagComponent.cs` | `EAUploader.Components.AvatarTagComponent` | Base class for components added to avatars |
| `Runtime/Components/EAUploaderMeta.cs` | `EAUploader.Components.EAUploaderMeta` | Information EAUploader uses to manage prefabs |

## AvatarTagComponent
* * *
An abstract base class for components that EAUploader adds to avatars. It is based on `AvatarTagComponent` from [Modular Avatar](https://github.com/bdunderscore/modular-avatar) (MIT License).

* When VRChat SDK - Avatars is installed (when `VRC_SDK3A` is defined), it implements `VRC.SDKBase.IEditorOnly`. This excludes the component from the VRChat SDK's allowlist check, and it is removed from the avatar when building for upload.
* It has `[ExecuteAlways]` and `[DefaultExecutionOrder(-9990)]`.

## EAUploaderMeta
* * *
A component that EAUploader adds to prefabs. Because of `[DisallowMultipleComponent]`, only one can be added to a prefab.

```csharp
namespace EAUploader.Components
{
    [DisallowMultipleComponent]
    public class EAUploaderMeta : AvatarTagComponent
    {
        public enum PrefabStatus { Pinned, Show, Hidden, Other }
        public enum PrefabType { VRChat, VRM, Other }

        public PrefabStatus status;
        public PrefabType type;
    }
}
```

| Field | Contents |
| ---- | ---- |
| `type` | Type of prefab. `VRChat` (avatar for VRChat), `VRM` (VRM avatar or avatar converted from VRM), `Other` |
| `status` | Display state of the prefab. `Pinned`, `Show`, `Hidden`, `Other` |

### When It Is Added
* When a prefab is imported (`PrefabManager.ImportPrefab`). `type` is set to the type determined from the prefab's contents.
* When an avatar determined as "Ready to upload" in the Setup tab does not have the component. `type` is set to `VRChat`.
* When a VRM avatar is converted to a VRChat avatar. `type` is set to `VRM`. In the Setup tab, avatars whose `type` is `VRM` show a note that the viewpoint position may need to be adjusted.

:::note
As of v1.4.6, the display state in the list (pinned / hidden) is managed in `Assets/EAUploader/PrefabManager.json`, and `EAUploaderMeta.status` is not used.
:::

## Coexistence with Other Tools
* * *
### AAO: Avatar Optimizer
AvatarOptimizer optimizes avatars based on information about which properties each component references or modifies.
In `Editor/Scripts/Coexistence/EAUploaderMetaInformationforAAO.cs`, EAUploader registers information about `EAUploaderMeta` using AvatarOptimizer's API (`ComponentInformation`). This code is enabled only when `HAS_AAO` is defined.

When adding or changing runtime components, also check coexistence with non-destructive tools such as AvatarOptimizer.
