<br />
<p align="center">
  <a href="https://github.com/CodeforLeipzig/leipzigmaps">
    <img src="./public/logo192.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Leipzig Maps</h3>

  <p align="center">
    Insights about the city Leipzig, Germany.
    <br />
    <br />
    <a href="https://codeforleipzig.github.io/leipzigmaps/">View Website</a>
    ·
    <a href="https://github.com/CodeforLeipzig/leipzigmaps/issues">Report Bug</a>
    ·
    <a href="https://github.com/CodeforLeipzig/leipzigmaps/issues">Request Feature</a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->
## About The Project
[![Product Name Screen Shot](./public/screenshot.png)](https://example.com)

Background of this proces is to give insight about the city Leipzig, Germany.

A list of commonly used resources that I find helpful are listed in the acknowledgements.

### Built With
This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* [React](https://reactjs.com)
* [maptiler](https://maptiler.com)
* [leaflet](https://react-leaflet.js.org/)

### Development
1. Clone the repo
   ```sh
   git clone https://github.com/CodeforLeipzig/leipzig-maps.git
   ```
1. Install dependencies
   ```JS
   yarn
   ```
1. Start local server
   ```JS
   yarn start
   ```

### Update statistic data
1. Run scraper
   ```JS
   yarn run scrape-leipzig-statistik
   ```
1. Run transformer
   ```JS
   yarn run transform-leipzig-statistik
   ```

### Update swimming pool data
1. Run web page scraper
   ```JS
   yarn run scrape-swimming-pools
   ```

### Update parks data
1. Run Overpass API query executer
   ```JS
   yarn run transform-leipzig-parks
   ```

### Deployment
   ```JS
   yarn run predeploy
   yarn run deploy
   ```

## Roadmap
See the [open issues](https://github.com/CodeforLeipzig/issues) for a list of proposed features (and known issues).

## Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact
Project Link: [https://github.com/CodeforLeipzig/leipzig-maps](https://github.com/CodeforLeipzig/leipzig-maps)

## Sources used
 * [Dataset Katalog des Amt für Statistik und Wahlen der Stadt Leipzig](https://statistik.leipzig.de/opendata/api/katalog/)
 * Leipzig Stadtteilgrenzen
   * tracked [here](https://github.com/CodeforLeipzig/leipzigmaps/issues/19)
 * [Leipzig - Schwimmhallen](https://www.leipzig.de/freizeit-kultur-und-tourismus/sport/sportstaetten/schwimmhallen) ([leipzig.de](https://leipzig.de))
   * tracked [here](https://github.com/CodeforLeipzig/leipzigmaps/issues/1)
 * [Leipzig - Freibäder](https://www.leipzig.de/freizeit-kultur-und-tourismus/sport/sportstaetten/freibaeder) ([leipzig.de](https://leipzig.de))
   * tracked [here](https://github.com/CodeforLeipzig/leipzigmaps/issues/2)
 * [Leipzig - Spielplätze](https://github.com/CodeforLeipzig/kidsle/blob/master/project/playgrounds/data/new_playgrounds.json) ([CodeforLeipzig/kidsle](https://github.com/CodeforLeipzig/kidsle))
   * tracked [here](https://github.com/CodeforLeipzig/leipzigmaps/issues/3)
 * [Leipzig - Wochenmärkte](https://raw.githubusercontent.com/CodeforLeipzig/wo-ist-markt.github.io/master/cities/leipzig.json) ([CodeforLeipzig/wo-ist-markt.github.io](https://github.com/CodeforLeipzig/wo-ist-markt.github.io))
   * tracked [here](https://github.com/CodeforLeipzig/leipzigmaps/issues/4)
 * [Leipzig - Einwohner mit Migrationshintergund (Jahreszahlen)](https://opendata.leipzig.de/dataset/einwohner-mit-migrationshintergund-jahreszahlen) ([OpenData Leipzig](https://opendata.leipzig.de))
   * tracked [here](https://github.com/CodeforLeipzig/leipzigmaps/issues/5)
 * [Leipzig - Einwohnerdichte (Jahreszahlen)](https://opendata.leipzig.de/dataset/einwohnerdichte-jahreszahlen) ([OpenData Leipzig](https://opendata.leipzig.de))
   * tracked [here](https://github.com/CodeforLeipzig/leipzigmaps/issues/6)
 * [Leipzig - Arbeitslose (Jahreszahlen)](https://opendata.leipzig.de/dataset/arbeitslose-jahreszahlen) ([OpenData Leipzig](https://opendata.leipzig.de))
   * tracked [here](https://github.com/CodeforLeipzig/leipzigmaps/issues/7)
 * [Leipzig - Straftaten (Jahreszahlen)](https://opendata.leipzig.de/dataset/straftaten-jahreszahlen) ([OpenData Leipzig](https://opendata.leipzig.de))
   * tracked [here](https://github.com/CodeforLeipzig/leipzigmaps/issues/8)
 * [Leipzig - Ärzte (Jahreszahlen)](https://opendata.leipzig.de/dataset/arzte-jahreszahlen) ([OpenData Leipzig](https://opendata.leipzig.de))
   * tracked [here](https://github.com/CodeforLeipzig/leipzigmaps/issues/9)
 * [Leipzig - Einwohner (Jahreszahlen)](https://opendata.leipzig.de/dataset/einwohner-jahreszahlen) ([OpenData Leipzig](https://opendata.leipzig.de))
   * tracked [here](https://github.com/CodeforLeipzig/leipzigmaps/issues/10)
 * [Leipzig - Einwohner nach Alter (Jahreszahlen)](https://opendata.leipzig.de/dataset/einwohner-nach-alter-jahreszahlen0452a) ([OpenData Leipzig](https://opendata.leipzig.de))
   * tracked [here](https://github.com/CodeforLeipzig/leipzigmaps/issues/11)
 * [Leipzig - Grundsicherung für Arbeitssuchende (Jahreszahlen)](https://opendata.leipzig.de/dataset/grundsicherung-fur-arbeitssuchende-sgb-ii-jahreszahlen) ([OpenData Leipzig](https://opendata.leipzig.de))
   * tracked [here](https://github.com/CodeforLeipzig/leipzigmaps/issues/13)
 * [Leipzig - Flächennutzung (Jahreszahlen)](https://opendata.leipzig.de/dataset/flachennutzung-jahreszahlen) ([OpenData Leipzig](https://opendata.leipzig.de))
   * tracked [here](https://github.com/CodeforLeipzig/leipzigmaps/issues/14)
 * [Leipzig - Einzelhandel (Jahreszahlen)](https://opendata.leipzig.de/dataset/einzelhandel-jahreszahlen) ([OpenData Leipzig](https://opendata.leipzig.de))
   * tracked [here](https://github.com/CodeforLeipzig/leipzigmaps/issues/15)
 * [Leipzig - Einkommen](https://statistik.leipzig.de/statdist/table.aspx?cat=9&rub=1) ([OpenData Leipzig](https://opendata.leipzig.de))
   * tracked [here](https://github.com/CodeforLeipzig/leipzigmaps/issues/16)
 * [Leipzig - Kraftfahrzeugbestand](https://statistik.leipzig.de/statdist/table.aspx?cat=11&rub=1) ([OpenData Leipzig](https://opendata.leipzig.de))
   * tracked [here](https://github.com/CodeforLeipzig/leipzigmaps/issues/17)
 * ÖPNV Haltestellen
   * tracked [here](https://github.com/CodeforLeipzig/leipzigmaps/issues/18)
   * public/data/leipzig-bus-stops.json
   * public/data/leipzig-train-stops.json
   * public/data/leipzig-tram-stops.json
 * Kindergärten
   * tracked [here](https://github.com/CodeforLeipzig/leipzigmaps/issues/28) 
   * public/data/leipzig-daycares.json
 * Fitnessstudios
   * public/data/leipzig-fitness-studios.json
 * Supermärkte
   * public/data/leipzig-supermarkets.json
 * Gebäude mit Wohnungen
   * public/data/leipzig-gebaeude-mit-wohnungen-insgesamt.json
 * Handwerksbetriebe
   * public/data/leipzig-handwerksbetriebe-insgesamt.json
 * Singlehaushalte
   * public/data/leipzig-mit-1-person.json
 * Haushalte mit Kindern  
   * public/data/leipzig-mit-kindern.json
 * Stadtparks
   * public/data/leipzig-parks.json
 * Wohnfläche
   * public/data/leipzig-wohnflaeche-insgesamt.json
 * Wohnungen
   * public/data/leipzig-wohnungen.json

## Possible Future Integrations
 * [Breitbandausbau an Sachsens Schulen](https://gitlab.com/gerbsen/internet-an-sachsens-schulen/-/tree/master)
 * [Museen Sachsen](https://damals.in/museums/)
 * [Luftqualität](https://www.umwelt.sachsen.de/umwelt/infosysteme/luftonline/recherche.aspx)
 * [Polizeiticket](https://lvz-viz.leipzig.codefor.de/api/searchbetween?from=2015-08-31T22:00:00.000Z&to=2017-09-16T22:00:00.000Z)
 * [Schulen in Leipzig/Deutschland](https://jedeschule.de/daten/)
 * [Leipzig - Schulen](https://github.com/CodeforLeipzig/kidsle/blob/master/project/schools/data/gymnasium.geo.json)
 * [Kooperative Landwirtschaft](https://umap.openstreetmap.fr/de/datalayer/1174296/)
   * public/data/leipzig-kolaleipzig.json
