# Artillery Range Map

Interactive web map for comparing artillery and rocket system ranges.
The app shows systems from NATO/West, Russia, and Ukraine on a dark map and loads a front-line layer from an open OSINT source.

## Current State
- Dark Leaflet map with Europe region borders and a toggleable front layer.
- Place multiple systems with colored range circles.
- Ammo and range selection per system.
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
- Map tiles: OpenStreetMap and CARTO.
- Europe region borders: Natural Earth.
- Front layer: DeepStateMap or derived open data.
- DeepState material use should follow the source license or attribution requirements.
- Range values are approximate reference values and can vary by ammunition and charge.

## Note
This project is for information and OSINT analysis. It shows area control and approximate ranges, not precise troop positions.

## License
Own code: MIT, see [LICENSE](LICENSE).

---

# Artillerie-Reichweitenkarte

Interaktive Webkarte zum Vergleichen von Reichweiten fuer Artillerie- und Raketenwerfersysteme.
Die App zeigt Systeme aus NATO/Westen, Russland und Ukraine auf einer dunklen Karte und laedt eine Front-Ebene aus einer offenen OSINT-Quelle nach.

## Aktueller Stand
- Dunkle Leaflet-Karte mit Europa-Regionsgrenzen und zuschaltbarer Front-Ebene.
- Mehrere Systeme mit farbigen Reichweitenkreisen platzieren.
- Munition und Reichweite pro System auswaehlen.
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
- Kartenkacheln: OpenStreetMap und CARTO.
- Europa-Regionsgrenzen: Natural Earth.
- Front-Ebene: DeepStateMap bzw. abgeleitete offene Datenquelle.
- Die Nutzung von DeepState-Materialien sollte die dort genannte Lizenz oder den Quellenhinweis erfuellen.
- Reichweitenangaben sind naeherungsweise Referenzwerte und koennen je nach Munition und Ladung variieren.

## Hinweis
Das Projekt dient Information und OSINT-Analyse. Es zeigt Flaechenkontrolle und grobe Reichweiten, keine praezisen Truppenpositionen.

## Lizenz
Eigener Code: MIT, siehe [LICENSE](LICENSE).
