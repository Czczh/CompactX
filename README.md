# CompactX

A customizable glass theme for Discord.

## Install

**Vencord:** Add the [raw GitHub CSS](https://raw.githubusercontent.com/Czczh/CompactX/main/CompactX.css) under Settings > Vencord > Themes > Online Themes. Keep personal overrides in QuickCSS. Replace any older jsDelivr URL to get updates without its 12-hour branch cache.

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

Personal settings remain on the user's device. Updating the repository does not overwrite QuickCSS, Custom CSS, or an installed local loader. Updates appear when the client refetches the stylesheet. BetterDiscord's jsDelivr import may be cached for up to 12 hours. Settings do not automatically synchronize between devices.

## Files

- `CompactX.css`: shared stylesheet. Update this file to publish theme changes.
- `CompactX.theme.css`: small installable loader with space for local overrides.
