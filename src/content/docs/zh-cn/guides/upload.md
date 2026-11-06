---
title: '上传Avatar'
description: '上传的使用方法'
---

上传在编辑界面右侧打开的"Upload to VRChat"面板中进行。
通过编辑界面的<span style="color: #00b0f0">Go to upload</span>按钮，或Avatar列表卡片上的<span style="color: #00b0f0">Upload</span>按钮打开。按下<span style="color: #00b0f0">Back to edit</span>会关闭面板。

## 上传之前
* * *
要上传Avatar，需要满足以下条件。

* 物品的类型为"Avatar"
* Avatar拥有VRCAvatarDescriptor，且项目中已安装所需的着色器（编辑界面显示"Ready to upload"）
* 已登录VRChat账号
* VRChat的信任等级（Trust Rank）为**New User**以上

不满足条件时，会显示"This avatar can't be uploaded for the following reasons:"及原因。

:::note
信任等级不足时，可以通过在VRChat中度过时间、增加好友来提升等级。或者加入VRChat+（付费）可以立即提升等级。
:::

## 登录VRChat
* * *
未登录VRChat时，会显示<span style="color: #00b0f0">Login</span>按钮。
按下按钮会打开VRChat SDK的控制面板，请使用VRChat账号登录。

登录后，会显示已登录的用户名，以及是否允许上传Avatar。

## 设置在VRChat中的显示
* * *
| 项目 | 说明 |
| ---- | ---- |
| 缩略图 | Avatar的缩略图。默认使用EAUploader的预览图。通过<span style="color: #00b0f0">Change Thumbnail</span>选择图片文件（png、jpg）即可更改。更改时会询问"Do you also change the thumbnails that appear in the EAUploader avatar list?"，如果也想更改列表中的预览图，请选择<span style="color: #00b0f0">Yes</span>。缩略图旁边的按钮可以恢复为预览图。 |
| Name | 在VRChat中显示的Avatar名称。**此项为必填。** |
| Description | Avatar的说明。用作自己的备注。不填写也可以上传。 |
| Visibility | Private：仅自己可以使用。<br />Public：公开给所有人使用。 |

:::danger
在网上发布或销售的Avatar，原则上禁止设为公开（Public）。
如果不是自己制作的Avatar，请不要以公开方式上传。
:::

### Content Warnings（内容警告）
请根据Avatar的内容设置标签。可以从"Sexually Suggestive"（性暗示）、"Adult Language and Themes"（成人语言和主题）、"Graphic Violence"（暴力画面）、"Excessive Gore"（过度血腥）、"Extreme Horror"（极端恐怖）中选择。
对相应的Avatar不添加标签就使用，可能构成违规。

## 已上传过的Avatar
* * *
对于已经上传到VRChat的Avatar，会读取VRChat上的信息并填入各项目中。另外，还会以"VRChat Information"显示作者、上传日期和更新次数。

### 只更新Avatar信息
更改名称、说明、公开设置、内容警告或缩略图后，会显示<span style="color: #00b0f0">Save</span>和<span style="color: #00b0f0">Discard</span>按钮。

* <span style="color: #00b0f0">Save</span> ― 不重新上传Avatar，只更新VRChat上的Avatar信息。
* <span style="color: #00b0f0">Discard</span> ― 取消更改，恢复为VRChat上的信息。

### Blueprint
Blueprint（Blueprint ID）是VRChat为Avatar分配的唯一ID。上传拥有相同Blueprint ID的Avatar时，会覆盖（更新）VRChat上的Avatar。

* <span style="color: #00b0f0">Copy</span> ― 将Blueprint ID复制到剪贴板。
* <span style="color: #00b0f0">Unlink from VRChat</span> ― 为Avatar分配新的ID。下次上传时，不会覆盖VRChat上已有的Avatar，而是作为另一个Avatar上传。

:::danger
请勿将Blueprint ID公开给他人。使用该ID可以更新或删除VRChat上的Avatar，公开给他人可能导致Avatar数据被盗。
:::

## 选择平台
* * *
在"Platform"中选择上传目标。

| 平台 | 说明 |
| ---- | ---- |
| Windows | PC用Avatar。始终会上传（Always uploaded）。 |
| Quest (Android) | 开启后，会同时上传Quest一体机和智能手机用的Avatar。Unity中需要安装Android Build Support模块。 |
| iOS | 开启后，会同时上传iOS用的Avatar。仅在允许上传iOS的账号中显示。Unity中需要安装iOS Build Support模块。 |

选择多个平台时，上传过程中会切换构建目标，完成后恢复为Windows。可能需要一些时间。

在未安装所需模块的状态下开启时，会显示引导下载模块的消息。请在Unity Hub的"安装"中为正在使用的Unity版本添加模块。

:::caution
作为Quest（Android）用上传的Avatar必须是支持Quest的Avatar。请向Avatar的发布方确认是否支持Quest。
:::

## Avatar性能
* * *
VRChat会根据Avatar的负载给出5个等级的评价。玩家可以根据该评价隐藏Avatar，负载较高的Avatar可能不会显示给部分玩家。

从轻到重依次评价为**Excellent - Good - Medium - Poor - Very Poor**。
会显示综合评价，按下<span style="color: #00b0f0">Show details</span>可以查看多边形数、材质槽、PhysBone组件等各项目的评价。

VRChat建议优化/轻量化到Good，但PC用Avatar即使是Very Poor也可以正常上传。

:::note
EAUploader中显示的性能是按PC（Windows）标准计算的。Android用Avatar有各种限制，超出限制的Avatar不会显示给Android（Quest / 智能手机）用户。
:::

## Avatar优化
* * *
在项目中安装另一款工具"AAO: Avatar Optimizer（by anatawa12）"后，可以使用<span style="color: #00b0f0">Automatic avatar optimizing (AvatarOptimizer)</span>。

开启后，会为Avatar添加AvatarOptimizer的自动优化组件"Trace And Optimize"，上传时会在不改变Avatar外观的情况下进行非破坏性优化。关闭则删除该组件。

* 优化结果在构建之前无法得知。Avatar性能中不会反映优化后的结果。
* 无法在EAUploader中更改优化设置。要更改设置或使用其他优化功能，需要在Unity编辑器中进行。
* 在未安装AvatarOptimizer的状态下开启时，会显示引导安装的消息。AvatarOptimizer可以从[Booth](https://booth.pm/ja/items/4885109)或VCC安装。安装后请执行菜单中的"EAUploader"→"Reload"。

## 测试
* * *
按下面板下方的<span style="color: #00b0f0">Test</span>，会在本地（自己的PC中）构建Avatar，使其可以在VRChat中使用。无需上传即可确认Avatar的动作。

测试构建的Avatar不会上传到VRChat，因此其他玩家看不到该Avatar。
测试构建的Avatar可以在VRChat应用的Avatar菜单中的"Other"里选择。

:::note
仅当Unity的构建目标为Windows时才能使用测试。
:::

## 上传
* * *
1. 输入Avatar的名称。
2. 勾选"The information provided above is accurate and I have the rights to upload this content to VRChat"。
3. 按下<span style="color: #00b0f0">Upload</span>按钮。

上传过程中会显示进度。也可以通过<span style="color: #00b0f0">Cancel upload</span>中止。上传完成的Avatar可以在VRChat中使用。

:::note
上传时会在场景中临时创建Avatar的副本。Modular Avatar、AvatarOptimizer等非破坏性工具的处理是针对该副本进行的，因此EAUploader的管理用副本不会被更改。
:::

### 上传失败时
上传失败时，"Upload Failed"消息中会显示原因。Avatar的文件大小超过VRChat上限等情况下，请对Avatar进行轻量化。
另外，发生错误时会显示"Error Report"（错误报告）。详情请参阅"[常见问题与故障排除](/zh-cn/faq/troubleshooting/)"。
