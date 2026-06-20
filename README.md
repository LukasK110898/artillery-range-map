# Artillerie-Reichweitenkarte

Interaktive, dunkle Webkarte zum Vergleich der Reichweiten moderner Artillerie- und
Raketenwerfer-Systeme (NATO/Westen, Russland, Ukraine) – inklusive einer live geladenen
Ebene zur Gebietskontrolle im Ukraine-Krieg.

## Funktionen
- Detaillierter dunkler Basemap (Städte, Hauptstraßen, Staats- und Regionsgrenzen).
- Betonte **Bundesland-/Regionsgrenzen für Europa** als zuschaltbare Ebene.
- Mehrere Systeme platzieren, Munitionstyp wählen, Reichweiten als Ringe vergleichen.
- Marker frei verschiebbar; eigene Systeme mit eigenen Munitions-/Reichweitenwerten anlegen.
- **Frontlinie / besetztes Gebiet** wird beim Laden live aus offener OSINT-Quelle abgerufen.

## Lokal ausprobieren
Wegen der Live-Datenabrufe am besten über einen lokalen Server statt per Doppelklick:
```
python3 -m http.server 8000
# dann im Browser: http://localhost:8000
```

## Auf GitHub Pages veröffentlichen
1. Neues, **öffentliches** Repository auf GitHub anlegen.
2. Alle Dateien dieses Ordners hochladen (Web-Oberfläche: „Add file → Upload files",
   oder per Git – siehe unten).
3. Im Repo: **Settings → Pages**.
4. Unter „Build and deployment → Source" **Deploy from a branch** wählen,
   Branch `main`, Ordner `/ (root)`, **Save**.
5. Nach ca. 1 Minute ist die Seite erreichbar unter
   `https://<DEIN-NUTZERNAME>.github.io/<REPO-NAME>/`.

Per Git (Alternative):
```
git init
git add .
git commit -m "Artillerie-Reichweitenkarte"
git branch -M main
git remote add origin https://github.com/<NUTZER>/<REPO>.git
git push -u origin main
```

## Datenquellen & Lizenzen
- **Kartenkacheln:** © OpenStreetMap-Mitwirkende, © CARTO (CARTO Basemaps, kostenlose Nutzung
  mit Namensnennung). Bei hoher Last ggf. eigenen Tile-Anbieter/Key verwenden.
- **Staats-/Regionsgrenzen:** Natural Earth (gemeinfrei / public domain).
- **Front-/Besetzungsdaten:** live aus dem öffentlichen Repo
  `cyterat/deepstate-map-data` (abgeleitet aus DeepStateMap). Die Daten werden **nicht**
  mitgeliefert, sondern zur Laufzeit geladen und der Quelle zugeschrieben. Bitte die
  Lizenz-/Nutzungsbedingungen der Quelle (DeepStateMap) vor Weiterverwendung prüfen.
- **Reichweitenangaben der Systeme:** veröffentlichte Hersteller- bzw. Referenzwerte,
  ungefähr und je nach Munition/Ladung/Bedingungen variabel.

## Hinweis / Disclaimer
Dieses Projekt dient der Information, Lehre und OSINT-Analyse. Es zeigt **Flächenkontrolle**
(besetztes Gebiet, grober Frontverlauf), **keine** präzisen Truppenpositionen oder
Zielinformationen. Reichweiten sind Näherungswerte aus offenen Quellen.

## Lizenz
Eigener Code: MIT (siehe `LICENSE`). Datenquellen unterliegen ihren jeweils eigenen Lizenzen.
