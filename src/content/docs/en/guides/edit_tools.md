---
title: 'Edit Tools'
description: 'How to use the edit tools built into EAUploader'
---

Edit tools are opened from "Edit tool" on the left side of the Edit screen. A tool is shown overlaid inside the EAUploader window and works on the item selected on the Edit screen.

## Common Operations
* * *
All tools except the Viewpoint Position Editor share the following layout.

| Location | Contents |
| ---- | ---- |
| Top | Tool name, item name, "Unsaved changes" when there are changes, and the <span style="color: #00b0f0">Back</span> button at the top right |
| Left | Tool-specific settings |
| Center | A preview reflecting the changes (operated the same way as the 3D preview on the Edit screen) |
| Bottom | <span style="color: #00b0f0">Revert</span> and <span style="color: #00b0f0">Apply</span> buttons |

* Changes are not saved until you press <span style="color: #00b0f0">Apply</span>. Pressing <span style="color: #00b0f0">Revert</span> returns to the last saved state.
* If you press <span style="color: #00b0f0">Back</span> without saving, a message asks whether to save.
* Changes are saved to EAUploader's managed copy. The imported avatar and outfits and the original textures and materials are not changed.
* Textures and materials created by the tools are saved in the item's folder (`Assets/EAUploader/Prefabs/<item name>/`).
* When you save, the item's preview image is recreated automatically.

## Viewpoint Position Editor
* * *
Sets the avatar's viewpoint position (the position of your eyes in VRChat). Available for avatars with a VRCAvatarDescriptor.

1. Move the vertical and horizontal bars on the left to change the viewpoint position. The position being moved is shown as a <span style="color: red">red dot</span>, and the applied position as a <span style="color: green">green dot</span>.
2. Press the 🔄 button at the top to flip the direction from which you view the avatar.
3. "Actual View" on the right is a preview as seen from the viewpoint position. If you can see the inside of the avatar's face, move the viewpoint until the background is clearly visible. You can switch the aspect ratio between "1:1 (VR)" and "16:9 (PC)".
4. When the position is decided, press the <span style="color: #00b0f0">Apply</span> button.

:::note
The Viewpoint Position Editor has no "unsaved changes" confirmation. If you press <span style="color: #00b0f0">Back</span> without pressing <span style="color: #00b0f0">Apply</span>, the position you moved is discarded.
:::

## Shape Key Editor
* * *
Adjusts and saves the default values of shape keys (blend shapes) such as body shape and face shape. It can also be used to shrink body parts hidden by outfits. Available for items with a mesh that has shape keys.

| Item | Details |
| ---- | ---- |
| Mesh | Choose the mesh to edit. Initially the mesh used for lip sync (or, if none, the mesh with the most shape keys) is selected. |
| Focus on face / Whole body | Points the preview camera at the face or the whole body. |
| Search shape keys | Filters shape keys by name. |
| Show changed only | Shows only shape keys changed from the saved value. |
| Shape key list | Change values with the slider or a number. The button at the right of a row restores that row to the saved value. |
| Reset this mesh / Set all to 0 | Restores all shape keys of the selected mesh, or sets them to 0. |

Shape keys marked "Lip sync" or "Eyelids" are used by VRChat for mouth movement and blinking. Changing their default values may make them look wrong in game, so please be careful.

## Texture Editor
* * *
Changes the colors of textures or replaces them with other images. Available for items with a material that has a texture.

1. Choose the material to edit under "Materials". Materials created by this tool are marked "Edited", and those with changes not yet applied are marked "Changed".
2. Choose the kind of texture to edit (main texture, shadow color, emission, etc.).
3. Under "Adjust colors", adjust **Hue**, **Saturation**, **Brightness**, **Contrast**, and **Tint** (a color multiplied in). Pressing <span style="color: #00b0f0">Replace image...</span> lets you use an image file (png, jpg) as the source.
4. Pressing <span style="color: #00b0f0">Apply</span> creates the adjusted texture and a copy of the material that uses it, and sets them on the item.

* The original textures and materials are not changed. Edited copies are saved in the item's folder when you apply.
* When you edit an edited material again, you can resume from the previous adjustment values. Repeated adjustments do not degrade the image quality.
* <span style="color: #00b0f0">Reset adjustments</span> resets the adjustment values. Pressing <span style="color: #00b0f0">Restore original material</span> returns to the material before editing.

## Dress Up (Compatible Outfits)
* * *
Dresses an avatar with outfits (compatible outfits) and accessories made for that avatar. Available for items whose genre is "Avatar" and that have a VRCAvatarDescriptor.
Import the outfits and accessories into the Avatar List beforehand, and set their genre to "Cloth" or "Accessory".

:::caution
This tool is for outfits made for the avatar being dressed (same bone structure and same pose). Outfits made for other avatars cannot be used.
:::

### Reading the Screen
| Item | Details |
| ---- | ---- |
| Status | Shows whether Modular Avatar is installed and how outfit bones are handled. |
| Wearing | The list of outfits being worn. You can toggle each outfit's visibility or remove it with <span style="color: #00b0f0">Take off</span>. |
| Avatar parts | Parts such as clothes the avatar originally has. Turn off those you do not want to show with the outfit. <span style="color: #00b0f0">Restore original visibility</span> restores the original state. |
| Add outfit | Shows items whose genre is "Cloth" or "Accessory". Search by name or tag and click one to dress the avatar. |

### Dressing the Avatar
* Outfits with a bone structure are fitted to the avatar's bones.
  * **When Modular Avatar is installed** ― The outfit is set up with Modular Avatar, and the avatar's bone structure is not changed.
  * **When Modular Avatar is not installed** ― The outfit's bones are merged into the avatar's bones only in the copy made at upload time. The avatar itself is not changed.
* Accessories without a bone structure are attached by choosing "Attach to" (head, neck, chest, spine, hips, hands, feet, avatar root, etc.).

### Saving
* <span style="color: #00b0f0">Apply</span> ― Saves the dressed state to the avatar being edited.
* <span style="color: #00b0f0">Save as new avatar</span> ― Saves the dressed state as a separate avatar. The original avatar is kept as is, and the new avatar is uploaded to VRChat as a separate avatar.

:::note
Outfits are copied when dressed, so deleting the outfit item from the Avatar List afterwards does not break the outfit on the avatar.
:::
