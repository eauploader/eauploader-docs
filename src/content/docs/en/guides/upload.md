---
title: 'Uploading Avatars'
description: 'How to upload'
---

Uploading is done in the "Upload to VRChat" sheet that opens on the right side of the Edit screen.
Open it with the <span style="color: #00b0f0">Go to upload</span> button on the Edit screen, or with the <span style="color: #00b0f0">Upload</span> button on a card in the Avatar List. Press <span style="color: #00b0f0">Back to edit</span> to close the sheet.

## Before Uploading
* * *
To upload an avatar, the following conditions must be met.

* The item's genre is "Avatar"
* The avatar has a VRCAvatarDescriptor and the required shaders are installed in the project ("Ready to upload" is shown on the Edit screen)
* You are logged in to your VRChat account
* Your VRChat trust rank is **New User** or higher

If the conditions are not met, "This avatar can't be uploaded for the following reasons:" is shown with the reasons.

:::note
If your trust rank is not high enough, you can raise it by spending time in VRChat and making friends. Or you can join VRChat+ (paid) to raise your rank immediately.
:::

## Logging in to VRChat
* * *
If you are not logged in to VRChat, a <span style="color: #00b0f0">Login</span> button is shown.
Pressing it opens the VRChat SDK control panel; log in with your VRChat account there.

Once logged in, your user name and whether you are allowed to upload avatars are shown.

## Setting How It Looks on VRChat
* * *
| Item | Description |
| ---- | ---- |
| Thumbnail | The avatar's thumbnail. By default, EAUploader's preview image is used. Select an image file (png, jpg) with <span style="color: #00b0f0">Change Thumbnail</span> to change it. When changing, you will be asked "Do you also change the thumbnails that appear in the EAUploader avatar list?"; choose <span style="color: #00b0f0">Yes</span> if you also want to change the preview image in the list. The button next to the thumbnail restores the preview image. |
| Name | The name of the avatar shown in VRChat. **This item is required.** |
| Description | The avatar's description. Use it as a memo for yourself. You can upload without entering it. |
| Visibility | Private: Only you can use it.<br />Public: Published so that anyone can use it. |

:::danger
Avatars distributed or sold online are generally prohibited from being published as Public.
If you did not make the avatar yourself, do not upload it as Public.
:::

### Content Warnings
Set tags according to the avatar's content. You can choose from "Sexually Suggestive", "Adult Language and Themes", "Graphic Violence", "Excessive Gore", and "Extreme Horror".
Using an applicable avatar without tags may be a violation.

## For Avatars Already Uploaded
* * *
For avatars that have already been uploaded to VRChat, the information on VRChat is loaded and filled into each field. The author, creation date, and upload count are also shown as "VRChat Information".

### Updating Only the Avatar Information
When you change the name, description, visibility, content warnings, or thumbnail, <span style="color: #00b0f0">Save</span> and <span style="color: #00b0f0">Discard</span> buttons appear.

* <span style="color: #00b0f0">Save</span> ― Updates only the avatar information on VRChat without re-uploading the avatar.
* <span style="color: #00b0f0">Discard</span> ― Cancels the changes and restores the information on VRChat.

### Blueprint
The Blueprint (Blueprint ID) is a unique ID assigned to an avatar on VRChat. Uploading an avatar with the same Blueprint ID overwrites (updates) the avatar on VRChat.

* <span style="color: #00b0f0">Copy</span> ― Copies the Blueprint ID to the clipboard.
* <span style="color: #00b0f0">Unlink from VRChat</span> ― Assigns a new ID to the avatar. On the next upload, it is uploaded as a separate avatar instead of overwriting the existing one on VRChat.

:::danger
Do not share your Blueprint ID with others. This ID can be used to update and delete the avatar on VRChat, so sharing it may allow others to steal your avatar data.
:::

## Choosing Platforms
* * *
Choose where to upload under "Platform".

| Platform | Description |
| ---- | ---- |
| Windows | The avatar for PC. It is always uploaded. |
| Quest (Android) | When on, the avatar for standalone Quest and smartphones is uploaded too. Requires the Android Build Support module in Unity. |
| iOS | When on, the avatar for iOS is uploaded too. Shown only for accounts that are allowed to upload to iOS. Requires the iOS Build Support module in Unity. |

When you choose multiple platforms, the build target is switched during the upload and restored to Windows afterwards. This can take a while.

If you turn one on without the required module installed, a message guiding you to download the module is shown. Add the module to the Unity version you are using from "Installs" in Unity Hub.

:::caution
Avatars uploaded for Quest (Android) must be Quest-compatible. Check with the avatar's distributor whether it supports Quest.
:::

## Avatar Performance
* * *
VRChat rates avatars on five levels according to their load. Players can hide avatars based on this rating, and heavy avatars may not be shown to some players.

From lightest to heaviest, they are rated **Excellent - Good - Medium - Poor - Very Poor**.
The overall rating is shown; press <span style="color: #00b0f0">Show details</span> to see ratings for each item such as polygons, material slots, and PhysBone components.

VRChat recommends optimizing / reducing avatars to Good, but PC avatars can be uploaded without problems even if they are Very Poor.

:::note
The performance shown in EAUploader is calculated with the PC (Windows) criteria. Avatars for Android have various restrictions, and avatars that exceed the limits are not shown to Android (Quest / smartphone) users.
:::

## Avatar Optimization
* * *
If you install the separate tool "AAO: Avatar Optimizer (by anatawa12)" in your project, you can use <span style="color: #00b0f0">Automatic avatar optimizing (AvatarOptimizer)</span>.

When turned on, AvatarOptimizer's automatic optimization component "Trace And Optimize" is added to the avatar, and the avatar is optimized non-destructively at upload time without changing its appearance. Turning it off removes the component.

* The optimization result is not known until you build. The avatar performance does not reflect the optimized result.
* Optimization settings cannot be changed from EAUploader. To change settings or use other optimization features, use the Unity editor.
* If you turn it on without AvatarOptimizer installed, a message guiding you to install it is shown. AvatarOptimizer can be installed from [Booth](https://booth.pm/ja/items/4885109) or VCC. After installing, run "EAUploader" → "Reload" from the menu.

## Testing
* * *
Pressing <span style="color: #00b0f0">Test</span> at the bottom of the sheet builds the avatar locally (on your own PC) so that you can use it in VRChat. You can check how the avatar works without uploading it.

Avatars built as a test are not uploaded to VRChat, so other players cannot see them.
You can select avatars built as a test from "Other" in the avatar menu of the VRChat app.

:::note
Test can only be used when Unity's build target is Windows.
:::

## Uploading
* * *
1. Enter the avatar's name.
2. Check "The information provided above is accurate and I have the rights to upload this content to VRChat".
3. Press the <span style="color: #00b0f0">Upload</span> button.

Progress is shown during the upload. You can also stop it with <span style="color: #00b0f0">Cancel upload</span>. Once the upload is complete, you can use the avatar in VRChat.

:::note
The upload is done by temporarily creating a copy of the avatar in the scene. Non-destructive tools such as Modular Avatar and AvatarOptimizer process this copy, so EAUploader's managed copy is not changed.
:::

### If the Upload Fails
When the upload fails, the "Upload Failed" message shows the cause. If the avatar's file size exceeds VRChat's limit, for example, please reduce the size of the avatar.
When an error occurs, the "Error Report" is also shown. See "[FAQ and Troubleshooting](/en/faq/troubleshooting/)" for details.
