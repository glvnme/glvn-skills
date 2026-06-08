---
name: dieter-rams-ui
description: Apply Dieter Rams-inspired product UI design judgment to web and app interfaces. Use when the user asks for a restrained, useful, minimal, functional, industrial, Braun-like, Rams-inspired, less-is-better, product-focused, dashboard, SaaS, settings, form, tool, or workflow UI design or redesign.
---

# Dieter Rams UI

## Overview

Use this skill to design or revise interfaces through a Rams-inspired lens: usefulness first, clarity over novelty, restraint over decoration, and details that support long-term use.

This is not a generic minimalism skill. The goal is an interface that feels inevitable, honest, quiet, and engineered around the user's work.

## Design Filter

Before changing visuals, identify:

- Primary job: what the user is trying to accomplish.
- Operating context: repeated professional use, quick decision, configuration, review, or correction.
- Essential controls: what must be visible, what can be progressive, and what can be removed.
- System state: what the interface must communicate without theatrical emphasis.
- Existing conventions: what users already understand from the product or platform.

Then apply these principles:

- Make the useful action obvious before making anything beautiful.
- Prefer understandable structure, visible hierarchy, and direct manipulation.
- Keep visual style restrained; let proportion, rhythm, alignment, and material honesty carry the design.
- Remove decoration that does not clarify function, state, grouping, affordance, or brand trust.
- Use durable patterns over trend-led effects.
- Make components feel precise: consistent spacing, stable sizing, clear hit areas, and predictable states.
- Keep the interface honest: avoid fake depth, fake scarcity, misleading emphasis, or visual affordances that do not map to behavior.
- Design for longevity: neutral surfaces, limited accent colors, typography that remains readable under dense use.
- Keep accessibility and usability non-negotiable.
- Treat empty, loading, error, disabled, selected, focused, and changed states as part of the design, not afterthoughts.

## Visual System

Use a quiet product palette. Favor off-white, warm gray, graphite, restrained black, and one functional accent color. Avoid saturated gradients, glassmorphism, glow effects, bokeh, ornamental blobs, and color used only for atmosphere.

Use typography as an instrument panel:

- Choose legible sans-serif type with clear numerals.
- Use few sizes and weights.
- Use tabular numbers for metrics, counters, prices, quantities, and measurements.
- Keep letter spacing at 0 unless the existing design system requires otherwise.
- Do not use hero-scale type inside tools, sidebars, tables, settings, or dashboards.

Use layout like product engineering:

- Align to a visible grid.
- Prefer dense but calm information architecture over oversized cards.
- Keep repeated rows, form fields, controls, and toolbar items dimensionally stable.
- Reserve cards for repeated objects or true containers. Do not nest cards.
- Group controls by workflow sequence, not by decorative balance.
- Make default, changed, warning, and destructive states visibly different without noise.

## Interaction

Keep workflows direct:

- Use familiar controls: switches for binary settings, segmented controls for modes, selects or menus for option sets, sliders or steppers for bounded numeric changes, tables for comparison, and tabs for peer views.
- Prefer icon buttons only for common, unambiguous actions; add tooltips for anything less obvious.
- Make destructive actions harder to trigger than common actions.
- Keep hover, active, focus, selected, disabled, loading, and error states clear.
- Avoid motion unless it clarifies causality, preserves orientation, or confirms completion.

## Implementation Checks

When building or revising UI code:

- Reuse the product's existing design tokens, components, routes, and state patterns when available.
- If no design system exists, introduce only the smallest set of CSS variables needed for surface, border, text, muted text, accent, danger, radius, shadow, and spacing.
- Use subtle borders and real spacing before shadows.
- Keep border radii small, usually 4-8px unless the product already differs.
- Verify text fits in buttons, tabs, table cells, panels, and mobile layouts.
- Verify keyboard focus is visible and logical.
- Verify contrast for normal, muted, disabled, and accent text.
- Verify important controls remain reachable on mobile.

## Output Style

When explaining design decisions, be concrete. Tie changes to user value:

- "Moved status next to the affected control so the user can see cause and effect."
- "Reduced the accent palette to one action color and one destructive color."
- "Changed the oversized cards into a denser table because the task is comparison, not browsing."
- "Removed decorative depth because it competed with error and focus states."
