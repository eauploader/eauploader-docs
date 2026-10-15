---
title: 'Importing and Managing Avatars'
description: 'How to use the Import/Settings tab'
---

In the **Import/Settings** tab, you import avatars and shaders, manage the models in your project, and change tool settings.

The screen is divided into three parts from left to right: "Import / Settings", "Manage Model", and "EA Library".

## Importing Avatars
* * *
### Supported File Formats
The avatar file formats EAUploader can import are as follows.

| Format | Description |
| ---- | ---- |
| `.prefab` | Prefab. A bundle of the avatar itself (the body, outfits, and other parts). In general, a prefab = the avatar itself. |
| `.unitypackage` | Package. Avatars are often distributed with the avatar itself, shaders, outfits, and more bundled together. |
| `.vrm` | VRM avatar (ver. 0.x only). Requires VRM Converter for VRChat. See "[Using VRM Avatars](/en/guides/vrm/)" for details. |

:::caution
EAUploader supports **avatars made for VRChat**. Please prepare an avatar that is sold or distributed for VRChat.
:::

### Importing by Selecting a File
Press the <span style="color: #00b0f0">Import</span> button under <span style="color: #00b0f0">Import Avatars</span> and select the downloaded avatar file (`.prefab` or `.unitypackage`).

When you select a `.unitypackage`, Unity's import confirmation window is not shown, and all contents of the package are added to the project.

### Importing a Whole Folder
To import multiple avatars at once, press the <span style="color: #00b0f0">Import from folder</span> button and select a folder.

All `.prefab` and `.unitypackage` files in the selected folder (including its subfolders) are imported. A list of files to be imported is shown first; check it and press <span style="color: #00b0f0">Import</span>.

### Importing by Drag and Drop
You can also import by dragging and dropping files from Explorer onto the "Manage Model" list.
In addition to `.unitypackage` and `.prefab`, you can also drop `.vrm` files if VRM Converter for VRChat is installed.

### What Happens After Importing
When an avatar (prefab) is imported, EAUploader automatically does the following.

* **Shader check** ― If shaders set on the avatar are not in the project, the "Shader Issues Found" message is shown. In that case, install the shaders by following "[Shader not found error](/en/faq/missing_shader/)".
* **Preview image creation** ― Creates a preview image to show in the list.

## Importing Shaders
* * *
With the <span style="color: #00b0f0">Import Shaders</span> button, you can import a `.unitypackage` file that contains shaders.

Pressing the <span style="color: #00b0f0">Show existing shaders</span> button shows a list of shaders installed in the project.
Some shaders not supported by VRChat are excluded from the list.

:::tip
Shaders are also distributed as `.unitypackage`, but we strongly recommend adding shaders that support VCC (or ALCOM) from VCC.
Managing them in VCC lets you update them easily.
:::

## Manage Model
* * *
The "Manage Model" list in the center shows **all `.prefab` files** in the project's `Assets` folder. This means things other than avatars (outfits, accessories, and so on) may also appear.

### Reading the List
Each item shows a preview image, the prefab's name, and the last modified date.
If there is a problem with an avatar, the following warnings are shown.

| Warning | Meaning |
| ---- | ---- |
| Can't be uploaded | This is not an avatar for VRChat (it has no VRCAvatarDescriptor). Prefabs of outfits and accessories also show this. |
| VRM Avatar needs to convert to VRChat Avatar | This is a VRM avatar. It needs to be converted before uploading. |
| Cannot find the configured shader. | Shaders required by the avatar are not in the project. |

Clicking a preview image shows it in a larger size. You can also recreate the preview image with <span style="color: #00b0f0">Regenerate Preview</span> in the window that opens.

### Search, Sort, and Filter
* **Search** ― Enter part of a name in the input field at the top and press <span style="color: #00b0f0">Search</span> to show only items whose names contain the text.
* **Sort** ― Choose from "Last Modified Descending", "Last Modified Ascending", "Name Descending", and "Name Ascending".
* **Filter** ― Choose from "Do not show hidden models", "Show hidden models", and "Show only hidden models".

### Hiding Items from the List
Items with warnings show a <span style="color: #00b0f0">Hide</span> button. Pressing it marks that `.prefab` as hidden, and it no longer appears in this list or in the lists of the Setup and Upload tabs.
Use this feature if outfits or accessories you do not need appear in the list.

You can see hidden items by changing the filter to "Show hidden models", and restore them with the <span style="color: #00b0f0">Show</span> button.

:::note
Hiding an item does not delete the prefab itself from the project.
:::

### Renaming, Copying, and Deleting
The buttons on the right of each item let you do the following.

| Button | Details |
| ---- | ---- |
| ✏ (pencil) | Renames the prefab. |
| ⧉ (copy) | Duplicates the prefab. After duplicating, a window for entering a new name appears. Use this when you want to keep the avatar before modifying it, for example. |
| 🗑 (trash) | Deletes the prefab. |

:::danger
Deleted prefabs are also deleted from the Unity project. This cannot be undone, so please be careful.
:::

## EA Library (In-Tool Guide)
* * *
The "EA Library" on the right contains articles about how to use the tool, shaders, extensions, and uploading. If there is something you do not understand, look it up here.

* You can search articles with the input field at the top.
* You can filter articles by tag with the dropdown.
* Select an article to show its content. Use the back button to return to the list.

Pressing the `>` button at the top right of "Manage Model" closes the EA Library so that the model list is shown wider. Press it again to reopen. The open/closed state is saved.

## Settings
* * *
In "Settings" at the bottom left, you can change the following settings and perform the following operations.

### Language
You can change EAUploader's display language to "English", "日本語", or "한국어".
When you change the language, a confirmation message appears. Press <span style="color: #00b0f0">Yes</span> to reload the VRChat SDK and switch the display.

### Theme
You can choose EAUploader's color scheme from "Light" and "Dark".

:::caution
Themes are an experimental feature. Some parts may be hard to see.
:::

### Version
Shows the version of EAUploader currently installed. Please include the version when contacting us.

### Open log report
Pressing the <span style="color: #00b0f0">Open log report</span> button opens the folder where EAUploader's log files are saved (`EAUploaderLog` directly under the project folder).
When reporting a bug, attaching the log file helps us investigate the cause.

:::note
The "Send feedback" feature and automatic log sending from earlier versions are currently suspended. Please send feedback and bug reports via [Discord](https://discord.gg/yYFru7brra) or [GitHub](https://github.com/Project-EAUploader/EAUploader-for-VRChat/issues).
:::

### Exit Unity
Pressing the <span style="color: #00b0f0">Exit Unity</span> button exits Unity after a confirmation.
