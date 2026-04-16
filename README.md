# Vaibring

A curated webring for friends of [Vaibhav](https://github.com/v8v88v8v88) and sites that share his wavelength. Got the ball knowledge? You might belong here.

**[→ vaibring hub](https://v8v88v8v88.github.io/vaibring)**

---

## What is this?

[Webrings](https://en.wikipedia.org/wiki/Webring) were a way for small websites to link to each other in a loop, helping visitors discover new sites. They were everywhere in the 90s, then disappeared when search engines and social media took over.

vaibring brings the idea back - as a curated ring for Vaibhav's friends and people aligned with his ideas:

- **No backend.** The ring is a single JSON file served from GitHub Pages.
- **No build step.** The widget is vanilla JS + CSS. Drop in one `<script>` tag.
- **No dependencies.** Zero npm packages. Zero frameworks.
- **Curated, not open-directory.** Anyone can submit a PR, but Vaibhav decides what gets merged. If he vibes with your site, you're in.

## Quick start

### 1. Add the widget to your site

```html
<script
  src="https://v8v88v8v88.github.io/vaibring/webring/widget.js"
  data-ring="https://v8v88v8v88.github.io/vaibring/webring/sites.json"
  data-theme="retro"
  async
></script>
```

That's it. The widget renders inline and shows **← prev | random | next →** navigation.

### 2. Join the ring

This ring is primarily for friends of Vaibhav and sites aligned with his ideas - but it's open to anyone. Submit a PR and if Vaibhav likes your site, it gets merged.

1. Fork this repo
2. Add your site to `webring/sites.json`:

   ```json
   {
     "name": "your site",
     "url": "https://yoursite.com",
     "description": "a short description"
   }
   ```

3. Open a Pull Request
4. CI validates your entry automatically
5. Vaibhav reviews it, if your site's got the vibe, you're in.

## Widget themes

| Theme   | Attribute              | Look                       |
| ------- | ---------------------- | -------------------------- |
| Light   | *(omit `data-theme`)*  | Minimal, light background  |
| Retro   | `data-theme="retro"`   | Green on black, hacker     |
| Dark    | `data-theme="dark"`    | Purple accent, dark        |

## Widget options

| Attribute      | Required | Default      | Description                          |
| -------------- | -------- | ------------ | ------------------------------------ |
| `src`          | ✓        | -            | URL to `widget.js`                   |
| `data-ring`    | ✓        | -            | URL to `sites.json`                  |
| `data-theme`   |          | *(light)*    | `"retro"` or `"dark"`                |
| `data-label`   |          | `"vaibring"` | Custom ring name in the widget       |
| `data-hub`     |          | *(auto)*     | URL the ring name links to           |

## Project structure

```
vaibring/
├── index.html                  # Hub landing page (GitHub Pages root)
├── webring/
│   ├── sites.json              # The ring registry
│   ├── widget.js               # Embeddable widget script
│   └── widget.css              # Widget styles (auto-loaded by widget.js)
├── scripts/
│   └── validate.js             # CI validation for sites.json
├── .github/
│   ├── workflows/
│   │   ├── validate.yml        # PR validation workflow
│   │   └── deploy.yml          # GitHub Pages deployment
│   └── PULL_REQUEST_TEMPLATE.md
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

## How it works

1. **Registry** - `webring/sites.json` is a flat JSON array of `{ name, url, description }` objects. The order defines the ring.

2. **Widget** - `widget.js` is a self-contained IIFE. When loaded, it:
   - Injects the CSS automatically
   - Fetches the ring data
   - Matches the current page's URL against the ring
   - Renders prev / random / next links as a circular loop

3. **Hub** - `index.html` is the landing page showing the full directory, widget demos, embed instructions, and join flow. Supports light and dark mode.

4. **Validation** - On every PR touching `sites.json`, CI runs `scripts/validate.js` which checks JSON validity, required fields, HTTPS, duplicates, and field lengths.

5. **Deployment** - Push to `main` triggers GitHub Pages deployment of the entire repo.

## Edge cases handled

- **Site not in ring** - Widget still renders with navigation to ring members
- **Single-site ring** - Prev/next point to the same site; random works
- **Empty ring** - Shows "ring is empty" message
- **Fetch failure** - Shows "ring unavailable" gracefully
- **URL normalization** - Strips `www.`, trailing slashes, and protocol for matching

## Self-hosting

You can fork vaibring and run your own ring. Just update the URLs in:
- `widget.js` default `RING_URL` constant
- `index.html` embed examples
- `README.md` / `CONTRIBUTING.md` instructions

Everything runs as static files - deploy anywhere (GitHub Pages, Netlify, Cloudflare Pages, etc).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

**Note:** PRs are merged at Vaibhav's discretion. This is a curated collection, not an open directory.

## License

[GPLv3](LICENSE)

---

*A curated corner of the indie web. Maintained by [Vaibhav](https://github.com/v8v88v8v88).*
