---
title: 'Localization and Resources'
description: 'Specification of EAUploader translation files, help messages, and EA Library articles'
---
# Interested in Development?
Project EAUploader is always looking for development members!
Even if you just want to talk to us!
Please visit our project's Discord server.
[Join here](https://discord.gg/yYFru7brra)
* * *
* * *
This page explains how localization works in EAUploader and how to write help messages and EA Library articles.
If you would like to help with translation, please read this page too.

This document is based on EAUploader v1.4.6.

## How Localization Works
* * *
EAUploader gets the string for each language using the **English string as the key**. English has no translation file, and the key is shown as is.

| Language | Language code | Translation file |
| ---- | ---- | ---- |
| English | `en` | None (the key is shown as is) |
| 日本語 (Japanese) | `ja` | `Editor/Resources/Localization/ja.json` |
| 한국어 (Korean) | `ko` | `Editor/Resources/Localization/ko.json` |

The current language is saved in `language` of `Assets/EAUploader/settings.json`. The default is `ja`.

### Translation File Format
A translation file is a JSON file in the following format. `name` is the name shown in the language selection dropdown.

```json
{
  "name": "日本語",
  "items": [
    {
      "key": "Import",
      "value": "インポート"
    },
    {
      "key": "Version: ",
      "value": "バージョン: "
    }
  ]
}
```

* Duplicate `key`s cause an error.
* `value` can use `string.Format` format items (such as `{0}`).

### Translating UXML Strings
Write English strings directly in UXML.

```xml
<ui:Label text="Import Avatars" class="text-lg pb-2 font-bold" />
```

The main window runs `LanguageUtility.Localization` every 100ms and replaces the `text` of every `TextElement` (`Label`, `Button`, etc.) in the window with the `value` when it exactly matches a `key` in the translation file.
In windows other than the main window, call `LanguageUtility.Localization(rootVisualElement)` in `CreateGUI` or similar.

### Translating C# Strings
To set strings from C#, use `T7e.Get`.

```csharp
var label = new Label(T7e.Get("Ready to upload"));

// With format items
T7e.Get("Avatar bundle size is too large. The maximum size is {0} MB, but the current size is {1} MB", limit, fileSize);
```

If there is no corresponding translation, the key is returned as is.

## Adding a Language
* * *
To add a new language, prepare all of the following files. Use the language code (e.g., `zh-cn`) for file and folder names.

| What to add | Location |
| ---- | ---- |
| UI translation file | `Editor/Resources/Localization/{language code}.json` |
| Help messages | `Editor/Resources/Message/{language code}/{message number}.txt` |
| EA Library articles | `Editor/Resources/UI/TabContents/ImportSettings/Contents/EALibrary/Articles/EAUploader/{language code}/` |
| Viewpoint Position Editor translation file | `Editor/Resources/UI/TabContents/Setup/Editor/ViewpointPositionEditor/Localization/{language code}.json` |

:::caution
Available languages are determined automatically from the JSON files in `Editor/Resources/Localization`.
If you add only the UI translation file without the other files, errors will occur when opening help, the EA Library, or the Viewpoint Position Editor.
:::

## Help Messages
* * *
Pressing a "Help" button (`HelpButton`) shown throughout the screen opens the help message window (`EAUploaderMessageWindow`).
Messages are loaded for the current language from `Editor/Resources/Message/{language code}/{message number}.txt`.

In UXML, specify the message number in `msg-id`.

```xml
<eau:HelpButton msg-id="100" class="pb-2" />
```

From C#, you can show it with `EAUploaderMessageWindow.ShowMsg(100)` (`HelpButtonAPI.ShowMessage(100)` in the public API).

### Message Numbers in Use
| Number | Where it is shown |
| ---- | ---- |
| 100 | Import/Settings tab: Import Avatars |
| 101 | Import/Settings tab: Import VRM |
| 102 | Import/Settings tab: Import Shaders |
| 103 | Setup tab: Edit tool |
| 104 | Setup tab: Import extentions |
| 105 | Upload tab: Select an Avatar to Upload |
| 107 | Shader error |
| 108 | Preview controls |
| 109 | Upload tab: Avatar Info |
| 111 | Upload tab: Build as Test |
| 112 | Upload tab: Upload |
| 113 | Upload tab: Avatar Performance |
| 114 | Upload tab: Platform |
| 115 | Upload tab: Set thumbnail |
| 116 | Import/Settings tab: Manage Model |
| 117 | Upload tab: Blueprint |
| 200 | VRM conversion window |
| 201 | Viewpoint Position Editor |
| 202 | Upload tab: Avatar Optimization |
| 203 | Guidance for installing AvatarOptimizer |

When adding a new message, use an unused number and add the file to the folders of all languages.

## Article Format
* * *
Help messages and EA Library articles are rendered by `ArticleRenderer`. Articles are written with the following tags.

| Tag | Format | Contents |
| ---- | ---- | ---- |
| `<t>` | `<t>Heading</t>` | Shows a heading. |
| `<txt>` | `<txt>Body</txt>` | Shows body text. Unity rich text (`<size=16>`, `<color=red>`, `<b>`, `<i>`, `<u>`, etc.) can be used. |
| `<image>` | `<image>file name, width</image>` | Shows an image. The file name is a path relative to the article file. The width can be omitted. |
| `<button>` | `<button>label, style, URL</button>` | Shows a button that opens the URL when pressed. Write `Main`, `Sub`, or `Link` as the style. (In the current implementation, the style makes no visual difference.) |
| `<hr>` | `<hr>color, margin</hr>` | Shows a horizontal line. The color can be `black` or `#RRGGBB`. |
| `<section>` | `<section>image, width, body</section>` | Shows an image and body text side by side. The image is shown 200px high. (In the current implementation, the width is not used.) |

Example:

```
<t>Shader error</t>
<txt>
<size=14>The applied shader does not exist in the project.
Check the required shader with the distributor and import it into the project.</size>
</txt>
<button>Join Discord, Main, https://discord.gg/yYFru7brra</button>
```

:::caution
`<button>` and `<section>` separate items with `,`, so labels and body text cannot contain `,`.
:::

## EA Library Articles
* * *
EA Library articles are stored in the following folder for each language. Create one folder per article.

```
Editor/Resources/UI/TabContents/ImportSettings/Contents/EALibrary/Articles/EAUploader/
└── en/
    ├── 001_tutorial1/
    │   ├── tutorial1.json   Article information
    │   ├── Content.txt      Article body
    │   ├── thumbnail.png    Thumbnail
    │   └── image1.png       Images used in the body
    └── 002_tutorial2/
        └── ...
```

Article information is written in a JSON file in the following format. Since the `.json` file in the folder is read as the article information, do not put more than one `.json` file in a folder.

```json
{
  "title": "Introduction",
  "date": "2023-12-07",
  "tags": ["Tutorial"],
  "keywords": ["Tutorial", "Start", "Guide", "Introduction", "How to use"],
  "contentFile": "Content.txt",
  "thumbnail": "thumbnail.png"
}
```

| Item | Contents |
| ---- | ---- |
| `title` | Title of the article. Shown in the list. You can break lines with `\n`. |
| `date` | Creation date of the article |
| `tags` | Tags. Used for filtering by tag in the EA Library. |
| `keywords` | Keywords used for search |
| `contentFile` | File name of the body (relative to the JSON file) |
| `thumbnail` | File name of the thumbnail (relative to the JSON file) |

Write the body in the "Article Format".

:::note
In the current implementation, only articles whose **title and keywords both** contain the search term are shown in search results. We recommend also adding words from the title to the keywords.
:::
