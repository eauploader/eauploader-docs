---
title: '使用VRM Avatar'
description: '将VRM Avatar转换为VRChat用并上传的方法'
---

## 什么是VRM
* * *
VRM是一种专门用于Avatar的3D模型文件格式，是人形Avatar的规范之一，可以使用VRoid Studio等工具轻松制作。
VRM Avatar可以在[VRoid Hub](https://hub.vroid.com/)等处获取，也可以使用[VRoid Studio](https://vroid.com/studio)像在游戏中捏人一样轻松制作。

VRM无法直接上传到VRChat，需要进行转换。
在EAUploader中，额外安装**VRM Converter for VRChat**后，就可以转换并上传VRM Avatar。

:::caution[支持的VRM版本]
**VRM 0.x**与**VRM 1.x**的规范差异很大。
VRM Converter for VRChat**仅支持VRM 0.x，不支持VRM 1.x。**请注意。
:::

## 安装VRM Converter for VRChat
* * *
请通过VCC（或ALCOM）将VRM Converter for VRChat添加到项目中，或从[发布页面](https://booth.pm/ja/items/1025226)下载并导入。
要在EAUploader中使用VRM，项目中需要同时安装VRM Converter for VRChat和用于读取VRM的包（UniVRM）。

安装完成后，导入窗口中的<span style="color: #00b0f0">Import VRM</span>按钮即可使用。

:::note
安装后按钮仍无法使用时，请执行Unity顶部菜单的"EAUploader"→"Reload"，或重新启动Unity。
:::

## 导入VRM
* * *
按下Avatar列表的<span style="color: #00b0f0">Import</span>打开导入窗口，通过<span style="color: #00b0f0">Import VRM</span>按钮选择`.vrm`文件。
也可以将`.vrm`文件拖放到Avatar列表中进行导入。

导入的VRM会以预制体形式保存在项目的`Assets/VRM`文件夹中，同时也会添加到Avatar列表。导入完成后会打开转换窗口。

导入后可能会立即显示"Outfit Settings"窗口，但VRM Avatar在转换后类型会自动变为"Avatar"。

:::caution
无法选择项目`Assets`文件夹中的`.vrm`文件。请选择项目外的文件。
:::

## 转换为VRChat用Avatar
* * *
在转换窗口中设置各项目，然后按下<span style="color: #00b0f0">Comvert</span>（转换）按钮。

| 项目 | 说明 |
| ---- | ---- |
| Shoulder Height | 调整肩膀高度。转换后的Avatar出现溜肩或肩膀过高时请调整。 |
| Armature Height | 更改Armature（Avatar骨骼）的高度。 |
| Combine Meshes | 合并网格后再转换，从而优化网格。 |
| Use Shape Key Normals and Tangents | 使用形态键（表情等）的法线和切线信息。 |
| Osc Components | 选择转换时添加的OSC相关组件。 |
| Swinging Object（Settings for PC） | 选择将VRM的摇摆物体（SpringBone）转换为VRChat用摇摆物体的方式。 |
| Take Over Swinging Parameters（Settings for PC） | 将VRM摇摆物体的参数沿用到转换后的摇摆物体上。 |
| For Quest（Settings for Quest） | 作为Quest用Avatar进行设置。 |

各项目的详细内容请同时参阅VRM Converter for VRChat的说明。

### 重新打开转换窗口
尚未转换的VRM Avatar在Avatar列表中会显示"Needs conversion"。点击卡片打开编辑界面，通过左侧显示的<span style="color: #00b0f0">Convert to VRChat Avatar</span>按钮即可打开转换窗口。

即使再次转换同一个Avatar，已上传Avatar的Blueprint ID也会被沿用。

## 设置视点位置
* * *
:::caution
转换后的VRM Avatar需要设置视点位置。
:::

打开编辑界面，从编辑工具中打开<span style="color: #00b0f0">Viewpoint Position Editor</span>调整视点。
使用方法请参阅"[编辑工具](/zh-cn/guides/edit_tools/#视点位置编辑器viewpoint-position-editor)"。

## 上传
* * *
转换和视点位置设置完成后，就可以像普通Avatar一样上传。请参阅"[上传Avatar](/zh-cn/guides/upload/)"。

VRM Avatar使用的着色器（MToon等）可能不支持Android（Quest）。如果也要上传Quest（Android）版，请在转换时开启"For Quest"。
