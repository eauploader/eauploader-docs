---
title: '简介'
description: '关于EAUploader文档'
---

## 关于本文档
本文档介绍EAUploader的使用方法，以及如何制作与EAUploader配合使用的工具。

本文档以EAUploader v1.6.2的内容为准。

## 什么是EAUploader？
EAUploader（Easy Avatar Uploader for VRChat）是一款简化Unity操作、让您能够"轻松"将Avatar上传到VRChat的工具。
它作为Unity的扩展编辑器运行，从Avatar和服装的管理、简单的改装到上传，都可以在一个窗口中完成。

### 本工具可以做什么
* **管理Avatar和服装** ― 导入以`.prefab`或`.unitypackage`形式发布的Avatar、服装和饰品，并以带预览图的卡片形式显示在列表中。可以使用标签、备注和置顶进行整理。
* **不破坏原始数据的管理方式** ― 不会直接修改导入的Avatar，而是创建EAUploader专用的副本（Prefab Variant）进行管理。
* **着色器检查** ― 当Avatar所需的着色器缺失时会提示您。
* **简单的改装** ― 使用内置的编辑工具，可以设置视点位置、调整形态键（体型和表情）、更改纹理颜色、穿戴对应服装。
* **转换VRM Avatar** ― 安装另一款工具"VRM Converter for VRChat"后，可以将VRM(0.x) Avatar转换为VRChat用Avatar。
* **优化Avatar** ― 安装另一款工具"AvatarOptimizer"后，可以在上传时自动优化。
* **上传Avatar** ― 设置名称、公开设置和缩略图后上传到VRChat。除PC外，还可以同时上传Quest（Android）版和iOS版。

### 本工具不能做什么
EAUploader面向的是已经为VRChat制作完成的Avatar或VRM。
使用内置的编辑工具，可以进行穿戴为该Avatar制作的服装（对应服装）、调整颜色和体型等简单的改装，但无法进行穿戴非对应服装、添加机关等正式的改装。这种情况下，请使用普通的Unity编辑器，或安装支持EAUploader的扩展功能。

:::tip
EAUploader的界面支持English、日本語、한국어，暂不支持中文。本文档中的按钮名称等均以英文界面为准。
:::

## 运行环境
| 项目 | 内容 |
| ---- | ---- |
| Unity | 2022.3 |
| VRChat SDK (Avatars) | 3.7.0 以上 |
| 项目管理软件 | VRChat Creator Companion(VCC) 或 ALCOM |

### 可配合使用的工具（可选）
| 工具 | 安装后可使用的功能 |
| ---- | ---- |
| [VRM Converter for VRChat](https://booth.pm/ja/items/1025226) | 导入和转换VRM(0.x) Avatar |
| [AAO: Avatar Optimizer](https://booth.pm/ja/items/4885109) | 上传时自动优化 |
| [Modular Avatar](https://modular-avatar.nadena.dev/) | 在"Dress Up (Compatible Outfits)"中不改变Avatar骨骼结构地设置服装 |

## 文档结构
| 类别 | 内容 |
| ---- | ---- |
| 指南 | 介绍EAUploader的安装方法和各界面的使用方法。初次使用的用户请从"[新手指南](/zh-cn/guides/getting_started/)"开始阅读。 |
| 常见问题 | 汇总了常见问题和错误的解决方法。 |
| 工具开发者 | 介绍如何制作支持EAUploader的扩展功能（插件）。 |
| 开发者 | 面向参与EAUploader本体开发的人员的资料。 |
| API参考 | EAUploader公开的API一览。 |

## 提出修改建议
如果本文档需要改进、补充或删除，请通过各页面左下角的"编辑页面"在GitHub上修改并提出建议。
