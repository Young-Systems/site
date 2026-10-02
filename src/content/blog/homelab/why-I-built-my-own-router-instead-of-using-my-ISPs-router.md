---
title: "Why I Built My Own Router Instead of Using My ISP's Router"
description: "Sometimes the equipment you are given isn't enough."
category: Homelab
publishedAt: 2026-10-2T08:00:00-04:00
publishAt: 2026-10-2T08:00:00-04:00
references:
  - label: "FreeBSD"
    url: "https://www.freebsd.org/"
  - label: "pfSense"
    url: "https://www.pfsense.org/"
  - label: "OPNsense"
    url: "https://opnsense.org/"
tags: [Network, Homelab]
draft: false
---

## Preface
I should share, I live out in the boonies. I don't have a lot of good options for internet service. Either cellular or satellite. We tried cellular for a few months but found it to be extremely slow due to the amount of trees in the way between my house and the cell towers. We went with Starlink.

## Why build your own network appliance?
While most ISP gear does provide some security - as an IT professional, I felt I would be remiss if I did not find a way to improve my home network security even more with the greater control that most business-grade appliances provide while not breaking the bank with tools such as:
- VLANs
- Firewall Rules
- DNS and DHCP configuration
> **Service Set Identifier (SSID)** is essentially the name of a wireless network (or WLAN). It allows you to distinguish between multiple networks in the same area and is something you likely already use. *I see you 'FBI VAN 4'*.
> 
> **Virtual Local Area Networks (VLANs)** are a way to logically separate networks. You give a VLAN an ID (for instance: 10), and you can assign it to a network to use this VLAN for its communications. 
>
> **Firewall Rules** control routed communications between VLANs in a more granular fashion that separate SSIDs or a dedicated 2.4 GHz network alone do not provide. 

Instead of fully relying on Starlink's router, I used a **$30 desktop** I purchased off of *Facebook Marketplace*, purchased and installed a **$40 dual-port 2.5 GbE NIC** with the intention that this desktop would become my firewall and router. 

The next question: How the hell do I install and configure a firewall without paying out the ass for license fees?

There are a few options you could go with if you wanted to host your own firewall. I went with OPNsense. 
> It is purely preference. While both pfSense and OPNsense use FreeBSD, I had used pfSense a lot in a previous life and wanted to try something new - so I went with OPNsense. After installing and configuring it to my liking, I found that I really enjoyed OPNsense's UI more than pfSense. 

I did not install this OS as a bare metal box. I installed Proxmox then created a virtual machine with the OPNsense image, and connected the VM's virtual NICs to Proxmox bridges backed by the physical Ethernet ports.
> Proxmox is a hypervisor which is an operating system that allows me to create tiny computers (Virtual Machines or VMs) at will instead of having dedicated computers for each service.  
> Proxmox has differing options: A paid subscription for more thoroughly tested enterprise updates and improved support (depending on the tier), and a free license for those of us who don't want to shell out hundreds (or in some cases, thousands) of dollars just to play around with virtualization but with the caveat of support being mostly community-based rather than vendor support-based.

As I also knew that I wanted to use a local DNS server, I deployed a **Pi-hole** LXC container, and using DHCP, I pointed all networks to utilize the **Pi-hole** as a DNS server.
> **Domain Name System (DNS)** is used to translate friendly hostnames (router.home.local) into IP addresses (192.168.0.1). Think of it as a phone book for your network. Using Pi-hole as my DNS server allows for me to both manage local DNS entries for my entire home network, while also leveraging its other features to block requests to known advertising and tracking domains. 
> 
> **Dynamic Host Configuration Protocol (DHCP)** is used to manage IP addresses for a network. Whether that is: Dynamically Assigning the address, or reserving the address. With a DHCP server (in this instance, my firewall), I am able to define what range of IP addresses I'd like to have my different networks to leverage, as well as reserve certain IP addresses for certain servers. This goes hand in hand with DNS as I am able to ensure the IP address I'm assigning a friendly name to doesn't change.

## So you went to all of this trouble to have more customizability?
Yes!

Since I deployed OPNsense, I am now able to fully segment my network into multiple subnetworks. That way I am able to create a new SSID for my **Internet of Things (IoT)** devices that only rely on the 2.4 GHz band to function, and prevent my printer from being able to initiate connections to my work laptop or anyone on my guest network from being able to access important homelab infrastructure willy-nilly.

## Hold on.. what does the layout of this network look like now?
Great question! Without giving away the entire map of my home network, it looks something like this:

ISP Gear (Starlink, Router in Bypass Mode) -> WAN port of server -> OPNsense does its magic -> LAN port connects to managed switch -> Rest of network is able to use the OPNsense box as a router/firewall for its traffic. 

I'm sure you're asking: `"What about wi-fi?"`  

To resolve this, I deployed another LXC container which acts as a **Ubiquiti Wireless Access Controller** to manage my **UniFi Express** (in Access Point mode) SSIDs and their associated networks. 

## Final Thoughts
Yes, there's now a few more portals being used to manage my home network, but I overall feel more comfortable performing my day-to-day without my work laptop being on the same network as my **Amazon Alexa**. As I am now fully in control of my home network, I am now responsible for maintaining that network. This means if the Proxmox host reboots, the router would be taken offline. I'd also be responsible for applying updates and enacting my ~~business~~home continuity/disaster recovery plans if the host fails. 

I feel especially proud of the work I put into doing this. Obviously, it's overkill (my fiancé tells me this every day), but I know that I'm safer for it. In addition, I've gained valuable knowledge architecting and managing my own home network and that's priceless.

Thanks for reading!