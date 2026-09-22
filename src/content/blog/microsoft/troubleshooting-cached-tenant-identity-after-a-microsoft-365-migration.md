---
title: "Troubleshooting cached tenant identity after a Microsoft 365 Migration"
description: "Uncovering a potential issue that caught my team by surprise, how we recovered, and what we learned."
category: Microsoft
publishedAt: 2026-09-28
publishAt: 2026-09-28T12:00:00Z
tags: [Microsoft 365, Migrations]
draft: false
---

## Context
This was a Microsoft 365 to Microsoft 365 migration, utilizing the migration tool BitTitan MigrationWiz. 

My client had acquired a company, and had requested my team's help to absorb the acqusition into their tenant. 
> I will refer the parent company (Client) as **CompanyA**.  
> I will refer the acquired company as **CompanyB**.

CompanyB's users were added to CompanyA's Active Directory, and their accounts were synced with Microsoft Entra successfully. Prior to the migration, CompanyB's users retained CompanyA's domain (i.e. user@companya.com).

The migration was performed per our Standard Operating Procedures (SOP) with some minor issues which were accounted for and handled appropriately. All accounts on the legacy tenant (**CompanyB's source tenant**) had their sign in tokens revoked and sign ins blocked. Post migration, CompanyB's users UserPrincipalName (UPN) were converted back into their domain (i.e. user@companyb.com).

We were not requested to have an on-site resource to coordinate fixes while on site.

## The Issue
The day after the migration, we had been alerted that some users were unable to sign into their emails post migration. They were receiving a similar error message as below:

> Your account was not added to **CompanyB**'s tenant as a guest user.

We identified that this may have been a Windows Account Manager (WAM) problem, as these devices were Entra registered, so we performed a WAM-wipe on each of their devices. 
> These steps primarily included (but not limited to) running a script that:
> - Removed all signed-in Microsoft accounts
> - Removed all Microsoft credentials from Windows Credential Manager
> - Modifying registry keys that pointed to Microsoft accounts

After running this script, we rebooted each users device. After confirming there were no indicators of being signed into any Microsoft accounts, we retried signing the user into their account.

We encountered the same error again, over and over.

In addition to the above troubleshooting, we tried performing steps such as: Repairing and eventually reinstalling the Microsoft applications, attempting the sign in on a separate Windows profile (which worked), and attempting the sign in on a different computer (which also worked).

However, we identified that performing all of the above steps did not efficiently nor fully resolve the issue.

## The Resolution
After we escalated the problem to leadership, we were given a few things to try. The ultimate fix was performing the following steps in succession:
1. Sign into the **Microsoft Entra Connect Sync** Domain Controller.
2. Access the user's profile.
3. Swap the UserPrincipalName (UPN) to use *companya.com*'s suffix (i.e. user@companya.com).
4. Force a Delta sync (`Start-ADSyncSyncCycle -PolicyType Delta`).
5. Have the user sign in using this new UPN.
6. After confirming the user is able to sign in, swap the UPN back to use the *companyb.com* suffix (i.e. user@companyb.com).

After this UPN-swap was performed, the user remained signed in.
> **Note:** The user's mailflow stayed intact due to the UserPrincipalName and the ProxyAddresses being separate. The ProxyAddresses field in Active Directory being used to identify the Primary SMTP address and any aliases for AD synced accounts. 

## Root Cause
After the post-cutover support was performed, we were requested to perform a Root Cause Analysis (RCA). During the writing process, I was able to identify that this issue is a potential byproduct of a migration of this calibur. Specifically, when devices have already authenticated against the legacy tenant (migrated **from**) and the migration occurred - these computers potentially have a hard time grabbing the token from the new tenant (migrated **to**). 

By performing the UPN swap, the computers were able to grab the new tenant's token and authenticate without issues.

## Final Thoughts
This was a rough process, causing significant delays and missed deadlines for the client. Thankfully, our client was able to understand the cause, and we were able to identify places to improve, including level-setting expectations prior to the migration to ensure the client knows of the risks, as well as ensuring an on-site resource.

Thanks for reading about my most recent headache!