---
title: '导入和管理Avatar'
description: 'Avatar列表界面的使用方法'
---

**Avatar列表**（Avatar List）是打开EAUploader时最先显示的界面。在这里导入Avatar、服装和饰品，在列表中进行管理，并更改工具的设置。

## EAUploader的物品管理方式
* * *
EAUploader**不会直接修改**您导入的Avatar或服装（Prefab）。
导入时，EAUploader会以该Prefab为基础，在以下文件夹中创建EAUploader专用的副本（Prefab Variant），之后只对该副本进行编辑和上传。

```
Assets/EAUploader/Prefabs/<物品名称>/<物品名称>.prefab
```

因此，即使在EAUploader中更改名称或使用编辑工具进行改装，从Avatar发布方获得的原始数据也会保持不变。

:::note
在使用过旧版本EAUploader的项目中，更新后首次启动时会显示"EAUploader now manages prefabs as variants in the following folder"。按下<span style="color: #00b0f0">Migrate</span>后，原先在列表中的物品会迁移到新的管理方式。按下<span style="color: #00b0f0">Later</span>后，下次启动时会再次询问。
:::

## 导入物品
* * *
### 支持的文件格式
| 格式 | 说明 |
| ---- | ---- |
| `.unitypackage` | 包。Avatar本体、着色器、服装等会打包在一起发布。其中包含的所有Prefab都会添加到列表中。 |
| `.prefab` | 预制体。可以选择本项目`Assets`文件夹中的文件。 |
| `.vrm` | VRM Avatar（仅限ver. 0.x）。需要VRM Converter for VRChat。详情请参阅"[使用VRM Avatar](/zh-cn/guides/vrm/)"。 |

:::caution
EAUploader可以上传的是**为VRChat制作的Avatar**。请准备作为VRChat用途销售或发布的Avatar。
:::

### 从导入窗口添加
按下Avatar列表上方的<span style="color: #00b0f0">Import</span>按钮，会打开导入窗口。

| 按钮 | 内容 |
| ---- | ---- |
| Import | 选择并导入`.prefab`或`.unitypackage`。 |
| Import from folder | 一次性导入所选文件夹（包括子文件夹）中的`.prefab`和`.unitypackage`。导入前会显示目标文件列表。 |
| Import VRM | 导入`.vrm`文件。仅在安装了VRM Converter for VRChat时可用。 |
| Import Shaders | 导入包含着色器的`.unitypackage`。 |
| Show existing shaders | 显示项目中已安装的着色器列表。部分VRChat不支持的着色器不会显示。 |

选择`.unitypackage`时，不会显示Unity的导入确认窗口，包中的所有内容都会添加到项目中。

:::note
选择`.prefab`时，请选择本项目`Assets`文件夹中的文件。项目外的`.prefab`或EAUploader内部文件夹（`Assets/EAUploader`）中的`.prefab`无法选择。要从其他项目导入，请使用`.unitypackage`。
想把项目中已有的Avatar添加到列表时，也请用此方法选择。
:::

### 通过拖放添加
也可以从资源管理器将文件拖放到Avatar列表中进行导入。
除`.unitypackage`、`.prefab`外，安装了VRM Converter for VRChat时还可以拖放`.vrm`。

### 导入后会进行的处理
* **着色器检查** ― 如果Avatar所设置的着色器不在项目中，会显示"Shader Issues Found"消息。此时请参阅"[找不到着色器的错误](/zh-cn/faq/missing_shader/)"安装着色器。
* **类型设置** ― VRChat用Avatar的类型会自动设为"Avatar"。导入Avatar以外的Prefab（服装、饰品等）时，会显示"Outfit Settings"窗口。请从"Cloth"（服装）、"Accessory"（饰品）、"Other"（其他）中为每一项选择类型，然后按<span style="color: #00b0f0">Save</span>。取消勾选的项目不会被设置。类型之后也可以在编辑界面中更改。
* **生成预览图** ― 生成用于在列表中显示的预览图。

## 物品列表
* * *
### 卡片说明
物品以卡片形式显示。卡片上显示预览图、名称、最后更新日期以及附加的标签。置顶或隐藏的物品会显示相应的标记。

无法上传的物品会显示以下内容。

| 显示 | 含义 |
| ---- | ---- |
| Needs conversion | 这是VRM Avatar。上传前需要转换为VRChat用Avatar。 |
| Can't be uploaded | 不是VRChat用Avatar（没有VRCAvatarDescriptor），或者项目中缺少所需的着色器。服装和饰品也会显示此项。 |

### 卡片操作
* 点击卡片会打开该物品的**编辑界面**。
* 将鼠标悬停在卡片上会显示<span style="color: #00b0f0">Edit</span>（编辑）、<span style="color: #00b0f0">Upload</span>（上传，仅限类型为"Avatar"的物品）、<span style="color: #00b0f0">Delete</span>（删除）按钮。
* 右键点击卡片会显示以下菜单。

| 菜单 | 内容 |
| ---- | ---- |
| Pin / Unpin | 置顶的物品无论排序方式如何，都会显示在列表最前面。 |
| Hide / Show | 隐藏的物品通常不会显示在列表中。 |
| Show in Project | 在Unity的Project窗口中显示该Prefab。 |
| Delete | 删除物品。 |

### 搜索、筛选、排序
| 功能 | 内容 |
| ---- | ---- |
| 搜索 | 在"Search by name or tag"中输入后，只显示名称或标签中包含该文字的物品。输入时即时筛选。 |
| 类别 | 可以从"Avatar"、"Cloth"、"Items and Others"中选择要显示的类型。可以多选，未选择任何项时显示"All"（全部）。 |
| 排序 | 可以从"Last Modified Descending"（最后更新从新到旧）、"Last Modified Ascending"（从旧到新）、"Name Descending"（名称Z-A）、"Name Ascending"（名称A-Z）中选择。置顶的物品始终显示在最前面。 |
| Filter by tag | 只显示**同时拥有**所有所选标签的物品。按钮上会显示已选标签的数量。 |
| Show hidden items | 开启后，隐藏的物品也会显示在列表中。 |
| 卡片大小 | 可以用滑块更改卡片大小。大小会被保存。 |

## 管理标签
* * *
使用标签可以自由地对Avatar和服装进行分类（例如"收藏"、"冬装"、"已改装"）。
为物品添加或移除标签，请在编辑界面的"Item Info"（物品信息）中进行。（[编辑界面](/zh-cn/guides/setup/#标签)）

按下<span style="color: #00b0f0">Tag Settings</span>按钮，可以管理整个项目的标签。

* **Add tag** ― 输入新的标签名称并添加。添加时也可以选择分组。
* **Add group** ― 创建用于整理标签的分组。一个标签只能属于一个分组。
* **删除** ― 删除标签后，所有物品上的该标签都会被移除。删除分组时，分组中的标签会保留。

:::note
标签名和分组名最多32个字符。不区分大小写，仅大小写不同的标签会被视为同一个标签。
:::

## 删除物品
* * *
可以通过卡片的<span style="color: #00b0f0">Delete</span>按钮、右键菜单或编辑界面的<span style="color: #00b0f0">Delete</span>删除物品。

选择删除后会打开确认窗口，并搜索将一并删除的相关资源。
除EAUploader的管理用副本外，**导入的原始Prefab以及仅被该物品使用的材质和纹理也会一并删除**。被其他物品或场景使用的资源不会删除，会被保留。
打开"Deletion details"可以查看实际将被删除的文件列表。

:::danger
删除的物品和资源也会从Unity项目中删除，且无法恢复。
删除前请在详细信息中确认将被删除的内容。
:::

## 设置
* * *
通过Avatar列表上方的<span style="color: #00b0f0">Settings</span>按钮，可以更改以下设置。

| 项目 | 内容 |
| ---- | ---- |
| Language | 可以从"English"、"日本語"、"한국어"中选择EAUploader的显示语言（暂不支持中文）。更改后会显示确认消息，按下<span style="color: #00b0f0">Yes</span>后会重新加载VRChat SDK并切换显示。 |
| Theme | 可以从"Light"、"Dark"、"Pastel"中选择配色。主题是实验性功能。 |
| Show error report window | 关闭后，发生错误时不会自动显示错误报告。 |
| Version | 已安装的EAUploader版本。咨询时请一并告知版本。 |
| Open log report | 打开保存EAUploader日志文件的文件夹（项目文件夹下的`EAUploaderLog`）。报告错误时，附上日志文件有助于调查原因。 |

:::note
旧版本中的"Send feedback"功能和日志自动发送功能目前已停止。意见和错误报告请通过[Discord](https://discord.gg/yYFru7brra)或[GitHub](https://github.com/eauploader/EAUploader-for-VRChat/issues)提交。
:::

## 退出Unity
* * *
按下Avatar列表上方的<span style="color: #00b0f0">Exit Unity</span>按钮，确认后将退出Unity。
