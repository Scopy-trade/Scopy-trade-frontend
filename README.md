# SCopyTrade – Auth Module

## File Structure

```
app/
  layout.tsx                     ← Root layout: imports Manrope + Inter, wires globals.css
  globals.css                    ← Tailwind v4 @theme block: all colours, radii, fonts
  (auth)/
    register/
      page.tsx                   ← Register page (Server Component)

components/
  auth/
    BrandingPanel.tsx            ← Left branding column (logo, headline, testimonial)
    AccountTypeSelector.tsx      ← Individual / Institutional radio cards
    OrgAccessCode.tsx            ← Optional org invite code input
    RegisterForm.tsx             ← Full form with state (email, password, accountType, accessCode)
    PartnerLogos.tsx             ← Grayscale partner logos strip
```

## Setup

```bash
npm install react-icons
```

## Using design tokens in your JSX

All colours are exposed as CSS variables and Tailwind v4 utility classes:

```tsx
// CSS variable (always works)
<div className="bg-[var(--color-secondary)]" />

// Tailwind v4 semantic class (via @theme mapping)
<div className="text-secondary" />
<div className="bg-surface-container-low" />
```

## Font families

```tsx
style={{ fontFamily: "var(--font-headline)" }}  // Manrope
style={{ fontFamily: "var(--font-body)" }}       // Inter
```

Or via CSS:

```css
font-family: var(--font-headline);
```

## Adding login page

Duplicate the `(auth)/register/` folder as `(auth)/login/`.
`BrandingPanel`, `AccountTypeSelector`, `OrgAccessCode`, and `PartnerLogos`
are all reusable — just create a new `LoginForm.tsx` component.
