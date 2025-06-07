import fetch from 'node-fetch';
import fs from 'fs';
import slugify from '@sindresorhus/slugify';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const save_dir = join(dirname(fileURLToPath(import.meta.url)), '../..', 'public/data-raw');

const prefix = `https://statistik.leipzig.de/opendata/api/values?format=json`;

const urls = [
      // Stadtgebiet und Witterung / Geografische Lage (Jahreszahlen),
      `${prefix}&kategorie_nr=1&rubrik_nr=1&periode=y`,

      // Stadtgebiet und Witterung / Wetterdaten (Jahreszahlen),
      `${prefix}&kategorie_nr=1&rubrik_nr=3&periode=y`,

      // Verkehr / Straßennetz (Jahreszahlen),
      `${prefix}&kategorie_nr=10&rubrik_nr=1&periode=y`,

      // Verkehr / Kraftfahrzeugbestand (Jahreszahlen),
      `${prefix}&kategorie_nr=10&rubrik_nr=2&periode=y`,

      // Verkehr / Verkehrsunfälle (Jahreszahlen),
      `${prefix}&kategorie_nr=10&rubrik_nr=3&periode=y`,

      // Verkehr / Personennahverkehr (Jahreszahlen),
      `${prefix}&kategorie_nr=10&rubrik_nr=4&periode=y`,

      // Verkehr / Luftverkehr (Jahreszahlen),
      `${prefix}&kategorie_nr=10&rubrik_nr=5&periode=y`,

      // Kultur und Sport / Museen (Jahreszahlen),
      `${prefix}&kategorie_nr=11&rubrik_nr=1&periode=y`,

      // Kultur und Sport / Theater (Jahreszahlen),
      `${prefix}&kategorie_nr=11&rubrik_nr=2&periode=y`,

      // Kultur und Sport / Bibliotheken (Jahreszahlen),
      `${prefix}&kategorie_nr=11&rubrik_nr=3&periode=y`,

      // Kultur und Sport / Zoo Leipzig (Jahreszahlen),
      `${prefix}&kategorie_nr=11&rubrik_nr=4&periode=y`,

      // Kultur und Sport / Bäder (Jahreszahlen),
      `${prefix}&kategorie_nr=11&rubrik_nr=5&periode=y`,

      // Kultur und Sport / Sportvereine (Jahreszahlen),
      `${prefix}&kategorie_nr=11&rubrik_nr=6&periode=y`,

      // Kultur und Sport / Sporteinrichtungen (Jahreszahlen),
      `${prefix}&kategorie_nr=11&rubrik_nr=7&periode=y`,

      // Energie und Umwelt / Immissionen (Jahreszahlen),
      `${prefix}&kategorie_nr=13&rubrik_nr=1&periode=y`,

      // Energie und Umwelt / Wasserhygiene (Jahreszahlen),
      `${prefix}&kategorie_nr=13&rubrik_nr=3&periode=y`,

      // Energie und Umwelt / Energieverbrauch (Jahreszahlen),
      `${prefix}&kategorie_nr=13&rubrik_nr=4&periode=y`,

      // Energie und Umwelt / Abfallentsorgung (Jahreszahlen),
      `${prefix}&kategorie_nr=13&rubrik_nr=5&periode=y`,

      // Stadtverwaltung, Kommunalpolitik und Kommunalfinanzen / Personal nach Aufgabenbereichen (Jahreszahlen),
      `${prefix}&kategorie_nr=14&rubrik_nr=1&periode=y`,

      // Stadtverwaltung, Kommunalpolitik und Kommunalfinanzen / Probleme aus Bürgersicht (Jahreszahlen),
      `${prefix}&kategorie_nr=14&rubrik_nr=10&periode=y`,

      // Stadtverwaltung, Kommunalpolitik und Kommunalfinanzen / Probleme aus Bürgersicht (ab 2020) (Jahreszahlen),
      `${prefix}&kategorie_nr=14&rubrik_nr=11&periode=y`,

      // Stadtverwaltung, Kommunalpolitik und Kommunalfinanzen / Personal nach Produktbereichen (Jahreszahlen),
      `${prefix}&kategorie_nr=14&rubrik_nr=2&periode=y`,

      // Stadtverwaltung, Kommunalpolitik und Kommunalfinanzen / Personal nach Dienstverhältnissen (Jahreszahlen),
      `${prefix}&kategorie_nr=14&rubrik_nr=3&periode=y`,

      // Stadtverwaltung, Kommunalpolitik und Kommunalfinanzen / Einnahmen (Jahreszahlen),
      `${prefix}&kategorie_nr=14&rubrik_nr=4&periode=y`,

      // Stadtverwaltung, Kommunalpolitik und Kommunalfinanzen / Ausgaben (Jahreszahlen),
      `${prefix}&kategorie_nr=14&rubrik_nr=5&periode=y`,

      // Stadtverwaltung, Kommunalpolitik und Kommunalfinanzen / Steuereinnahmen (Jahreszahlen),
      `${prefix}&kategorie_nr=14&rubrik_nr=6&periode=y`,

      // Stadtverwaltung, Kommunalpolitik und Kommunalfinanzen / Realsteuervergleich (Jahreszahlen),
      `${prefix}&kategorie_nr=14&rubrik_nr=7&periode=y`,

      // Stadtverwaltung, Kommunalpolitik und Kommunalfinanzen / Zufriedenheit mit den Lebensbedingungen (Jahreszahlen),
      `${prefix}&kategorie_nr=14&rubrik_nr=8&periode=y`,

      // Stadtverwaltung, Kommunalpolitik und Kommunalfinanzen / Einsatz von Haushaltsmitteln (Jahreszahlen),
      `${prefix}&kategorie_nr=14&rubrik_nr=9&periode=y`,

      // Bevölkerungsbestand / Einwohner (Jahreszahlen),
      `${prefix}&kategorie_nr=2&rubrik_nr=1&periode=y`,

      // Bevölkerungsbestand / Einwohner nach Alter (Jahreszahlen),
      `${prefix}&kategorie_nr=2&rubrik_nr=2&periode=y`,

      // Bevölkerungsbestand / Bevölkerung nach Religionszugehörigkeit (Jahreszahlen),
      `${prefix}&kategorie_nr=2&rubrik_nr=37&periode=y`,

      // Bevölkerungsbestand / Wohnberechtigte Einwohner nach Alter (Jahreszahlen),
      `${prefix}&kategorie_nr=2&rubrik_nr=5&periode=y`,

      // Bevölkerungsbestand / Bevölkerungsvorausschätzung (Jahreszahlen),
      `${prefix}&kategorie_nr=2&rubrik_nr=6&periode=y`,

      // Bevölkerungsbewegung / Geborene und Gestorbene (Amtliche Daten) (Jahreszahlen),
      `${prefix}&kategorie_nr=3&rubrik_nr=1&periode=y`,

      // Bevölkerungsbewegung / Geborene und Gestorbene (Melderegisterdaten) (Jahreszahlen),
      `${prefix}&kategorie_nr=3&rubrik_nr=2&periode=y`,

      // Bevölkerungsbewegung / Eheschließungen und Ehescheidungen (Jahreszahlen),
      `${prefix}&kategorie_nr=3&rubrik_nr=3&periode=y`,

      // Bevölkerungsbewegung / Wanderungen (Amtliche Daten) (Jahreszahlen),
      `${prefix}&kategorie_nr=3&rubrik_nr=4&periode=y`,

      // Bevölkerungsbewegung / Wanderungen (Melderegisterdaten) (Jahreszahlen),
      `${prefix}&kategorie_nr=3&rubrik_nr=5&periode=y`,

      // Bevölkerungsbewegung / Wanderungen (Melderegisterdaten, unrevidiert) (Jahreszahlen),
      `${prefix}&kategorie_nr=3&rubrik_nr=6&periode=y`,

      // Gesundheit und Soziales / Kindertageseinrichtungen (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=1&periode=y`,

      // Gesundheit und Soziales / Wohnraumversorgung mit Wohnberechtigungsschein (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=10&periode=y`,

      // Gesundheit und Soziales / Vermittlung wohnungssuchender Haushalte mit Wohnberechtigungsschein (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=11&periode=y`,

      // Gesundheit und Soziales / Von Wohnungslosigkeit bedrohte Haushalte  (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=14&periode=y`,

      // Gesundheit und Soziales / Wohnungsnotfälle  (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=15&periode=y`,

      // Gesundheit und Soziales / Übernahme von Mietschulden (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=16&periode=y`,

      // Gesundheit und Soziales / Durchschnittliche Anzahl obdachloser und wohnungsloser Personen (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=18&periode=y`,

      // Gesundheit und Soziales / Tagespflege (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=2&periode=y`,

      // Gesundheit und Soziales / Haushalte mit Wohnberechtigungsschein  (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=28&periode=y`,

      // Gesundheit und Soziales / Fälle ambulant betreuten Wohnens (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=29&periode=y`,

      // Gesundheit und Soziales / Wohnungsnotfälle (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=30&periode=y`,

      // Gesundheit und Soziales / Verweildauer in Notunterkünften (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=32&periode=y`,

      // Gesundheit und Soziales / Wohnungslose - Statistik nach dem WoBerichtsG (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=38&periode=y`,

      // Gesundheit und Soziales / Kinder- und Jugendförderung freier Träger  (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=39&periode=y`,

      // Gesundheit und Soziales / Grundsicherung für Arbeitssuchende (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=4&periode=y`,

      // Gesundheit und Soziales / Erziehungs- und Familienberatungsstellen (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=40&periode=y`,

      // Gesundheit und Soziales / Erziehungshilfen für Minderjährige (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=41&periode=y`,

      // Gesundheit und Soziales / Aufwendungen für Erziehungshilfen (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=42&periode=y`,

      // Gesundheit und Soziales / Aufwendungen für Kindertageseinrichtungen (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=43&periode=y`,

      // Gesundheit und Soziales / Untersuchte Kinder in Kindertageseinrichtungen (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=44&periode=y`,

      // Gesundheit und Soziales / Beratungsstelle Wohnen und Soziales (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=8&periode=y`,

      // Gesundheit und Soziales / Geförderte Wohnraumanpassungen (Jahreszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=9&periode=y`,

      // Bildung / Allgemeinbildende Schulen (Jahreszahlen),
      `${prefix}&kategorie_nr=5&rubrik_nr=1&periode=y`,

      // Bildung / Einschulungen und Nichteinschulungen (Jahreszahlen),
      `${prefix}&kategorie_nr=5&rubrik_nr=2&periode=y`,

      // Bildung / Berufsbildende Schulen (Jahreszahlen),
      `${prefix}&kategorie_nr=5&rubrik_nr=3&periode=y`,

      // Bildung / Hochschulen (Jahreszahlen),
      `${prefix}&kategorie_nr=5&rubrik_nr=4&periode=y`,

      // Bildung / Volkshochschule (Jahreszahlen),
      `${prefix}&kategorie_nr=5&rubrik_nr=5&periode=y`,

      // Bildung / Integrativ unterrichtete Schüler/-innen nach Förderschwerpunkt (Jahreszahlen),
      `${prefix}&kategorie_nr=5&rubrik_nr=6&periode=y`,

      // Bildung / Investitionen in den Schulbau (Jahreszahlen),
      `${prefix}&kategorie_nr=5&rubrik_nr=7&periode=y`,

      // Bildung / Anteilige Verteilung der Schulabschlüsse (Jahreszahlen),
      `${prefix}&kategorie_nr=5&rubrik_nr=8&periode=y`,

      // Bautätigkeit und Wohnen / Wohnungsbestand (Jahreszahlen),
      `${prefix}&kategorie_nr=6&rubrik_nr=1&periode=y`,

      // Bautätigkeit und Wohnen / Wohnsituation (Jahreszahlen),
      `${prefix}&kategorie_nr=6&rubrik_nr=2&periode=y`,

      // Bautätigkeit und Wohnen / Wohnungsbestand  (Jahreszahlen),
      `${prefix}&kategorie_nr=6&rubrik_nr=22&periode=y`,

      // Bautätigkeit und Wohnen / Haushaltsgröße (Jahreszahlen),
      `${prefix}&kategorie_nr=6&rubrik_nr=23&periode=y`,

      // Bautätigkeit und Wohnen / Gesamtmietbelastung nach Haushaltstyp (Jahreszahlen),
      `${prefix}&kategorie_nr=6&rubrik_nr=27&periode=y`,

      // Bautätigkeit und Wohnen / Wohnungsmieten (Jahreszahlen),
      `${prefix}&kategorie_nr=6&rubrik_nr=3&periode=y`,

      // Bautätigkeit und Wohnen / Durchschnittliche Nettokaltmiete (Median) der Angebotsmiete nach Baualter (Jahreszahlen),
      `${prefix}&kategorie_nr=6&rubrik_nr=34&periode=y`,

      // Bautätigkeit und Wohnen / Baugenehmigungen (Jahreszahlen),
      `${prefix}&kategorie_nr=6&rubrik_nr=5&periode=y`,

      // Bautätigkeit und Wohnen / Baufertigstellungen (Jahreszahlen),
      `${prefix}&kategorie_nr=6&rubrik_nr=6&periode=y`,

      // Erwerbstätigkeit und Arbeitsmarkt / Beschäftigte (Jahreszahlen),
      `${prefix}&kategorie_nr=7&rubrik_nr=1&periode=y`,

      // Erwerbstätigkeit und Arbeitsmarkt / Auszubildende (Jahreszahlen),
      `${prefix}&kategorie_nr=7&rubrik_nr=2&periode=y`,

      // Erwerbstätigkeit und Arbeitsmarkt / Arbeitslose (Jahreszahlen),
      `${prefix}&kategorie_nr=7&rubrik_nr=3&periode=y`,

      // Wirtschaft / Unternehmen (Jahreszahlen),
      `${prefix}&kategorie_nr=8&rubrik_nr=1&periode=y`,

      // Wirtschaft / Gäste nach Herkunftsländern (Jahreszahlen),
      `${prefix}&kategorie_nr=8&rubrik_nr=10&periode=y`,

      // Wirtschaft / Messen und Ausstellungen (Jahreszahlen),
      `${prefix}&kategorie_nr=8&rubrik_nr=11&periode=y`,

      // Wirtschaft / Bruttoinlandsprodukt und Bruttowertschöpfung (Jahreszahlen),
      `${prefix}&kategorie_nr=8&rubrik_nr=12&periode=y`,

      // Wirtschaft / Handwerksbetriebe (Jahreszahlen),
      `${prefix}&kategorie_nr=8&rubrik_nr=2&periode=y`,

      // Wirtschaft / Verarbeitendes Gewerbe (Jahreszahlen),
      `${prefix}&kategorie_nr=8&rubrik_nr=3&periode=y`,

      // Wirtschaft / Bauhauptgewerbe (Jahreszahlen),
      `${prefix}&kategorie_nr=8&rubrik_nr=4&periode=y`,

      // Wirtschaft / Ausbaugewerbe (Jahreszahlen),
      `${prefix}&kategorie_nr=8&rubrik_nr=5&periode=y`,

      // Wirtschaft / Gewerbemeldungen (Jahreszahlen),
      `${prefix}&kategorie_nr=8&rubrik_nr=6&periode=y`,

      // Wirtschaft / Insolvenzverfahren (Jahreszahlen),
      `${prefix}&kategorie_nr=8&rubrik_nr=7&periode=y`,

      // Wirtschaft / Beherbergungskapazität (Jahreszahlen),
      `${prefix}&kategorie_nr=8&rubrik_nr=8&periode=y`,

      // Wirtschaft / Ankünfte und Übernachtungen (Jahreszahlen),
      `${prefix}&kategorie_nr=8&rubrik_nr=9&periode=y`,

      // Einkommen und Preise / Lebensunterhalt (Jahreszahlen),
      `${prefix}&kategorie_nr=9&rubrik_nr=1&periode=y`,

      // Einkommen und Preise / Nettoeinkommen (Jahreszahlen),
      `${prefix}&kategorie_nr=9&rubrik_nr=2&periode=y`,

      // Einkommen und Preise / Bruttomonatsentgelte (Jahreszahlen),
      `${prefix}&kategorie_nr=9&rubrik_nr=3&periode=y`,

/*
      // Verkehr / Verkehrsunfälle (Quartalszahlen),
      `${prefix}&kategorie_nr=10&rubrik_nr=3&periode=q`,

      // Verkehr / Luftverkehr (Quartalszahlen),
      `${prefix}&kategorie_nr=10&rubrik_nr=5&periode=q`,

      // Kultur und Sport / Museen (Quartalszahlen),
      `${prefix}&kategorie_nr=11&rubrik_nr=1&periode=q`,

      // Kultur und Sport / Theater (Quartalszahlen),
      `${prefix}&kategorie_nr=11&rubrik_nr=2&periode=q`,

      // Kultur und Sport / Zoo Leipzig (Quartalszahlen),
      `${prefix}&kategorie_nr=11&rubrik_nr=4&periode=q`,

      // Kultur und Sport / Bäder (Quartalszahlen),
      `${prefix}&kategorie_nr=11&rubrik_nr=5&periode=q`,

      // Energie und Umwelt / Abfallentsorgung (Quartalszahlen),
      `${prefix}&kategorie_nr=13&rubrik_nr=5&periode=q`,

      // Stadtverwaltung, Kommunalpolitik und Kommunalfinanzen / Steuereinnahmen (Quartalszahlen),
      `${prefix}&kategorie_nr=14&rubrik_nr=6&periode=q`,

      // Bevölkerungsbestand / Einwohner (Quartalszahlen),
      `${prefix}&kategorie_nr=2&rubrik_nr=1&periode=q`,

      // Bevölkerungsbewegung / Geborene und Gestorbene (Amtliche Daten) (Quartalszahlen),
      `${prefix}&kategorie_nr=3&rubrik_nr=1&periode=q`,

      // Bevölkerungsbewegung / Geborene und Gestorbene (Melderegisterdaten) (Quartalszahlen),
      `${prefix}&kategorie_nr=3&rubrik_nr=2&periode=q`,

      // Bevölkerungsbewegung / Wanderungen (Amtliche Daten) (Quartalszahlen),
      `${prefix}&kategorie_nr=3&rubrik_nr=4&periode=q`,

      // Bevölkerungsbewegung / Wanderungen (Melderegisterdaten) (Quartalszahlen),
      `${prefix}&kategorie_nr=3&rubrik_nr=5&periode=q`,

      // Bevölkerungsbewegung / Wanderungen (Melderegisterdaten, unrevidiert) (Quartalszahlen),
      `${prefix}&kategorie_nr=3&rubrik_nr=6&periode=q`,

      // Gesundheit und Soziales / Grundsicherung für Arbeitssuchende (Quartalszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=4&periode=q`,

      // Bautätigkeit und Wohnen / Wohnungsmieten (Quartalszahlen),
      `${prefix}&kategorie_nr=6&rubrik_nr=3&periode=q`,

      // Bautätigkeit und Wohnen / Baugenehmigungen (Quartalszahlen),
      `${prefix}&kategorie_nr=6&rubrik_nr=5&periode=q`,

      // Erwerbstätigkeit und Arbeitsmarkt / Beschäftigte (Quartalszahlen),
      `${prefix}&kategorie_nr=7&rubrik_nr=1&periode=q`,

      // Erwerbstätigkeit und Arbeitsmarkt / Arbeitslose (Quartalszahlen),
      `${prefix}&kategorie_nr=7&rubrik_nr=3&periode=q`,

      // Wirtschaft / Verarbeitendes Gewerbe (Quartalszahlen),
      `${prefix}&kategorie_nr=8&rubrik_nr=3&periode=q`,

      // Wirtschaft / Bauhauptgewerbe (Quartalszahlen),
      `${prefix}&kategorie_nr=8&rubrik_nr=4&periode=q`,

      // Wirtschaft / Ausbaugewerbe (Quartalszahlen),
      `${prefix}&kategorie_nr=8&rubrik_nr=5&periode=q`,

      // Wirtschaft / Ankünfte und Übernachtungen (Quartalszahlen),
      `${prefix}&kategorie_nr=8&rubrik_nr=9&periode=q`,

      // Verkehr / Verkehrsunfälle (Quartalszahlen),
      `${prefix}&kategorie_nr=10&rubrik_nr=3&periode=q`,

      // Verkehr / Luftverkehr (Quartalszahlen),
      `${prefix}&kategorie_nr=10&rubrik_nr=5&periode=q`,

      // Kultur und Sport / Museen (Quartalszahlen),
      `${prefix}&kategorie_nr=11&rubrik_nr=1&periode=q`,

      // Kultur und Sport / Theater (Quartalszahlen),
      `${prefix}&kategorie_nr=11&rubrik_nr=2&periode=q`,

      // Kultur und Sport / Zoo Leipzig (Quartalszahlen),
      `${prefix}&kategorie_nr=11&rubrik_nr=4&periode=q`,

      // Kultur und Sport / Bäder (Quartalszahlen),
      `${prefix}&kategorie_nr=11&rubrik_nr=5&periode=q`,

      // Energie und Umwelt / Abfallentsorgung (Quartalszahlen),
      `${prefix}&kategorie_nr=13&rubrik_nr=5&periode=q`,

      // Stadtverwaltung, Kommunalpolitik und Kommunalfinanzen / Steuereinnahmen (Quartalszahlen),
      `${prefix}&kategorie_nr=14&rubrik_nr=6&periode=q`,

      // Bevölkerungsbestand / Einwohner (Quartalszahlen),
      `${prefix}&kategorie_nr=2&rubrik_nr=1&periode=q`,

      // Bevölkerungsbewegung / Geborene und Gestorbene (Amtliche Daten) (Quartalszahlen),
      `${prefix}&kategorie_nr=3&rubrik_nr=1&periode=q`,

      // Bevölkerungsbewegung / Geborene und Gestorbene (Melderegisterdaten) (Quartalszahlen),
      `${prefix}&kategorie_nr=3&rubrik_nr=2&periode=q`,

      // Bevölkerungsbewegung / Wanderungen (Amtliche Daten) (Quartalszahlen),
      `${prefix}&kategorie_nr=3&rubrik_nr=4&periode=q`,

      // Bevölkerungsbewegung / Wanderungen (Melderegisterdaten) (Quartalszahlen),
      `${prefix}&kategorie_nr=3&rubrik_nr=5&periode=q`,

      // Bevölkerungsbewegung / Wanderungen (Melderegisterdaten, unrevidiert) (Quartalszahlen),
      `${prefix}&kategorie_nr=3&rubrik_nr=6&periode=q`,

      // Gesundheit und Soziales / Grundsicherung für Arbeitssuchende (Quartalszahlen),
      `${prefix}&kategorie_nr=4&rubrik_nr=4&periode=q`,

      // Bautätigkeit und Wohnen / Wohnungsmieten (Quartalszahlen),
      `${prefix}&kategorie_nr=6&rubrik_nr=3&periode=q`,

      // Bautätigkeit und Wohnen / Baugenehmigungen (Quartalszahlen),
      `${prefix}&kategorie_nr=6&rubrik_nr=5&periode=q`,

      // Erwerbstätigkeit und Arbeitsmarkt / Beschäftigte (Quartalszahlen),
      `${prefix}&kategorie_nr=7&rubrik_nr=1&periode=q`,

      // Erwerbstätigkeit und Arbeitsmarkt / Arbeitslose (Quartalszahlen),
      `${prefix}&kategorie_nr=7&rubrik_nr=3&periode=q`,

      // Wirtschaft / Verarbeitendes Gewerbe (Quartalszahlen),
      `${prefix}&kategorie_nr=8&rubrik_nr=3&periode=q`,

      // Wirtschaft / Bauhauptgewerbe (Quartalszahlen),
      `${prefix}&kategorie_nr=8&rubrik_nr=4&periode=q`,

      // Wirtschaft / Ausbaugewerbe (Quartalszahlen),
      `${prefix}&kategorie_nr=8&rubrik_nr=5&periode=q`,

      // Wirtschaft / Ankünfte und Übernachtungen (Quartalszahlen),
      `${prefix}&kategorie_nr=8&rubrik_nr=9&periode=q`,
*/
      // Wahlen / Europawahlen",
      `${prefix}&kategorie_nr=15&rubrik_nr=1&periode=d`,

      // Wahlen / Bundestagswahlen",
      `${prefix}&kategorie_nr=15&rubrik_nr=2&periode=d`,

      // Wahlen / Landtagswahlen",
      `${prefix}&kategorie_nr=15&rubrik_nr=3&periode=d`,

      // Wahlen / Stadtratswahlen",
      `${prefix}&kategorie_nr=15&rubrik_nr=4&periode=d`,

      // Wahlen / Europawahlen",
      `${prefix}&kategorie_nr=15&rubrik_nr=1&periode=d`,

      // Wahlen / Bundestagswahlen",
      `${prefix}&kategorie_nr=15&rubrik_nr=2&periode=d`,

      // Wahlen / Landtagswahlen",
      `${prefix}&kategorie_nr=15&rubrik_nr=3&periode=d`,

      // Wahlen / Stadtratswahlen",
      `${prefix}&kategorie_nr=15&rubrik_nr=4&periode=d`,

      // Wirtschaft / Handwerksbetriebe (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=8&rubrik_nr=4&periode=y`,

      // Wirtschaft / Firmen (WZ 2008) (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=8&rubrik_nr=1&periode=y`,

      // Gesundheit und Soziales / Kindertagesbetreuung (Kapazitäten) (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=4&rubrik_nr=2&periode=y`,

      // Einkommen und Preise / Lebensunterhalt (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=9&rubrik_nr=3&periode=y`,

      // Bautätigkeit und Wohnen / Wohnungsmieten (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=6&rubrik_nr=6&periode=y`,

      // Erwerbstätigkeit und Arbeitsmarkt / Arbeitslose (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=7&rubrik_nr=3&periode=y`,

      // Bevölkerungsbestand / Bevölkerungsvorausschätzung (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=12&periode=y`,

      // Bevölkerungsbestand / Familien mit Kindern (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=11&periode=y`,

      // Lage und Territorium / Flächennutzung (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=1&rubrik_nr=1&periode=y`,

      // Gesundheit und Soziales / Kinderspielplätze (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=4&rubrik_nr=10&periode=y`,

      // Einkommen und Preise / Nettoeinkommen (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=9&rubrik_nr=1&periode=y`,

      // Bautätigkeit und Wohnen / Baufertigstellungen (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=6&rubrik_nr=3&periode=y`,

      // Bevölkerungsbestand / Einwohnerdichte (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=9&periode=y`,

      // Bevölkerungsbestand / Einwohner mit Migrationshintergund (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=5&periode=y`,

      // Bevölkerungsbestand / Personenhaushalte (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=10&periode=y`,

      // Erwerbstätigkeit und Arbeitsmarkt / Beschäftigte (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=7&rubrik_nr=1&periode=y`,

      // Wirtschaft / Firmen (WZ 2003) (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=8&rubrik_nr=3&periode=y`,

      // Bevölkerungsbestand / Einwohner nach Alter (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=3&periode=y`,

      // Bevölkerungsbestand / Wohnberechtigte Einwohner nach Familienstand (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=8&periode=y`,

      // Gesundheit und Soziales / Kindertagesstätten (Angemeldete Kinder) (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=4&rubrik_nr=1&periode=y`,

      // Öffentliche Ordnung und Infrastruktur / Straftaten (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=12&rubrik_nr=1&periode=y`,

      // Bevölkerungsbestand / Wohnberechtigte Einwohner (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=6&periode=y`,

      // Einkommen und Preise / Bruttomonatsentgelte (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=9&rubrik_nr=4&periode=y`,

      // Bevölkerungsbewegung / Geborene und Gestorbene (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=3&rubrik_nr=1&periode=y`,

      // Bautätigkeit und Wohnen / Wohnsituation (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=6&rubrik_nr=7&periode=y`,

      // Verkehr / Kraftfahrzeugbestand (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=10&rubrik_nr=1&periode=y`,

      // Gesundheit und Soziales / Alten- und Pflegeheime (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=4&rubrik_nr=9&periode=y`,

      // Bautätigkeit und Wohnen / Gebäudebestand (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=6&rubrik_nr=4&periode=y`,

      // Wirtschaft / Einzelhandel (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=8&rubrik_nr=6&periode=y`,

      // Bevölkerungsbewegung / Wanderungen (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=3&rubrik_nr=3&periode=y`,

      // Bevölkerungsbestand / Einwohner (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=1&periode=y`,

      // Gesundheit und Soziales / Zufriedenheitsfaktoren (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=4&rubrik_nr=11&periode=y`,

      // Bevölkerungsbewegung / Wanderungen (unrevidiert) (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=3&rubrik_nr=4&periode=y`,

      // Gesundheit und Soziales / Grundsicherung für Arbeitssuchende (SGB II) (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=4&rubrik_nr=4&periode=y`,

      // Gesundheit und Soziales / Apotheken (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=4&rubrik_nr=8&periode=y`,

      // Bildung / Allgemeinbildende Schulen (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=5&rubrik_nr=1&periode=y`,

      // Bautätigkeit und Wohnen / Wohnungsbestand (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=6&rubrik_nr=5&periode=y`,

      // Bevölkerungsbestand / Wohnberechtigte Einwohner nach Alter (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=7&periode=y`,

      // Gesundheit und Soziales / Ärzte (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=4&rubrik_nr=6&periode=y`,

      // Bautätigkeit und Wohnen / Baugenehmigungen (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=6&rubrik_nr=1&periode=y`,

      // Wirtschaft / Handwerksbetriebe (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=8&rubrik_nr=5&periode=y`,

      // Bevölkerungsbestand / Einwohner nach Familienstand (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=4&periode=y`,

      // Bildung / Schul- und Berufsabschlüsse (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=5&rubrik_nr=3&periode=y`,

      // Einkommen und Preise / Lebensunterhalt (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=9&rubrik_nr=3&periode=y`,

      // Bautätigkeit und Wohnen / Wohnungsmieten (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=6&rubrik_nr=6&periode=y`,

      // Gesundheit und Soziales / Apotheken (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=4&rubrik_nr=8&periode=y`,

      // Bildung / Allgemeinbildende Schulen (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=5&rubrik_nr=1&periode=y`,

      // Bautätigkeit und Wohnen / Wohnungsbestand (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=6&rubrik_nr=5&periode=y`,

      // Bevölkerungsbestand / Wohnberechtigte Einwohner nach Alter (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=7&periode=y`,

      // Bevölkerungsbestand / Einwohnerdichte (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=9&periode=y`,

      // Bautätigkeit und Wohnen / Gebäudebestand (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=6&rubrik_nr=4&periode=y`,

      // Wirtschaft / Einzelhandel (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=8&rubrik_nr=6&periode=y`,

      // Bevölkerungsbewegung / Wanderungen (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=3&rubrik_nr=3&periode=y`,

      // Wirtschaft / Handwerksbetriebe (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=8&rubrik_nr=4&periode=y`,

      // Wirtschaft / Firmen (WZ 2008) (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=8&rubrik_nr=1&periode=y`,

      // Gesundheit und Soziales / Kindertagesbetreuung (Kapazitäten) (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=4&rubrik_nr=2&periode=y`,

      // Erwerbstätigkeit und Arbeitsmarkt / Arbeitslose (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=7&rubrik_nr=3&periode=y`,

      // Bevölkerungsbestand / Bevölkerungsvorausschätzung (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=12&periode=y`,

      // Bevölkerungsbestand / Familien mit Kindern (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=11&periode=y`,

      // Lage und Territorium / Flächennutzung (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=1&rubrik_nr=1&periode=y`,

      // Gesundheit und Soziales / Kinderspielplätze (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=4&rubrik_nr=10&periode=y`,

      // Einkommen und Preise / Nettoeinkommen (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=9&rubrik_nr=1&periode=y`,

      // Bautätigkeit und Wohnen / Baufertigstellungen (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=6&rubrik_nr=3&periode=y`,

      // Bevölkerungsbewegung / Geborene und Gestorbene (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=3&rubrik_nr=1&periode=y`,

      // Bautätigkeit und Wohnen / Wohnsituation (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=6&rubrik_nr=7&periode=y`,

      // Verkehr / Kraftfahrzeugbestand (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=10&rubrik_nr=1&periode=y`,

      // Gesundheit und Soziales / Alten- und Pflegeheime (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=4&rubrik_nr=9&periode=y`,

      // Öffentliche Ordnung und Infrastruktur / Straftaten (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=12&rubrik_nr=1&periode=y`,

      // Bevölkerungsbestand / Wohnberechtigte Einwohner (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=6&periode=y`,

      // Einkommen und Preise / Bruttomonatsentgelte (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=9&rubrik_nr=4&periode=y`,

      // Gesundheit und Soziales / Ärzte (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=4&rubrik_nr=6&periode=y`,

      // Bautätigkeit und Wohnen / Baugenehmigungen (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=6&rubrik_nr=1&periode=y`,

      // Wirtschaft / Handwerksbetriebe (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=8&rubrik_nr=5&periode=y`,

      // Bevölkerungsbestand / Einwohner nach Familienstand (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=4&periode=y`,

      // Bildung / Schul- und Berufsabschlüsse (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=5&rubrik_nr=3&periode=y`,

      // Bevölkerungsbestand / Einwohner (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=1&periode=y`,

      // Gesundheit und Soziales / Zufriedenheitsfaktoren (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=4&rubrik_nr=11&periode=y`,

      // Bevölkerungsbewegung / Wanderungen (unrevidiert) (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=3&rubrik_nr=4&periode=y`,

      // Gesundheit und Soziales / Grundsicherung für Arbeitssuchende (SGB II) (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=4&rubrik_nr=4&periode=y`,

      // Bevölkerungsbestand / Einwohner nach Alter (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=3&periode=y`,

      // Bevölkerungsbestand / Wohnberechtigte Einwohner nach Familienstand (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=8&periode=y`,

      // Gesundheit und Soziales / Kindertagesstätten (Angemeldete Kinder) (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=4&rubrik_nr=1&periode=y`,

      // Bevölkerungsbestand / Einwohner mit Migrationshintergund (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=5&periode=y`,

      // Bevölkerungsbestand / Personenhaushalte (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=2&rubrik_nr=10&periode=y`,

      // Erwerbstätigkeit und Arbeitsmarkt / Beschäftigte (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=7&rubrik_nr=1&periode=y`,

      // Wirtschaft / Firmen (WZ 2003) (Jahreszahlen, kleinräumig),
      `${prefix}&kategorie_nr=8&rubrik_nr=3&periode=y`,

      // Wahlen / Bundestagswahlen (kleinräumig),
      `${prefix}&kategorie_nr=15&rubrik_nr=3&periode=d`,

      // Wahlen / Europawahlen (kleinräumig),
      `${prefix}&kategorie_nr=15&rubrik_nr=1&periode=d`,

      // Wahlen / Landtagswahlen (kleinräumig),
      `${prefix}&kategorie_nr=15&rubrik_nr=4&periode=d`,

      // Wahlen / Stadtratswahlen (kleinräumig),
      `${prefix}&kategorie_nr=15&rubrik_nr=5&periode=d`,

      // Wahlen / Europawahlen (kleinräumig),
      `${prefix}&kategorie_nr=15&rubrik_nr=1&periode=d`,

      // Wahlen / Bundestagswahlen (kleinräumig),
      `${prefix}&kategorie_nr=15&rubrik_nr=3&periode=d`,

      // Wahlen / Landtagswahlen (kleinräumig),
      `${prefix}&kategorie_nr=15&rubrik_nr=4&periode=d`,

      // Wahlen / Stadtratswahlen (kleinräumig),
      `${prefix}&kategorie_nr=15&rubrik_nr=5&periode=d`,
]

;(async () => {
  try {
    if (!fs.existsSync(save_dir)) {
      fs.mkdirSync(save_dir);
    }
  } catch (err) {
  console.error(err);
  }

  const num_digits = Math.ceil(Math.log10(urls.length))
  for (let i = 0; i < urls.length; i++) {
    const response = await fetch(urls[i]);
    process.stdout.write('[' + String(i+1).padStart(num_digits, '0') + '/' + urls.length + '] \"' + urls[i] + '\": ')
    const data = await response.json();
    if (data && data.length > 0) {
      let payload;
      let title;
      if (data.length > 0) {
        const first = data[0];
        const attTitle = [first.merkmal_1, first.merkmal_2, first.merkmal_3, first.merkmal_4].filter(p => !!p).join('__');
        title = attTitle && attTitle.length > 0 ? attTitle : first.name; 
        payload = data;
      } else {
        title = data.meta?.name
        payload = data.data
      }
      let filename = `leipzig-${slugify(title)}`
      fs.writeFileSync(join(save_dir, `${filename}.json`), JSON.stringify({
          meta: {
            source: urls[i],
            title
          },
          data
        }, null, 2))  
      console.log(`data saved to ${filename}.json `)
    } else {
      console.log("no data found ")
    }
  }
})()
