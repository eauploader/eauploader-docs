---
title: 'Introduction'
description: 'About the EAUploader documentation'
---

## About This Documentation
This documentation explains how to use EAUploader and how to create tools that work with it.

This documentation is based on EAUploader v1.4.6.

## What is EAUploader?
EAUploader (Easy Avatar Uploader for VRChat) is a tool that simplifies Unity so that you can upload avatars to VRChat "easily".
It runs as a Unity editor extension, and lets you do everything from importing an avatar to uploading it in a single window.

### What You Can Do with This Tool
* **Import avatars** ― Import avatars distributed as `.prefab` or `.unitypackage` with a single button.
* **Manage avatars** ― Manage the avatars in your project in a list with preview images.
* **Check shaders** ― Get notified when shaders required by an avatar are missing.
* **Convert VRM avatars** ― Convert VRM (0.x) avatars for VRChat by installing the separate tool "VRM Converter for VRChat".
* **Adjust the viewpoint position** ― Set the viewpoint position with the built-in edit tool "Viewpoint Position Editor".
* **Optimize avatars** ― Automatically optimize avatars on upload by installing the separate tool "AvatarOptimizer".
* **Upload avatars** ― Set the name, visibility, and thumbnail, and upload to VRChat. Switching between PC and Android (Quest) builds is also supported.

### What You Cannot Do with This Tool
EAUploader only supports avatars that have already been built and completed for VRChat, or VRM avatars.
Avatar modifications such as changing outfits, adding accessories, or changing facial expressions are not supported. To modify avatars, use the regular Unity editor, or install an extension that supports EAUploader.

## Requirements
| Item | Details |
| ---- | ---- |
| Unity | 2022.3 |
| VRChat SDK (Avatars) | 3.7.0 or later |
| Project management software | VRChat Creator Companion (VCC) or ALCOM |

### Supported Tools (Optional)
| Tool | Features enabled when installed |
| ---- | ---- |
| [VRM Converter for VRChat](https://booth.pm/ja/items/1025226) | Importing and converting VRM (0.x) avatars |
| [AAO: Avatar Optimizer](https://booth.pm/ja/items/4885109) | Automatic optimization on upload |

## Structure of This Documentation
| Category | Contents |
| ---- | ---- |
| Guides | How to install EAUploader and how to use each screen. If you are new, start with the "[Guide for New Users](/en/guides/getting_started/)". |
| F&Q | Frequently asked questions and how to solve errors. |
| For Tool Developers | How to create extensions (plugins) that work with EAUploader. |
| For Developers | Materials for those who want to take part in developing EAUploader itself. |
| API Reference | A list of the APIs EAUploader provides. |

## Suggest Edits
If you find anything in this documentation that should be improved, added, or removed, please fix it on GitHub via "Edit page" at the bottom left of each page and send us a suggestion.
