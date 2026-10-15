---
title: 'Screen Layout'
description: 'The screen layout and basic operations of EAUploader'
---

## Opening EAUploader
* * *
If EAUploader has been added to your project, its window opens automatically when Unity starts.

If you have closed the window, you can reopen it by selecting <span style="color: #00b0f0">EAUploader</span> → <span style="color: #00b0f0">Open EAUploader</span> from the Unity menu.

:::note
It may take a little while for the window to open right after Unity starts or while scripts are loading.
Please wait until the loading indicator at the bottom right of Unity disappears.
:::

## The Three Tabs
* * *
At the top of the window are buttons to switch between three tabs. You basically work through the tabs from left to right.

| Tab | What you can do |
| ---- | ---- |
| **Import/Settings** | Import avatars and shaders, manage models, read the in-tool guide (EA Library), and change settings such as the language. |
| **Setup** | Check the state of avatars, rename or pin them, and open edit tools such as the viewpoint position setting. |
| **Upload** | Log in to VRChat, set avatar information, build for testing, and upload. |

For details on each tab, see the following pages.

- [Importing and Managing Avatars](/en/guides/import/) (Import/Settings tab)
- [Setup (Adjusting Avatars)](/en/guides/setup/) (Setup tab)
- [Uploading Avatars](/en/guides/upload/) (Upload tab)

## Basic Workflow
* * *
1. Import an avatar in the **Import/Settings tab**.
2. If a missing shader error appears, install the required shaders. ([Shader not found error](/en/faq/missing_shader/))
3. Select the avatar in the **Setup tab** and make sure "Ready to upload" is displayed. Adjust it with edit tools as needed.
4. Log in to VRChat in the **Upload tab**, set the avatar's name and other information, and upload it.

## Help Buttons
* * *
Pressing the <span style="color: #00b0f0">Help</span> buttons found throughout the screen shows an explanation of that item.
If there is something you do not understand, check the help first.

## Unity Menu
* * *
From the "EAUploader" menu at the top of Unity, you can do the following.

| Menu | Details |
| ---- | ---- |
| Open EAUploader | Opens the EAUploader window. |
| Reload | Reloads the avatar list, extensions, and the installation status of supported tools (VRM Converter, AvatarOptimizer). Try this if something looks wrong or after installing a supported tool. |
| ViewpointPositionEditor | Opens the Viewpoint Position Editor for the selected avatar. (It is normally opened from the Setup tab.) |

## About Saving Your Work
* * *
Operations in EAUploader make changes in Unity. Unity normally keeps its working state, so you do not need to save when you finish.

However, avatars deleted in EAUploader are also deleted from Unity. Please be careful when deleting.
