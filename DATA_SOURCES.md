# Data Sources and License Notes

This project separates its own code license from third-party data and services.

## Own Code

- License: MIT
- Copyright: 2026 Lukas Knorr

## Runtime Libraries

- Leaflet 1.9.4 is loaded from unpkg and is licensed under BSD-2-Clause.
- Source: https://github.com/Leaflet/Leaflet/blob/main/LICENSE

## Map Tiles and Base Data

- Basemap tiles: CARTO Dark Matter.
- Attribution shown in the Leaflet attribution control: OpenStreetMap contributors and CARTO.
- OpenStreetMap data is licensed under the Open Database License.
- Sources:
  - https://www.openstreetmap.org/copyright
  - https://carto.com/attributions

## Administrative Boundaries

- Europe state / region boundaries are embedded from Natural Earth derived data.
- Natural Earth raster and vector data is public domain.
- Source: https://www.naturalearthdata.com/about/terms-of-use/

## Front / Occupied Territory Layer

- Runtime source: https://github.com/cyterat/deepstate-map-data
- Data repository license: GPL-3.0, as published in that repository.
- The repository describes the GeoJSON files as multipolygon data representing Russian-occupied territory of Ukraine.
- DeepStateMap license / attribution reference: https://deepstatemap.live/license-en.html
- The data is not vendored into this project; it is fetched at runtime from GitHub raw URLs.

## Range Values

Ranges are approximate public reference values and can vary by variant, payload, launch profile, software block, export version, and source.

Main public references used for the cruise missile class:

- Tomahawk: https://missilethreat.csis.org/missile/tomahawk/
- AGM-158 JASSM / JASSM-ER / JASSM-XR: https://missilethreat.csis.org/missile/jassm/
- 3M-14 Kalibr: https://missilethreat.csis.org/missile/ss-n-30a/
- Kh-101 / Kh-102: https://missilethreat.csis.org/missile/kh-101-kh-102/
- Storm Shadow / SCALP-EG: https://www.mbda-systems.com/products/deep-strike/storm-shadow-scalp
- TAURUS KEPD 350: https://www.mbda-systems.com/products/deep-strike/taurus
- R-360 Neptune / Long Neptune, Palianytsia, and Peklo: public Ukrainian and open-source reporting. Values are especially approximate for newer Ukrainian systems.

## Disclaimer

The app is intended for information, teaching, and OSINT-oriented visualization. It does not provide target selection, firing solutions, unit locations, or operational advice.
