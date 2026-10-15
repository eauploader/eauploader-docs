---
title: 'FAQ and Troubleshooting'
description: 'Frequently asked questions about EAUploader and how to solve problems'
---

## Starting and Displaying EAUploader
* * *
### The EAUploader window does not appear
Select "EAUploader" → "Open EAUploader" from the Unity menu.

If "EAUploader" does not appear in the menu, check the following.

* Whether **Easy Avatar Uploader for VRChat** has been added to the project in VCC's Manage Packages.
* Whether the Unity version is 2022.3.
* Whether red errors (compile errors) are shown in Unity's Console. Errors in other tools can prevent EAUploader from starting. Update or remove the tool causing the error.

### An "EAUploader Error" dialog is shown
A problem occurred while starting EAUploader. Press <span style="color: #00b0f0">Restart</span> to restart EAUploader.
If restarting does not solve the problem, remove EAUploader from the project in VCC once and add it again.

### An "Error Report" window appears
When an error occurs in Unity, the "Error Report" window is shown. This window is also shown for errors that occur in tools other than EAUploader or in Unity itself.

| Button | Details |
| ---- | ---- |
| Restart | Reloads EAUploader. |
| Copy | Copies the error details and environment information (versions of EAUploader and Unity, installed packages). |
| OK | Closes the window. |

Try to solve the issue based on the error, or ask for help in a community. When asking, pasting the text copied with <span style="color: #00b0f0">Copy</span> makes the cause easier to find.
If the error seems to be caused by EAUploader, please report it on the [official Discord server](https://discord.gg/yYFru7brra).

### The display looks wrong / the list is not updated
Select "EAUploader" → "Reload" from the Unity menu to reload EAUploader.

## Importing
* * *
### An imported avatar does not appear in the list
* EAUploader's list shows `.prefab` files in the project's `Assets` folder. Check that the `.unitypackage` contains the avatar's prefab.
* Change the "Manage Model" filter to "Show hidden models" and check that it is not hidden.
* Run "EAUploader" → "Reload" from the menu.

### The avatar turns pink / a shader error is shown
Shaders required by the avatar are not in the project. See "[Shader not found error](/en/faq/missing_shader/)".

### Things other than avatars (outfits, etc.) appear in the list
EAUploader's list shows all `.prefab` files in the project. You can hide items you do not need with the "Hide" button. See "[Importing and Managing Avatars](/en/guides/import/#hiding-items-from-the-list)" for details.

### The "Import VRM" button is not available
VRM Converter for VRChat is not installed. See "[Using VRM Avatars](/en/guides/vrm/)" for how to install it.
If the button is still not available after installing, run "EAUploader" → "Reload" from the menu or restart Unity.

### A VRM file cannot be imported
VRM 1.x files are not supported. Please prepare a VRM 0.x file.
Also, `.vrm` files inside the project's `Assets` folder cannot be selected.

## Uploading
* * *
### An avatar cannot be selected in the Upload tab
Avatars marked "Can't be uploaded" cannot be selected. Select the avatar in the Setup tab and check what is shown.

* **No VRCAvatarDescriptor** ― It is not an avatar for VRChat, or it is a prefab other than an avatar.
* **No Shader** ― Install the required shaders.
* **VRM Avatar needs to convert to VRChat Avatar** ― Convert it to a VRChat avatar from the Setup tab.

### "You cannot upload an avatar with your current trust rank" is shown
To upload avatars, your VRChat trust rank must be New User or higher.
You can raise your rank by spending time in VRChat and making friends. Or you can join VRChat+ (paid) to raise your rank immediately.

### "Build as Test" does not work
Build as Test can only be used when the platform is Windows. Select Windows in "Selected Platform".

### The upload fails
* Full-width (non-ASCII) characters in the project name or folder names can cause uploads to fail. Use only alphanumeric characters and symbols.
* If the avatar's file size is too large, the limit and the current size are shown. Please reduce the size of the avatar.
* Check whether errors are shown in the VRChat SDK control panel (menu "VRChat SDK" → "Show Control Panel").

### I want to upload the same avatar as a separate avatar
Press <span style="color: #00b0f0">Unlink from VRChat</span> under "Blueprint" in the Upload tab. On the next upload, it will be uploaded as a separate avatar. See "[Uploading Avatars](/en/guides/upload/#blueprint)" for details.

### Automatic optimization (AvatarOptimizer) cannot be turned on
AAO: Avatar Optimizer is not installed. Install it from [Booth](https://booth.pm/ja/items/4885109) or VCC, then run "EAUploader" → "Reload" from the menu.

## Other
* * *
### I want to change the display language
You can change it from "Language" in "Settings" of the Import/Settings tab. English, 日本語 (Japanese), and 한국어 (Korean) are currently supported.

### Where are the log files?
They are saved in the `EAUploaderLog` folder directly under the project folder. Pressing the <span style="color: #00b0f0">Open log report</span> button in the Import/Settings tab opens the folder.

A log file is created each time EAUploader starts and is saved with a name such as `2024-04-22-3.log` (the third start on April 22, 2024). When the folder exceeds 100MB, older files are deleted automatically.

### If You Have Problems
If the above does not solve your problem, please join the official EAUploader Discord server. ▷ [https://discord.gg/yYFru7brra](https://discord.gg/yYFru7brra)

If you encounter problems with Unity or the VRChat SDK, or issues related to purchased avatars, gimmicks, or tools, please seek support from their respective distributors.
