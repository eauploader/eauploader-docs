---
title: 'Introduction'
description: 'About the EAUploader documentation'
---

## About This Documentation
This documentation explains how to use EAUploader and how to create tools that work with it.

This documentation is based on EAUploader v1.6.2.

## What is EAUploader?
EAUploader (Easy Avatar Uploader for VRChat) is a tool that simplifies Unity so that you can upload avatars to VRChat "easily".
It runs as a Unity editor extension, and lets you do everything from managing avatars and outfits to simple modifications and uploading in a single window.

### What You Can Do with This Tool
* **Manage avatars and outfits** ― Import avatars, outfits, and accessories distributed as `.prefab` or `.unitypackage`, and see them as cards with preview images. You can organize them with tags, memos, and pins.
* **Management that does not break the original data** ― Imported avatars are never modified directly. EAUploader creates its own copy (a Prefab Variant) and manages that instead.
* **Check shaders** ― Get notified when shaders required by an avatar are missing.
* **Simple modifications** ― With the built-in edit tools, you can set the viewpoint position, adjust shape keys (body shape and facial expressions), recolor textures, and dress the avatar with compatible outfits.
* **Convert VRM avatars** ― Convert VRM (0.x) avatars for VRChat by installing the separate tool "VRM Converter for VRChat".
* **Optimize avatars** ― Automatically optimize avatars on upload by installing the separate tool "AvatarOptimizer".
* **Upload avatars** ― Set the name, visibility, and thumbnail, and upload to VRChat. In addition to PC, you can upload for Quest (Android) and iOS at the same time.

### What You Cannot Do with This Tool
EAUploader is designed for avatars that have already been built and completed for VRChat, or VRM avatars.
The built-in edit tools allow simple modifications such as dressing an avatar with outfits made for it (compatible outfits) and adjusting colors and body shape, but not full modifications such as wearing non-compatible outfits or adding gimmicks. For those, use the regular Unity editor, or install an extension that supports EAUploader.

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
| [Modular Avatar](https://modular-avatar.nadena.dev/) | Setting up outfits in Dress Up (Compatible Outfits) without changing the avatar's bone structure |

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
