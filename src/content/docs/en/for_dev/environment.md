---
title: 'Environment Setup'
description: 'How to set up a development environment for EAUploader'
---
# Interested in Development?
Project EAUploader is always looking for development members!
Even if you just want to talk to us!
Please visit our project's Discord server.
[Join here](https://discord.gg/yYFru7brra)
* * *
* * *
The pages in this category are documentation for developing "EAUploader" itself.
For references on making tools that support EAUploader, see the "For Tool Developers" category.
* * *
## Requirements
* Unity 2022.3 (the version recommended by VRChat)
* VRChat Creator Companion (VCC) or ALCOM
* Git

EAUploader depends on VRChat SDK - Avatars 3.7.0 or later. It is automatically added to avatar projects created with VCC.

## Setting Up the Development Environment
You can set up the development environment as follows.

1. Create an empty Avatar project in VCC (VRChat Creator Companion).
   * NOTE: If you have already installed EAUploader in VCC using the method for general users, make sure that Easy Avatar Uploader for VRChat is **Not Installed** in Manage Packages.
2. Create a folder named `tech.uslog.eauploader` under the `Packages` folder in the Unity project you created.
3. In the folder created in the previous step, run the following command.
   * `git clone https://github.com/Project-EAUploader/EAUploader-for-VRChat.git .`
   * NOTE: Do not forget the dot. If you forget it, another folder will be created under `tech.uslog.eauploader`, and EAUploader will not work properly.
4. Restart the Unity project. If the EAUploader window appears automatically, the development environment is ready.

No special build procedure is required for Unity extension development. When you change the source code, Unity builds it automatically. Welcome to the world of Unity editor extensions!

:::caution
EAUploader internally refers to the path `Packages/tech.uslog.eauploader` directly. Always name the folder `tech.uslog.eauploader`.
:::

## Developing and Testing Integrations
The integrations with VRM Converter for VRChat and AvatarOptimizer are enabled only when the respective packages are installed in the project.
To develop or test these features, add the target packages to the project from VCC or elsewhere.

| Integration | Package name | Enabled when | Symbol |
| ---- | ---- | ---- | ---- |
| VRM Converter for VRChat | `jp.pokemori.vrm-converter-for-vrchat` | 41.1.0 or later | `HAS_VRM` |
| AAO: Avatar Optimizer | `com.anatawa12.avatar-optimizer` | 1.7.0 or later | `HAS_AAO` |

The symbols are defined in the Version Defines of `EAUploader.Editor.asmdef` and are used for conditional compilation, as in `#if HAS_VRM`.
At runtime, the checks (`EAUploaderCore.HasVRM`, `EAUploaderCore.HasAAO`) are based on the contents of `Packages/packages-lock.json`. The VRM check also requires UniVRM (`com.vrmc.univrm`) in addition to VRM Converter for VRChat.

## Tips for Testing
* EAUploader's initialization runs when Unity starts and after scripts are recompiled. To run the initialization again, use "EAUploader" → "Reload" from the menu.
* Logs output to Unity's Console are also written to the `EAUploaderLog` folder directly under the project folder. See "[Logging Function Specification](/en/for_dev/logging/)" for details.
* Running "Window" → "Error Report" from the menu outputs a test error log so that you can check the Error Report window.

## Contributing
There are two ways to participate in the project.

* Join [Discord](https://discord.gg/yYFru7brra) and take charge of tasks as a member of the GitHub organization (Project-EAUploader) after consulting with us.
* Fork the project and make a pull request for fixes or new features (no declaration required).

Either is fine. However, remember to check the project schedule and ongoing tasks [here](https://github.com/orgs/Project-EAUploader/projects/1) before starting work.
