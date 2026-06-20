# Artillery Range Map

Interactive web map for comparing artillery, rocket system, and cruise missile ranges.
The app shows systems from NATO/West, Russia, and Ukraine on a dark map and loads a front-line layer from an open OSINT source.

## Current State
- Dark Leaflet map with Europe region borders and a toggleable front layer.
- Place multiple systems with colored range circles.
- Ammo and range selection per system.
- Separate cruise missile class with NATO, Ukraine, and Russia groups.
- Create custom systems with custom ammunition entries.
- Language switch between English and German in the settings panel.
- Footer note with project credit, DeepState note, and the author line "Tool by Lukas Knorr".

## Run Locally
This is a static web app. Because it loads external data, use a local server:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in your browser.

## Usage
- Open the settings panel with the menu button in the top left.
- Switch the UI language between English and German.
- Select a system from the catalog to place it on the map.
- Drag markers to reposition them; range and ammo can be adjusted per entry.
- The front layer loads live GeoJSON data when the source is reachable.

## Data and Sources
- Own code: MIT, see [LICENSE](LICENSE).
- Leaflet: BSD-2-Clause, loaded from unpkg.
- Map tiles: CARTO Dark Matter with OpenStreetMap data. The map displays attribution for OpenStreetMap contributors and CARTO. OpenStreetMap data is licensed under ODbL.
- Europe region borders: Natural Earth, public domain.
- Front layer: loaded live from `cyterat/deepstate-map-data` (GPL-3.0 according to that repository), derived from DeepStateMap. The data is not vendored into this repository.
- Range values are approximate public reference values and can vary by ammunition, charge, system variant, export version, and conditions.

See [DATA_SOURCES.md](DATA_SOURCES.md) for source and license details.

## Note
This project is for information and OSINT analysis. It shows area control and approximate ranges, not precise troop positions.

## License
Own code: MIT, see [LICENSE](LICENSE). Data sources, map tiles, and external libraries remain under their own licenses.

---

# Artillerie-Reichweitenkarte

Interaktive Webkarte zum Vergleichen von Reichweiten fuer Artillerie-, Raketenwerfer- und Marschflugkoerper-Systeme.
Die App zeigt Systeme aus NATO/Westen, Russland und Ukraine auf einer dunklen Karte und laedt eine Front-Ebene aus einer offenen OSINT-Quelle nach.

## Aktueller Stand
- Dunkle Leaflet-Karte mit Europa-Regionsgrenzen und zuschaltbarer Front-Ebene.
- Mehrere Systeme mit farbigen Reichweitenkreisen platzieren.
- Munition und Reichweite pro System auswaehlen.
- Separate Marschflugkoerper-Klasse mit Gruppen fuer NATO, Ukraine und Russland.
- Eigene Systeme mit benutzerdefinierten Munitionseintraegen anlegen.
- Sprachumschaltung zwischen Deutsch und Englisch im Einstellungsbereich.
- Footer-Hinweis mit Projektvermerk, DeepState-Hinweis und der Autorenzeile "Tool by Lukas Knorr".

## Lokal starten
Das Projekt ist eine statische Webanwendung. Wegen der externen Datenquellen ist ein lokaler Server sinnvoll:

```bash
python3 -m http.server 8000
```

Anschliessend `http://localhost:8000` im Browser oeffnen.

## Bedienung
- Ueber den Menue-Button oben links oeffnest du das Einstellungs-Panel.
- Dort kannst du die Sprache zwischen Deutsch und Englisch wechseln.
- Systeme lassen sich ueber die Katalog-Auswahl auf der Karte platzieren.
- Der Marker ist verschiebbar; Reichweite und Munition koennen pro Eintrag angepasst werden.
- Die Front-Ebene laedt aktuelle GeoJSON-Daten nach, sofern die Quelle erreichbar ist.

## Daten und Quellen
- Eigener Code: MIT, siehe [LICENSE](LICENSE).
- Leaflet: BSD-2-Clause, geladen ueber unpkg.
- Kartenkacheln: CARTO Dark Matter mit OpenStreetMap-Daten. Die Karte zeigt Attribution fuer OpenStreetMap contributors und CARTO. OpenStreetMap-Daten stehen unter ODbL.
- Europa-Regionsgrenzen: Natural Earth, public domain.
- Front-Ebene: live geladen aus `cyterat/deepstate-map-data` (GPL-3.0 laut Repository), abgeleitet aus DeepStateMap. Die Daten werden nicht in diesem Repository mitgeliefert.
- Reichweitenangaben sind naeherungsweise oeffentliche Referenzwerte und koennen je nach Munition, Ladung, Systemvariante, Exportversion und Bedingungen variieren.

Details zu Quellen und Lizenzen stehen in [DATA_SOURCES.md](DATA_SOURCES.md).

## Hinweis
Das Projekt dient Information und OSINT-Analyse. Es zeigt Flaechenkontrolle und grobe Reichweiten, keine praezisen Truppenpositionen.

## Lizenz
Eigener Code: MIT, siehe [LICENSE](LICENSE). Datenquellen, Kartenkacheln und externe Libraries unterliegen ihren jeweils eigenen Lizenzen.
