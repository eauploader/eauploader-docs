---
title: 'Shader not found error'
description: 'How to solve shader not found error'
---

## What is the problem?
This page explains how to solve the problem when "Shader Issues Found" is shown after importing an avatar, or when "Cannot find the configured shader." or "No Shader" is shown in EAUploader's lists.

Indicates that the "shader" needed to draw the avatar's texture (appearance) is missing from the project. As a result, the avatar is drawn in pink, and the avatar cannot be used with the correct look and feel if it is uploaded as is.

## Solution
Add the necessary shaders for the avatar to your project. **No need to exit Unity at this time.**

## How to find the required shaders
Check the manual on the page where the avatar is sold or distributed or in the distribution folder of the avatar you downloaded. Look for the name of the shader in the "Required Shaders" or "Shaders" section of the specifications section, for example.

### How to find it
Press `Ctrl + F` in the page to search for characters in the page. Type "shader" there and search the page.

## Download or add the shader you need to VCC
Once you know the name of the shader you need, search for it and find where it is distributed. However, most of the time avatars are created by [lilToon](https://lilxyzw.github.io/lilToon/#/) or [Poiyomi Toon Shader](https://booth.pm/ja/items/4841309), If you have any trouble, please click here.

### I recommend adding to VCC!
Shaders are also distributed in .unitypackage like Avatar. A .unitypackage can be imported with the "Import Shaders" button in EAUploader's "Import/Settings" tab.
However, we strongly recommend that you register with **VCC and add shaders to your project from VCC, just as you added EAUploader to your project.** Shaders are updated frequently, and managing them in VCC makes it easy to update them, as well as easy to add them if you have created multiple projects.

## Add shaders to your project and return to Unity
Once you have added shaders, return to Unity. The shaders set on the avatar will be added to the project, which will **automatically apply the shaders to the avatar.** Make sure there are no shader errors and upload your avatar!

You can check the shaders installed in the project with the "Show existing shaders" button in the "Import/Settings" tab.
Also, if you select the avatar in the "Setup" tab and "Ready to upload" is shown, there is no problem.
