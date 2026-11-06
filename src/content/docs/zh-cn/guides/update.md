---
title: '更新和删除EAUploader'
description: '更新EAUploader的方法以及从项目中删除的方法'
---

## 更新EAUploader
* * *
EAUploader可以通过VCC（或ALCOM）更新。

1. 在VCC的项目列表中，打开安装了EAUploader的项目的<span style="color: #00b0f0">Manage Project</span>。
2. 在Manage Packages中找到**Easy Avatar Uploader for VRChat**。
3. 如果有新版本，请按下更新按钮（↑），或从版本列表中选择最新版本。

更新后，请在Unity中打开项目。

:::note
从旧版本更新时，首次启动会询问是否将物品迁移到新的管理方式（Prefab Variant）。详情请参阅"[导入和管理Avatar](/zh-cn/guides/import/#eauploader的物品管理方式)"。
:::

:::caution
更新前请备份项目。备份方法请参阅"[新手指南](/zh-cn/guides/getting_started/#备份方法)"。
:::

当前安装的EAUploader版本可以在Avatar列表的"Settings"中确认。
更新内容会在[GitHub发布页面](https://github.com/eauploader/EAUploader-for-VRChat/releases)和官方Discord服务器上公布。

## 从项目中删除EAUploader
* * *
在VCC的Manage Packages中按下**Easy Avatar Uploader for VRChat**的⊖按钮，即可从项目中删除EAUploader。

删除EAUploader不会删除Avatar、着色器等数据。可以继续作为普通Unity编辑器使用项目。

### EAUploader创建的文件
EAUploader会在项目中创建以下文件和文件夹。

| 位置 | 内容 |
| ---- | ---- |
| `Assets/EAUploader/Prefabs/` | EAUploader管理的物品（管理用副本），以及编辑工具生成的纹理和材质 |
| `Assets/EAUploader/PrefabPreviews/` | 列表中显示的预览图 |
| `Assets/EAUploader/settings.json` | 语言等设置 |
| `Assets/EAUploader/tags.json` | 标签和标签分组 |
| `Assets/EAUploader/EditorsManage.json` | 已注册编辑工具的信息 |
| `Assets/EAUploader/PrefabManager.json` | 用于与旧版本兼容的文件 |
| `EAUploaderLog/`（项目文件夹下） | 日志文件 |
| `Assets/VRM/` | 从VRM导入的Avatar（仅在使用了VRM时） |

:::danger
`Assets/EAUploader/Prefabs/`中保存着在EAUploader中改过名或使用编辑工具改装过的Avatar。删除EAUploader后如果还要使用这些Avatar，请不要删除该文件夹。
另外，`Assets/VRM/`中保存着导入的VRM Avatar本身。如果正在使用VRM Avatar，请不要删除。
:::

### 显示Missing Script时
EAUploader为了管理物品，会在管理用副本上添加名为"EAUploaderMeta"的组件。通过"Dress Up (Compatible Outfits)"穿戴的服装上会添加名为"EAUploaderOutfit"的组件。
删除EAUploader后，这些组件可能会显示为"Missing Script"。这些组件在上传时会被移除，不会影响Avatar的外观。不需要时请在Inspector中删除。

:::caution
未使用Modular Avatar、通过"Dress Up (Compatible Outfits)"穿戴的服装，是由EAUploader在上传时合并到Avatar骨骼上的。删除EAUploader后将不再进行这种合并，服装将无法正确显示。
:::

## 出现问题时
* * *
EAUploader出现问题时，请先尝试重新启动EAUploader。如果仍无法解决，请在VCC中将EAUploader从项目中删除一次，然后重新添加。

详情请参阅"[常见问题与故障排除](/zh-cn/faq/troubleshooting/)"。
