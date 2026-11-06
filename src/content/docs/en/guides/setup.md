---
title: 'Edit Screen'
description: 'How to use the Edit screen'
---

On the **Edit screen**, you edit information such as the name and tags of the selected item, or modify it with edit tools, while checking it in 3D.
It opens when you click a card on the Avatar List or press the card's <span style="color: #00b0f0">Edit</span> button.

## Screen Layout
* * *
A 3D preview of the item fills the screen, with the following panels overlaid on it.

| Location | Contents |
| ---- | ---- |
| Top | <span style="color: #00b0f0">Back to list</span> button, the name and genre of the open item |
| Left: "Edit tool" | The state of the item and the list of edit tools |
| Right: "Item Info" | Thumbnail, name, genre, tags, memo, and other information |

The left and right panels can be collapsed with the button at the top right of each panel. A collapsed panel can be reopened with the button shown at the edge of the screen.

## 3D Preview
* * *
| Operation | Action |
| ---- | ---- |
| Drag with left click | Rotate |
| Drag with right click | Move |
| Mouse wheel up/down | Zoom |
| Reset button | Reset the view |

## Checking the State of an Item
* * *
At the top of "Edit tool", the state of the item is shown.

| Display | Meaning and what to do |
| ---- | ---- |
| ✅ Ready to upload | You can upload it as is. |
| No VRCAvatarDescriptor | This is not an avatar for VRChat. This is fine for outfits and accessories. If the avatar is distributed for VRChat, check that you have selected the correct Prefab. |
| No Shader | Shaders required by the item are not in the project. See "[Shader not found error](/en/faq/missing_shader/)". |
| VRM Avatar needs to convert to VRChat Avatar | This is a VRM avatar. Convert it with the <span style="color: #00b0f0">Convert to VRChat Avatar</span> button. See "[Using VRM Avatars](/en/guides/vrm/)" for details. |
| This avatar is a converted VRM, Viewpoint Position may need to be adjusted. | This avatar was converted from VRM. Check the viewpoint position with the "[Viewpoint Position Editor](/en/guides/edit_tools/#viewpoint-position-editor)". |

## Using Edit Tools
* * *
"Edit tool" lists tools for adjusting items. Press the button with a tool's name to open the tool inside the EAUploader window.

Pressing ▼ to the right of the button shows the tool's description, version, and author. Tools that cannot be used with the selected item have their buttons disabled, and the reason is shown.

EAUploader comes with the following edit tools. See "[Edit Tools](/en/guides/edit_tools/)" for how to use them.

| Tool | Details |
| ---- | ---- |
| Viewpoint Position Editor | Sets the avatar's viewpoint position. |
| Shape Key Editor | Adjusts the default values of shape keys such as body shape and facial expressions. |
| Texture Editor | Changes the colors of textures or replaces them with other images. |
| Dress Up (Compatible Outfits) | Dresses the avatar with outfits and accessories made for it. |

Installing extensions that support EAUploader adds tools here.

## Editing Item Info
* * *
In "Item Info" on the right, you can edit the item's information. Changes are saved immediately.

### Thumbnail
The item's thumbnail (the preview image shown in the list).

* 🔄 button (Regenerate Preview) ― Recreates the preview image from the item's current appearance. Use it after changing the appearance with an edit tool, for example.
* <span style="color: #00b0f0">Change Thumbnail</span> ― Replaces the thumbnail with an image file (png, jpg).

### Name
The item's name. It is applied when the input field loses focus or when you press Enter.
Renaming changes the file name of EAUploader's managed copy. The name of the source Prefab you imported does not change.

### Genre
Choose from "Avatar", "Cloth", "Accessory", and "Other". Only items whose genre is "Avatar" can be uploaded.
The genre is used for category filtering in the Avatar List and for the list of outfits in Dress Up (Compatible Outfits).

### Tags
When you type in the input field, existing tags are suggested. Choose a suggestion or press Enter to add a tag. For a tag name that does not exist yet, add it with <span style="color: #00b0f0">Create new tag</span>.
Press × on an added tag to remove it from the item.

Tag names can be up to 32 characters. The tags and groups of the whole project can be managed with <span style="color: #00b0f0">Tag Settings</span> on the Avatar List.

### Memo
You can leave any notes. They are saved when the input field loses focus.

### Pin and Hide from list
* **Pin** ― When on, the item is shown at the top of the Avatar List.
* **Hide from list** ― When on, the item is no longer shown in the Avatar List (turn on "Show hidden items" to see it).

Pin and Hide cannot be set at the same time.

### Details
Shows the last updated date, avatar height (viewpoint height), Blueprint ID, and asset path (the path of EAUploader's managed copy).
The Blueprint ID is masked, and you can toggle its display with the 👁 button. The Blueprint ID and the asset path can be copied to the clipboard with the copy buttons.

:::danger
Do not share your Blueprint ID with others. See "[Uploading Avatars](/en/guides/upload/#blueprint)" for details.
:::

### Duplicate and Delete
* <span style="color: #00b0f0">Duplicate</span> ― Creates another copy of the item and opens the duplicate. Use it when you want to keep the state before modifying, or make a different modification of the same avatar. The duplicate is also a managed copy based on the imported source Prefab, so the original data is not affected.
* <span style="color: #00b0f0">Delete</span> ― Deletes the item. See "[Deleting Items](/en/guides/import/#deleting-items)" for details.

## Going to Upload
* * *
For items whose genre is "Avatar", a <span style="color: #00b0f0">Go to upload</span> button is shown at the bottom of Item Info. Pressing it opens the upload sheet on the right side of the screen.
See "[Uploading Avatars](/en/guides/upload/)" for how to use it.
