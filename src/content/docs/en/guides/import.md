---
title: 'Importing and Managing Avatars'
description: 'How to use the Avatar List screen'
---

The **Avatar List** is the first screen shown when you open EAUploader. Here you import avatars, outfits, and accessories, manage them in a list, and change tool settings.

## How EAUploader Manages Items
* * *
EAUploader **never modifies** the avatars and outfits (Prefabs) you import.
On import, it creates its own copy based on that Prefab (a Prefab Variant) in the following folder, and from then on only edits and uploads this copy.

```
Assets/EAUploader/Prefabs/<item name>/<item name>.prefab
```

So even if you rename an item or modify it with edit tools in EAUploader, the original data you got from the avatar's distributor is kept as is.

:::note
In projects that used an older version of EAUploader, the first start after updating shows "EAUploader now manages prefabs as variants in the following folder". Press <span style="color: #00b0f0">Migrate</span> to move the items that were in the list to the new management method. If you press <span style="color: #00b0f0">Later</span>, you will be asked again at the next start.
:::

## Importing Items
* * *
### Supported File Formats
| Format | Description |
| ---- | ---- |
| `.unitypackage` | Package. The avatar itself, shaders, outfits, and more are distributed bundled together. All Prefabs it contains are added to the list. |
| `.prefab` | Prefab. You can select one inside this project's `Assets` folder. |
| `.vrm` | VRM avatar (ver. 0.x only). Requires VRM Converter for VRChat. See "[Using VRM Avatars](/en/guides/vrm/)" for details. |

:::caution
EAUploader can upload **avatars made for VRChat**. Please prepare an avatar that is sold or distributed for VRChat.
:::

### Adding from the Import Window
Press the <span style="color: #00b0f0">Import</span> button at the top of the Avatar List to open the import window.

| Button | Details |
| ---- | ---- |
| Import | Select and import a `.prefab` or `.unitypackage`. |
| Import from folder | Imports all `.prefab` and `.unitypackage` files in the selected folder (including its subfolders). A list of the target files is shown before importing. |
| Import VRM | Imports a `.vrm` file. Available only when VRM Converter for VRChat is installed. |
| Import Shaders | Imports a `.unitypackage` that contains shaders. |
| Show existing shaders | Shows a list of shaders installed in the project. Some shaders not supported by VRChat are excluded. |

When you select a `.unitypackage`, Unity's import confirmation window is not shown, and all contents of the package are added to the project.

:::note
When selecting a `.prefab`, choose one inside this project's `Assets` folder. `.prefab` files outside the project or inside EAUploader's internal folder (`Assets/EAUploader`) cannot be selected. To bring in assets from another project, use a `.unitypackage`.
Use this method also when you want to add an avatar that is already in the project to the list.
:::

### Adding by Drag and Drop
You can also import by dragging and dropping files from Explorer onto the Avatar List.
In addition to `.unitypackage` and `.prefab`, you can also drop `.vrm` files if VRM Converter for VRChat is installed.

### What Happens After Importing
* **Shader check** ― If shaders set on the avatar are not in the project, the "Shader Issues Found" message is shown. In that case, install the shaders by following "[Shader not found error](/en/faq/missing_shader/)".
* **Genre setting** ― Avatars for VRChat automatically get the genre "Avatar". When Prefabs other than avatars (outfits, accessories, etc.) are imported, the "Outfit Settings" window is shown. Choose a genre for each from "Cloth", "Accessory", and "Other", and press <span style="color: #00b0f0">Save</span>. Unchecked items are not set. You can change the genre later on the Edit screen.
* **Preview image creation** ― Creates a preview image to show in the list.

## The Item List
* * *
### Reading the Cards
Items are shown as cards. A card shows the preview image, name, last modified date, and attached tags. Pinned and hidden items have a mark.

Items that cannot be uploaded show the following.

| Display | Meaning |
| ---- | ---- |
| Needs conversion | This is a VRM avatar. It needs to be converted to a VRChat avatar before uploading. |
| Can't be uploaded | It is not an avatar for VRChat (no VRCAvatarDescriptor), or required shaders are not in the project. Outfits and accessories also show this. |

### Card Operations
* Click a card to open the item's **Edit screen**.
* Hovering over a card shows <span style="color: #00b0f0">Edit</span>, <span style="color: #00b0f0">Upload</span> (only for items whose genre is "Avatar"), and <span style="color: #00b0f0">Delete</span> buttons.
* Right-clicking a card shows the following menu.

| Menu | Details |
| ---- | ---- |
| Pin / Unpin | Pinned items are shown at the top of the list regardless of the sort order. |
| Hide / Show | Hidden items are normally no longer shown in the list. |
| Show in Project | Shows the Prefab in Unity's Project window. |
| Delete | Deletes the item. |

### Search, Filter, and Sort
| Feature | Details |
| ---- | ---- |
| Search | Typing in "Search by name or tag" shows only items whose name or tags contain the text. The list is filtered as you type. |
| Category | Choose the genres to show from "Avatar", "Cloth", and "Items and Others". You can select multiple; when nothing is selected, "All" is shown. |
| Sort | Choose from "Last Modified Descending", "Last Modified Ascending", "Name Descending", and "Name Ascending". Pinned items are always shown first. |
| Filter by tag | Shows only items that have **all** of the selected tags. The button shows the number of selected tags. |
| Show hidden items | When on, hidden items are also shown in the list. |
| Card size | Change the size of the cards with the slider. The size is saved. |

## Managing Tags
* * *
Tags let you freely categorize avatars and outfits (e.g., "Favorites", "Winter clothes", "Modified").
Adding and removing tags on an item is done in "Item Info" on the Edit screen. ([Edit Screen](/en/guides/setup/#tags))

Pressing the <span style="color: #00b0f0">Tag Settings</span> button lets you manage the tags of the whole project.

* **Add tag** ― Enter a new tag name and add it. You can also choose a group when adding it.
* **Add group** ― Creates a group for organizing tags. A tag can belong to only one group.
* **Delete** ― Deleting a tag removes it from all items. Deleting a group keeps the tags in it.

:::note
Tag names and group names can be up to 32 characters. Upper and lower case are not distinguished; tags that differ only in case are treated as the same tag.
:::

## Deleting Items
* * *
You can delete an item from the card's <span style="color: #00b0f0">Delete</span> button, the right-click menu, or <span style="color: #00b0f0">Delete</span> on the Edit screen.

When you choose to delete, a confirmation window opens and searches for related assets to delete together.
In addition to EAUploader's managed copy, **the source Prefab you imported and materials and textures used only by that item are also deleted**. Assets used by other items or scenes are kept.
Open "Deletion details" to see the list of files that will actually be deleted.

:::danger
Deleted items and assets are also deleted from the Unity project and cannot be restored.
Check what will be deleted in the details before deleting.
:::

## Settings
* * *
With the <span style="color: #00b0f0">Settings</span> button at the top of the Avatar List, you can change the following settings.

| Item | Details |
| ---- | ---- |
| Language | Choose EAUploader's display language from "English", "日本語", and "한국어". When you change it, a confirmation message appears. Press <span style="color: #00b0f0">Yes</span> to reload the VRChat SDK and switch the display. |
| Theme | Choose the color scheme from "Light", "Dark", and "Pastel". Themes are an experimental feature. |
| Show error report window | When off, the error report is no longer shown automatically when an error occurs. |
| Version | The version of EAUploader installed. Please include the version when contacting us. |
| Open log report | Opens the folder where EAUploader's log files are saved (`EAUploaderLog` directly under the project folder). When reporting a bug, attaching the log file helps us investigate the cause. |

:::note
The "Send feedback" feature and automatic log sending from earlier versions are currently suspended. Please send feedback and bug reports via [Discord](https://discord.gg/yYFru7brra) or [GitHub](https://github.com/eauploader/EAUploader-for-VRChat/issues).
:::

## Exit Unity
* * *
Pressing the <span style="color: #00b0f0">Exit Unity</span> button at the top of the Avatar List exits Unity after a confirmation.
