---
layout: article
title: "Setup your home server"
date: "2025-03-02T14:16:15.000Z"
author: "Rohan Kharel"
banner: /article-banners/setup-your-home-server.png
description: ""
slug: "setup-your-home-server"
---

These days, given the rise in subscription costs, you might find yourself wondering how to best spend your funds on cloud storage, VPNs, password managers, photo backups, and so forth. This article looks at setting up an inexpensive, if not free, server to do all those tasks!

## Requirements

For this tutorial you will need:

- A non-active older computer that is preferably equipped with an Ethernet port - this will be our server for hosting our services. A laptop here would be perfectly fine also.
- A USB drive with a minimum capacity of 8 GB that is not in use/should be erased; this will be used for installing our operating system of choice, Ubuntu Server.

## Download balenaEtcher

Estimated time: 2 mins

Before installing Ubuntu Server on our computer, we have to create an installer on the USB drive, so our first move is to download balenaEtcher.

Windows 11/10 version 1709 or higher:

```
winget install -e --id Balena.Etcher
```

macOS (using Homebrew):

```
brew install --cask balenaetcher
```

Arch Linux (AUR):

Install package "balena-etcher"

Example using yay:

```
yay -S balena-etcher
```

Older versions of Windows or Windows 10 older than 1709, macOS, and Linux (AppImage):

Download from the balenaEtcher website

## Create the Installation Media

Estimated time: 10 minutes

In this step, go ahead and download the Ubuntu Server ISO image. Just open balenaEtcher. Click Flash from file and select the ISO image you just downloaded. Plug your flash drive; next, click Select target and select your USB drive from the device list. Now you can click Flash and wait for balenaEtcher to write the image onto the drive.

**Note: THIS WILL ERASE ALL DATA ON YOUR DRIVE. Please backup all sensitive information.**

## Start Installing Ubuntu Server

Estimated time: 15-30 mins, depending on the speed of your drive

- Plug In 
  - Plug your server into the wall and connect it with Ethernet. Ethernet is highly recommended as Wi-Fi can be extremely unstable, especially on older computers for day-to-day use, and therefore totally unfit for our purpose.
- Insert USB: 
  - Carefully plug in the USB stick created with balenaEtcher into a USB port on your server computer.
- Boot From USB: 
  - This is where procedures might vary a bit. You will need to inform the computer to boot from the USB stick instead of its internal hard disk.
  - As soon as you turn the computer on, you are required to press a specific key to go to the boot menu or to BIOS/UEFI settings. Common ones would be: 
    - Delete key
    - F2
    - F12
    - Esc
    - F10
  - The exact key depends on your computer manufacturer, like Dell, HP, Lenovo, etc. You should see a quick message during startup which informs you about the key to press; if not, an online search for "\[your computer brand\] boot menu key" should help you.
  - Once in boot menu, select your USB stick from the list of bootable devices.

Installing Ubuntu Server:

- When the system finishes booting from the USB drive, you will find the Ubuntu Server installer running. Go through the installation process and follow the instructions below if you are stuck at any point. **Note that this will wipe the computer. Make sure to backup any sensitive information beforehand.**
  - Network: The installer should automatically detect your Ethernet connection; you will need to do the configuration here if you are using a Wi-Fi setup. **Note down the IP address that is shown next to the network interface.**
  - Storage: Choose your computer's internal drive and let Ubuntu partition the drive for you.
  - Profile Set-Up: Make sure to set your user as a superuser. This will allow you to execute commands using "sudo".
  - SSH: Make sure to install OpenSSH. This will allow you to setup and manage your server from any computer in your network.

Once the installation is complete, remove your flash drive and restart your computer.

## Setting up your server

Estimated time, 20 mins

You can now set your server aside and put it somewhere like on a shelf or in a cupboard (provided there is enough ventilation). Go to your computer and open up a command line.

  
We will use this command to remote into the server

```
ssh [username]@[ip address]
```

Make sure to replace \[username\] and \[ip address\] with their actual values. Once you have entered your password, you will connected to your server and can run commands on it remotely. We can install everything from here if we want, but to make it simpler and more user friendly to manage, we will be using [CasaOS](https://www.casaos.io), a front end for installing and managing apps on your server. 

To install CasaOS, run this command:

```
curl -fsSL https://get.casaos.io | sudo bash
```

Once complete, you can close out of the command line and open your preferred web browser. Navigate to http://\[ip address\], replacing \[ip address\] with your computer's actual IP address. Follow the instructions on screen to setup your CasaOS user and you will be greeted with a stunning dashboard. From here, you can install all the services and apps you want. Here are my top picks on what to install.

- Immich - A self-hosted photo backup app with a familiar UI that resembles Google Photos.
- Home Assistant - An app that allows you to bring all of your smart devices together and manage them from one place.
- Pi-hole - A self-hosted DNS and DHCP server which allows you to block ads network-wide.
- Tailscale - A self-hosted VPN which allows you to access your home network from anywhere in the world.

This article was a bit different that usual from thesilicon.uk, but I hope you found it useful. Comment down below if you are having any trouble with your server or have any suggestions.
