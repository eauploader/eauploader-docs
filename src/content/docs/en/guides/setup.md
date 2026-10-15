---
title: 'Setup (Adjusting Avatars)'
description: 'How to use the Setup tab and edit tools'
---

In the **Setup** tab, you check the state of avatars and adjust them with edit tools.

The screen is divided into three parts from left to right: "Avatar list", "Preview", and "Edit tool".

## Selecting an Avatar
* * *
Select the avatar you want to adjust from the list on the left.

* The list shows prefabs except those hidden in "Manage Model".
* Pinned avatars appear at the top of the list.
* You can search by name in the input field at the top and change the order with the dropdown.

The avatar selected here is also selected in the Upload tab.

## Avatar Preview
* * *
When you select an avatar, its name and height (the viewpoint height) are shown at the top center, with a preview of the avatar below.

You can move the preview with the following operations.

| Operation | Action |
| ---- | ---- |
| Drag with left click | Rotate |
| Drag with right click | Move |
| Mouse wheel up/down | Zoom |
| Button at the bottom left | Reset position |

### Renaming, Pinning, and Deleting
The buttons under the preview let you do the following for the selected avatar.

| Button | Details |
| ---- | ---- |
| ✏ (pencil) | Renames the prefab. |
| 📌 (pin) | Pins the avatar. Pinned avatars appear at the top of the list. Press it again to unpin. |
| 🗑 (trash) | Deletes the prefab. **Deleted prefabs are also deleted from the Unity project.** |

## Checking the State of an Avatar
* * *
At the top of the "Edit tool" area on the right, the state of the selected avatar is shown.

| Display | Meaning and what to do |
| ---- | ---- |
| ✅ Ready to upload | You can upload it as is. |
| No VRCAvatarDescriptor | This is not an avatar for VRChat. If the avatar is distributed for VRChat, check that you have selected the correct prefab. |
| No Shader | Shaders required by the avatar are not in the project. See "[Shader not found error](/en/faq/missing_shader/)". |
| VRM Avatar needs to convert to VRChat Avatar | This is a VRM avatar. Convert it with the <span style="color: #00b0f0">Convert to VRChat Avatar</span> button. See "[Using VRM Avatars](/en/guides/vrm/)" for details. |
| This avatar is a converted VRM, Viewpoint Position may need to be adjusted. | This avatar was converted from VRM. Check the viewpoint position with the "Viewpoint Position Editor" below. |

## Using Edit Tools
* * *
"Edit tool" lists tools for adjusting and customizing avatars. Press the button with a tool's name to open it.

Pressing ▼ to the right of the button shows the tool's description, version, and author. Some tools also show a link to their support page.

Tools that cannot be used with the selected avatar have their buttons disabled, and the reason is shown.

### Viewpoint Position Editor
The Viewpoint Position Editor is an edit tool built into EAUploader. It lets you set the avatar's viewpoint position (the position of your eyes in VRChat).

1. Move the vertical and horizontal bars on the left to change the viewpoint position. The current position is shown as a <span style="color: red">red dot</span>, and the new position as a <span style="color: green">green dot</span>.
2. Press the 🔄 button at the top to flip the direction from which you view the avatar.
3. "Actual View" on the right is a preview as seen from the viewpoint position. If you can see the inside of the avatar's face, move the viewpoint until the background is clearly visible. You can switch the aspect ratio between "1:1 (VR)" and "16:9 (PC)".
4. When the position is decided, press the <span style="color: #00b0f0">Apply</span> button.

:::note
The Viewpoint Position Editor requires the avatar to have a VRCAvatarDescriptor. For VRM avatars, convert them to VRChat avatars first.
:::

## Installing Extensions
* * *
By installing extensions (plugins) that support EAUploader, you can configure and edit avatars in ways EAUploader does not support. Installed extensions are added to the "Edit tool" list.

* <span style="color: #00b0f0">Import extentions</span> ― Select and import an extension's `.unitypackage` file.
* <span style="color: #00b0f0">Find extentions</span> ― Opens a website that introduces extensions.

If an extension supports VCC (or ALCOM), you can also add it to your project from VCC.

:::tip
If you want to make an extension, see "[Quick Start Guidance](/en/for_tooldev/extension/)".
:::
