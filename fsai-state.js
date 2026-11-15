/* FARM SHIFT AI — État de l’appli et sauvegarde sur l’appareil */
(window.FSAI_FILES=window.FSAI_FILES||[]).push("fsai-state.js");
let S=load();let R=loadR();
function loadR(){try{return JSON.parse(localStorage.getItem("fsai_r")||"null")}catch(e){return null}}
function saveR(){try{localStorage.setItem("fsai_r",JSON.stringify(R))}catch(e){}}
function load(){try{const x=JSON.parse(localStorage.getItem("fsai")||"null");return Object.assign({},DEF,x||{})}catch(e){return {...DEF}}}
function save(){try{localStorage.setItem("fsai",JSON.stringify(S))}catch(e){}}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const clamp=x=>Math.max(0,Math.min(100,Math.round(x)));
/* ---- Moteur de simulation (déterministe, hypothèses illustratives) ---- */
