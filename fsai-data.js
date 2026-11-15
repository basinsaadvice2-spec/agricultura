/* FARM SHIFT AI — Données : cultures, zones et coordonnées par pays */
(window.FSAI_FILES=window.FSAI_FILES||[]).push("fsai-data.js");
const CROPS=[
{id:"mais",n:"Maïs",f:"Céréale",cycle:"90–120 j",eau:2,az:-2,p:8,note:"Gros consommateur d’azote."},
{id:"manioc",n:"Manioc",f:"Racine",cycle:"10–18 mois",eau:1,az:-1,p:7,note:"Tolère la sécheresse ; cycle très long."},
{id:"soja",n:"Soja",f:"Légumineuse",cycle:"90–120 j",eau:2,az:2,p:6,note:"Fixe l’azote de l’air."},
{id:"haricot",n:"Haricot",f:"Légumineuse",cycle:"60–90 j",eau:2,az:2,p:5,note:"Cycle court, bon précédent."},
{id:"riz",n:"Riz",f:"Céréale",cycle:"90–150 j",eau:3,az:-1,p:7,note:"Très exigeant en eau."},
{id:"arachide",n:"Arachide",f:"Légumineuse",cycle:"90–130 j",eau:1,az:2,p:5,note:"Faible besoin en eau, fixe l’azote."}];
const C=Object.fromEntries(CROPS.map(c=>[c.id,c]));
const SUPPLY={"Pluie seule":1.55,"Pluie + puits":2,"Irrigation":2.3};
const ZONES={"RD Congo":{"Kinshasa":{c:"Tropical à saison sèche (≈ juin–septembre), pluies d’octobre à mai."},"Kongo Central":{c:"Tropical, saison sèche ≈ mai–septembre."},"Équateur":{c:"Équatorial humide, pluies presque toute l’année."},"Kasaï":{c:"Tropical, saison sèche ≈ mai–août."},"Haut-Katanga":{c:"Tropical d’altitude, pluies ≈ novembre–mars, saison sèche marquée."},"Kivu":{c:"Climat d’altitude, plus tempéré, deux saisons des pluies."}},"Cameroun":{"Nord":{c:"Soudano-sahélien, pluies ≈ mai–octobre.",sec:1},"Centre / Littoral":{c:"Équatorial, deux saisons des pluies."},"Ouest":{c:"Climat d’altitude, une longue saison des pluies."}},"Côte d’Ivoire":{"Sud":{c:"Équatorial, deux saisons des pluies."},"Nord":{c:"Savane, une saison des pluies ≈ mai–octobre.",sec:1}},"Sénégal":{"Nord / Centre":{c:"Sahélien, pluies ≈ juillet–octobre.",sec:1},"Casamance":{c:"Tropical humide, pluies ≈ juin–octobre."}},"Madagascar":{"Hauts-Plateaux":{c:"Tropical d’altitude, pluies ≈ novembre–avril."},"Côte est":{c:"Tropical très humide, pluies abondantes."}}};
const zoneInfo=f=>(ZONES[f.pays]||{})[f.zone]||null;
const DEF={pays:"",zone:"",saved:false,asked:false,nom:"Ma ferme",loc:"",ha:12,sol:"Non déterminé",eau:"Pluie + puits",prev:["mais","manioc"],ans:3,pool:["mais","manioc","soja","haricot"]};
const COORD={"RD Congo|Kinshasa":[-4.33,15.31],"RD Congo|Kongo Central":[-5.82,13.46],"RD Congo|Équateur":[0.05,18.26],"RD Congo|Kasaï":[-5.9,22.42],"RD Congo|Haut-Katanga":[-11.66,27.48],"RD Congo|Kivu":[-2.51,28.86],"Cameroun|Nord":[9.3,13.39],"Cameroun|Centre / Littoral":[3.85,11.5],"Cameroun|Ouest":[5.48,10.42],"Côte d’Ivoire|Sud":[5.36,-4.01],"Côte d’Ivoire|Nord":[9.46,-5.63],"Sénégal|Nord / Centre":[14.15,-16.08],"Sénégal|Casamance":[12.58,-16.27],"Madagascar|Hauts-Plateaux":[-18.91,47.52],"Madagascar|Côte est":[-18.15,49.4]};
`RD Congo|Kinshasa|-4.33|15.31|Tropical à saison sèche (≈ juin–septembre), pluies d’octobre à mai.|0|Sableux
RD Congo|Kinshasa — Est|-4.40|15.60|Tropical à saison sèche (≈ juin–septembre), pluies d’octobre à mai.|0|Sableux
RD Congo|Kinshasa — Ouest|-4.45|15.20|Tropical à saison sèche (≈ juin–septembre), pluies d’octobre à mai.|0|Sableux
RD Congo|Kinshasa — Sud|-4.55|15.30|Tropical à saison sèche (≈ juin–septembre), pluies d’octobre à mai.|0|Sableux
RD Congo|Kinshasa — Nord-Ouest|-4.36|15.20|Tropical à saison sèche (≈ juin–septembre), pluies d’octobre à mai.|0|Sableux
Congo|Brazzaville|-4.27|15.28|Tropical humide, saison sèche ≈ juin–septembre.|0|
Congo|Nord (Likouala)|1.62|18.07|Équatorial humide, pluies presque toute l’année.|0|
Gabon|Estuaire|0.39|9.45|Équatorial, deux saisons des pluies.|0|
Gabon|Haut-Ogooué|-1.63|13.58|Équatorial, saison sèche ≈ juin–août.|0|
Centrafrique|Sud (Bangui)|4.36|18.56|Tropical humide, saison sèche ≈ novembre–février.|0|
Tchad|Sud (Moundou)|8.57|16.08|Soudanien, pluies ≈ mai–octobre.|0|
Burundi|Plateau central|-3.43|29.93|Climat d’altitude tempéré, saison sèche ≈ juin–août.|0|
Rwanda|Kigali|-1.95|30.06|Altitude tempérée, deux saisons des pluies.|0|
Rwanda|Province de l’Est|-1.88|30.62|Plus chaud et plus sec que l’ouest, deux saisons des pluies.|0|
Ouganda|Centre (Kampala)|0.35|32.58|Équatorial tempéré par l’altitude, deux saisons des pluies.|0|
Ouganda|Nord (Gulu)|2.77|32.3|Une longue saison des pluies ≈ avril–octobre.|0|
Kenya|Highlands (Nakuru)|-0.3|36.07|Altitude, deux saisons des pluies (mars–mai, octobre–décembre).|0|
Kenya|Zone semi-aride (Garissa)|-0.45|39.65|Semi-aride, pluies faibles et irrégulières.|1|
Tanzanie|Nord (Arusha)|-3.37|36.68|Deux saisons des pluies (mars–mai, novembre–décembre).|0|
Tanzanie|Sud-Ouest (Mbeya)|-8.9|33.46|Une saison des pluies ≈ novembre–avril.|0|
Éthiopie|Hauts plateaux (Addis-Abeba)|9.03|38.74|Altitude, pluies principales ≈ juin–septembre.|0|
Éthiopie|Rift (Hawassa)|7.06|38.48|Tropical d’altitude moyenne, pluies ≈ mars–septembre.|0|
Zambie|Lusaka|-15.39|28.32|Pluies ≈ novembre–avril, saison sèche marquée.|0|
Zambie|Nord (Kasama)|-10.21|31.18|Pluies plus abondantes ≈ novembre–avril.|0|
Zimbabwe|Harare|-17.83|31.05|Pluies ≈ novembre–mars.|0|
Malawi|Lilongwe|-13.98|33.78|Pluies ≈ novembre–avril.|0|
Mozambique|Sud (Maputo)|-25.97|32.57|Subtropical, pluies d’été, plus sec dans l’intérieur.|1|
Mozambique|Zambézie (Quelimane)|-17.88|36.89|Tropical humide, pluies ≈ novembre–avril.|0|
Angola|Luanda (côte)|-8.84|13.23|Côte semi-aride, pluies faibles.|1|
Angola|Plateau (Huambo)|-12.78|15.74|Plateau, pluies ≈ octobre–avril.|0|
Afrique du Sud|Gauteng|-26.2|28.05|Pluies d’été (octobre–mars), hivers secs.|0|
Afrique du Sud|Cap-Occidental|-33.92|18.42|Méditerranéen, pluies surtout en hiver.|0|
Nigeria|Nord (Kano)|12.0|8.52|Soudano-sahélien, pluies ≈ mai–septembre.|1|
Nigeria|Sud-Ouest (Ibadan)|7.38|3.95|Tropical humide, deux saisons des pluies.|0|
Ghana|Forêt (Kumasi)|6.69|-1.62|Tropical humide, deux saisons des pluies.|0|
Ghana|Nord (Tamale)|9.4|-0.84|Savane, une saison des pluies ≈ mai–octobre.|1|
Mali|Sud (Sikasso)|11.32|-5.67|Soudanien, pluies ≈ mai–octobre.|0|
Mali|Centre (Mopti)|14.49|-4.2|Sahélien, pluies courtes ≈ juillet–septembre.|1|
Burkina Faso|Sud-Ouest (Bobo-Dioulasso)|11.18|-4.3|Soudanien, pluies ≈ mai–octobre.|0|
Burkina Faso|Centre (Ouagadougou)|12.37|-1.52|Soudano-sahélien, pluies ≈ juin–septembre.|1|
Niger|Sud (Maradi)|13.5|7.1|Sahélien, pluies ≈ juin–septembre.|1|
Bénin|Sud (Cotonou)|6.37|2.43|Subquatorial, deux saisons des pluies.|0|
Bénin|Nord (Parakou)|9.34|2.63|Soudanien, une saison des pluies.|0|
Togo|Maritime (Lomé)|6.13|1.22|Subquatorial, deux saisons des pluies.|0|
Togo|Savanes (Dapaong)|10.86|0.21|Soudanien, une saison des pluies.|1|
Guinée|Basse-Guinée (Conakry)|9.64|-13.58|Tropical très humide, pluies ≈ mai–octobre.|0|
Guinée|Haute-Guinée (Kankan)|10.38|-9.31|Soudanien, pluies ≈ mai–octobre.|0|
Maroc|Gharb (Rabat)|34.02|-6.84|Méditerranéen, pluies surtout en hiver.|0|
Maroc|Souss (Agadir)|30.43|-9.6|Semi-aride, pluies faibles.|1|
Algérie|Nord (Alger)|36.75|3.06|Méditerranéen, pluies surtout en hiver.|0|
Algérie|Hauts plateaux (Sétif)|36.19|5.41|Semi-aride continental.|1|
Tunisie|Nord (Tunis)|36.81|10.18|Méditerranéen, pluies surtout en hiver.|0|
Tunisie|Centre-Sud (Sfax)|34.74|10.76|Aride à semi-aride.|1|
Égypte|Delta du Nil (Tanta)|30.79|31.0|Aride, agriculture irriguée par le Nil.|1|
Égypte|Haute-Égypte (Assouan)|24.09|32.9|Désertique, irrigation indispensable.|1|
France|Centre (Orléans)|47.9|1.9|Tempéré océanique, pluies toute l’année.|0|
Brésil|Mato Grosso (Cuiabá)|-15.6|-56.1|Tropical, saison des pluies ≈ octobre–avril.|0|
Inde|Pendjab (Chandigarh)|30.73|76.78|Subtropical, mousson ≈ juillet–septembre.|0|
Vietnam|Delta du Mékong (Can Tho)|10.03|105.77|Tropical, mousson ≈ mai–novembre.|0|`.trim().split("\n").forEach(l=>{const [p,z,a,o,c,s,so]=l.split("|");(ZONES[p]=ZONES[p]||{})[z]={c,sec:+s||0,sol:so||""};COORD[p+"|"+z]=[+a,+o]});
const coords=()=>(S.lat!=null&&S.lon!=null)?[S.lat,S.lon]:(COORD[S.pays+"|"+S.zone]||null);
