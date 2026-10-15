---
title: 'Uploading Avatars'
description: 'How to use the Upload tab'
---

In the **Upload** tab, you log in to VRChat, set avatar information, build for testing, and upload.

## Before Uploading
* * *
To upload an avatar, the following conditions must be met.

* You are logged in to your VRChat account
* Your VRChat trust rank is **New User** or higher
* The avatar has a VRCAvatarDescriptor and the required shaders are installed in the project ("Ready to upload" is shown in the Setup tab)

:::note
If your trust rank is not high enough, you can raise it by spending time in VRChat and making friends. Or you can join VRChat+ (paid) to raise your rank immediately.
:::

## Selecting an Avatar
* * *
Select the avatar you want to upload from the list on the left. A preview is shown when selected.

For avatars that have already been uploaded to VRChat, the avatar's name on VRChat is shown below the prefab name.

Avatars marked "Can't be uploaded" cannot be selected. For VRM avatars, convert them to VRChat avatars in the Setup tab.
If an avatar does not appear in the list, check that you have not hidden it in Manage Model.

## Logging in to VRChat
* * *
If you are not logged in to VRChat, a <span style="color: #00b0f0">Login</span> button is shown.
Pressing it opens the VRChat SDK control panel; log in with your VRChat account there.

Once logged in, your user name and whether you are allowed to upload avatars are shown.

## Setting Avatar Information
* * *
| Item | Description |
| ---- | ---- |
| Name | Set a name for the avatar. **This item is required.** |
| Description | The avatar's description. Use it as a memo for yourself. You can upload without entering it. |
| Content Warnings | Set tags according to the avatar's content. You can choose from "Sexually Suggestive", "Adult Language and Themes", "Graphic Violence", "Excessive Gore", and "Extreme Horror". Using an applicable avatar without tags may be a violation. |
| Visibility | Private: Only you can use it.<br />Public: Published so that anyone can use it. |

:::danger
Avatars distributed or sold online are generally prohibited from being published as Public.
If you did not make the avatar yourself, do not upload it as Public.
:::

### Setting a Thumbnail
Sets the avatar's thumbnail. The thumbnail is shown in places such as the avatar list in VRChat.

By default, EAUploader uses the preview image created at import.
Select an image file (png, jpg) with <span style="color: #00b0f0">Change Thumbnail</span> to change it. When changing, you will be asked "Do you also change the thumbnails that appear in the EAUploader avatar list?"; choose <span style="color: #00b0f0">Yes</span> if you also want to change the preview image in the list.

Pressing <span style="color: #00b0f0">Using preview image (Default)</span> restores the preview image.

## For Avatars Already Uploaded
* * *
When you select an avatar that has already been uploaded to VRChat, its information on VRChat is loaded and filled into each field. The following information is also shown.

* **VRChat Information** ― Author, created at, updated at, upload count
* **Blueprint** ― Operations on the ID assigned to the avatar on VRChat

### Updating Only the Avatar Information
When you change the avatar's name, description, content warnings, visibility, or thumbnail, <span style="color: #00b0f0">Save</span> and <span style="color: #00b0f0">Discard</span> buttons appear.

* <span style="color: #00b0f0">Save</span> ― Updates only the avatar information on VRChat without re-uploading the avatar.
* <span style="color: #00b0f0">Discard</span> ― Cancels the changes and restores the information on VRChat.

### Blueprint
The Blueprint (Blueprint ID) is a unique ID assigned to an avatar on VRChat. Uploading an avatar with the same Blueprint ID overwrites (updates) the avatar on VRChat.

* <span style="color: #00b0f0">Copy</span> ― Copies the Blueprint ID to the clipboard.
* <span style="color: #00b0f0">Unlink from VRChat</span> ― Assigns a new ID to the avatar. On the next upload, it is uploaded as a separate avatar instead of overwriting the existing one on VRChat.

:::danger
Do not share your Blueprint ID with others. This ID can be used to update and delete the avatar on VRChat, so sharing it may allow others to steal your avatar data.
:::

## Avatar Optimization
* * *
If you install the separate tool "AAO: Avatar Optimizer (by anatawa12)" in your project, you can use <span style="color: #00b0f0">Automatic avatar optimizing (AvatarOptimizer)</span>.

When turned on, AvatarOptimizer's automatic optimization component "Trace And Optimize" is added to the avatar, and the avatar is optimized non-destructively at build time without changing its appearance. Turning it off removes the component.

* The optimization result is not known until you build. The "Avatar Performance" below does not reflect the optimized result.
* Optimization settings cannot be changed from EAUploader. To change settings or use other optimization features, use the Unity editor.
* If you turn it on without AvatarOptimizer installed, a message guiding you to install it is shown. AvatarOptimizer can be installed from [Booth](https://booth.pm/ja/items/4885109) or VCC. After installing, run "EAUploader" → "Reload" from the menu.

## Avatar Performance
* * *
VRChat rates avatars on five levels according to their load. Players can hide avatars based on this rating, and heavy avatars may not be shown to some players.

From lightest to heaviest, they are rated **Excellent - Good - Medium - Poor - Very Poor**.
The overall rating of the avatar is the **Overall** value at the top. Below it, ratings for each item such as polygons, material slots, and PhysBone components are shown.

VRChat recommends optimizing / reducing avatars to Good, but PC avatars can be uploaded without problems even if they are Very Poor.

:::note
The performance shown in EAUploader is calculated with the PC (Windows) criteria. Avatars for Android have various restrictions, and avatars that exceed the limits are not shown to Android (Quest / smartphone) users.
:::

## Selecting a Platform
* * *
Avatars are divided into those that can only be used on desktop (PCVR) and those that can also be used on Android (Quest / smartphones).
Select the platform to build for with "Selected Platform".

| Platform | Description |
| ---- | ---- |
| Windows | Builds as an avatar for PC. |
| Android | Builds as an avatar for standalone Quest and smartphones. Requires the Android Build Support module to be added to Unity. |
| iOS | Builds as an avatar for iOS. Shown only for accounts that are allowed to upload to iOS. |

When you switch platforms, a confirmation message appears. Switching takes a little while.

If you select Android without the Android Build Support module installed, a message guiding you to download the module is shown. Add the "Android Build Support" module to the Unity version you are using from "Installs" in Unity Hub.

:::tip
If you want to support both PC and Android, first upload with Windows, then switch the platform to Android and upload the same avatar again. Android data is added to the avatar with the same Blueprint ID.
Avatars uploaded for Android must be Quest-compatible. Check with the avatar's distributor whether it supports Quest.
:::

## Building as a Test
* * *
Pressing <span style="color: #00b0f0">Build as Test</span> builds the avatar locally (on your own PC) so that you can use it in VRChat. You can check how the avatar works without uploading it.

Avatars built as a test are not uploaded to VRChat, so other players cannot see them.
You can select avatars built as a test from "Other" in the avatar menu of the VRChat app.

:::note
Build as Test can only be used when the platform is Windows.
:::

## Uploading
* * *
1. Enter the avatar's name.
2. Check "The information provided above is accurate and I have the rights to upload this content to VRChat".
3. Press the <span style="color: #00b0f0">Upload</span> button.

A progress bar is shown during the upload. Once the upload is complete, you can use the avatar in VRChat.

### If the Upload Fails
* **The avatar is too large** ― The avatar's file size exceeds VRChat's limit. The error message shows the limit and the current size, so please reduce the size of the avatar.
* **Other errors** ― When an error occurs, the "Error Report" is shown. See "[FAQ and Troubleshooting](/en/faq/troubleshooting/)" for details.
