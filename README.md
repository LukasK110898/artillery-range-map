# Artillerie-Reichweitenkarte

Interaktive Webkarte zum Vergleichen von Artillerie- und Raketenwerfer-Reichweiten.
Die Anwendung zeigt Systeme aus NATO/Westen, Russland und Ukraine auf einer dunklen Karte
und laedt eine Front-Ebene aus einer offenen OSINT-Quelle nach.

## Aktueller Stand
- Dunkle Leaflet-Karte mit Europa-Regionsgrenzen und zuschaltbarer Front-Ebene.
- Platzieren mehrerer Systeme mit farbigen Reichweitenkreisen.
- Auswahlliste fuer Munition und Reichweite je System.
- Eigene Systeme mit benutzerdefinierten Munitionen anlegen.
- Sprachumschaltung zwischen Deutsch und Englisch im Einstellungsbereich.
- Footer mit Projekt-Hinweis, DeepState-Hinweis und Autorenzeile "Tool by Lukas Knorr".

## Lokal starten
Das Projekt laeuft als statische Webanwendung. Wegen der externen Datenquellen ist ein lokaler Server sinnvoll:

```bash
python3 -m http.server 8000
```

Danach im Browser `http://localhost:8000` oeffnen.

## Bedienung
- Ueber das Menue oben links oeffnest du das Einstellungs-Panel.
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
Das Projekt dient Information und OSINT-Analyse. Es zeigt Flächenkontrolle und grobe Reichweiten, keine praezisen Truppenpositionen.

## Lizenz
Eigener Code: MIT, siehe [LICENSE](LICENSE).
