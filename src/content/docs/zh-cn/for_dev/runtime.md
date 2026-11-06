---
title: '运行时'
description: '关于EAUploader的运行时'
---
# 对开发感兴趣吗？
Project EAUploader一直在招募开发成员！
只是想聊聊也非常欢迎！
请访问本项目的Discord服务器。
[点击这里加入](https://discord.gg/yYFru7brra)
* * *
* * *
本页介绍`Runtime`文件夹中的`EAUploader`程序集。

本文档基于EAUploader v1.6.2编写。

## 概要
* * *
`EAUploader`程序集中包含添加到Avatar（预制体）上的组件。
组件会被保存到场景和预制体中，因此与仅限编辑器的`EAUploader.Editor`程序集分开，定义在面向所有平台的程序集中。

| 文件 | 类 | 内容 |
| ---- | ---- | ---- |
| `Runtime/Components/AvatarTagComponent.cs` | `EAUploader.Components.AvatarTagComponent` | 添加到Avatar上的组件的基类 |
| `Runtime/Components/EAUploaderMeta.cs` | `EAUploader.Components.EAUploaderMeta` | EAUploader用于管理预制体的信息 |
| `Runtime/Components/EAUploaderOutfit.cs` | `EAUploader.Components.EAUploaderOutfit` | 通过"Dress Up (Compatible Outfits)"穿戴的服装的信息 |

## AvatarTagComponent
* * *
EAUploader添加到Avatar上的组件的抽象基类。基于[Modular Avatar](https://github.com/bdunderscore/modular-avatar)的`AvatarTagComponent`（MIT License）。

* 安装了VRChat SDK - Avatars时（定义了`VRC_SDK3A`时），会实现`VRC.SDKBase.IEditorOnly`。这样该组件就不会成为VRChat SDK白名单检查的对象，并会在上传构建时从Avatar上移除。
* 带有`[ExecuteAlways]`和`[DefaultExecutionOrder(-9990)]`。

## EAUploaderMeta
* * *
EAUploader添加到管理用Prefab Variant根节点上的组件。由于带有`[DisallowMultipleComponent]`，一个预制体只能添加一个。

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

| 字段 | 内容 |
| ---- | ---- |
| `status` | 在列表中的显示状态。`Show`、`Hidden`、`Pinned` |
| `type` | 预制体的种类，根据组件判断（`VRC_AvatarDescriptor` → `VRChat`，`VRMMeta` → `VRM`，其他为`Other`） |
| `genre` | 面向用户的分类。`Avatar`、`Cloth`、`Accessory`、`Other` |
| `lastModifiedTicks` | EAUploader导入或更新物品的时间（UTC的Ticks）。为`0`时使用文件的时间戳 |
| `genreConfirmed` | 导入时是否已确定类型 |
| `memo` | 备注 |
| `tags` | 物品上添加的标签 |

`EAUploaderMeta`只添加在管理用Prefab（`Assets/EAUploader/Prefabs/`下）的根节点上，并且只读取根节点上的组件。

:::note
与v1.4及之前的版本相比，`PrefabStatus`的顺序发生了变化，并删除了`Other`。旧版本添加在原始Prefab上的`EAUploaderMeta`，会通过启动时的迁移转移到管理用Prefab Variant上。
:::

## EAUploaderOutfit
* * *
通过"Dress Up (Compatible Outfits)"为Avatar穿戴的服装根节点上添加的组件。

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

| 字段 | 内容 |
| ---- | ---- |
| `sourcePrefabGuid` | 穿戴的服装（管理用Prefab）的GUID |
| `mode` | 服装的设置方式。`ModularAvatar`（由Modular Avatar合并骨骼）、`BoneMerge`（上传时由EAUploader合并骨骼）、`AttachToBone`（安装到骨骼上） |

`BoneMerge`模式的服装，只会在上传的副本中，由VRChat SDK的构建预处理（`OutfitBuildHook`，`IVRCSDKPreprocessAvatarCallback`，顺序−12000，在NDMF之前）合并到Avatar的骨骼上。

## 与其他工具的共存
* * *
### AAO: Avatar Optimizer
AvatarOptimizer根据各组件引用或修改了哪些属性的信息来优化Avatar。
EAUploader在`Editor/Scripts/Coexistence/`中，使用AvatarOptimizer的API（`ComponentInformation`）注册了`EAUploaderMeta`和`EAUploaderOutfit`的信息。该代码仅在定义了`HAS_AAO`时启用。

添加或更改运行时组件时，也请确认与AvatarOptimizer等非破坏性工具的共存。
