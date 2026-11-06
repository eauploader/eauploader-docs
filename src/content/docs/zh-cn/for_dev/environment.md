---
title: '环境搭建'
description: 'EAUploader的开发环境搭建方法'
---
# 对开发感兴趣吗？
Project EAUploader一直在招募开发成员！
只是想聊聊也非常欢迎！
请访问本项目的Discord服务器。
[点击这里加入](https://discord.gg/yYFru7brra)
* * *
* * *
本类别中的页面是用于开发"EAUploader"本体的文档。
关于制作支持EAUploader的工具的参考资料，请参阅"面向工具开发者"类别。
* * *
## 所需环境
* Unity 2022.3（VRChat推荐的版本）
* VRChat Creator Companion（VCC）或ALCOM
* Git

EAUploader依赖VRChat SDK - Avatars 3.7.0及以上版本。使用VCC创建的Avatar项目中会自动添加该SDK。

## 搭建开发环境
可以按照以下步骤搭建开发环境。

1. 在VCC（VRChat Creator Companion）中创建一个空的Avatar项目。
   * 注意！：如果已经按照一般用户的方法在VCC中安装了EAUploader，请确保在Manage Packages中Easy Avatar Uploader for VRChat的状态为**Not Installed**。
2. 在创建的Unity项目的`Packages`文件夹下创建一个名为`tech.uslog.eauploader`的文件夹。
3. 在上一步创建的文件夹中，执行以下命令。
   * `git clone https://github.com/eauploader/EAUploader-for-VRChat.git .`
   * 注意！：请不要忘记最后的点号。如果忘记，`tech.uslog.eauploader`下会再创建一个文件夹，导致EAUploader无法正常工作。
4. 重新启动Unity项目。如果自动显示EAUploader窗口，则说明开发环境已经搭建完成。

在Unity扩展开发中，不需要特殊的构建步骤。修改源代码后，Unity会自动进行构建。欢迎来到Unity编辑器扩展的世界！

:::caution
EAUploader内部直接引用`Packages/tech.uslog.eauploader`路径。文件夹名称请务必设为`tech.uslog.eauploader`。
:::

## 联动功能的开发与测试
与VRM Converter for VRChat、AvatarOptimizer、Modular Avatar的联动功能，只有在项目中安装了相应的包时才会启用。
要开发或测试这些功能，请通过VCC等将目标包添加到项目中。

| 联动对象 | 包名 | 启用条件 | 符号 |
| ---- | ---- | ---- | ---- |
| VRM Converter for VRChat | `jp.pokemori.vrm-converter-for-vrchat` | 41.1.0及以上 | `HAS_VRM` |
| AAO: Avatar Optimizer | `com.anatawa12.avatar-optimizer` | 1.7.0及以上 | `HAS_AAO` |
| Modular Avatar | `nadena.dev.modular-avatar` | 1.9.0及以上 | `HAS_MA` |

这些符号定义在`EAUploader.Editor.asmdef`的Version Defines中，用于`#if HAS_VRM`这样的条件编译。
运行时的判断（`EAUploaderCore.HasVRM`、`EAUploaderCore.HasAAO`、`EAUploaderCore.HasMA`）基于`Packages/packages-lock.json`的内容。VRM的判断除了VRM Converter for VRChat之外，还需要UniVRM（`com.vrmc.univrm`）。

## 测试技巧
* EAUploader的初始化会在Unity启动时和脚本重新编译后执行。要重新执行初始化，请使用菜单中的"EAUploader"→"Reload"。
* 输出到Unity的Console的日志也会写入项目文件夹正下方的`EAUploaderLog`文件夹中。详情请参阅"[日志输出功能规范](/zh-cn/for_dev/logging/)"。
* 执行菜单中的"Window"→"Error Report"，会输出测试用的错误日志，可以用来确认错误报告的显示。

## 仓库中的规范文档
EAUploader仓库的`Docs/`文件夹中有用英语编写的规范文档（Architecture.md、PrefabManagement.md、UI.md、Upload.md、EditTools.md、PluginAPI.md、Conventions.md）。更改行为时，请在同一次更改中更新相应的规范文档。

编码规范（`Docs/Conventions.md`）的要点如下。

* 由于使用Unity 2022.3，项目以C# 9编译。请不要使用文件范围命名空间等C# 10及以上的功能。
* 每个文件只包含一个公开类型。
* 不要使用`?.`、`??`等对Unity对象进行null检查（会绕过Unity对已销毁对象的检查）。
* UI字符串用英语编写，并在`ja.json`和`ko.json`中添加翻译。用户输入的文本（名称、标签）请加上USS类`no-translate`。
* 绝不修改用户导入的原始Prefab，而是编辑管理用的Prefab Variant。生成的素材请保存在物品的文件夹中。

## 参与方式
参与本项目有以下两种方式。

* 加入[Discord](https://discord.gg/yYFru7brra)，经过商量后作为GitHub组织（eauploader）的成员负责任务。
* Fork本项目，通过Pull Request提交修复或新功能（无需事先声明）。

哪种方式都可以。但在开始工作之前，请务必在[这里](https://github.com/orgs/eauploader/projects/1)确认项目的日程和正在进行的任务。
