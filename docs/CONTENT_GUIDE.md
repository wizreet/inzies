# INZIES Website - Content Management Guide

This guide explains how to modify common content on the website.

---

## 📀 Managing Releases (Music)

**File:** `src/data/releases.ts`

### Adding a New Release

1. Open `src/data/releases.ts`
2. Add a new release object at the **beginning** of the `releasesData` array
3. Set `isLatest: true` on the new release
4. **Remove** `isLatest: true` from the previous latest release

```typescript
{
  id: "single-new-song",           // Unique ID (use format: type-title)
  title: "New Song",               // Display title
  type: "single",                  // "single" | "album" | "EP"
  description: "Description...",    // Brief description
  coverArt: `${ASSET_PATHS.RELEASES}/new-song.png`,  // Image path
  releaseDate: "2026-02-15",       // ISO date (YYYY-MM-DD)
  tracks: 1,                       // Number of tracks (optional for singles)
  spotifyUrl: "https://...",       // Spotify link
  youtubeUrl: "https://...",       // YouTube link
  isLatest: true,                  // Mark as latest release
},
```

### Changing the Latest Release

1. Find the release you want to make latest
2. Add `isLatest: true` to it
3. Remove `isLatest: true` from all other releases

### Cover Art Images

- Place images in: `public/assets/images/releases/`
- Recommended size: 500x500px (square)
- Format: PNG or JPG
- Naming: lowercase with hyphens (e.g., `new-song.png`)

---

## 🎵 Managing Play Along Songs

**File:** `src/data/songs.ts`

### Adding a New Song Pattern

```typescript
{
  id: "song-new-song",
  title: "New Song",
  album: "Album Name",
  albumId: "album-id",
  description: "Description of the song",
  coverArt: `${ASSET_PATHS.RELEASES}/new-song.png`,
  pattern: `// Your Strudel pattern here
$: s("[bd sd]*2").bank("RolandTR909")
$: note("<c3 g3>").s("piano")`,
  strudelUrl: "https://strudel.cc/#...",  // Base64 encoded pattern URL
  bpm: 120,
  duration: "3:30",
  releaseDate: "2026-01-01",
  spotifyUrl: "https://...",
  youtubeUrl: "https://...",
},
```

### Strudel Pattern Syntax

- Each line starts with `$:` for concurrent playback
- Use comments for band member sections: `// #membername - Role`
- Common methods: `.bank()`, `.gain()`, `.lpf()`, `.delay()`, `.room()`

---

## 👥 Site Configuration

**File:** `src/config.ts`

### Social Media Links

```typescript
social: Object.freeze({
  spotify: "https://open.spotify.com/artist/YOUR_ID",
  youtube: "https://youtube.com/@YOUR_CHANNEL",
  instagram: "https://instagram.com/YOUR_HANDLE/",
  facebook: "https://facebook.com/YOUR_PAGE",
  whatsapp: "https://wa.me/YOUR_NUMBER",
  email: "your@email.com",
}),
```

### Site Metadata

```typescript
title: "INZIES",           // Site title
subtitle: "Indie Music Band",  // Tagline
description: "...",        // SEO description
siteURL: "https://...",    // Full site URL
lang: "en",                // Language code
```

### Theme Colors

```typescript
themeColor: Object.freeze({
  primary: "#FF6B00",   // Orange - main brand
  secondary: "#0066FF", // Blue - accent
  accent: "#00D4FF",    // Cyan - highlights
}),
```

---

## 🔒 Security Checklist

### Email Protection

- Emails are obfuscated using `data-u` and `data-d` attributes
- Never put full email addresses directly in HTML
- Email reveals only on user interaction (hover/click)

### External Links

- Always use `rel="noopener noreferrer"` for external links
- Use `target="_blank"` for new tab links

### No Sensitive Data in Code

- No API keys in frontend code
- No passwords or secrets
- No personal information beyond public contact

### Security Headers (in Layout.astro)

```html
<meta http-equiv="X-Content-Type-Options" content="nosniff" />
<meta http-equiv="X-Frame-Options" content="SAMEORIGIN" />
<meta name="referrer" content="strict-origin-when-cross-origin" />
<meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
```

---

## 🎨 Styling Quick Reference

### Card Styling

Cards have orange borders by default and glow on hover.
Defined in: `src/styles/main.css` → `.card-base`

### Colors (Tailwind)

- `text-inzies-orange` - Primary orange
- `text-inzies-blue` - Accent blue
- `bg-inzies-black-800` - Dark background
- `border-inzies-orange/30` - Orange border at 30% opacity

---

## 📁 File Structure

```
src/
├── config.ts           # Site configuration
├── data/
│   ├── releases.ts     # Music releases
│   ├── songs.ts        # Play Along patterns
│   └── band-members.ts # Band member data
├── pages/
│   ├── index.astro     # Home page
│   ├── about.astro     # About page
│   ├── music.astro     # Music page
│   ├── play.astro      # Play Along page
│   └── gallery.astro   # Gallery page
├── components/         # Reusable components
├── styles/             # CSS files
└── constants/          # Constants & enums

public/
├── assets/
│   └── images/
│       └── releases/   # Album/single cover art
└── LogoAnimations/     # Logo files
```

---

## 🚀 Deployment

### Build Command

```bash
pnpm build
```

### Deploy (GitHub Pages)

```bash
git add -A
git commit -m "Your message"
git push origin main
```

GitHub Actions will automatically deploy to: `https://wizreet.github.io/inzies/`

---

## ⚠️ Common Pitfalls

1. **Forgot to remove old `isLatest`** - Only one release should have `isLatest: true`
2. **Wrong image path** - Use `${ASSET_PATHS.RELEASES}/filename.png`
3. **Missing image** - Add image to `public/assets/images/releases/` first
4. **Invalid date format** - Use ISO format: `YYYY-MM-DD`
5. **Broken Strudel URL** - Test pattern at strudel.cc first, then copy share URL
