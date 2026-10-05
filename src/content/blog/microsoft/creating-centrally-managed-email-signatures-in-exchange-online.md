---
title: "Creating Centrally Managed Email Signatures in Exchange Online"
description: "Because sending a template to the entire office and asking everyone to maintain it manually can be excruciatingly painful."
category: Microsoft
publishedAt: 2026-10-05T18:00:00-04:00
tags: [Microsoft, Exchange Online]
references:
  - label: "Organization-wide signatures in Exchange Online (Microsoft Learn)"
    url: "https://learn.microsoft.com/en-us/exchange/security-and-compliance/mail-flow-rules/disclaimers-signatures-footers-or-headers"
  - label: "Managing mail flow rules (Microsoft Learn)"
    url: "https://learn.microsoft.com/en-us/exchange/security-and-compliance/mail-flow-rules/manage-mail-flow-rules"
  - label: "Microsoft 365 signature limitations (Microsoft Learn)"
    url: "https://learn.microsoft.com/en-us/microsoft-365/admin/setup/create-signatures-and-disclaimers"
  - label: "Mail Signatures' Signature Generator"
    url: "https://www.mail-signatures.com/signature-generator"
draft: false
---

> NOTE: I need to add screenshots, but this article is (in my opinion) straightforward enough.

> **Scope:** This walkthrough uses an Exchange Online mail flow rule to add a centrally managed signature. It works well for basic branding and contact information, but has limitations around replies, missing fields, and visibility in Outlook. Dedicated platforms such as [Exclaimer](https://exclaimer.com/) and [CodeTwo](https://www.codetwo.com/email-signatures/) offer additional capabilities. This article is not sponsored.

If you have ever sent an email signature template to an entire office and asked everyone to update it, you probably know how that goes. Some employees update it immediately, some forget, and someone somehow ends up using the old company logo six months later.

Exchange Online gives us another option: add the signature centrally as messages pass through the service. Employees do not have to paste the company template into each email client, and administrators can maintain the shared design in one place.

Instead of spending the entire article explaining why you should do it, let me show you how to set it up first.

## Before you begin

You will need an Exchange Online environment and an administrator account with permission to manage mail flow rules. Global Administrator access is not required if your account already has the appropriate Exchange permissions.

Check the directory information you plan to include, such as display names, job titles, company names, and phone numbers. The template can personalize these fields, but it cannot fix inaccurate or missing information. For synchronized users, make changes in the authoritative directory and allow them to synchronize.

If you want a logo, have a stable, publicly accessible HTTPS image URL ready. I typically use an image from my website or host it in Azure Blob Storage. Recipients must be able to access the image without signing in. Avoid expiring links, and remember that some email clients block external images until the recipient allows them.

<!-- TODO - Screenshot: Example directory profile with populated signature fields. -->

## Creating the custom email signature

1. Navigate to [Mail Signatures' Signature Generator](https://www.mail-signatures.com/signature-generator).
2. Under **Choose email platform**, select **Microsoft 365**.
3. Choose a layout that fits your business. A readable signature with useful contact information is usually enough.
4. Click **Replace user data with Active Directory placeholders**. The preview will change to show placeholders instead of example personal information.
5. Adjust the company branding, colors, links, and graphics. Remove fields you do not plan to use.
6. Click **Apply your signature**.
7. Select the option to generate the signature's HTML code, then click **Copy**.

<!-- TODO - Screenshot: Template preview with directory placeholders enabled. -->

These placeholders tell Exchange which sender information to insert when it processes the message. For example:

| Placeholder | Sender information |
| --- | --- |
| `%%DisplayName%%` | Display name |
| `%%Title%%` | Job title |
| `%%Company%%` | Company name |
| `%%Phone%%` | Phone number |
| `%%MobileNumber%%` | Mobile phone number |

Although the generator calls these Active Directory placeholders, this walkthrough uses sender information available to Exchange Online in your Microsoft 365 directory.

> **Missing fields:** Test the template with a user who has incomplete contact information. Do not assume that an empty value will neatly remove the surrounding layout. For example, a phone label such as `m:` may remain without a number. Remove unnecessary fields from the shared template or consider separate templates for different groups of users.

## Applying the signature in Exchange Online

The generator creates the HTML. The mail flow rule is what applies it to messages.

1. Sign in to the [Exchange admin center](https://admin.cloud.microsoft/exchange) using your authorized administrator account.
2. Go to **Mail flow** > **Rules**.
3. Click **Add a rule** and choose **Apply disclaimers**.
4. Give the rule a descriptive name, such as **External Email Signature**.
5. Configure the conditions so that the **sender is inside the organization** and the **recipient is outside the organization**. Add a specific sender condition for your initial pilot so you can test with one account before expanding the scope.
6. Under **Do the following**, select **Apply a disclaimer to the message** and **append a disclaimer**.
7. Click **Enter text**, paste the copied HTML, and save it.
8. Choose the fallback action, explained below.
9. Review any exceptions you need, then continue to the rule settings.
10. Select **Enforce** for your scoped pilot when you are ready to inspect an actual signature. Leave **Stop processing more rules** unchecked unless you have a specific reason to prevent later rules from running.
11. Review the configuration and click **Finish**.
12. Rules created through the Exchange admin center are disabled by default. Select the new rule and toggle its status to **Enabled**.

<!-- TODO - Screenshot: Rule conditions, append action, and HTML entry. -->
<!-- TODO - Screenshot: Completed rule with its status enabled. -->

Exchange calls this action a *disclaimer*, even when its content is simply an email signature. You do not need to include a legal disclaimer to use it.

Allow time for the rule to take effect. Microsoft notes that new rules can take 30 minutes or more to apply, so an immediate test may not reflect your changes.

### Choosing the fallback action

Exchange cannot modify every message. For example, some encrypted messages cannot have a disclaimer inserted. The fallback setting determines what happens when insertion is not possible.

| Setting | Result |
| --- | --- |
| **Ignore** | The message is delivered without the signature. |
| **Wrap** | Exchange creates a new message containing the signature and attaches the original message to it. |
| **Reject** | The message is returned to the sender with a nondelivery report. |

For a signature used only for branding and contact details, I would generally choose **Ignore**. I would rather have the message delivered without a signature than change its format or prevent delivery. If the rule serves a separate business requirement, choose the fallback according to that requirement.

### Avoiding repeated signatures

Without an exception, matching replies and forwards can receive another appended signature. You can add an exception that checks the subject or body for unique text already present in your signature.

There is a tradeoff: that text may appear in the quoted conversation. The exception can therefore prevent a fresh signature from being added to a later reply, even when the existing signature belongs to someone else using the same template.

Test this behavior before deciding whether the exception fits your needs. Native mail flow signatures do not provide the same control over conversation placement as a dedicated signature platform.

## Testing before you expand the rule

Send a message from your pilot account to an external mailbox you can inspect. Check the message as received, rather than looking only in the sender's Sent Items.

- Confirm that the name, title, phone numbers, and links are correct.
- Check the signature in HTML and plain-text messages.
- Open the received message on desktop and mobile, including with external images blocked.
- Send replies and forwards to inspect placement and duplicate behavior.
- Test a sender with missing profile information.
- Check whether an existing Outlook signature creates a second signature.
- Send an internal message to confirm it is excluded by your external-only conditions.

<!-- TODO - Screenshot: Received external message showing the completed signature. -->

> **Test mode versus a pilot:** **Test without Policy Tips** logs rule matches without inserting the signature. To see the actual result, use **Enforce** with the rule enabled and limited to your pilot sender.

Once you are satisfied, remove the pilot sender condition or expand it to your intended users. Let employees know whether they should remove their existing company signature from Outlook to avoid duplicates.

If the result is wrong, disable the rule while you adjust it. You can return to the same rule to update the HTML, conditions, or exceptions.

## What this method cannot do

This is a useful built-in option, but there are a few limitations to understand:

- **It does not appear while composing.** Exchange adds the signature during mail flow processing after you send the message.
- **It does not appear in the sender's Sent Items copy.** Inspect the received message when testing.
- **It cannot place the signature directly beneath the latest reply.** Appending adds it to the bottom of the message body, which can include the quoted conversation.
- **The logo is externally hosted.** Linking an image is different from embedding it in the message, and the recipient's email client may block it.

If employees need to see signatures before sending, or you need more control over reply placement and conditional layouts, evaluate a dedicated signature platform against those requirements.

## Why should I centralize my email signature?

The biggest benefit is reducing the amount of manual maintenance. When the company changes its logo, website, or shared contact information, you can update the template in one place instead of asking every employee to repeat the same task.

It also helps keep company communications consistent. Employees can have different titles and phone numbers while sharing the same layout and branding. Keeping the underlying directory information accurate becomes part of maintaining the signature.

A consistent signature supports a professional appearance, but it is not proof that a message is legitimate. Anyone can copy a logo and contact details.

## Final thoughts

Email signatures do not have to be flashy to get the point across. For organizations that need basic centrally managed branding, an Exchange Online mail flow rule is a practical starting point.

The important part is testing how it behaves with real messages, incomplete user profiles, and reply chains before applying it across the organization. Employees should not have to maintain the company's signature template themselves, but they should understand what to expect when the signature is added after sending.

Thanks for reading!