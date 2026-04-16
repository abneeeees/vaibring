# Contributing to vaibring

vaibring is a curated webring for friends of [Vaibhav](https://github.com/v8v88v8v88) and sites that share his wavelength. It's open for anyone to submit - but PRs are merged at Vaibhav's discretion.

Got the ball knowledge? Here's how to join.

## Adding your site

1. **Fork** this repo.
2. **Edit** `webring/sites.json` - add your entry to the end of the array:

   ```json
   {
     "name": "your site name",
     "url": "https://yoursite.com",
     "description": "optional short description"
   }
   ```

3. **Add the widget** to your site so visitors can navigate the ring:

   ```html
   <script
     src="https://v8v88v8v88.github.io/vaibring/webring/widget.js"
     data-ring="https://v8v88v8v88.github.io/vaibring/webring/sites.json"
     data-theme="retro"
     async
   ></script>
   ```

4. **Open a Pull Request.** CI will automatically validate your entry.
5. **Vaibhav reviews it.** If your site vibes - you're in.

## Will my site get accepted?

This isn't a free-for-all directory. vaibring is curated. Vaibhav will look at your site and decide if it fits the ring. Sites that tend to do well:

- Personal sites, blogs, and portfolios of friends or like-minded people
- Indie projects and hacker-style pages
- Sites that show personality and original thinking

Things that won't make it:

- Commercial products, SEO farms, or spam
- Generic template sites with no personality
- Sites that don't feel aligned with the ring's vibe

## Rules

- Your site must use **HTTPS**.
- Keep your description short (under 200 characters).
- One site per person (unless you have genuinely distinct sites).
- You must add the vaibring widget to your site.

## Widget options

| Attribute      | Default      | Description                       |
| -------------- | ------------ | --------------------------------- |
| `data-ring`    | *(required)* | URL to the `sites.json` file      |
| `data-theme`   | *(none)*     | `"retro"`, `"dark"`, or omit for light |
| `data-label`   | `"vaibring"` | Custom label shown in the widget  |
| `data-hub`     | *(auto)*     | Link for the ring name            |

## Reporting issues

Open an issue if:
- A site in the ring is broken, dead, or inappropriate
- You found a bug in the widget
- You have an idea for improvement

## Code changes

For changes to the widget, landing page, or tooling:
1. Fork and create a feature branch
2. Make your changes
3. Test locally (just open `index.html` in a browser)
4. Open a PR with a clear description

No build steps required. Everything is vanilla HTML/CSS/JS.
