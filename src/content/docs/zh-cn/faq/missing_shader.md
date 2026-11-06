---
title: "未找到着色器错误"
description: "如何解决未找到着色器错误"
---

## 问题出在哪里？
本页说明导入Avatar时显示"Shader Issues Found"，或者在EAUploader的列表中显示"Can't be uploaded"、在编辑界面显示"No Shader"时的解决方法。

这表示项目中缺少绘制Avatar纹理（外观）所需的"着色器"（Shader）。因此Avatar会显示为粉红色，如果直接上传，将无法以正确的外观使用Avatar。

## 解决方法
将Avatar所需的着色器添加到项目中。**此时无需退出Unity。**

## 如何找到所需的着色器
请查看Avatar的销售/发布页面，或下载的Avatar文件夹中的说明书。
在"所需着色器"或规格栏等处查找写有着色器名称的地方（日文为"シェーダー"）。

### 查找技巧
在页面中按 `Ctrl + F` 可以搜索页面中的文字。输入"シェーダー"或"Shader"搜索页面即可。

## 下载所需着色器或将其添加到VCC
知道所需着色器的名称后，请搜索并找到其发布地址。
大多数Avatar使用 [lilToon](https://lilxyzw.github.io/lilToon/#/) 或 [Poiyomi Toon Shader](https://booth.pm/ja/items/4841309) 制作，如有困难请从这里查看。

### 推荐添加到VCC！
着色器也会像Avatar一样以.unitypackage形式发布。.unitypackage可以通过EAUploader的Avatar列表中"Import"窗口的"Import Shaders"按钮导入。
但是，就像将EAUploader添加到项目中一样，**强烈建议先在VCC中注册，再从VCC将着色器添加到项目中。**
着色器经常更新，用VCC管理可以轻松更新，在创建多个项目时也便于添加。

## 将着色器添加到项目并返回Unity
添加着色器后，返回Unity。当Avatar所设置的着色器被添加到项目中后，**着色器会自动应用到Avatar上。**
确认没有出现着色器错误后，就可以上传Avatar了！

项目中已安装的着色器可以通过Avatar列表中"Import"窗口的"Show existing shaders"按钮确认。
此外，如果Avatar的编辑界面显示"Ready to upload"，则没有问题。
