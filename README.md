# Inzies Band Website

🎸 **Engineers Making Music** - A band website built with Astro, Svelte, and Tailwind CSS.

## 🚀 Features

- **Modern Stack**: Astro 5 + Svelte + Tailwind CSS
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Strudel.cc Integration**: Share music patterns as live-editable code
- **Responsive Design**: Looks great on all devices
- **Geeky Aesthetic**: Terminal-style elements, code syntax highlighting
- **Social Integration**: Spotify, YouTube, Instagram, Facebook links
- **GitHub Pages**: Easy deployment with GitHub Actions

## 🎨 Brand Colors

- **Orange**: `#FF6B00` - Primary accent
- **Blue**: `#0066FF` - Secondary accent  
- **Blue Glow**: `#00D4FF` - Neon highlights
- **Black**: `#0A0A0A` - Background

## 📁 Project Structure

```
src/
├── components/
│   ├── band/           # Band-specific components
│   ├── layout/         # Navbar, Footer
│   ├── music/          # Release cards, Strudel player, embeds
│   ├── social/         # Social links
│   └── ui/             # Reusable UI components
├── data/               # Band members, releases, Strudel patterns
├── layouts/            # Page layouts
├── pages/              # Astro pages
└── styles/             # CSS files
```

## 🛠️ Development

### Prerequisites

- Node.js 20+
- pnpm 9+

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Commands

| Command | Action |
|---------|--------|
| `pnpm dev` | Start dev server at `localhost:4321` |
| `pnpm build` | Build production site to `./dist/` |
| `pnpm preview` | Preview build locally |
| `pnpm format` | Format code with Prettier |

## 🚀 Deployment

This site is configured to deploy to GitHub Pages automatically.

### Setup GitHub Pages

1. Go to your repository Settings → Pages
2. Under "Build and deployment", select "GitHub Actions"
3. Push to `main` branch to trigger deployment

### Custom Domain (Optional)

1. Add your domain in repository Settings → Pages
2. Create a `CNAME` file in `public/` with your domain
3. Update `site` in `astro.config.mjs`

## 📝 Customization

### Update Site Config

Edit `src/config.ts`:

```typescript
export const siteConfig: SiteConfig = {
  title: "INZIES",
  subtitle: "Engineers Making Music",
  // ...
};
```

### Add Band Members

Edit `src/data/band-members.ts`

### Add Releases

Edit `src/data/releases.ts`

### Add Strudel Patterns

Edit `src/data/strudel-patterns.ts`

## 🎵 Strudel.cc Integration

We use [Strudel](https://strudel.cc) to share music patterns as code. Patterns are defined in `src/data/strudel-patterns.ts` and rendered with the `StrudelPlayer` component.

Example pattern:

```javascript
stack(
  s("bd*2 [~ bd] bd [bd ~]"),
  s("[~ hh]*4"),
  s("~ sd ~ sd")
).slow(2)
```

## 📄 License

MIT License - feel free to use this template for your own band!

---

Made with ❤️ and ☕ by engineers who rock.
