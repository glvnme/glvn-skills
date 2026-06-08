---
name: frontend-skill
description: Use when the task asks for a visually strong landing page, website, app, prototype, demo, or game UI. This skill enforces restrained composition, strong branding, image-led hierarchy, coherent content structure, and tasteful motion while avoiding generic cards, weak visual anchors, clutter, and placeholder-heavy UI.
---

# Frontend skill

Use this skill when the quality of the work depends on art direction, hierarchy, restraint, imagery, and motion rather than component count alone.

Goal: ship interfaces that feel deliberate, premium, and current. Default toward a strong visual thesis, one big idea per section, rigorous spacing, sparse copy, and a small number of memorable motions.

## When to use

Use this skill for:

- landing pages
- marketing sites
- product websites
- dashboards and app shells
- prototypes and demos
- game UIs
- redesigns where taste and composition matter

Do not use this skill when the task is primarily backend, data modeling, API plumbing, or non-visual refactoring.

## Operating model

Before building, write four things in brief:

- visual thesis: one sentence describing mood, material, palette, and energy
- aesthetic direction: choose a clear point of view such as refined minimal, editorial, industrial, organic, brutalist, playful, retro-futurist, luxurious, or quietly technical
- content plan: hero, support, detail, social proof or utility, final CTA
- interaction thesis: 2-3 motion ideas that improve hierarchy or feel

Also identify the differentiation hook: what is the one thing a user will remember after seeing this interface?

Each section gets one job, one dominant visual idea, and one primary takeaway or action.

If the user has not provided design direction, start by proposing 2-3 visual directions or generate a mood board before committing to implementation.

## Build sequence

Follow this order:

1. Define constraints first: one H1, section count, type scale, palette, CTA hierarchy, and layout rhythm.
2. Choose the page narrative before choosing components.
3. Establish a small design system early:
   - colors: `background`, `surface`, `text`, `muted`, `accent`
   - type roles: `display`, `headline`, `body`, `caption`
   - spacing rhythm and container widths
4. Use real content, product context, or a clear project goal whenever possible.
5. Prefer one strong visual anchor over many small UI ideas.
6. Implement with restraint.
7. Verify on desktop and mobile before considering the work done.

For most web work, React and Tailwind are strong defaults unless the repo or user already points elsewhere.

## Beautiful defaults

- Start with composition, not components.
- Treat the first viewport as a poster, not a document.
- Make the brand or product name the loudest text on branded pages.
- Prefer a full-bleed hero or full-canvas visual anchor.
- Commit to a clear aesthetic point of view instead of averaging together safe trends.
- Keep copy short enough to scan in seconds.
- Use whitespace, alignment, scale, cropping, and contrast before adding chrome.
- Limit the system to two typefaces and one accent color by default.
- Default to cardless layouts. Use sections, columns, dividers, lists, and media blocks instead.
- Use motion to create presence and hierarchy, not noise.
- Avoid purple-on-white defaults and default dark-mode bias unless the existing system requires them.
- Vary aesthetics from project to project. Do not repeatedly converge on the same default font, palette, or visual rhythm.

## Landing pages

Default sequence:

1. Hero: brand or product, promise, CTA, and one dominant visual
2. Support: one concrete feature, offer, or proof point
3. Detail: workflow, atmosphere, product depth, or story
4. Social proof or trust signal
5. Final CTA

Hero rules:

- One composition only.
- Use a full-bleed image or another dominant visual plane by default.
- On branded landing pages, the hero itself should run edge-to-edge; constrain only the inner text and action column.
- Brand first, headline second, body third, CTA fourth.
- Keep headlines to roughly 2-3 lines on desktop and readable in one glance on mobile.
- Keep the text column narrow and anchored to a calm part of the visual.
- Maintain strong contrast and clear tap targets when text sits over imagery.
- Avoid hero cards, stat strips, logo clouds, pill clusters, floating badges, promo stickers, and dashboard-like overlays.

Litmus:

- If the first viewport still works after removing the image, the image is too weak.
- If the page could belong to another brand after removing the nav, the branding is too weak.

Viewport budget:

- If a sticky or fixed header is present, it counts against the first-screen budget.
- The combined header and hero should fit within common desktop and mobile viewports.
- When using `100vh` or `100svh`, subtract persistent chrome or overlay it instead of stacking it in normal flow.

## Apps and dashboards

Default to restrained product UI:

- calm surface hierarchy
- strong typography and spacing
- few colors
- dense but readable information
- minimal chrome
- cards only when the card is the interaction

Organize app UI around:

- primary workspace
- navigation
- secondary context or inspector
- one clear accent for action or state

Avoid:

- dashboard-card mosaics
- thick borders around every region
- decorative gradients behind routine product UI
- multiple competing accent colors
- ornamental icons that do not improve scanning

If a panel can become plain layout without losing meaning, remove the card treatment.

When the work is operational UI, prefer utility copy over marketing copy. Headings should explain what the area is or what the user can do there.

## Imagery

Imagery must do narrative work.

- Use at least one strong, real-looking image for brands, venues, editorial pages, and lifestyle products.
- Prefer in-situ photography over abstract gradients or fake 3D objects.
- Choose or crop images with a stable tonal area for text placement.
- Avoid images with embedded signage, logos, or typographic clutter that fight the UI.
- Avoid generated images that already contain fake UI frames, cards, panels, or split layouts.
- If multiple moments are needed, use multiple images rather than a collage.

If images are available, reuse uploaded or pre-generated images first. Otherwise, generate new visuals when tooling supports it. Do not link to external web images unless the user explicitly asks for them.

## Typography, color, and space

These are first-order design tools, not decoration.

- Choose fonts with character and intent. Avoid generic defaults unless the existing design system requires them.
- Pair typography deliberately: a distinctive display face can work well with a quieter body face.
- Use CSS variables or equivalent design tokens for color, type roles, spacing, and radii.
- Prefer dominant color decisions with a small number of sharp accents over timid, evenly distributed palettes.
- Use asymmetry, overlap, controlled density, or generous negative space when they reinforce the concept.
- Backgrounds should create atmosphere with texture, gradients, patterns, light, grain, or material cues when appropriate to the design direction.
- Match visual detail to the concept: maximalist directions may justify richer textures and layering, while minimal directions demand sharper spacing and restraint.

## Copy

- Write in product language, not design commentary.
- Let the headline carry the meaning.
- Supporting copy should usually be one short sentence.
- Cut repetition between sections.
- Do not leak prompt language into the UI.
- Give every section one responsibility: explain, prove, deepen, orient, or convert.

If deleting 30 percent of the copy improves the page, keep deleting.

## Motion

Use motion to create presence and hierarchy, not noise.

For visually led work, ship at least 2-3 intentional motions:

- one entrance sequence in the hero
- one scroll-linked, sticky, or depth effect
- one hover, reveal, or layout transition that sharpens affordance

Prefer motion patterns that are:

- noticeable in a quick recording
- smooth on mobile
- fast and restrained
- consistent across the page
- removable if they are ornamental only

When fixed, floating, or layered UI elements are present, keep them from overlapping text, buttons, or other key content across screen sizes.

Match motion complexity to the concept. Bold or theatrical directions may justify richer transitions and scroll choreography. Minimal directions should rely on subtle timing, sequencing, and confident restraint.

## React guidance

For React code:

- prefer modern patterns such as `useEffectEvent`, `startTransition`, and `useDeferredValue` when they fit the codebase
- do not add `useMemo` or `useCallback` by default unless the repo already uses them intentionally
- follow the repo's compiler and framework guidance

If working within an existing design system, preserve its structure, patterns, and visual language instead of forcing this skill's defaults.

## Verification

Do not stop at implementation. Verify the result.

Check:

- desktop and mobile layouts
- hero fit within the initial viewport
- text contrast over imagery
- spacing rhythm and hierarchy
- brand visibility in the first screen
- whether cards are actually necessary
- whether motion improves clarity or atmosphere
- whether headings alone communicate the structure

If tools are available, use browser inspection or Playwright to inspect rendered output, test key flows, and catch responsive or overlap issues.

## Hard rules

- No generic card grids as the first impression.
- No hero cards by default.
- No boxed or center-column hero when the brief calls for full bleed.
- No more than one dominant idea per section.
- No filler copy.
- No split-screen hero unless the text sits on a calm, unified side.
- No more than two typefaces without a clear reason.
- No more than one accent color unless the product already has a mature system.
- No decorative clutter pretending to be hierarchy.
- No generic AI-look defaults, especially overused safe fonts, predictable SaaS compositions, or cliched purple-gradient choices.

## Failure patterns to reject

- beautiful image but weak brand presence
- strong headline with no clear action
- busy imagery behind text
- sections repeating the same mood statement
- carousel with no narrative purpose
- app UI made from stacked cards instead of layout
- decorative gradients acting as the main visual idea

## Quick litmus checks

- Is the brand or product unmistakable in the first screen?
- Is there one strong visual anchor?
- Can the page be understood by scanning headlines only?
- Does each section have one job?
- Are cards truly necessary?
- Does motion improve hierarchy or atmosphere?
- Would the design still feel premium if the decorative shadows were removed?
