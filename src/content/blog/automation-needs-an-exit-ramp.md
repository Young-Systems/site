---
title: "Automation needs an exit ramp"
description: "Reliable automation should know when to stop, explain what it found, and leave a human with a safe next action."
category: Automation
publishedAt: 2026-09-18
tags: [PowerShell, Automation, Operations]
draft: false
---

The first version of an administrative script usually follows the happy path: connect, find an object, change it, and print a success message. That can save time, but it is not yet dependable automation.

Production automation needs an exit ramp. When an assumption fails, the script should stop before it turns uncertainty into a larger change.

## Validate the operating context

Before making a change, automation should confirm the context that a human operator would normally check:

- Is the connection pointed at the intended tenant or environment?
- Did the lookup return exactly one object?
- Does the current state match the expected starting state?
- Does the operator have the required scope?
- Is the proposed change inside the requested boundary?

These checks are especially important in Microsoft 365 work, where the same command can be technically valid across many tenants and still be applied in the wrong place.

## Prefer useful failure over false success

A useful failure identifies the failed assumption, records enough context to investigate, and avoids claiming that a workflow completed. That is more valuable than catching every exception and allowing the script to continue.

In PowerShell, I treat error handling as part of the workflow rather than a wrapper added at the end. Commands that must succeed use terminating errors. Validation failures return specific messages. Logs identify the target and operation without exposing secrets.

## Leave the next action clear

Automation does not have to solve every edge case. It should make the boundary explicit:

1. what completed;
2. what did not;
3. whether any state changed; and
4. what the operator should verify next.

The goal is not to remove people from the process. It is to reserve their attention for decisions that actually require judgment.
