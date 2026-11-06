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

## The Three Screens
* * *
EAUploader consists of three screens: "Avatar List", "Edit screen", and "Upload".

```
Avatar List ──(click a card)──▶ Edit screen ──(Go to upload)──▶ Upload
     ▲                             │ ▲                              │
     └───────(Back to list)────────┘ └────────(Back to edit)────────┘
```

| Screen | What you can do |
| ---- | ---- |
| **Avatar List** | The first screen shown. Lists avatars, outfits, and accessories as cards. Importing, searching and filtering, tag management, and settings are done here. |
| **Edit screen** | Edit information such as the name and tags of the selected item, or modify it with edit tools, while checking it in 3D. |
| **Upload** | Opens as a sheet on the right side of the Edit screen. Log in to VRChat, set avatar information, test, and upload. Only items whose genre is "Avatar" can be uploaded. |

For details on each screen, see the following pages.

- [Importing and Managing Avatars](/en/guides/import/) (Avatar List)
- [Edit Screen](/en/guides/setup/)
- [Edit Tools](/en/guides/edit_tools/)
- [Uploading Avatars](/en/guides/upload/)

## Basic Workflow
* * *
1. Import an avatar from <span style="color: #00b0f0">Import</span> on the **Avatar List**.
2. If a missing shader error appears, install the required shaders. ([Shader not found error](/en/faq/missing_shader/))
3. Click the avatar's card to open the **Edit screen** and make sure "Ready to upload" is displayed. Adjust it with edit tools as needed.
4. Open the **Upload** sheet with <span style="color: #00b0f0">Go to upload</span>, log in to VRChat, and upload.

## Help Buttons
* * *
Pressing the <span style="color: #00b0f0">Help</span> buttons found throughout the screen shows an explanation of that item.
If there is something you do not understand, check the help first.

## Messages Inside the Window
* * *
Confirmation messages, settings, help, and so on are shown overlaid inside the EAUploader window (modals).
When copying or saving completes, a short notification appears at the edge of the screen.

## Unity Menu
* * *
From the "EAUploader" menu at the top of Unity, you can do the following.

| Menu | Details |
| ---- | ---- |
| Open EAUploader | Opens the EAUploader window. |
| Reload | Reloads the item list, edit tools, and the installation status of supported tools (VRM Converter, AvatarOptimizer, Modular Avatar). Try this if something looks wrong or after installing a supported tool. |
| ViewpointPositionEditor | Opens the Viewpoint Position Editor for the selected avatar. |
| Edit Tools | Opens the Shape Key Editor, Texture Editor, and Dress Up (Compatible Outfits). (They are normally opened from the Edit screen.) |

## About Saving Your Work
* * *
Operations in EAUploader make changes in Unity. Unity normally keeps its working state, so you do not need to save when you finish.

However, items deleted in EAUploader are also deleted from Unity. Please be careful when deleting.
