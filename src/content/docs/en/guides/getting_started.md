---
title: 'Guide for New Users'
description: 'This guide is not produced by an avatar shop, but by Project EAUploader.'
---
## Precautions & Disclaimer
* * *
EAUploader is developed and provided as OSS (Open Source Software). It is not a product.
Project EAUploader (uslog.tech) is not responsible for any damages that may occur as a result of using EAUploader.

Unity has various bugs. Occasionally, unpredictable, unresolved bugs or crashes may occur. In the worst case, the project may fail to launch (the project may break).
Please make sure to back up your projects.
Also, please save important data such as avatar data outside of the project.

## Description of What to Install
* * *
### Software to Install

**・Unity Hub**
- A software to manage Unity.
  (Since Unity has many versions, each acting as independent software, Unity Hub manages and authenticates licenses for Unity.)

**・Unity Editor**
- The main body of Unity. However, in this guide, it will be installed automatically using the following Creator Companion.

**・Creator Companion**
- A Unity project management software distributed by VRChat.
  Commonly known as VCC.
  You can also use ALCOM, a compatible alternative, instead of VCC.

**Packages to Install (Additional features and tools to install in Unity)**

**・VRCSDK**
- A package distributed by VRChat for creating, editing, and uploading avatars and worlds. It is automatically added to projects created with VCC.

**・EAUploader**
- The main body of EAUploader. It operates within Unity.

Operations in EAUploader make changes in Unity. Unity normally keeps its working state, so you do not need to save when you finish.
  Uploading avatars through EAUploader uses the features of VRCSDK and is the same as uploading using VRCSDK.

### If You Have Problems

<aside>
💡 If you encounter problems during the installation or use of EAUploader, or if something happens that is not explained and you cannot resolve it
</aside>

- Please join the official EAUploader Discord server. ▷ [https://discord.gg/yYFru7brra](https://discord.gg/yYFru7brra)
- If the URL is not available, please check the official website. ▷ [https://eauploader.uslog.tech](https://eauploader.uslog.tech/)

<aside>
💡 If you encounter problems with Unity or VRCSDK, or issues related to purchased avatars, gimmicks, or tools
</aside>

- Please seek support from their respective distributors.
- If there is no support available, seek help elsewhere, such as on platform X.

## How to Install
* * *
### Download Unity Hub

Download Unity Hub from the following link:
[https://unity.com/download](https://unity.com/download)

![Untitled](getting_started/1.png)

### Launch Unity Hub

Run the downloaded file UnityHubSetup.exe.
After launching, you will be asked to sign in.

![Untitled](getting_started/2.png)

If you are new, click <span style="color: #00B0F0">Create account</span> below the Sign In button.

### Complete the Sign-In

Follow the screens to create an account and sign in.

![Untitled](getting_started/3.png)

Once signed in, click <span style="color: #00b0f0">Got it</span> to proceed.

*Note: The display may vary depending on the version of Unity Hub*

### Skip Install Unity Editor

You will be taken to the Unity Editor installation screen.

![Untitled](getting_started/4.png)

Click <span style="color: #00b0f0">Skip installation</span> to skip this step.
Later, the installation will be done through VCC.

### License Authentication

You will return to the normal screen of Unity Hub. A message asking for license authentication will appear.

![Untitled](getting_started/5.png)

Go to the license authentication screen from the button in the upper right corner.

### Add a License

You will move to the license management screen. Make sure no licenses are displayed.

![Untitled](getting_started/6.png)

Click the <span style="color: #00b0f0">Add license</span> button.

Authenticate with a personal license (free).

![Untitled](getting_started/7.png)

Click the <span style="color: #00b0f0">Get a free personal license</span> button. This license allows you to use all the regular features of Unity.
The license will be activated for your Unity account.

*It's okay to authenticate using another method as long as the license is authenticated.*

Agree and obtain the license.

![Untitled](getting_started/8.png)

This is an agreement with Unity. Please check the content and agree.

Once you've added the license, you're done with the operations in Unity Hub.

### Install Creator Companion

Download the project management software distributed by VRChat from the following URL:
[https://vrchat.com/home/download](https://vrchat.com/home/download)

![Untitled](getting_started/9.png)

Be careful as there are several download buttons. Click <span style="color: #00b0f0">Download the Creator Companion</span> to download.

*This software is referred to as VCC.*

Run the downloaded file and proceed with the installation.

![Untitled](getting_started/10.png)

### Launch VCC

Once installed, start the software. Guidance will begin.

![Untitled](getting_started/11.png)

Click <span style="color: #00b0f0">Show Me Around</span> to start the tutorial.

Proceed, and you will move to the following screen.

![Untitled](getting_started/12.png)

Click <span style="color: #00b0f0">Continue</span> to proceed.

### Install Unity Editor

After a brief loading time, a log stating that the Unity Editor is not found will appear.

![Untitled](getting_started/13.png)

Click <span style="color: #00b0f0">Continue</span> to proceed.

You will be guided to install Unity.

![Untitled](getting_started/14.png)

Click <span style="color: #00b0f0">Install Unity</span> to proceed.

![Untitled](getting_started/15.png)

You will see the installation screen for the latest version of Unity recommended by the official. Click the Install button to proceed with the installation.

*Note: Installing Unity may take some time*

### Unity Installation Complete

Once the installation is complete, the screen will transition.

![Untitled](getting_started/16.png)

Click <span style="color: #00b0f0">Continue</span> to proceed.

### Unity Setup Complete

You have completed the setup of Unity and VCC.

![Untitled](getting_started/17.png)

Next, create a new project by selecting <span style="color: #00b0f0">Create New Project</span>.

### Create a Project

Projects are broadly divided into four types.
There are two types of projects for avatars and worlds each for Unity 2019 and 2022.

*Note: The display may vary depending on the version of VCC. EAUploader only supports Unity 2022. Be sure to select an avatar project for Unity 2022.*

![Untitled](getting_started/18.png)

Please select <span style="color: #00b0f0">Unity 2022 Avatar Project</span>. Give the project a suitable name.
However, do not use full-width characters. It can cause issues during upload. Use only alphanumeric and symbols.

After entering, select <span style="color: #00b0f0">Create Project</span> to proceed.

### Add EAUploader (Add EAUploader to VCC)

You will move to the project management screen. VCC packages can be added, updated, or deleted from here.

To add EAUploader to VCC, click [here](https://eauploader.uslog.tech/install).

![Untitled](getting_started/19.png)

A popup will automatically appear in VCC.
Click <span style="color: #00b0f0">I Understand, Add Repository</span> to add EAUploader to VCC.

Find Easy Avatar Uploader for VRChat in Manage Packages and click the ⊕ button to add it.

![Untitled](getting_started/20.png)

### Launch the Project

Launch from <span style="color: #00b0f0">Open Project</span> in the upper right corner.

![Untitled](getting_started/21.png)

### Installation and Launch Complete

You are now ready to upload avatars.

![Untitled](getting_started/22.png)

If you want to use VRM avatars, please refer to the separate guide "[Using VRM Avatars](/en/guides/vrm/)".

In the project, you can close EAUploader and modify the avatar as a regular Unity editor.

The button in the lower left is the exit button. To close EAUploader, click ✕ in the upper right corner.
You can reopen a closed EAUploader from the Unity menu "EAUploader" → "Open EAUploader".

## How to Use the Tool
* * *
### In-Tool Guide

EAUploader has a guide within the tool.

![Untitled](getting_started/23.png)

Please read the in-tool guide for explanations on tools, shaders, plugins, uploads, and related work.

This documentation also explains how to use each screen.

- [Screen Layout](/en/guides/overview/)
- [Importing and Managing Avatars](/en/guides/import/)
- [Setup (Adjusting Avatars)](/en/guides/setup/)
- [Uploading Avatars](/en/guides/upload/)
- [Using VRM Avatars](/en/guides/vrm/)
- [Updating and Removing EAUploader](/en/guides/update/)

### How to Back Up

In the VCC project list, click the ... on the far right of the project you want to back up.

![Untitled](getting_started/24.png)

The backup location can be confirmed in Settings at the bottom left of VCC, under Backups. You can also change it here.

![Untitled](getting_started/25.png)

## Information
* * *
### Official Community

Please join the official EAUploader Discord server.
We announce updates and the latest project information.

You can also provide feedback and suggestions to EAUploader.

Please join us.
https://discord.gg/yYFru7brra

![Untitled](getting_started/26.png)

### Official VRChat Group

We host events on VRChat.
Also, please join us when introducing EAUploader or for reference links.

https://vrc.group/EAUP.0512

### Developer & Support Creator Recruitment

![Untitled](getting_started/28.png)

### If You Have Problems

<aside>
💡 If you encounter problems during the installation or use of EAUploader, or if something happens that is not explained and you cannot resolve it

</aside>

- Please join the official EAUploader Discord server. ▷ [https://discord.gg/yYFru7brra](https://discord.gg/yYFru7brra)
- If the URL is not available, please check the official website. ▷ [https://eauploader.uslog.tech](https://eauploader.uslog.tech/)

<aside>
💡 If you encounter problems with Unity or VRCSDK, or issues related to purchased avatars, gimmicks, or tools

</aside>

- Please seek support from their respective distributors.
- If there is no support available, seek help elsewhere, such as on platform X.

### Contact Us

For inquiries from both individuals and corporations to Project EAUploader or the operating entity USLOG, please use the following link.

[https://uslog.tech/contact](https://uslog.tech/contact)

Guide for New Users v1.2

October 15, 2026

USLOG (uslog.tech)

Project EAUploader
