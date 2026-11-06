---
title: '编辑界面'
description: '编辑界面的使用方法'
---

在**编辑界面**中，可以一边以3D方式查看所选物品，一边编辑名称、标签等信息，或使用编辑工具进行改装。
在Avatar列表中点击卡片，或按下卡片的<span style="color: #00b0f0">Edit</span>按钮即可打开。

## 界面构成
* * *
物品的3D预览会铺满整个界面，上面叠加着以下面板。

| 位置 | 内容 |
| ---- | ---- |
| 上方 | <span style="color: #00b0f0">Back to list</span>（返回列表）按钮，当前打开物品的名称和类型 |
| 左侧"Edit tool" | 物品状态和编辑工具列表 |
| 右侧"Item Info" | 缩略图、名称、类型、标签、备注等信息 |

左右两侧的面板可以通过面板右上角的按钮折叠。折叠的面板可以通过界面边缘显示的按钮重新打开。

## 3D预览
* * *
| 操作 | 动作 |
| ---- | ---- |
| 按住左键移动 | 旋转 |
| 按住右键移动 | 平移 |
| 滚轮上下 | 缩放 |
| 重置按钮 | 重置视图 |

## 确认物品状态
* * *
"Edit tool"的上方会显示物品的状态。

| 显示 | 含义及处理方法 |
| ---- | ---- |
| ✅ Ready to upload | 可以直接上传。 |
| No VRCAvatarDescriptor | 不是VRChat用Avatar。如果是服装或饰品则没有问题。如果是为VRChat发布的Avatar，请确认是否选择了正确的Prefab。 |
| No Shader | 项目中缺少物品所需的着色器。请参阅"[找不到着色器的错误](/zh-cn/faq/missing_shader/)"。 |
| VRM Avatar needs to convert to VRChat Avatar | 这是VRM Avatar。请使用<span style="color: #00b0f0">Convert to VRChat Avatar</span>按钮进行转换。详情请参阅"[使用VRM Avatar](/zh-cn/guides/vrm/)"。 |
| This avatar is a converted VRM, Viewpoint Position may need to be adjusted. | 这是从VRM转换的Avatar，可能需要调整视点位置。请使用"[视点位置编辑器](/zh-cn/guides/edit_tools/#视点位置编辑器viewpoint-position-editor)"确认视点位置。 |

## 使用编辑工具
* * *
"Edit tool"中会列出用于调整物品的工具。按下带有工具名称的按钮，工具会在EAUploader窗口内打开。

按下按钮右侧的▼，会显示工具的说明、版本和作者。对所选物品无法使用的工具，其按钮将无法按下，并会显示无法使用的原因。

EAUploader内置了以下编辑工具。使用方法请参阅"[编辑工具](/zh-cn/guides/edit_tools/)"。

| 工具 | 内容 |
| ---- | ---- |
| Viewpoint Position Editor | 设置Avatar的视点位置。 |
| Shape Key Editor | 调整体型、表情等形态键的默认值。 |
| Texture Editor | 更改纹理颜色，或替换为其他图片。 |
| Dress Up (Compatible Outfits) | 为Avatar穿上为其制作的服装和饰品。 |

安装支持EAUploader的扩展功能后，工具会添加到这里。

## 编辑物品信息
* * *
在右侧的"Item Info"中可以编辑物品信息。更改会立即保存。

### 缩略图
物品的缩略图（列表中显示的预览图）。

* 🔄按钮（Regenerate Preview）― 根据物品当前的外观重新生成预览图。使用编辑工具改变外观后等情况下请使用。
* <span style="color: #00b0f0">Change Thumbnail</span> ― 选择图片文件（png、jpg）替换缩略图。

### Name（名称）
物品的名称。输入框失去焦点或按下Enter键时生效。
更改名称会更改EAUploader管理用副本的文件名。导入的原始Prefab的名称不会改变。

### Genre（类型）
从"Avatar"、"Cloth"（服装）、"Accessory"（饰品）、"Other"（其他）中选择。只有类型为"Avatar"的物品才能上传。
类型用于Avatar列表的类别筛选，以及"Dress Up (Compatible Outfits)"中可穿戴服装的列表。

### 标签
在输入框中输入时，会显示已有标签的候选。选择候选或按Enter键即可添加标签。对于尚不存在的标签名，可以通过<span style="color: #00b0f0">Create new tag</span>添加。
按下已添加标签上的×，可以从该物品上移除标签。

标签名最多32个字符。整个项目的标签和分组可以在Avatar列表的<span style="color: #00b0f0">Tag Settings</span>中管理。

### Memo（备注）
可以自由留下备注。输入框失去焦点时保存。

### Pin（置顶）与Hide from list（在列表中隐藏）
* **Pin** ― 开启后，会显示在Avatar列表的最前面。
* **Hide from list** ― 开启后，不会显示在Avatar列表中（开启"Show hidden items"即可查看）。

置顶和隐藏不能同时设置。

### 详细信息
显示最后更新日期、Avatar高度（视点高度）、Blueprint ID、保存位置（EAUploader管理用副本的路径）。
Blueprint ID以隐藏形式显示，可以通过👁按钮切换显示。Blueprint ID和保存位置可以通过复制按钮复制到剪贴板。

:::danger
请勿将Blueprint ID公开给他人。详情请参阅"[上传Avatar](/zh-cn/guides/upload/#blueprint)"。
:::

### Duplicate（复制）与Delete（删除）
* <span style="color: #00b0f0">Duplicate</span> ― 再创建一个物品，并打开复制出的物品。想保留改装前的状态，或想对同一个Avatar进行不同的改装时请使用。复制出的物品同样是基于导入的原始Prefab的管理用副本，不会影响原始数据。
* <span style="color: #00b0f0">Delete</span> ― 删除物品。详情请参阅"[删除物品](/zh-cn/guides/import/#删除物品)"。

## 前往上传
* * *
对于类型为"Avatar"的物品，物品信息的下方会显示<span style="color: #00b0f0">Go to upload</span>按钮。按下后，界面右侧会打开上传面板。
使用方法请参阅"[上传Avatar](/zh-cn/guides/upload/)"。
