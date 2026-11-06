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

### An "Error Report" appears
When an error occurs in Unity, an "Error Report" is shown inside the EAUploader window. It is also shown for errors that occur in tools other than EAUploader or in Unity itself.

| Button | Details |
| ---- | ---- |
| Restart | Reloads EAUploader. |
| Copy | Copies the error details and environment information (versions of EAUploader and Unity, installed packages). |
| OK | Closes the error report. |

Try to solve the issue based on the error, or ask for help in a community. When asking, pasting the text copied with <span style="color: #00b0f0">Copy</span> makes the cause easier to find.
If the error seems to be caused by EAUploader, please report it on the [official Discord server](https://discord.gg/yYFru7brra).

If you do not want the error report to be shown automatically, check "Do not show this window again". You can turn it back on with "Show error report window" in "Settings" on the Avatar List.

### The display looks wrong / the list is not updated
Select "EAUploader" → "Reload" from the Unity menu to reload EAUploader.

### After updating, "EAUploader now manages prefabs as variants" is shown
This is the confirmation for moving to the new management method, shown when updating from an older version. Press <span style="color: #00b0f0">Migrate</span>. See "[Importing and Managing Avatars](/en/guides/import/#how-eauploader-manages-items)" for details.

## Importing
* * *
### An imported avatar does not appear in the list
* Check that the `.unitypackage` contains the avatar's Prefab.
* Turn on "Show hidden items" on the Avatar List and check that it is not hidden.
* Check that you are not filtering by category or tag.
* Prefabs already in the project are not added to the list automatically. Select the Prefab with <span style="color: #00b0f0">Import</span> in the "Import" window.
* Run "EAUploader" → "Reload" from the menu.

### "Cannot import prefab" is shown
When selecting a `.prefab`, choose one inside this project's `Assets` folder. `.prefab` files outside the project or inside EAUploader's internal folder (`Assets/EAUploader`) cannot be selected. To bring in assets from another project, use a `.unitypackage`.

### The avatar turns pink / a shader error is shown
Shaders required by the avatar are not in the project. See "[Shader not found error](/en/faq/missing_shader/)".

### "Outfit Settings" appears when importing
Prefabs other than avatars (outfits, accessories, etc.) were imported, so EAUploader is asking you to set their genre. Choose a genre for each and press <span style="color: #00b0f0">Save</span>. You can change the genre later on the Edit screen.

### The "Import VRM" button is not available
VRM Converter for VRChat is not installed. See "[Using VRM Avatars](/en/guides/vrm/)" for how to install it.
If the button is still not available after installing, run "EAUploader" → "Reload" from the menu or restart Unity.

### A VRM file cannot be imported
VRM 1.x files are not supported. Please prepare a VRM 0.x file.
Also, `.vrm` files inside the project's `Assets` folder cannot be selected.

## Editing
* * *
### An edit tool's button cannot be pressed
The tool cannot be used with the selected item. The reason is shown below the button.
For example, Dress Up (Compatible Outfits) can only be used with items whose genre is "Avatar" and that have a VRCAvatarDescriptor.

### No outfits appear in Dress Up (Compatible Outfits)
The list in Dress Up (Compatible Outfits) shows items whose genre is "Cloth" or "Accessory". Import the outfit into the Avatar List and check its genre on the Edit screen.

### I want to undo changes made with an edit tool
Before saving, press <span style="color: #00b0f0">Revert</span> to return to the last saved state.
Even after saving, the source Prefab you imported has not been changed. If you want to keep the state before modifying, we recommend duplicating the item with <span style="color: #00b0f0">Duplicate</span> on the Edit screen before editing.

## Uploading
* * *
### The upload button is not shown
Only items whose genre is "Avatar" can be uploaded. Check the genre in "Item Info" on the Edit screen.

### I cannot upload
If the upload sheet shows "This avatar can't be uploaded for the following reasons:", check the reasons shown.

* **No VRCAvatarDescriptor** ― It is not an avatar for VRChat, or it is a Prefab other than an avatar.
* **No Shader** ― Install the required shaders.
* **Avatar is a VRM model** ― Convert it to a VRChat avatar from the Edit screen.

### "You cannot upload an avatar with your current trust rank" is shown
To upload avatars, your VRChat trust rank must be New User or higher.
You can raise your rank by spending time in VRChat and making friends. Or you can join VRChat+ (paid) to raise your rank immediately.

### "Test" does not work
Test can only be used when Unity's build target is Windows.

### Quest (Android) cannot be turned on
The Android Build Support module is not installed in Unity. Add the "Android Build Support" module to the Unity version you are using from <span style="color: #00b0f0">Download</span> in the message shown, or from "Installs" in Unity Hub.

### The upload fails
* Full-width (non-ASCII) characters in the project name or folder names can cause uploads to fail. Use only alphanumeric characters and symbols.
* Check the cause shown in the "Upload Failed" message. If the avatar's file size is too large, please reduce the size of the avatar.
* Check whether errors are shown in the VRChat SDK control panel (menu "VRChat SDK" → "Show Control Panel").

### I want to upload the same avatar as a separate avatar
Press <span style="color: #00b0f0">Unlink from VRChat</span> under "Blueprint" in the upload sheet. On the next upload, it will be uploaded as a separate avatar. See "[Uploading Avatars](/en/guides/upload/#blueprint)" for details.

If you want to upload an avatar dressed with Dress Up (Compatible Outfits) as a separate avatar, use <span style="color: #00b0f0">Save as new avatar</span> to save it as a separate avatar while keeping the original.

### Automatic optimization (AvatarOptimizer) cannot be turned on
AAO: Avatar Optimizer is not installed. Install it from [Booth](https://booth.pm/ja/items/4885109) or VCC, then run "EAUploader" → "Reload" from the menu.

## Other
* * *
### I want to change the display language
You can change it from "Language" in "Settings" on the Avatar List. English, 日本語 (Japanese), and 한국어 (Korean) are currently supported.

### I want to restore a deleted item
Deleted items cannot be restored. Deleting also deletes the source Prefab and related assets, so please import the avatar again.
Make a habit of backing up your project.

### Where are the log files?
They are saved in the `EAUploaderLog` folder directly under the project folder. Pressing the <span style="color: #00b0f0">Open log report</span> button in "Settings" on the Avatar List opens the folder.

A log file is created each time EAUploader starts and is saved with a name such as `2024-04-22-3.log` (the third start on April 22, 2024). When the folder exceeds 100MB, older files are deleted automatically.

### If You Have Problems
If the above does not solve your problem, please join the official EAUploader Discord server. ▷ [https://discord.gg/yYFru7brra](https://discord.gg/yYFru7brra)

If you encounter problems with Unity or the VRChat SDK, or issues related to purchased avatars, gimmicks, or tools, please seek support from their respective distributors.
