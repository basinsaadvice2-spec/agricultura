/* FARM SHIFT AI — NASA POWER : humidité, pluie, température */
(window.FSAI_FILES=window.FSAI_FILES||[]).push("fsai-nasa.js");
let OBS=null;
function ind(){const o=OBS&&OBS.ok?OBS:null,st=o?"RÉEL":"INDISPONIBLE",rs="≈ 0,5° × 0,625°, quotidien",d=o?o.date:"—";return[["Humidité du sol (zone racinaire)",o?Math.round(o.wet*100)+" %":"—","NASA POWER · GWETROOT (modèle MERRA-2, pas SMAP)",st,d,o?rs:"—"],["Précipitations (7 derniers jours)",o?Math.round(o.rain7)+" mm":"—","NASA POWER · PRECTOTCORR",st,d,o?rs:"—"],["Température de l’air (2 m)",o?Math.round(o.t2m)+" °C":"—","NASA POWER · T2M",st,d,o?rs:"—"],["Végétation (NDVI)","—","NASA MODIS / Landsat (non connecté)","INDISPONIBLE","—","—"]]}
function obsBanner(){if(!OBS)return`<div class="banner">Aucune donnée chargée. Choisissez une zone ou utilisez votre position.</div>`;if(OBS.loading)return`<div class="banner">Chargement des données NASA POWER…</div>`;if(OBS.ok)return`<div class="banner ok">Données NASA POWER · valeurs du ${OBS.date} · grille ≈ 50 km (indicatif).</div>`;return`<div class="banner">${esc(OBS.err)} Rien n’est inventé.</div>`}
async function loadObs(){const c=coords();if(!c){OBS={ok:false,err:"Position inconnue : choisissez une zone ou utilisez votre position."};return}
 OBS={loading:true};loadSoil();loadReg();loadClim();const f=x=>x.toISOString().slice(0,10).replace(/-/g,""),n=Date.now();
 const u=`https://power.larc.nasa.gov/api/temporal/daily/point?parameters=PRECTOTCORR,GWETROOT,T2M&community=AG&longitude=${c[1]}&latitude=${c[0]}&start=${f(new Date(n-24*864e5))}&end=${f(new Date(n-2*864e5))}&format=JSON`;
 try{const r=await fetch(u);if(!r.ok)throw new Error("HTTP "+r.status);const p=(await r.json()).properties.parameter;const ok=k=>p.T2M[k]>-900&&p.GWETROOT[k]>-900;const days=Object.keys(p.T2M).filter(ok).sort(),last=days[days.length-1];if(!last)throw new Error("aucune valeur récente");
  const rk=Object.keys(p.PRECTOTCORR).sort().filter(k=>k<=last&&p.PRECTOTCORR[k]>-900).slice(-7);
  OBS={ok:true,lat:c[0],lon:c[1],date:last.slice(0,4)+"-"+last.slice(4,6)+"-"+last.slice(6),t2m:p.T2M[last],wet:p.GWETROOT[last],rain7:rk.reduce((a,k)=>a+p.PRECTOTCORR[k],0)}}
 catch(e){OBS={ok:false,err:"Connexion à NASA POWER impossible ("+(e.message||e)+")."}}
 if(["accueil","donnees"].includes(CUR))render()}
