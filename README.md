# Broken SMP Web v2

Live GitHub Pages website for Broken SMP.

## What changed
- New dark/red server-store style layout.
- Live API already set to `https://brokensmpapi.duckdns.org`.
- Java join instructions show the full address: `brokensmp.duckdns.org:25612`.
- Bedrock instructions show hostname + port `8118`.
- Store has account linking + editable Coin packages.
- Coin packages: 500 / 1.5K / 2.5K / 5K / 25K / 50K.
- Staff is now edited from one section in `assets/data.js`.
- Public Players page continues to show all tracked online + offline players.

## Finish Tebex
Open `assets/data.js` and find `coinPackages`.
Paste each public Tebex package/checkout URL into its `tebexUrl` value.

Example:
`{ id:"coins_500", coins:500, price:5, label:"Starter", tebexUrl:"https://YOUR-STORE.tebex.io/package/..." }`

Do NOT place Tebex secrets, webhook secrets, API admin keys, Discord tokens, database passwords, or payment credentials in GitHub.

## Staff editing
Open `assets/data.js` and edit only:

`BROKEN_DATA.staff`

Example:
`{name:"MinecraftName", role:"Moderator", bio:"Server Moderation"}`

The Minecraft head loads automatically from the username.

## Deploy
Upload/replace these files in the root of your `BrokenSMP-Web` GitHub repository, then commit. GitHub Pages will redeploy automatically.
