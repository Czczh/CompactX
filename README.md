# CompactX

A customizable glass theme for Discord.

## Install

**Vencord:** Add [CompactX.css](https://raw.githubusercontent.com/Czczh/CompactX/main/CompactX.css) under Settings > Vencord > Themes > Online Themes.

**BetterDiscord:** Download [CompactX.theme.css](./CompactX.theme.css), place it in your themes folder, and enable it.

## Customize

Live panel blur is off by default for smoother scrolling. To restore it, set `--glass-backdrop-filter: initial;` in your local settings.

Keep personal changes in QuickCSS or edit the variables in your local `CompactX.theme.css` file. Your settings stay in place when the shared theme updates.

```css
:root {
  --background-image: url("https://example.com/background.png") !important;
  --main-color: #8798b2 !important;
  --glass-main-chat-opacity: 25% !important;
}
```
