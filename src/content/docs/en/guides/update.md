---
title: 'Updating and Removing EAUploader'
description: 'How to update EAUploader and how to remove it from a project'
---

## Updating EAUploader
* * *
You can update EAUploader from VCC (or ALCOM).

1. In the VCC project list, open <span style="color: #00b0f0">Manage Project</span> for the project where EAUploader is installed.
2. Find **Easy Avatar Uploader for VRChat** in Manage Packages.
3. If a new version is available, press the update button (↑), or select the latest version from the version list.

After updating, open the project in Unity.

:::note
If you updated from an older version, the first start asks whether to move your items to the new management method (Prefab Variants). See "[Importing and Managing Avatars](/en/guides/import/#how-eauploader-manages-items)" for details.
:::

:::caution
Please back up your project before updating. See "[Guide for New Users](/en/guides/getting_started/#how-to-back-up)" for how to make a backup.
:::

You can check the version of EAUploader currently installed in "Settings" on the Avatar List.
Updates are announced on the [GitHub releases page](https://github.com/eauploader/EAUploader-for-VRChat/releases) and the official Discord server.

## Removing EAUploader from a Project
* * *
Press the ⊖ button of **Easy Avatar Uploader for VRChat** in VCC's Manage Packages to remove EAUploader from the project.

Removing EAUploader does not delete data such as avatars or shaders. You can keep using the project as a regular Unity editor.

### Files Created by EAUploader
EAUploader creates the following files and folders in the project.

| Location | Contents |
| ---- | ---- |
| `Assets/EAUploader/Prefabs/` | Items managed by EAUploader (managed copies) and textures and materials created by edit tools |
| `Assets/EAUploader/PrefabPreviews/` | Preview images shown in the list |
| `Assets/EAUploader/settings.json` | Settings such as the language |
| `Assets/EAUploader/tags.json` | Tags and tag groups |
| `Assets/EAUploader/EditorsManage.json` | Information about registered edit tools |
| `Assets/EAUploader/PrefabManager.json` | A file kept for compatibility with older versions |
| `EAUploaderLog/` (directly under the project folder) | Log files |
| `Assets/VRM/` | Avatars imported from VRM (only if you used VRM) |

:::danger
`Assets/EAUploader/Prefabs/` contains the avatars you renamed in EAUploader or modified with edit tools. Do not delete it if you want to keep using these avatars after removing EAUploader.
Also, `Assets/VRM/` contains the imported VRM avatars themselves. Do not delete it if you are using VRM avatars.
:::

### If "Missing Script" Is Shown
EAUploader adds a component called "EAUploaderMeta" to its managed copies to manage items. Outfits put on with Dress Up (Compatible Outfits) get a component called "EAUploaderOutfit".
After removing EAUploader, these components may be shown as "Missing Script". These components are removed on upload and do not affect the avatar's appearance. If you do not need them, remove them from the Inspector.

:::caution
For outfits put on with Dress Up (Compatible Outfits) without Modular Avatar, EAUploader merges them into the avatar's bones at upload time. After removing EAUploader, this merge no longer happens, so the outfits will not be shown correctly.
:::

## If Problems Occur
* * *
If a problem occurs with EAUploader, first try restarting EAUploader. If that does not solve it, remove EAUploader from the project in VCC once and add it again.

See "[FAQ and Troubleshooting](/en/faq/troubleshooting/)" for details.
