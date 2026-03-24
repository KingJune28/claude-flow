---
name: ui-ux-pro-max
description: "UI/UX design intelligence for web and mobile. Includes 50+ styles, 161 color palettes, 57 font pairings, 161 product types, 99 UX guidelines, and 25 chart types across 10 stacks (React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind, shadcn/ui, and HTML/CSS). Actions: plan, build, create, design, implement, review, fix, improve, optimize, enhance, refactor, and check UI/UX code. Projects: website, landing page, dashboard, admin panel, e-commerce, SaaS, portfolio, blog, and mobile app. Elements: button, modal, navbar, sidebar, card, table, form, and chart. Styles: glassmorphism, claymorphism, minimalism, brutalism, neumorphism, bento grid, dark mode, responsive, skeuomorphism, and flat design. Topics: color systems, accessibility, animation, layout, typography, font pairing, spacing, interaction states, shadow, and gradient. Integrations: shadcn/ui MCP for component search and examples."
---

# UI/UX Pro Max - Design Intelligence

Comprehensive design guide for web and mobile applications. Contains 50+ styles, 161 color palettes, 57 font pairings, 161 product types with reasoning rules, 99 UX guidelines, and 25 chart types across 10 technology stacks. Searchable database with priority-based recommendations.

## When to Apply

This Skill should be used when the task involves **UI structure, visual design decisions, interaction patterns, or user experience quality control**.

### Must Use

- Designing new pages (Landing Page, Dashboard, Admin, SaaS, Mobile App)
- Creating or refactoring UI components (buttons, modals, forms, tables, charts, etc.)
- Choosing color schemes, typography systems, spacing standards, or layout systems
- Reviewing UI code for user experience, accessibility, or visual consistency
- Implementing navigation structures, animations, or responsive behavior
- Making product-level design decisions (style, information hierarchy, brand expression)
- Improving perceived quality, clarity, or usability of interfaces

### Recommended

- UI looks "not professional enough" but the reason is unclear
- Receiving feedback on usability or experience
- Pre-launch UI quality optimization
- Aligning cross-platform design (Web / iOS / Android)
- Building design systems or reusable component libraries

### Skip

- Pure backend logic development
- Only involving API or database design
- Performance optimization unrelated to the interface
- Infrastructure or DevOps work
- Non-visual scripts or automation tasks

## Rule Categories by Priority

| Priority | Category | Impact | Domain | Key Checks (Must Have) | Anti-Patterns (Avoid) |
|----------|----------|--------|--------|------------------------|------------------------|
| 1 | Accessibility | CRITICAL | `ux` | Contrast 4.5:1, Alt text, Keyboard nav, Aria-labels | Removing focus rings, Icon-only buttons without labels |
| 2 | Touch & Interaction | CRITICAL | `ux` | Min size 44×44px, 8px+ spacing, Loading feedback | Reliance on hover only, Instant state changes (0ms) |
| 3 | Performance | HIGH | `ux` | WebP/AVIF, Lazy loading, Reserve space (CLS < 0.1) | Layout thrashing, Cumulative Layout Shift |
| 4 | Style Selection | HIGH | `style`, `product` | Match product type, Consistency, SVG icons (no emoji) | Mixing flat & skeuomorphic randomly, Emoji as icons |
| 5 | Layout & Responsive | HIGH | `ux` | Mobile-first breakpoints, Viewport meta, No horizontal scroll | Horizontal scroll, Fixed px container widths, Disable zoom |
| 6 | Typography & Color | MEDIUM | `typography`, `color` | Base 16px, Line-height 1.5, Semantic color tokens | Text < 12px body, Gray-on-gray, Raw hex in components |
| 7 | Animation | MEDIUM | `ux` | Duration 150–300ms, Motion conveys meaning, Spatial continuity | Decorative-only animation, Animating width/height, No reduced-motion |
| 8 | Forms & Feedback | MEDIUM | `ux` | Visible labels, Error near field, Helper text, Progressive disclosure | Placeholder-only label, Errors only at top, Overwhelm upfront |
| 9 | Navigation Patterns | HIGH | `ux` | Predictable back, Bottom nav ≤5, Deep linking | Overloaded nav, Broken back behavior, No deep links |
| 10 | Charts & Data | LOW | `chart` | Legends, Tooltips, Accessible colors | Relying on color alone to convey meaning |

## Quick Reference

### 1. Accessibility (CRITICAL)

- `color-contrast` - Minimum 4.5:1 ratio for normal text (large text 3:1)
- `focus-states` - Visible focus rings on interactive elements (2–4px)
- `alt-text` - Descriptive alt text for meaningful images
- `aria-labels` - aria-label for icon-only buttons
- `keyboard-nav` - Tab order matches visual order; full keyboard support
- `form-labels` - Use label with for attribute
- `skip-links` - Skip to main content for keyboard users
- `heading-hierarchy` - Sequential h1→h6, no level skip
- `color-not-only` - Don't convey info by color alone (add icon/text)
- `dynamic-type` - Support system text scaling; avoid truncation as text grows
- `reduced-motion` - Respect prefers-reduced-motion; reduce/disable animations when requested
- `voiceover-sr` - Meaningful accessibilityLabel/accessibilityHint; logical reading order
- `escape-routes` - Provide cancel/back in modals and multi-step flows
- `keyboard-shortcuts` - Preserve system and a11y shortcuts

### 2. Touch & Interaction (CRITICAL)

- `touch-target-size` - Min 44×44pt (Apple) / 48×48dp (Material)
- `touch-spacing` - Minimum 8px/8dp gap between touch targets
- `hover-vs-tap` - Use click/tap for primary interactions; don't rely on hover alone
- `loading-buttons` - Disable button during async operations; show spinner or progress
- `error-feedback` - Clear error messages near problem
- `cursor-pointer` - Add cursor-pointer to clickable elements (Web)
- `gesture-conflicts` - Avoid horizontal swipe on main content; prefer vertical scroll
- `tap-delay` - Use touch-action: manipulation to reduce 300ms delay (Web)
- `standard-gestures` - Use platform standard gestures consistently
- `press-feedback` - Visual feedback on press (ripple/highlight)
- `haptic-feedback` - Use haptic for confirmations and important actions
- `safe-area-awareness` - Keep primary touch targets away from notch, Dynamic Island, gesture bar

### 3. Performance (HIGH)

- `image-optimization` - Use WebP/AVIF, responsive images (srcset/sizes), lazy load non-critical assets
- `image-dimension` - Declare width/height or use aspect-ratio to prevent layout shift
- `font-loading` - Use font-display: swap/optional to avoid invisible text
- `critical-css` - Prioritize above-the-fold CSS
- `lazy-loading` - Lazy load non-hero components via dynamic import
- `bundle-splitting` - Split code by route/feature to reduce initial load and TTI
- `content-jumping` - Reserve space for async content to avoid layout jumps
- `virtualize-lists` - Virtualize lists with 50+ items
- `main-thread-budget` - Keep per-frame work under ~16ms for 60fps
- `progressive-loading` - Use skeleton screens / shimmer instead of long blocking spinners
- `debounce-throttle` - Use debounce/throttle for high-frequency events

### 4. Style Selection (HIGH)

- `style-match` - Match style to product type (use `--design-system` for recommendations)
- `consistency` - Use same style across all pages
- `no-emoji-icons` - Use SVG icons (Heroicons, Lucide), not emojis
- `color-palette-from-product` - Choose palette from product/industry
- `effects-match-style` - Shadows, blur, radius aligned with chosen style
- `platform-adaptive` - Respect platform idioms (iOS HIG vs Material)
- `state-clarity` - Make hover/pressed/disabled states visually distinct
- `elevation-consistent` - Use a consistent elevation/shadow scale
- `dark-mode-pairing` - Design light/dark variants together
- `icon-style-consistent` - Use one icon set/visual language across the product
- `primary-action` - Each screen should have only one primary CTA

### 5. Layout & Responsive (HIGH)

- `viewport-meta` - width=device-width initial-scale=1 (never disable zoom)
- `mobile-first` - Design mobile-first, then scale up to tablet and desktop
- `breakpoint-consistency` - Use systematic breakpoints (375 / 768 / 1024 / 1440)
- `readable-font-size` - Minimum 16px body text on mobile
- `line-length-control` - Mobile 35–60 chars per line; desktop 60–75 chars
- `horizontal-scroll` - No horizontal scroll on mobile
- `spacing-scale` - Use 4pt/8dp incremental spacing system
- `container-width` - Consistent max-width on desktop (max-w-6xl / 7xl)
- `z-index-management` - Define layered z-index scale (0 / 10 / 20 / 40 / 100 / 1000)
- `fixed-element-offset` - Fixed navbar/bottom bar must reserve safe padding
- `viewport-units` - Prefer min-h-dvh over 100vh on mobile

### 6. Typography & Color (MEDIUM)

- `line-height` - Use 1.5-1.75 for body text
- `line-length` - Limit to 65-75 characters per line
- `font-pairing` - Match heading/body font personalities
- `font-scale` - Consistent type scale (e.g. 12 14 16 18 24 32)
- `contrast-readability` - Darker text on light backgrounds
- `color-semantic` - Define semantic color tokens (primary, secondary, error, surface) not raw hex
- `color-dark-mode` - Dark mode uses desaturated / lighter tonal variants, not inverted colors
- `color-accessible-pairs` - Foreground/background pairs must meet 4.5:1 (AA) or 7:1 (AAA)
- `truncation-strategy` - Prefer wrapping over truncation
- `number-tabular` - Use tabular/monospaced figures for data columns, prices, and timers
- `whitespace-balance` - Use whitespace intentionally to group related items

### 7. Animation (MEDIUM)

- `duration-timing` - Use 150–300ms for micro-interactions; complex transitions ≤400ms
- `transform-performance` - Use transform/opacity only; avoid animating width/height/top/left
- `loading-states` - Show skeleton or progress indicator when loading exceeds 300ms
- `easing` - Use ease-out for entering, ease-in for exiting
- `motion-meaning` - Every animation must express a cause-effect relationship
- `spring-physics` - Prefer spring/physics-based curves for natural feel
- `exit-faster-than-enter` - Exit animations shorter than enter (~60–70% of enter duration)
- `interruptible` - Animations must be interruptible; user tap cancels in-progress animation
- `no-blocking-animation` - Never block user input during an animation

### 8. Forms & Feedback (MEDIUM)

- `input-labels` - Visible label per input (not placeholder-only)
- `error-placement` - Show error below the related field
- `submit-feedback` - Loading then success/error state on submit
- `required-indicators` - Mark required fields (e.g. asterisk)
- `empty-states` - Helpful message and action when no content
- `toast-dismiss` - Auto-dismiss toasts in 3-5s
- `confirmation-dialogs` - Confirm before destructive actions
- `progressive-disclosure` - Reveal complex options progressively
- `inline-validation` - Validate on blur (not keystroke)
- `input-type-keyboard` - Use semantic input types (email, tel, number)
- `password-toggle` - Provide show/hide toggle for password fields
- `autofill-support` - Use autocomplete / textContentType attributes

### 9. Navigation Patterns (HIGH)

- `bottom-nav-limit` - Bottom navigation max 5 items; use labels with icons
- `back-behavior` - Back navigation must be predictable and consistent
- `deep-linking` - All key screens must be reachable via deep link / URL
- `nav-label-icon` - Navigation items must have both icon and text label
- `nav-state-active` - Current location must be visually highlighted in navigation
- `modal-escape` - Modals and sheets must offer a clear close/dismiss affordance
- `state-preservation` - Navigating back must restore previous scroll position and filter state
- `adaptive-navigation` - Large screens (≥1024px) prefer sidebar; small screens use bottom/top nav
- `focus-on-route-change` - After page transition, move focus to main content region

### 10. Charts & Data (LOW)

- `chart-type` - Match chart type to data type (trend → line, comparison → bar, proportion → pie/donut)
- `color-guidance` - Use accessible color palettes; avoid red/green only pairs for colorblind users
- `data-table` - Provide table alternative for accessibility
- `legend-visible` - Always show legend; position near the chart
- `tooltip-on-interact` - Provide tooltips/data labels on hover (Web) or tap (mobile)
- `axis-labels` - Label axes with units and readable scale
- `responsive-chart` - Charts must reflow or simplify on small screens
- `empty-data-state` - Show meaningful empty state when no data exists
- `loading-chart` - Use skeleton or shimmer placeholder while chart data loads
- `animation-optional` - Chart entrance animations must respect prefers-reduced-motion

## How to Use

Search specific domains using the CLI tool below.

## Prerequisites

Check if Python is installed:

```bash
python3 --version || python --version
```

## How to Use This Skill

| Scenario | Trigger Examples | Start From |
|----------|-----------------|------------|
| **New project / page** | "Build a landing page", "Build a dashboard" | Step 1 → Step 2 (design system) |
| **New component** | "Create a pricing card", "Add a modal" | Step 3 (domain search: style, ux) |
| **Choose style / color / font** | "What style fits a fintech app?" | Step 2 (design system) |
| **Review existing UI** | "Review this page for UX issues" | Quick Reference checklist above |
| **Fix a UI bug** | "Button hover is broken" | Quick Reference → relevant section |
| **Add charts / data viz** | "Add an analytics dashboard chart" | Step 3 (domain: chart) |

### Step 1: Analyze User Requirements

Extract key information from user request:
- **Product type**: SaaS, e-commerce, portfolio, healthcare, etc.
- **Target audience**: consumer users, enterprise, developers
- **Style keywords**: minimal, dark mode, glassmorphism, vibrant, etc.
- **Stack**: React, Next.js, Vue, React Native, Flutter, SwiftUI, etc.

### Step 2: Generate Design System (REQUIRED)

**Always start with `--design-system`** to get comprehensive recommendations:

```bash
python3 src/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system [-p "Project Name"]
```

**Example:**
```bash
python3 src/ui-ux-pro-max/scripts/search.py "SaaS dashboard analytics" --design-system -p "MyApp"
```

### Step 2b: Persist Design System (Master + Overrides Pattern)

```bash
python3 src/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name"
```

Creates:
- `design-system/MASTER.md` — Global Source of Truth
- `design-system/pages/` — Folder for page-specific overrides

### Step 3: Domain Searches

```bash
python3 src/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain>
```

| Need | Domain | Example |
|------|--------|---------|
| Product type patterns | `product` | `--domain product "B2B SaaS"` |
| Style options | `style` | `--domain style "glassmorphism dark"` |
| Color palettes | `color` | `--domain color "fintech blue"` |
| Font pairings | `typography` | `--domain typography "modern professional"` |
| Chart recommendations | `chart` | `--domain chart "trend analytics"` |
| UX best practices | `ux` | `--domain ux "animation accessibility"` |
| Google Fonts | `google-fonts` | `--domain google-fonts "sans serif variable"` |
| Landing structure | `landing` | `--domain landing "hero social-proof"` |
| React/Next.js perf | `react` | `--domain react "rerender memo"` |

### Step 4: Stack Guidelines

```bash
python3 src/ui-ux-pro-max/scripts/search.py "<keyword>" --stack react-native
```

## RuFlo Swarm Integration

This skill integrates with the RuFlo hierarchical swarm orchestration system:

### Agent Activation

When UI/UX work is detected, the `ui-ux-pro-max` skill auto-activates and can spawn:
- `design-architect` — Overall design system planning
- `ui-developer` — Component implementation
- `accessibility-auditor` — WCAG compliance checking
- `ux-researcher` — UX pattern research

### Memory Integration

Design decisions are stored in AgentDB ReasoningBank:

```bash
# Store a design pattern
npx @claude-flow/cli@latest memory store \
  --key "design-pattern-{product}" \
  --value "{design system JSON}" \
  --namespace ui-ux

# Search for similar past designs
npx @claude-flow/cli@latest memory search \
  --query "glassmorphism SaaS dashboard" \
  --namespace ui-ux
```

### Hook Integration

Pre/post-edit hooks validate UI files against the design system:

```bash
# Pre-edit: validates component against design system rules
# Post-edit: checks accessibility and stores successful patterns
```

### Swarm Workflow

For complex UI projects, spawn a design swarm:

```bash
npx @claude-flow/cli@latest swarm init --topology hierarchical --max-agents 4 --strategy specialized
```

Agents: `design-architect` (Queen) → `ui-developer` + `accessibility-auditor` + `ux-researcher`

## Pre-Delivery Checklist

### Visual Quality
- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons come from a consistent icon family
- [ ] Pressed-state visuals do not shift layout bounds or cause jitter
- [ ] Semantic theme tokens are used consistently (no hardcoded hex)

### Interaction
- [ ] All tappable elements provide clear pressed feedback
- [ ] Touch targets meet minimum size (≥44x44pt iOS, ≥48x48dp Android)
- [ ] Micro-interaction timing stays in the 150-300ms range
- [ ] Disabled states are visually clear and non-interactive
- [ ] Screen reader focus order matches visual order

### Light/Dark Mode
- [ ] Primary text contrast ≥4.5:1 in both light and dark mode
- [ ] Secondary text contrast ≥3:1 in both light and dark mode
- [ ] Both themes are tested before delivery

### Layout
- [ ] Safe areas are respected for headers, tab bars, and bottom CTA bars
- [ ] Scroll content is not hidden behind fixed/sticky bars
- [ ] Verified on 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on mobile
- [ ] 4/8dp spacing rhythm is maintained

### Accessibility
- [ ] All meaningful images/icons have accessibility labels
- [ ] Form fields have labels, hints, and clear error messages
- [ ] Color is not the only indicator
- [ ] Reduced motion and dynamic text size are supported
