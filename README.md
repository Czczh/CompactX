# CompactX

A customizable glass theme for Discord.

## Install

**Vencord:** Add the [hosted CSS](https://cdn.jsdelivr.net/gh/Czczh/CompactX@main/CompactX.css) under Settings > Vencord > Themes > Online Themes. Keep personal overrides in QuickCSS.

**BetterDiscord:** Download [CompactX.theme.css](./CompactX.theme.css), place it in your BetterDiscord themes folder, and enable it. Edit the local file's variables or use BetterDiscord Custom CSS.

## Personalization

Use a local `:root` override, not changes to `CompactX.css`:

```css
:root {
  --background-image: url("https://example.com/my-background.png") !important;
  --main-color: #8798b2 !important;
  --glass-main-chat-opacity: 25% !important;
}
```

The theme comes from GitHub; personal settings remain on the user's device. Updating this repository does not overwrite local QuickCSS, Custom CSS, or an already installed local loader. Updates appear when the client reloads the stylesheet, subject to CDN caching. The CDN's `main` branch cache can take up to 12 hours to refresh. Local settings are not automatically synchronized between devices.

## Files

- `CompactX.css`: shared stylesheet. Update this file to publish theme changes.
- `CompactX.theme.css`: small installable loader with space for local overrides.
