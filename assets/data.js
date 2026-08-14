/*
  Broken SMP website content.
  EASY EDITING:
  - Change staff below to update the Staff page.
  - Paste Tebex package URLs into coinPackages when you finish Tebex.
  - No secret keys belong in this file.
*/
const BROKEN_DATA = {
  tierOrder: ["HT1","LT1","HT2","LT2","HT3","LT3","HT4","LT4","HT5","LT5","Unranked"],
  modes: ["overall","sword","crystal","mace","spearmace","uhc"],

  coinPackages: [
    { id:"coins_500",   coins:500,   price:5,   label:"Starter",   tebexUrl:"" },
    { id:"coins_1500",  coins:1500,  price:15,  label:"Boost",     tebexUrl:"" },
    { id:"coins_2500",  coins:2500,  price:20,  label:"Popular",   tebexUrl:"" },
    { id:"coins_5000",  coins:5000,  price:25,  label:"Value",     tebexUrl:"" },
    { id:"coins_25000", coins:25000, price:50,  label:"Mega",      tebexUrl:"" },
    { id:"coins_50000", coins:50000, price:100, label:"Ultimate",  tebexUrl:"" }
  ],

  coinShopInfo: [
    {icon:"💵", title:"Money", text:"Spend Coins in /coinshop for larger amounts of normal in-game Money. Money and Coins remain separate currencies."},
    {icon:"👑", title:"Ranks", text:"Use Coins on selected rank upgrades and server perks offered in /coinshop."},
    {icon:"🎒", title:"Premium Kits", text:"Higher-value kits can be bought with Coins. Your in-game kit system can enforce the 3-hour cooldown."}
  ],

  rules: [
    ["No cheating","Do not use hacked clients, unfair modifications, or exploits."],
    ["No duping","Do not duplicate items, Money, Coins, kits, or rewards."],
    ["Respect players","Keep chat and gameplay respectful. No harassment or targeted abuse."],
    ["No escaping punishments","Do not use alternate accounts to bypass server punishments."],
    ["PvP fairly","Follow the rules for each arena, duel mode, and ranked match."],
    ["Report bugs","Report serious bugs instead of abusing them for an advantage."]
  ],

  // ===== STAFF: EDIT ONLY THIS SECTION =====
  // name = Minecraft username used for the skin/head.
  // role = text shown under the username.
  // bio = optional small description.
  staff: [
    {name:"DeoMC", role:"Owner", bio:"Broken SMP Owner"},
    // Add more like:
    // {name:"ExampleDev", role:"Developer", bio:"Plugin Development"},
    // {name:"ExampleMod", role:"Moderator", bio:"Server Moderation"}
  ]
};
