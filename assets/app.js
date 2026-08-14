
const $=s=>document.querySelector(s);
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const C=window.BROKEN_CONFIG||{};
const head=n=>`https://mc-heads.net/avatar/${encodeURIComponent(n)}/64`;
const token=()=>localStorage.getItem("brokenSmpWebToken")||"";
const tierBadge=t=>`<span class="tier ${String(t||"Unranked").toLowerCase()}">${esc(t||"Unranked")}</span>`;
const money=n=>Number(n||0).toLocaleString(undefined,{maximumFractionDigits:2});
const date=ms=>ms?new Date(ms).toLocaleDateString(undefined,{year:"numeric",month:"short",day:"numeric"}):"Unknown";
const duration=s=>`${Math.floor((s||0)/3600)}h ${Math.floor(((s||0)%3600)/60)}m`;
const modeTitle=m=>m==="spearmace"?"SpearMace":m.charAt(0).toUpperCase()+m.slice(1);
const advName=k=>{let x=String(k).split(":").pop().split("/").pop().replaceAll("_"," ");return x.replace(/\b\w/g,c=>c.toUpperCase())};
const javaAddress=()=>`${C.serverAddress||"brokensmp.duckdns.org"}:${C.javaPort||25612}`;
const bedrockHost=()=>C.serverAddress||"brokensmp.duckdns.org";

function shell(title,desc,body){
  return `<section><div class="section-head"><div><div class="eyebrow">Broken SMP</div><h2>${title}</h2></div><p>${desc||""}</p></div>${body}</section>`
}
function notConnected(){
  return `<div class="callout"><b>Live API not connected yet.</b><p class="muted">Set the HTTPS API address in <code>assets/config.js</code>.</p></div>`
}
async function api(path,opts={}){
  if(!C.apiBase)throw new Error("API_NOT_CONFIGURED");
  let headers={"Content-Type":"application/json",...(opts.headers||{})};
  if(opts.auth&&token())headers.Authorization=`Bearer ${token()}`;
  let r=await fetch(C.apiBase.replace(/\/$/,"")+path,{...opts,headers});
  let j=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(j.error||`HTTP ${r.status}`);
  return j
}

async function home(){
  let server=null, players=[];
  try{server=await api("/api/server")}catch(e){}
  try{players=await api("/api/players")}catch(e){}
  const online=server?.online ?? players.filter(p=>p.online).length ?? "—";
  const max=server?.maxPlayers ?? "—";
  if($("#utilityOnline")) $("#utilityOnline").textContent=`${online} ONLINE`;

  return `
  <section class="hero">
    <div>
      <div class="eyebrow">⚔ Competitive Survival · Java + Bedrock</div>
      <h1>BREAK.<br><span>REBUILD.</span><br>DOMINATE.</h1>
      <p class="lead">Broken SMP combines survival, arenas, ranked PvP, duels, live profiles, Minecraft advancements and a linked Coins economy in one network.</p>
      <div class="actions">
        <a class="btn primary" href="#players">Explore Players</a>
        <a class="btn" href="#ranked">PvP Rankings</a>
        <a class="btn" href="#store">Buy Coins</a>
      </div>
    </div>

    <div class="server-card">
      <span class="status"><span class="dot"></span> ${server?'SERVER API ONLINE':'WEBSITE ONLINE'}</span>
      <h3>Join Broken SMP</h3>
      <p class="muted">Use these exact addresses when adding the server.</p>

      <div class="join-grid">
        <div class="join-box">
          <strong>☕ Java Edition</strong>
          <code>${esc(javaAddress())}</code>
          <small>Server Address: <b>${esc(C.serverAddress||"brokensmp.duckdns.org")}</b><br>Port: <b>${C.javaPort||25612}</b><br><br>You can type the full address as:<br><b>${esc(javaAddress())}</b></small>
        </div>
        <div class="join-box">
          <strong>📱 Bedrock Edition</strong>
          <code>${esc(bedrockHost())}</code>
          <small>Server Address: <b>${esc(bedrockHost())}</b><br>Port: <b>${C.bedrockPort||8118}</b></small>
        </div>
      </div>

      <div class="actions">
        <button class="btn primary" onclick="copyJavaAddress()">Copy Java Address</button>
        <button class="btn" onclick="copyBedrockAddress()">Copy Bedrock Address</button>
      </div>

      <div class="statgrid">
        <div class="mini"><b>${online}</b><span>Online</span></div>
        <div class="mini"><b>${players.length||"—"}</b><span>Tracked Players</span></div>
        <div class="mini"><b>HT1</b><span>Top PvP Tier</span></div>
        <div class="mini"><b>24/7</b><span>Profiles</span></div>
      </div>
    </div>
  </section>

  ${!C.apiBase?notConnected():""}

  ${shell("Explore Broken SMP","One site for the server, player history and competitive scene.",`
    <div class="grid">
      <a class="card feature-card" href="#players" style="text-decoration:none;color:inherit"><div class="icon">👤</div><h3>Live Player Profiles</h3><p>Every tracked online and offline player, with Money, W/L, playtime, join date, PvP tiers and Minecraft advancements.</p></a>
      <a class="card feature-card" href="#ranked" style="text-decoration:none;color:inherit"><div class="icon">🏆</div><h3>Ranked PvP</h3><p>Overall, Sword, Crystal, Mace, SpearMace and UHC rankings using the LT5 → HT1 ladder.</p></a>
      <a class="card feature-card" href="#store" style="text-decoration:none;color:inherit"><div class="icon">🪙</div><h3>Coins Store</h3><p>Link your Minecraft account, buy Coins securely through Tebex, then spend them in-game with /coinshop.</p></a>
    </div>
  `)}

  ${shell("How To Join","For anybody who needs the exact steps.",`
    <div class="howto">
      <div class="step"><div class="step-num">STEP 01</div><h3>Java</h3><p>Multiplayer → Add Server → put <b>${esc(javaAddress())}</b> in Server Address → Join Server.</p></div>
      <div class="step"><div class="step-num">STEP 02</div><h3>Bedrock</h3><p>Servers → Add Server → Address: <b>${esc(bedrockHost())}</b> → Port: <b>${C.bedrockPort||8118}</b>.</p></div>
      <div class="step"><div class="step-num">STEP 03</div><h3>Website Account</h3><p>Join Broken SMP, run <b>/web link</b>, then enter the code on the Store page to connect your Minecraft account.</p></div>
    </div>
  `)}
  `;
}

async function players(){
  if(!C.apiBase)return shell("Player Directory","Real Broken SMP profiles.",notConnected());
  try{
    let ps=await api("/api/players");
    window._players=ps;
    return shell("Player Directory",`${ps.length} tracked player${ps.length===1?"":"s"} — online and offline.`,`<div class="searchbar"><input id="playerSearch" placeholder="Search username..." oninput="filterPlayers(this.value)"></div><div id="playerList">${playerCards(ps)}</div>`)
  }catch(e){return shell("Player Directory","",`<div class="empty">Could not load players: ${esc(e.message)}</div>`)}
}
function playerCards(ps){
  return ps.length?`<div class="grid">${ps.map(p=>`<a class="card" href="#player/${encodeURIComponent(p.name)}" style="text-decoration:none;color:inherit"><div class="playercell"><img class="head" src="${head(p.name)}" alt=""><div><b>${esc(p.name)}</b><div class="muted" style="font-size:11px">${p.online?'🟢 ONLINE':'⚫ OFFLINE'} · ${esc(p.rank)}</div></div></div><div style="margin-top:14px;display:flex;justify-content:space-between">${tierBadge(p.tiers?.overall)}<span class="muted">${p.wins}W / ${p.losses}L</span></div></a>`).join("")}</div>`:`<div class="empty">No players yet.</div>`
}
window.filterPlayers=q=>{$("#playerList").innerHTML=playerCards((window._players||[]).filter(p=>p.name.toLowerCase().includes(q.toLowerCase())))};

async function ranked(mode="overall"){
  if(!C.apiBase)return shell("Ranked PvP","HT1 is the highest tier.",notConnected());
  try{
    let ps=await api(`/api/rankings?mode=${encodeURIComponent(mode)}`);
    return shell("Ranked PvP","LT5 → HT5 → LT4 → HT4 → LT3 → HT3 → LT2 → HT2 → LT1 → HT1",`
      <div class="searchbar"><select class="select" onchange="location.hash='ranked/'+this.value">${BROKEN_DATA.modes.map(m=>`<option value="${m}" ${m===mode?'selected':''}>${modeTitle(m)}</option>`).join("")}</select></div>
      <div class="tablewrap"><table><thead><tr><th>#</th><th>Player</th><th>${modeTitle(mode)} Tier</th><th>Wins</th><th>Losses</th><th>Win Rate</th></tr></thead><tbody>${ps.map((p,i)=>`<tr><td class="ranknum ${i<3?'top':''}">${i+1}</td><td><a class="playercell" href="#player/${encodeURIComponent(p.name)}"><img class="head" src="${head(p.name)}"><span>${esc(p.name)}</span></a></td><td>${tierBadge(p.tiers?.[mode])}</td><td>${p.wins}</td><td>${p.losses}</td><td>${Number(p.winRate||0).toFixed(1)}%</td></tr>`).join("")}</tbody></table></div>
    `)
  }catch(e){return shell("Ranked PvP","",`<div class="empty">Could not load rankings: ${esc(e.message)}</div>`)}
}

async function profile(name){
  if(!C.apiBase)return shell("Player Profile","",notConnected());
  try{
    let p=await api(`/api/player/${encodeURIComponent(name)}`);
    let adv=p.advancements||[];
    return `<section>
      <div class="profile-head card"><img class="bighead" src="${head(p.name)}"><div><div class="eyebrow">${p.online?'🟢 Online':'⚫ Offline'} · ${esc(p.rank)}</div><h2>${esc(p.name)}</h2><div class="badges"><span class="badge">${tierBadge(p.tiers?.overall)}</span><span class="badge">${adv.length} Advancements</span></div></div></div>
      <div class="profile-grid">
        <div class="card"><h3>Player Stats</h3><div class="metrics">
          <div class="metric"><b>${p.wins}</b><span>Wins</span></div>
          <div class="metric"><b>${p.losses}</b><span>Losses</span></div>
          <div class="metric"><b>${Number(p.winRate||0).toFixed(1)}%</b><span>Win Rate</span></div>
          <div class="metric"><b>$${money(p.money)}</b><span>Money</span></div>
          <div class="metric"><b>${duration(p.playtimeSeconds)}</b><span>Playtime</span></div>
          <div class="metric"><b>${date(p.firstJoined)}</b><span>Joined</span></div>
        </div></div>
        <div class="card"><h3>PvP Tiers</h3><div class="tablewrap"><table style="min-width:0"><tbody>${BROKEN_DATA.modes.map(m=>`<tr><td>${modeTitle(m)}</td><td>${tierBadge(p.tiers?.[m])}</td></tr>`).join("")}</tbody></table></div></div>
      </div>
      <div class="card" style="margin-top:14px"><h3>Minecraft Advancements</h3>${adv.length?`<div class="achievements">${adv.map(a=>`<div class="achievement"><b>🏆 ${esc(advName(a))}</b><small>${esc(a)}</small></div>`).join("")}</div>`:`<div class="empty">No completed advancements recorded yet.</div>`}</div>
    </section>`
  }catch(e){return shell("Player not found","",`<div class="empty">${esc(e.message)}</div>`)}
}

function rules(){return shell("Server Rules","Broken SMP's public rulebook.",`<div class="card">${BROKEN_DATA.rules.map((r,i)=>`<div class="rule"><b>${i+1}. ${r[0]}</b><span>${r[1]}</span></div>`).join("")}</div>`)}

function staff(){
  return shell("Server Team","Edit staff in one place: assets/data.js → BROKEN_DATA.staff.",`
    <div class="callout" style="margin-bottom:14px"><b>Easy staff editing</b><p class="muted">Each staff member only needs a Minecraft username, role and optional bio in <code>assets/data.js</code>. Their Minecraft head loads automatically.</p></div>
    <div class="staff">${BROKEN_DATA.staff.map(s=>`<div class="card"><img src="${head(s.name)}"><h3>${esc(s.name)}</h3><div class="red">${esc(s.role)}</div>${s.bio?`<p class="staff-bio">${esc(s.bio)}</p>`:""}</div>`).join("")}</div>
  `)
}

function duels(){
  return shell("Duels","Mode-specific rankings connected to the live tier system.",`<div class="grid">${BROKEN_DATA.modes.filter(m=>m!=="overall").map(m=>`<div class="card"><div class="eyebrow">${modeTitle(m)}</div><h3>${modeTitle(m)} Ranked</h3><p>View the live ${modeTitle(m)} leaderboard.</p><a class="btn" href="#ranked/${m}">Open Rankings</a></div>`).join("")}</div>`)
}

function achievements(){
  return shell("Minecraft Advancements","Player profiles display advancements completed in-game.",`<div class="callout"><b>Real Minecraft progress.</b><p class="muted">Open a player's profile to see the advancements BrokenSMPWeb has recorded for them.</p></div>`)
}

function packageButton(pkg){
  if(pkg.tebexUrl) return `<a class="btn primary full" href="${esc(pkg.tebexUrl)}" target="_blank" rel="noopener">Buy ${Number(pkg.coins).toLocaleString()} Coins</a>`;
  return `<button class="btn full disabled" disabled>Tebex Link Needed</button>`;
}
function packageCards(){
  return `<div class="package-grid">${BROKEN_DATA.coinPackages.map((p,i)=>`
    <div class="package ${i===2||i===4?'featured':''}">
      <div class="package-label">${esc(p.label)}</div>
      <div class="package-coins">🪙 ${Number(p.coins).toLocaleString()} <small>Coins</small></div>
      <div class="package-price">$${Number(p.price).toFixed(2)} USD</div>
      ${packageButton(p)}
    </div>`).join("")}</div>`;
}

async function store(){
  if(!C.apiBase)return shell("Coins Store","Money and Coins are separate currencies.",notConnected());

  const storeIntro=`
    <div class="callout" style="margin-bottom:14px">
      <b>Coins are the store currency.</b>
      <p class="muted">Buy Coins here through Tebex, then spend them in-game using <b>/coinshop</b> on Money, Ranks and premium Kits. Normal Money remains the free gameplay economy.</p>
    </div>
  `;

  if(!token()){
    return shell("Coins Store","Link your Minecraft account before buying Coins.",`
      ${storeIntro}
      <div class="store-hero">
        <div class="card">
          <div class="eyebrow">STEP 1 · ACCOUNT LINK</div>
          <h3>Connect your Minecraft account</h3>
          <p class="muted">Join Broken SMP and run <b>/web link</b>. Type the one-time code here so purchases can be tied to the correct account.</p>
          <div class="searchbar"><input id="linkCode" maxlength="8" placeholder="8-character link code"><button class="btn primary" onclick="linkAccount()">Link Account</button></div>
          <div id="linkResult"></div>
        </div>
        <div class="wallet-card">
          <div class="eyebrow">WHY LINK?</div>
          <h3>Purchases go to your account</h3>
          <p class="muted">Your website session is linked to your Minecraft UUID so the site knows which account you are buying Coins for.</p>
        </div>
      </div>
      <div style="opacity:.68">${packageCards()}</div>
    `);
  }

  try{
    let p=await api("/api/me",{auth:true});
    return shell("Coins Store",`Linked as ${esc(p.name)}.`,`
      ${storeIntro}
      <div class="store-hero">
        <div class="profile-head card"><img class="bighead" src="${head(p.name)}"><div><div class="eyebrow">✓ LINKED MINECRAFT ACCOUNT</div><h2>${esc(p.name)}</h2><div class="badges"><span class="badge">🪙 ${Number(p.coins||0).toLocaleString()} Coins</span><span class="badge">$${money(p.money)} Money</span></div></div></div>
        <div class="wallet-card"><small>AVAILABLE COINS</small><div class="coin-balance">🪙 ${Number(p.coins||0).toLocaleString()}</div><p class="muted">After buying Coins through Tebex, use <b>/coins</b> in-game to check your balance and <b>/coinshop</b> to spend them.</p><button class="btn" onclick="logoutWebsite()">Unlink this browser</button></div>
      </div>

      <div class="section-head"><div><div class="eyebrow">COIN PACKAGES</div><h2>Choose a package</h2></div><p>Tebex checkout links are intentionally kept as public package URLs only. Add them in assets/data.js when your packages are ready.</p></div>
      ${packageCards()}

      <div class="section-head"><div><div class="eyebrow">IN-GAME</div><h2>What Coins are for</h2></div><p>The website sells Coins; your existing /coinshop handles what players spend them on.</p></div>
      <div class="coin-use-grid">${BROKEN_DATA.coinShopInfo.map(x=>`<div class="coin-use"><span class="icon">${x.icon}</span><b>${esc(x.title)}</b><span>${esc(x.text)}</span></div>`).join("")}</div>
    `)
  }catch(e){
    localStorage.removeItem("brokenSmpWebToken");
    return store()
  }
}

window.linkAccount=async()=>{
  let el=$("#linkResult"),code=$("#linkCode").value.trim();
  el.innerHTML="Linking...";
  try{
    let r=await api("/api/link/claim",{method:"POST",body:JSON.stringify({code})});
    localStorage.setItem("brokenSmpWebToken",r.token);
    await route()
  }catch(e){el.innerHTML=`<div class="red">${esc(e.message)}</div>`}
};
window.logoutWebsite=()=>{localStorage.removeItem("brokenSmpWebToken");route()};
window.copyJavaAddress=()=>navigator.clipboard?.writeText(javaAddress()).then(()=>alert(`Copied: ${javaAddress()}`));
window.copyBedrockAddress=()=>navigator.clipboard?.writeText(bedrockHost()).then(()=>alert(`Copied Bedrock address: ${bedrockHost()} | Port ${C.bedrockPort||8118}`));
window.copyIP=window.copyJavaAddress;

async function route(){
  let h=location.hash.replace(/^#/,"")||"home",[page,arg]=h.split("/");
  $("#nav").classList.remove("open");
  document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")===`#${page}`));
  $("#app").innerHTML=`<div class="empty">Loading…</div>`;
  let html;
  if(page==="home")html=await home();
  else if(page==="players")html=await players();
  else if(page==="ranked")html=await ranked(arg||"overall");
  else if(page==="duels")html=duels();
  else if(page==="achievements")html=achievements();
  else if(page==="rules")html=rules();
  else if(page==="staff")html=staff();
  else if(page==="store")html=await store();
  else if(page==="player")html=await profile(decodeURIComponent(arg||""));
  else html=await home();
  $("#app").innerHTML=html;
  window.scrollTo(0,0)
}
$("#navToggle").onclick=()=>$("#nav").classList.toggle("open");
window.addEventListener("hashchange",route);
route();
