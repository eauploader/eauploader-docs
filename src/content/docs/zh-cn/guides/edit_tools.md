---
title: '编辑工具'
description: 'EAUploader内置编辑工具的使用方法'
---

编辑工具从编辑界面左侧的"Edit tool"打开。工具会叠加显示在EAUploader窗口内，并对编辑界面中所选的物品生效。

## 通用操作
* * *
除视点位置编辑器外，其他工具都使用以下通用界面。

| 位置 | 内容 |
| ---- | ---- |
| 上方 | 工具名称、物品名称、有更改时显示"Unsaved changes"、右上角的<span style="color: #00b0f0">Back</span>（返回）按钮 |
| 左侧 | 各工具的设置 |
| 中间 | 反映更改的预览（操作与编辑界面的3D预览相同） |
| 下方 | <span style="color: #00b0f0">Revert</span>（还原）、<span style="color: #00b0f0">Apply</span>（应用）按钮 |

* 在按下<span style="color: #00b0f0">Apply</span>之前，更改不会被保存。按下<span style="color: #00b0f0">Revert</span>会恢复到上次保存的状态。
* 未保存就按下<span style="color: #00b0f0">Back</span>时，会显示询问是否保存的消息。
* 更改会保存到EAUploader的管理用副本中。导入的原始Avatar和服装、原始纹理和材质都不会被更改。
* 工具生成的纹理和材质会保存在物品的文件夹（`Assets/EAUploader/Prefabs/<物品名称>/`）中。
* 保存后，物品的预览图也会自动重新生成。

## 视点位置编辑器（Viewpoint Position Editor）
* * *
设置Avatar的视点位置（在VRChat中自己视线所在的位置）。可用于拥有VRCAvatarDescriptor的Avatar。

1. 移动左侧的纵向和横向滑杆来更改视点位置。正在移动的位置显示为<span style="color: red">红点</span>，已应用的位置显示为<span style="color: green">绿点</span>。
2. 按下上方的🔄按钮，可以反转观察Avatar的方向。
3. 右侧的"Actual View"是从视点位置看到的预览。如果能看到Avatar脸部的内侧，请移动到可以清楚看到背景的位置。可以在"1:1 (VR)"和"16:9 (PC)"之间切换显示比例。
4. 确定位置后，请按下<span style="color: #00b0f0">Apply</span>按钮。

:::note
视点位置编辑器没有"未保存的更改"确认。不按<span style="color: #00b0f0">Apply</span>就按下<span style="color: #00b0f0">Back</span>，移动的位置会被丢弃。
:::

## 形态键编辑（Shape Key Editor）
* * *
调整并保存体型、脸型等形态键（BlendShape）的默认值。也可以用于缩小被服装遮住的身体部位。可用于拥有带形态键网格的物品。

| 项目 | 内容 |
| ---- | ---- |
| Mesh | 选择要编辑的网格。默认选择用于口型同步的网格（没有时选择形态键最多的网格）。 |
| Focus on face / Whole body | 将预览相机对准脸部或全身。 |
| Search shape keys | 按名称筛选形态键。 |
| Show changed only | 只显示与保存值不同的形态键。 |
| 形态键列表 | 用滑块或数值更改数值。行右侧的按钮可以将该行恢复为保存的值。 |
| Reset this mesh / Set all to 0 | 将所选网格的形态键全部恢复，或全部设为0。 |

带有"Lip sync"（口型同步）、"Eyelids"（眼睑）标记的形态键在VRChat中用于嘴部动作和眨眼。更改其默认值可能导致游戏中显示不正确，请注意。

## 纹理编辑（Texture Editor）
* * *
更改纹理颜色，或替换为其他图片。可用于拥有带纹理材质的物品。

1. 在"Materials"中选择要编辑的材质。由本工具创建的材质会标记"Edited"，有尚未应用的更改的材质会标记"Changed"。
2. 选择要编辑的纹理类型（主纹理、阴影色、自发光等）。
3. 在"Adjust colors"中调整**Hue**（色相）、**Saturation**（饱和度）、**Brightness**（亮度）、**Contrast**（对比度）、**Tint**（叠加的颜色）。按下<span style="color: #00b0f0">Replace image...</span>，也可以以图片文件（png、jpg）为基础。
4. 按下<span style="color: #00b0f0">Apply</span>后，会生成调整后的纹理以及使用该纹理的材质副本，并设置到物品上。

* 原始纹理和材质不会被更改。编辑后的副本会在应用时保存到物品的文件夹中。
* 再次编辑已编辑的材质时，可以从上次的调整值继续编辑。反复调整也不会降低画质。
* <span style="color: #00b0f0">Reset adjustments</span>可以将调整值恢复为初始值。按下<span style="color: #00b0f0">Restore original material</span>会恢复为编辑前的材质。

## 换装（Dress Up (Compatible Outfits)）
* * *
为Avatar穿上为该Avatar制作的服装（对应服装）和饰品。可用于类型为"Avatar"且拥有VRCAvatarDescriptor的物品。
要穿戴的服装和饰品，请预先导入到Avatar列表中，并将类型设为"Cloth"或"Accessory"。

:::caution
本工具适用于为所穿戴Avatar制作的服装（相同骨骼结构、相同姿势）。无法穿戴为其他Avatar制作的服装。
:::

### 界面说明
| 项目 | 内容 |
| ---- | ---- |
| 状态 | 显示是否安装了Modular Avatar，以及服装骨骼的处理方式。 |
| Wearing | 已穿戴服装的列表。可以切换每件服装的显示/隐藏，或通过<span style="color: #00b0f0">Take off</span>脱下服装。 |
| Avatar parts | Avatar原本自带的服装等部件。请关闭不想与新服装一起显示的部件。<span style="color: #00b0f0">Restore original visibility</span>可以恢复原来的状态。 |
| Add outfit | 显示类型为"Cloth"、"Accessory"的物品。按名称或标签搜索，点击即可穿戴。 |

### 穿戴服装
* 带有骨骼结构的服装会按照Avatar的骨骼进行穿戴。
  * **安装了Modular Avatar时** ― 通过Modular Avatar的功能设置服装，不会改变Avatar的骨骼结构。
  * **未安装Modular Avatar时** ― 服装的骨骼只会在上传时生成的副本中合并到Avatar的骨骼上。Avatar本身不会被更改。
* 没有骨骼结构的饰品，需要选择"Attach to"（安装位置：头、颈、胸、脊椎、腰、手、脚、Avatar根等）进行安装。

### 保存
* <span style="color: #00b0f0">Apply</span> ― 将穿戴后的状态保存到正在编辑的Avatar上。
* <span style="color: #00b0f0">Save as new avatar</span> ― 将穿戴后的状态另存为新的Avatar。原来的Avatar保持不变，新的Avatar会作为另一个Avatar上传到VRChat。

:::note
服装是复制后穿戴的，因此穿戴后即使从Avatar列表中删除服装物品，Avatar身上的服装也不会损坏。
:::
