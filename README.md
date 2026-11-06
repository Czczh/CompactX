# CompactX

A customizable glass theme for Discord.

## 1.1.0

Discord's November class format is supported alongside the previous class names. The update covers 363 class mappings, including app shells, wallpaper, headers, settings, profiles, server icons, controls and popouts. Mappings use the same module ID and readable class name in the Stable and Canary class lists; ambiguous names are not guessed.

Chat name text stays inline, so Vencord's UserMessagesPronouns text can sit on the same line as the username and timestamp. Long names can still wrap naturally. DM section styling is restricted to the DM section heading.

Native background tokens and transparent structural wrappers prevent stock backgrounds from covering the configured glass panels. Custom profile palettes and local customization variables are preserved.

## Install

**Vencord:** Add the [raw GitHub CSS](https://raw.githubusercontent.com/Czczh/CompactX/main/CompactX.css) under Settings > Vencord > Themes > Online Themes. Keep personal overrides in QuickCSS. Replace older jsDelivr URL to get updates without its 12-hour branch cache.

**BetterDiscord:** Download [CompactX.theme.css](./CompactX.theme.css), place it in your BetterDiscord themes folder, and enable it. Edit the local file's variables or use BetterDiscord Custom CSS.

If an older copy remains cached, use `https://raw.githubusercontent.com/Czczh/CompactX/main/CompactX.css?v=1.1.0` as the Online Themes URL, replacing the previous entry. Toggle the theme off and on. For a locally customized `.theme.css` file, update only its import URL. Keep existing variables and QuickCSS.

## Personalization

Use a local `:root` override:

```css
:root {
  --background-image: url("https://example.com/my-background.png") !important;
  --main-color: #8798b2 !important;
  --glass-main-chat-opacity: 25% !important;
}
```

## Validation

```sh
npm install
npx playwright install chromium
npm test
```

The browser fixtures cover both Discord class formats, cozy and compact pronouns, narrow chat wrapping, panel opacity overrides, transparent wrappers, custom profile colors, and server icon clipping. These fixtures do not replace a visual check in a signed-in Discord client.

## Maintenance references

The compatibility review used [Midnight's structural styles](https://github.com/refact0r/midnight-discord/blob/master/src/main.css), [its background token handling](https://github.com/refact0r/midnight-discord/blob/master/src/colors.css), [ClearVision's wallpaper handling](https://github.com/ClearVision/ClearVision-v7/blob/master/src/theme/app/_background.scss), and [Vencord's pronoun component](https://github.com/Vendicated/Vencord/blob/main/src/plugins/userMessagesPronouns/PronounsChatComponent.tsx). Class mappings were checked against [DiscordClasses](https://github.com/Vexadros/DiscordClasses).

