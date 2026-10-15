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

:::caution
Please back up your project before updating. See "[Guide for New Users](/en/guides/getting_started/#how-to-back-up)" for how to make a backup.
:::

You can check the version of EAUploader currently installed in "Settings" of the Import/Settings tab.
Updates are announced on the [GitHub releases page](https://github.com/Project-EAUploader/EAUploader-for-VRChat/releases) and the official Discord server.

## Removing EAUploader from a Project
* * *
Press the ⊖ button of **Easy Avatar Uploader for VRChat** in VCC's Manage Packages to remove EAUploader from the project.

Removing EAUploader does not delete data such as avatars or shaders. You can keep using the project as a regular Unity editor.

### Files Created by EAUploader
EAUploader creates the following files and folders in the project. After removing EAUploader, you can delete them if you no longer need them.

| Location | Contents |
| ---- | ---- |
| `Assets/EAUploader/settings.json` | Settings such as the language |
| `Assets/EAUploader/PrefabManager.json` | Manage Model information (pins, hidden items, etc.) |
| `Assets/EAUploader/EditorsManage.json` | Information about registered edit tools |
| `Assets/EAUploader/PrefabPreviews/` | Preview images shown in the list |
| `EAUploaderLog/` (directly under the project folder) | Log files |
| `Assets/VRM/` | Avatars imported from VRM (only if you used VRM) |

:::caution
`Assets/VRM/` contains the imported VRM avatars themselves. Do not delete it if you are using VRM avatars.
:::

### If "Missing Script" Is Shown
EAUploader adds a component called "EAUploaderMeta" to prefabs to manage avatars.
After removing EAUploader, this component may be shown as "Missing Script". This component does not affect the avatar's appearance or behavior. If you do not need it, remove it from the Inspector.

## If Problems Occur
* * *
If a problem occurs with EAUploader, first try restarting EAUploader. If that does not solve it, remove EAUploader from the project in VCC once and add it again.

See "[FAQ and Troubleshooting](/en/faq/troubleshooting/)" for details.
