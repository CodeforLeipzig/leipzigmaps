import fs from 'fs';

const __dirname = new URL('.', import.meta.url).pathname;

const files = [
'leipzig-1-raum.json',
'leipzig-60-l-abfallbehaelter.json',
'leipzig-abitur.json',
'leipzig-aerzte.json',
'leipzig-alle-leipziger-buergerinnen-und-buerger-von-18-bis-85-jahre-angebot-an-arbeitsplaetzen.json',
'leipzig-alle-leipziger-buergerinnen-und-buerger-von-18-bis-85-jahre-fremdenfeindlichkeit.json',
'leipzig-alle-leipziger-buergerinnen-und-buerger-von-18-bis-85-jahre-kriminalitaet-und-sicherheit.json',
'leipzig-alle-leipziger-buergerinnen-und-buerger-von-18-bis-85-jahre-wirtschaftsfoerderung-ansiedlung-von-investoren-unternehmen.json',
'leipzig-ankuenfte-in-berhebungseinrichtungen-insgesamt.json',
'leipzig-anspruchsberechtigte-kinder.json',
'leipzig-anteil-an-den-gueltigen-listenstimmen-wahlbeteiligung-die-partei.json',
'leipzig-anteil-an-den-gueltigen-stimmen-wahlbeteiligung-die-partei.json',
'leipzig-anteil-an-den-gueltigen-zweitstimmen-wahlbeteiligung-sonstige.json',
'leipzig-anzahl-der-betreuten-kinder-insgesamt.json',
'leipzig-anzahl-der-einrichtungen-einrichtungen-insgesamt.json',
'leipzig-anzahl-der-haushalte-mit-hauptwohnsitz-insgesamt.json',
'leipzig-anzahl-personen-wohnungslose-personen.json',
'leipzig-apotheken.json',
'leipzig-arbeitslose-insgesamt.json',
'leipzig-arbeitslosenquote-15-bis-unter-20-jahre-in.json',
'leipzig-aufwendungen-ertrag.json',
'leipzig-aufwendungen-fuer-hilfen-zur-erziehung-gesamt.json',
'leipzig-auslaender.json',
'leipzig-auszubildende-insgesamt.json',
'leipzig-bedarfsgemeinschaften-insgesamt.json',
'leipzig-bedarfsgemeinschaften.json',
'leipzig-beherbergungsstaetten-ankuenfte.json',
'leipzig-beherbergungsstaetten-geoeffnete-betriebe.json',
'leipzig-bereinigte-ausgaben.json',
'leipzig-bereinigte-einnahmen-einnahmen-der-laufenden-rechnung-erstattungen-und-laufende-zuweisungen-vom-bund.json',
'leipzig-berufsbildende-schulen-schueler.json',
'leipzig-beschaeftigte-am-arbeitsort-beschaeftigte-auslaender.json',
'leipzig-beschaeftigte-deutschland-insgesamt.json',
'leipzig-beschaeftigte-insgesamt.json',
'leipzig-besucher-in-hallenbaedern.json',
'leipzig-besucher.json',
'leipzig-betriebe.json',
'leipzig-bruttoinlandsprodukt-bip-zu-marktpreisen.json',
'leipzig-bruttomonatsentgelt.json',
'leipzig-daten-des-leipziger-melderegisters-einwohner-mit-migrationshintergrund.json',
'leipzig-durchschnittliche-gesamtmietbelastung-nach-haushaltstyp-rentnerpaare.json',
'leipzig-durchschnittliche-kosten-je-haushalt-in-euro.json',
'leipzig-durchschnittliche-nettokaltmiete-median-der-angebotsmiete-nach-baualter-ab-2015.json',
'leipzig-durchschnittliche-wohnflaeche-pro-person-haushalte-insgesamt.json',
'leipzig-durchschnittsalter.json',
'leipzig-ehescheidungen-auf-100-eheschliessungen.json',
'leipzig-eigenmittel.json',
'leipzig-einrichtungen.json',
'leipzig-einschulung-an-eine-grundschule.json',
'leipzig-einwohner-im-alter-von-unter-5-jahre.json',
'leipzig-einwohner-melderegister-gesamt.json',
'leipzig-einwohner-obere-variante.json',
'leipzig-einwohnerdichte.json',
'leipzig-endenergieverbrauch-strom-nahstrom-einschl-regenerativ.json',
'leipzig-erteilte-wohnberechtigungsscheine.json',
'leipzig-erwerbseinkommen.json',
'leipzig-fachschulabschluss.json',
'leipzig-familien-insgesamt.json',
'leipzig-feinstaub-anzahl-der-tage-mit-grenzwertueberschreitung.json',
'leipzig-finanzierung-durch-ksv-sachsen.json',
'leipzig-firmen-insgesamt.json',
'leipzig-flugzeugbewegungen.json',
'leipzig-frauen.json',
'leipzig-gebaeude-insgesamt.json',
'leipzig-gebaeude-mit-wohnungen-insgesamt.json',
'leipzig-gebaeude.json',
'leipzig-gemeindeanteil-an-der-einkommensteuer.json',
'leipzig-gesamtflaeche.json',
'leipzig-gesamtmiete.json',
'leipzig-gewaehrleistungswohnung.json',
'leipzig-gewerbeanmeldungen-insgesamt.json',
'leipzig-grundmiete.json',
'leipzig-handwerksbetriebe-insgesamt.json',
'leipzig-hauptquelle-des-lebensunterhalts-mehrere-einkommensarten.json',
'leipzig-haushalte-eine-person.json',
'leipzig-haushalte-insgesamt.json',
'leipzig-hilfen-zur-erziehung-gesamt.json',
'leipzig-insolvenzen.json',
'leipzig-integrativ-unterrichtete-schueler-innen-gesamt.json',
'leipzig-ist-aufkommen-grundsteuer-a.json',
'leipzig-iu-internationale-hochschule-erfurt-in-leipzig-studenten.json',
'leipzig-jugendquote.json',
'leipzig-kinder-insgesamt.json',
'leipzig-kontaktabbruch-bzw-kontakt-konnte-nicht-hergestellt-werden.json',
'leipzig-kontakte-gesamt.json',
'leipzig-kraftfahrzeuge-insgesamt.json',
'leipzig-lebendgeborene-insgesamt.json',
'leipzig-lebendgeborene.json',
'leipzig-ledig.json',
'leipzig-leipziger-staedtische-bibliotheken-bestand-belletristik.json',
'leipzig-leistungen.json',
'leipzig-leistungsbereiche-nach-sgb-viii-11-jugendarbeit.json',
'leipzig-maenner.json',
'leipzig-messen-und-ausstellungen.json',
'leipzig-migranten.json',
'leipzig-mit-neuem-wohnraum-versorgt.json',
'leipzig-mit-wohnraum-versorgte-haushalte-durch-kooperation-mit-weiteren-anbietern.json',
'leipzig-mitglieder-badminton.json',
'leipzig-monatliche-grundmiete-haushalte-insgesamt.json',
'leipzig-neuanmeldungen.json',
'leipzig-nord-sued-ausdehnung.json',
'leipzig-obere-variante.json',
'leipzig-ohne-mindestens-hauptschulabschluss.json',
'leipzig-persoenliches-einkommen.json',
'leipzig-persoenliches-nettoeinkommen-personen-insgesamt.json',
'leipzig-personal-insgesamt.json',
'leipzig-personen-gesamt.json',
'leipzig-plaetze-insgesamt.json',
'leipzig-platzanlagen.json',
'leipzig-saldo-ueberschuss-der-lebendgeborenen-bzw-gestorbenen-maenner.json',
'leipzig-saldo-ueberschuss-der-zu-bzw-fortzuege-auslaender.json',
'leipzig-schauspiel-leipzig-alle-buehnen-einschliesslich-vermietungen-und-gastspiele-veranstaltungen.json',
'leipzig-schulen-einrichtungen.json',
'leipzig-schulen-insgesamt.json',
'leipzig-sportraeume-und-sporthallen.json',
'leipzig-stadtgeschichtliches-museum-insgesamt.json',
'leipzig-straftaten-insgesamt.json',
'leipzig-strassen-insgesamt-einschliesslich-autobahn.json',
'leipzig-strassenbahn-linien.json',
'leipzig-temperatur-lufttemperatur-jahresmittel.json',
'leipzig-trinkwasserprobeentnahmen-insgesamt.json',
'leipzig-unternehmen-insgesamt.json',
'leipzig-veranstaltungen-kursveranstaltungen-sprachen-darunter-englisch.json',
'leipzig-verarbeitendes-gewerbe.json',
'leipzig-verkehrsflaeche.json',
'leipzig-verkehrsunfaelle-verkehrsunfaelle-insgesamt.json',
'leipzig-wahlbeteiligung.json',
'leipzig-wirtschaftliche-lage.json',
'leipzig-wohneigentum.json',
'leipzig-wohnflaeche-insgesamt.json',
'leipzig-wohnungen.json',
'leipzig-wohnungsnotfaelle-haushalte.json',
'leipzig-zuzuege-insgesamt.json',
'leipzig-zuzuege-ueber-die-stadtgrenze.json',
  //'leipzig-landwirtschaftsflaeche.json', 
  //'leipzig-lebensmittelgewerbe.json', 
  //'leipzig-mit-1-person.json', 
]

files.forEach(f => {

  const contents = JSON.parse(fs.readFileSync(`${__dirname}../../public/data-raw/${f}`));
  const data = contents.data;

  const getUnique = (data, k) => {
    let list = [];
    data.forEach(d => {
      if(d[k] !== null && !list.includes(d[k].trim())) list.push(d[k].trim())
    })
    return list;
  }

  let years = getUnique(data, 'jahr');
  let result = {};

  years.forEach(year => {
    if(!result[year]) result[year] = {}
    data
      .filter(d => d.jahr === year)
      .forEach(d => {
        let category = d.name.trim();
        if(!result[year][category]) result[year][category] = []
        if(d.ortsteil !== null) {
          result[year][category].push({
            value: parseFloat(d.wert),
            district: d.ortsteil
          })
        }
      });
  })

  fs.writeFileSync(`${__dirname}/../../public/data/${f}`, JSON.stringify({
    meta: contents.meta,
    data: result,
  }, null, 2))

})
