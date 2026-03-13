# Typography System

Source: https://vercel.com/geist/typography

This document transcribes the Geist Typography system structure and usage guidance for this project.

Constraint for this repository:

- Do not adopt Geist font families.
- Keep the current project font-family setup as-is.
- Only adopt the typography scale, naming, hierarchy, and usage rules documented below.

## Usage

Typography styles are consumed as Tailwind classes.

Each class pre-sets a combination of:

- `font-size`
- `line-height`
- `letter-spacing`
- `font-weight`

To use the `Subtle` and `Strong` modifiers, nest a `<strong>` element inside the typography class.

```tsx
<p className="text-copy-16">
  Copy 16 <strong>with Strong</strong>
</p>
```

## Headings

Used to introduce pages or sections.

| Token                  | Class name        | Usage                                                      |
| ---------------------- | ----------------- | ---------------------------------------------------------- |
| Heading 72             | `text-heading-72` | Marketing heroes.                                          |
| Heading 64             | `text-heading-64` | —                                                          |
| Heading 56             | `text-heading-56` | —                                                          |
| Heading 48             | `text-heading-48` | —                                                          |
| Heading 40             | `text-heading-40` | —                                                          |
| Heading 32 with Subtle | `text-heading-32` | Marketing subheadings, paragraphs, and dashboard headings. |
| Heading 24 with Subtle | `text-heading-24` | —                                                          |
| Heading 20 with Subtle | `text-heading-20` | —                                                          |
| Heading 16 with Subtle | `text-heading-16` | —                                                          |
| Heading 14             | `text-heading-14` | —                                                          |

## Buttons

Only to be used within components that render buttons.

| Token     | Class name       | Usage                                                         |
| --------- | ---------------- | ------------------------------------------------------------- |
| Button 16 | `text-button-16` | Largest button.                                               |
| Button 14 | `text-button-14` | Default button.                                               |
| Button 12 | `text-button-12` | Only used when a tiny button is placed inside an input field. |

## Label

Designed for single-lines, and given ample line-height for highlighting and marrying up with icons.

| Token                                   | Class name           | Usage                                                                                                         |
| --------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------- |
| Label 20                                | `text-label-20`      | Marketing text.                                                                                               |
| Label 18                                | `text-label-18`      | —                                                                                                             |
| Label 16 with Strong                    | `text-label-16`      | Used in titles to help differentiate from regular text.                                                       |
| Label 14 with Strong                    | `text-label-14`      | Most common text style of all. Used in many menus.                                                            |
| Label 14 Mono                           | `text-label-14-mono` | Largest form of mono, to pair with larger (>14) text.                                                         |
| Label 13 with Strong, and Tabular (123) | `text-label-13`      | Used as a secondary line next to other labels. Tabular is used when conveying numbers for consistent spacing. |
| Label 13 Mono                           | `text-label-13-mono` | Used to pair with Label 14, as the smaller mono size looks better in that pairing.                            |
| Label 12 with Strong, and Caps          | `text-label-12`      | Used for tertiary level text in busy views, like Comments, Show More and the capitals in Calendars.           |
| Label 12 Mono                           | `text-label-12-mono` | —                                                                                                             |

Repository note:

- `Mono` means using this project's existing mono font family, not Geist Mono.
- `Tabular` means tabular figures should be enabled when numbers need consistent width.
- `Caps` means uppercase styling is part of the token usage.

## Copy

Designed for multiple lines of text, having a higher line height than Label.

| Token               | Class name          | Usage                                                             |
| ------------------- | ------------------- | ----------------------------------------------------------------- |
| Copy 24 with Strong | `text-copy-24`      | For hero areas on marketing pages.                                |
| Copy 20 with Strong | `text-copy-20`      | For hero areas on marketing pages.                                |
| Copy 18 with Strong | `text-copy-18`      | Mainly for marketing, big quotes.                                 |
| Copy 16 with Strong | `text-copy-16`      | Used in simpler, larger views like Modals where text can breathe. |
| Copy 14 with Strong | `text-copy-14`      | Most commonly used text style.                                    |
| Copy 13             | `text-copy-13`      | For secondary text and views where space is a premium.            |
| Copy 13 Mono        | `text-copy-13-mono` | Used for inline code mentions.                                    |

## Original Numeric Spec

Source of the values in this section:

- Extracted from the official CSS asset loaded by `https://vercel.com/geist/typography`
- Checked on March 13, 2026
- `font-family` is intentionally omitted here for repository use

Interpretation rules:

- `Weight` is the base class `font-weight`
- `Strong weight` is the nested `strong` weight when defined by the source CSS
- `Letter spacing` is marked `not set` when the source class does not define it

### Headings

| Class             | Font size | Line height | Letter spacing | Weight | Strong weight |
| ----------------- | --------- | ----------- | -------------- | ------ | ------------- |
| `text-heading-72` | `72px`    | `72px`      | `-4.32px`      | `600`  | `not set`     |
| `text-heading-64` | `64px`    | `64px`      | `-3.84px`      | `600`  | `not set`     |
| `text-heading-56` | `56px`    | `56px`      | `-3.36px`      | `600`  | `not set`     |
| `text-heading-48` | `48px`    | `56px`      | `-2.88px`      | `600`  | `not set`     |
| `text-heading-40` | `40px`    | `48px`      | `-2.4px`       | `600`  | `not set`     |
| `text-heading-32` | `32px`    | `40px`      | `-1.28px`      | `600`  | `500`         |
| `text-heading-24` | `24px`    | `32px`      | `-0.96px`      | `600`  | `500`         |
| `text-heading-20` | `20px`    | `26px`      | `-0.4px`       | `600`  | `500`         |
| `text-heading-16` | `16px`    | `24px`      | `-0.32px`      | `600`  | `500`         |
| `text-heading-14` | `14px`    | `20px`      | `-0.28px`      | `600`  | `not set`     |

### Buttons

| Class            | Font size | Line height | Letter spacing | Weight | Strong weight |
| ---------------- | --------- | ----------- | -------------- | ------ | ------------- |
| `text-button-16` | `16px`    | `20px`      | `not set`      | `500`  | `not set`     |
| `text-button-14` | `14px`    | `20px`      | `not set`      | `500`  | `not set`     |
| `text-button-12` | `12px`    | `16px`      | `not set`      | `500`  | `not set`     |

### Label

| Class                | Font size | Line height | Letter spacing | Weight | Strong weight |
| -------------------- | --------- | ----------- | -------------- | ------ | ------------- |
| `text-label-20`      | `20px`    | `32px`      | `not set`      | `400`  | `not set`     |
| `text-label-18`      | `18px`    | `20px`      | `not set`      | `400`  | `not set`     |
| `text-label-16`      | `16px`    | `20px`      | `not set`      | `400`  | `500`         |
| `text-label-14`      | `14px`    | `20px`      | `not set`      | `400`  | `500`         |
| `text-label-14-mono` | `14px`    | `20px`      | `not set`      | `400`  | `not set`     |
| `text-label-13`      | `13px`    | `16px`      | `not set`      | `400`  | `500`         |
| `text-label-13-mono` | `13px`    | `20px`      | `not set`      | `400`  | `not set`     |
| `text-label-12`      | `12px`    | `16px`      | `not set`      | `400`  | `500`         |
| `text-label-12-mono` | `12px`    | `16px`      | `not set`      | `400`  | `not set`     |

### Copy

| Class               | Font size | Line height | Letter spacing | Weight | Strong weight |
| ------------------- | --------- | ----------- | -------------- | ------ | ------------- |
| `text-copy-24`      | `24px`    | `36px`      | `not set`      | `400`  | `500`         |
| `text-copy-20`      | `20px`    | `36px`      | `not set`      | `400`  | `500`         |
| `text-copy-18`      | `18px`    | `28px`      | `not set`      | `400`  | `500`         |
| `text-copy-16`      | `16px`    | `24px`      | `not set`      | `400`  | `500`         |
| `text-copy-14`      | `14px`    | `20px`      | `not set`      | `400`  | `500`         |
| `text-copy-13`      | `13px`    | `18px`      | `not set`      | `400`  | `500`         |
| `text-copy-13-mono` | `13px`    | `18px`      | `not set`      | `400`  | `not set`     |

## Adoption Notes

- Preserve the token names exactly as documented above.
- Preserve category boundaries: `Headings`, `Buttons`, `Label`, and `Copy`.
- Preserve modifier intent: `Subtle`, `Strong`, `Mono`, `Tabular`, and `Caps`.
- Exclude `font-family` from the imported system definition.

## Repository Mapping

Current repository font setup:

- Sans: `var(--pretendard)`
- Mono: `var(--jetbrains-mono)`

When this system is implemented in code:

- All non-mono typography tokens should inherit the existing `sans` family.
- All `*-mono` tokens should explicitly use the existing `mono` family.
- The typography system should replace the current ad hoc element defaults in `components/globals.css`.

Current global element defaults that will eventually need replacement:

- `h1`, `h2`, `h3`, `h4`
- `p`
- `blockquote`

## Implementation Strategy

Recommended implementation order for a future `globals.css` update:

1. Define per-token CSS custom properties under `:root`.
2. Add utility classes for each documented token.
3. Add modifier behavior for `strong`, mono variants, tabular figures, and caps.
4. Remap semantic elements like `h1` to `h4` and `p` onto the new token utilities.
5. Audit screens and content rendering after replacement.

Implementation constraint:

- Do not mix token definition and semantic element mapping until all token utilities exist.

## Token Schema

Each typography token should resolve to this shape:

- `font-size`
- `line-height`
- `letter-spacing`
- `font-weight`

Some tokens additionally require:

- `font-family` override for mono variants only
- `text-transform: uppercase` for caps variants
- `font-variant-numeric: tabular-nums` for tabular variants

Suggested naming scheme for CSS variables:

```css
--text-heading-72-size
--text-heading-72-line-height
--text-heading-72-letter-spacing
--text-heading-72-weight
```

Repeat the same structure for every token:

- `heading-64`
- `heading-56`
- `heading-48`
- `heading-40`
- `heading-32`
- `heading-24`
- `heading-20`
- `heading-16`
- `heading-14`
- `button-16`
- `button-14`
- `button-12`
- `label-20`
- `label-18`
- `label-16`
- `label-14`
- `label-14-mono`
- `label-13`
- `label-13-mono`
- `label-12`
- `label-12-mono`
- `copy-24`
- `copy-20`
- `copy-18`
- `copy-16`
- `copy-14`
- `copy-13`
- `copy-13-mono`

## Utility Class Contract

Each utility class should map directly to one token.

Example contract:

```css
.text-copy-14 {
  font-size: var(--text-copy-14-size);
  line-height: var(--text-copy-14-line-height);
  letter-spacing: var(--text-copy-14-letter-spacing);
  font-weight: var(--text-copy-14-weight);
}
```

Mono variants should add the mono font family:

```css
.text-copy-13-mono {
  font-family: var(--jetbrains-mono);
}
```

Caps variants should include uppercase behavior in the token utility itself.

Tabular variants should include numeric alignment behavior in the token utility itself.

## Modifier Contract

`Strong` and `Subtle` are not separate top-level token names in the class list. They are usage modifiers applied within the token.

Recommended implementation rule:

- Base token class defines the default presentation.
- Nested `strong` inside the token class raises emphasis.
- If `Subtle` behavior is implemented, it should be scoped within the token utility rather than creating a second public token name.

Example:

```css
.text-copy-14 strong {
  font-weight: 600;
}
```

Repository decision to keep consistent:

- Public API stays as `text-heading-*`, `text-button-*`, `text-label-*`, `text-copy-*`.
- Avoid adding alternate public classes like `text-copy-14-strong` unless there is a strong implementation need.

## Semantic Mapping Draft

Once token utilities exist, semantic elements can be mapped like this:

| Element  | Recommended token                      |
| -------- | -------------------------------------- |
| `h1`     | `text-heading-40` or `text-heading-48` |
| `h2`     | `text-heading-32`                      |
| `h3`     | `text-heading-24`                      |
| `h4`     | `text-heading-20`                      |
| `p`      | `text-copy-14`                         |
| `small`  | `text-copy-13` or `text-label-12`      |
| `code`   | `text-copy-13-mono`                    |
| `button` | `text-button-14`                       |

This is a repository-level mapping draft, not part of the original Geist documentation.

These semantic assignments should be validated against actual content density and Korean copy length before finalizing.

## Korean Content Notes

This repository primarily uses Korean content, so typography adoption should be reviewed with Korean text specifically.

Implementation notes for later validation:

- Verify line-height on dense Korean paragraphs before locking `Copy` tokens.
- Verify letter-spacing on large headings, because values tuned for Latin typography can feel too open or too tight in Korean.
- Verify uppercase-dependent tokens like `Caps`, since the behavior is meaningful mainly for Latin text.
- Verify mono token readability where Korean and code-like Latin strings appear together.

## Migration Checklist

Before changing `components/globals.css`, confirm the following:

- Every documented token has a CSS variable set.
- Every documented token has a utility class.
- Mono variants use the repository mono font.
- Tabular variants enable tabular numerals.
- Caps variants define uppercase behavior where needed.
- `strong` handling is consistent across `Heading`, `Label`, and `Copy`.
- Existing `h1` to `h4`, `p`, and `blockquote` styles are either remapped or intentionally removed.
- Portable text rendering and post content still read correctly after the change.
