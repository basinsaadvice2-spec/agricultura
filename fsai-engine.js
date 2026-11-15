/* FARM SHIFT AI — Moteur de simulation des rotations */
(window.FSAI_FILES=window.FSAI_FILES||[]).push("fsai-engine.js");
function evaluate(seq,farm){
 const zi=zoneInfo(farm);const sup=(SUPPLY[farm.eau]||2)-(zi&&zi.sec?0.3:0)+({Sableux:-.25,"Sablo-argileux":-.1,Argileux:.1}[farm.sol]||0);let prod=0,def=0,eau=0,az=0,rep=0,notes=[];
 seq.forEach((id,i)=>{const c=C[id],prev=i?C[seq[i-1]]:null;let p=c.p*10;const d=Math.max(0,c.eau-sup);
  if(prev&&prev.id===c.id){p*=.7;rep++;notes.push(`An ${i+1} : ${c.n} après ${c.n} → monoculture, rendement relatif réduit (−30 %), risque sanitaire.`)}
  else if(prev&&prev.f===c.f){p*=.88;notes.push(`An ${i+1} : ${c.n} après ${prev.n} (même famille) → −12 %.`)}
  if(prev&&prev.f==="Légumineuse"&&c.f==="Céréale"){p*=1.08;notes.push(`An ${i+1} : ${c.n} profite de l’azote laissé par ${prev.n} (+8 %).`)}
  if(d>0){p*=1-.15*d;notes.push(`An ${i+1} : ${c.n} dépasse l’eau disponible (${farm.eau}) → pénalité hydrique.`)}
  prod+=p;def+=d;eau+=c.eau;az+=c.az});
 const n=seq.length,div=new Set(seq).size;
 return{seq,notes,prod:clamp(prod/n),sol:clamp(50+(az/n)*12+(div>=3?8:0)-rep*10),eau:clamp(100-20*(eau/n)-35*(def/n))};
}
function best(pool,n,farm,key){let b=null,bs=-1;const rec=(s)=>{if(s.length===n){const e=evaluate(s,farm);if(e[key]>bs||(e[key]===bs&&b&&e.prod>b.prod)){bs=e[key];b=e}return}pool.forEach(id=>rec(s.concat(id)))};rec([]);return b}
function run(){
 const pool=S.pool;if(pool.length<2){R={err:"Choisissez au moins 2 cultures."};return}
 R={sc:[["Scénario 1 — Productivité","prod"],["Scénario 2 — Santé du sol","sol"],["Scénario 3 — Économie d’eau","eau"]].map(([t,k])=>({t,k,e:best(pool,S.ans,S,k)}))};
}
/* ---- UI ---- */
