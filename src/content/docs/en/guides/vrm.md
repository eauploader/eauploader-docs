---
title: 'Using VRM Avatars'
description: 'How to convert VRM avatars for VRChat and upload them'
---

## What is VRM?
* * *
VRM is a 3D model file format specialized for avatars. It is one of the standards for humanoid avatars and can be created easily with tools such as VRoid Studio.
You can get VRM avatars from sites such as [VRoid Hub](https://hub.vroid.com/), or create one easily with [VRoid Studio](https://vroid.com/studio), just like making a character in a game.

VRM avatars cannot be uploaded to VRChat as they are, so they need to be converted.
With EAUploader, you can convert and upload VRM avatars by additionally installing **VRM Converter for VRChat**.

:::caution[Supported VRM versions]
**VRM 0.x** and **VRM 1.x** differ greatly in specification.
VRM Converter for VRChat **only supports VRM 0.x and does not support VRM 1.x.** Please be careful.
:::

## Installing VRM Converter for VRChat
* * *
Add VRM Converter for VRChat to your project from VCC (or ALCOM), or download it from the [distribution page](https://booth.pm/ja/items/1025226) and import it.
To use VRM with EAUploader, both VRM Converter for VRChat and the package for loading VRM (UniVRM) must be installed in the project.

Once installed, the <span style="color: #00b0f0">Import VRM</span> button in the Import/Settings tab becomes available.

:::note
If the button is still not available after installing, run "EAUploader" → "Reload" from the Unity menu, or restart Unity.
:::

## Importing VRM
* * *
Press the <span style="color: #00b0f0">Import VRM</span> button in the Import/Settings tab and select a `.vrm` file.
You can also import by dragging and dropping a `.vrm` file onto the "Manage Model" list.

The imported VRM is saved as a prefab in the project's `Assets/VRM` folder. When the import is complete, the conversion window opens.

:::caution
You cannot select `.vrm` files inside the project's `Assets` folder. Select a file outside the project.
:::

## Converting to a VRChat Avatar
* * *
Set each item in the conversion window and press the <span style="color: #00b0f0">Comvert</span> button.

| Item | Description |
| ---- | ---- |
| Shoulder Height | Adjusts the height of the shoulders. Adjust it if the converted avatar's shoulders slope down too much or are raised too high. |
| Armature Height | Changes the height of the Armature (the avatar's skeleton). |
| Combine Meshes | Combines meshes during conversion. This optimizes the meshes. |
| Use Shape Key Normals and Tangents | Uses the normal and tangent information of shape keys (facial expressions, etc.). |
| Osc Components | Selects the OSC-related components to add during conversion. |
| Swinging Object (Settings for PC) | Selects how VRM swaying objects (SpringBone) are converted into swaying objects for VRChat. |
| Take Over Swinging Parameters (Settings for PC) | Carries over the parameters of VRM swaying objects to the converted swaying objects. |
| For Quest (Settings for Quest) | Sets up the avatar for Quest. |

For details on each item, also check the documentation of VRM Converter for VRChat.

### Converting Again
For a VRM avatar you have already imported, select it in the Setup tab and press the <span style="color: #00b0f0">Convert to VRChat Avatar</span> button shown under the edit tools to reopen the conversion window.

Even if you convert the same avatar again, the Blueprint ID of an avatar you have already uploaded is kept.

## Setting the Viewpoint Position
* * *
:::caution
Converted VRM avatars need their viewpoint position set.
:::

Select the avatar in the Setup tab, open the <span style="color: #00b0f0">Viewpoint Position Editor</span> from the edit tools, and adjust the viewpoint.
See "[Setup (Adjusting Avatars)](/en/guides/setup/#viewpoint-position-editor)" for how to use it.

## Uploading
* * *
Once conversion and the viewpoint position setting are complete, you can upload it just like a regular avatar. See "[Uploading Avatars](/en/guides/upload/)".

Shaders used by VRM avatars (such as MToon) may not support Android (Quest). If you upload for Android, turn on "For Quest" when converting.
