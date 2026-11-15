# FARM SHIFT AI — version en plusieurs fichiers

Ouvrir `index.html` : il charge tous les autres fichiers du même dossier. Aucune installation.

## Fichiers (tous dans le même dossier, sans sous-dossier)
| Fichier | Rôle |
|---|---|
| `index.html` | Page d'entrée, relie les fichiers ci-dessous |
| `style.css` | Design |
| `fsai-data.js` | Cultures, pays, zones, coordonnées |
| `fsai-state.js` | État de l'appli, sauvegarde sur l'appareil |
| `fsai-engine.js` | Moteur de simulation des rotations |
| `fsai-nasa.js` | NASA POWER : humidité du sol, pluie, température |
| `fsai-calendar.js` | Calendrier de semis (pluies moyennes NASA POWER) |
| `fsai-soil.js` | Sol (ISRIC SoilGrids), confirmation, carte des régions |
| `fsai-assistant.js` | Assistant : IA, données NASA, Wikipédia |
| `fsai-pages.js` | Écrans de l'appli |
| `fsai-app.js` | Démarrage, navigation, boutons (chargé en dernier) |

Ordre de chargement : celui du tableau (voir `index.html`). Ne pas le changer.

## Publier sur GitHub Pages
1. Envoyer **tous** les fichiers dans le même dossier du dépôt.
2. Settings → Pages → branche `main`, dossier `/ (root)`.
3. Si un fichier manque, la page l'indique : « Fichiers manquants sur le site : … ».

## Modifier un fichier
Changer le numéro `?v=7` dans `index.html` pour que les navigateurs rechargent la nouvelle version.

## Données et limites
- NASA POWER : données de modèle (≈ 50 km), pas des mesures SMAP. Indisponible = affiché « INDISPONIBLE », rien n'est inventé.
- Le sol vient d'ISRIC SoilGrids (pas de la NASA) : estimation régionale à confirmer par un spécialiste.
- Assistant sur GitHub : recherche NASA / Wikipédia. Pour une IA rédigeant des réponses, renseigner `ASSISTANT_URL` dans `fsai-assistant.js` (serveur avec clé API côté serveur).
