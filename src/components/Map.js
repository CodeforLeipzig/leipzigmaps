import { faChartPie, faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import chroma from 'chroma-js';
import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Spinner from 'react-bootstrap/Spinner';
import { isMobile } from "react-device-detect";
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';
import ColorScale from './ColorScale';
import DataOverlay from './DataOverlay';
import DataOverlayOptions from './DataOverlayOptions';
import Markers from './Markers';
import MarkerToggles from './MarkerToggles';
import OffcanvasFooter from './OffcanvasFooter';
import OwnLocationMarker from './OwnLocationMarker';
import SwitchLine from "./SwitchLine";

const dataOverlayEntries = {
  '1-raum': {
    title: 'Anzahl Wohnungen nach Raum-Anzahl',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
  '60-l-abfallbehaelter': {
    title: 'Abfall',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
  'abitur': {
    title: 'Anteil der Bevölkerung mit höchstem Ausbildungsabschluss',
    scale: chroma.scale('YlGnBu'),
    unit: '%',
  },
  'aerzte': {
    title: 'Anzahl Ärzte',
    scale: chroma.scale('PuRd'),
    unit: 'Ärzte',
  },
  'alle-leipziger-buergerinnen-und-buerger-von-18-bis-85-jahre-angebot-an-arbeitsplaetzen': {
    title: 'Anteil der befragten Leipziger:innen (18 bis 85 Jahre), die mit dem Angebot an Arbeitsplätzen zufrieden sind',
    scale: chroma.scale('YlGnBu'),
    unit: '%',
  },
  'alle-leipziger-buergerinnen-und-buerger-von-18-bis-85-jahre-fremdenfeindlichkeit': {
    title: 'Anteil der befragten Leipziger:innen (18 bis 85 Jahre), die Fremdenfeindlichkeit als Problem sehen',
    scale: chroma.scale('YlGnBu'),
    unit: '%',
  },
  'alle-leipziger-buergerinnen-und-buerger-von-18-bis-85-jahre-kriminalitaet-und-sicherheit': {
    title: 'Anteil der befragten Leipziger:innen (18 bis 85 Jahre), die Kriminalität und Sicherheit als Problem sehen',
    scale: chroma.scale('YlGnBu'),
    unit: '%',
  },
  'alle-leipziger-buergerinnen-und-buerger-von-18-bis-85-jahre-wirtschaftsfoerderung-ansiedlung-von-investoren-unternehmen': {
    title: 'Anteil der befragten Leipziger:innen (18 bis 85 Jahre), dass dafür hauptsächlich Haushaltsmittel ausgegeben werden sollen',
    scale: chroma.scale('YlGnBu'),
    unit: '%',
  },
  'ankuenfte-in-berhebungseinrichtungen-insgesamt': {
    title: 'Anzahl der Ankünfte in Berhebungseinrichtungen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
  'anspruchsberechtigte-kinder': {
    title: 'Anzahl der anspruchsberechtigten Kinder nach ihrer Untersuchung in einer Kindertageseinrichtung',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
  'anteil-an-den-gueltigen-listenstimmen-wahlbeteiligung-die-partei': {
    title: 'Anteil der Partei an den Listenstimmen',
    scale: chroma.scale('YlGnBu'),
    unit: '%',
  },
  'anteil-an-den-gueltigen-stimmen-wahlbeteiligung-die-partei': {
    title: 'Anteil der Partei an den gültigen Stimmen',
    scale: chroma.scale('YlGnBu'),
    unit: '%',
  },
  'anteil-an-den-gueltigen-zweitstimmen-wahlbeteiligung-sonstige': {
    title: 'Anteil der Partei an den gültigen Zweitstimmen',
    scale: chroma.scale('YlGnBu'),
    unit: '%',
  },
  'anzahl-der-betreuten-kinder-insgesamt': {
    title: 'Anzahl der in einer Tagespflege betreuten Kinder',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
  'anzahl-der-einrichtungen-einrichtungen-insgesamt': {
    title: 'Anzahl Kindertageseinrichtungen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
  'anzahl-der-haushalte-mit-hauptwohnsitz-insgesamt': {
    title: 'Anzahl der von Wohnungslosigkeit bedrohten Haushalte',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
  'anzahl-personen-wohnungslose-personen': {
    title: 'Anzahl wohnungslose Personen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
  'apotheken': {
    title: 'Anzahl Apotheken',
    scale: chroma.scale('PuRd'),
    unit: 'Apotheken',
  },
  'arbeitslose-insgesamt': {
    title: 'Anzahl Arbeitslose',
    scale: chroma.scale('OrRd'),
    unit: 'Arbeitslose',
  },
  'arbeitslosenquote-15-bis-unter-20-jahre-in': {
    title: 'Arbeitslose',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
  'aufwendungen-ertrag': {
    title: 'Aufwendungen für Kindertageseinrichtungen',
    scale: chroma.scale('YlGnBu'),
    unit: 'Millionen Euro',
  },
  'aufwendungen-fuer-hilfen-zur-erziehung-gesamt': {
    title: 'Aufwendungen für Erziehungshilfen',
    scale: chroma.scale('YlGnBu'),
    unit: 'Millionen Euro',
  },
  'auslaender': {
    title: 'Anzahl Ausländer',
    scale: chroma.scale('OrRd'),
    unit: 'Ausländer',
  },
  'auszubildende-insgesamt': {
    title: 'Anzahl Auszubildende',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
  'bedarfsgemeinschaften': {
    title: 'Bedarfsgemeinschaften',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
  'beschaeftigte-insgesamt': {
    title: 'Beschäftigte',
    scale: chroma.scale('OrRd'),
    unit: 'Beschäftigte',
  },
  'beherbergungsstaetten-ankuenfte': {
    title: 'Beherbergungsstätten Ankuenfte',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
  'beherbergungsstaetten-geoeffnete-betriebe': {
    title: 'Beherbergungsstätten geöffnete Betriebe',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
  'bereinigte-ausgaben': {
    title: 'Bereinigte Ausgaben',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
  'bereinigte-einnahmen-einnahmen-der-laufenden-rechnung-erstattungen-und-laufende-zuweisungen-vom-bund': {
    title: 'Bereinigte Einnahmen der laufenden Rechnung, Erstattungen und laufende Zuweisungen vom Bund',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'berufsbildende-schulen-schueler': {
    title: 'berufsbildende-schulen-schueler',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'beschaeftigte-am-arbeitsort-beschaeftigte-auslaender': {
    title: 'beschaeftigte-am-arbeitsort-beschaeftigte-auslaender',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'beschaeftigte-deutschland-insgesamt': {
    title: 'beschaeftigte-deutschland-insgesamt',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'beschaeftigte-insgesamt': {
    title: 'beschaeftigte-insgesamt',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'besucher-in-hallenbaedern': {
    title: 'besucher-in-hallenbaedern',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'besucher': {
    title: 'besucher',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'betriebe': {
    title: 'betriebe',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'bruttoinlandsprodukt-bip-zu-marktpreisen': {
    title: 'bruttoinlandsprodukt-bip-zu-marktpreisen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
  'bruttomonatsentgelt': {
    title: 'Bruttomonatsentgelt',
    scale: chroma.scale('PuBu'),
    unit: '€'
  },
'daten-des-leipziger-melderegisters-einwohner-mit-migrationshintergrund': {
    title: 'daten-des-leipziger-melderegisters-einwohner-mit-migrationshintergrund',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'durchschnittliche-gesamtmietbelastung-nach-haushaltstyp-rentnerpaare': {
    title: 'durchschnittliche-gesamtmietbelastung-nach-haushaltstyp-rentnerpaare',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'durchschnittliche-kosten-je-haushalt-in-euro': {
    title: 'durchschnittliche-kosten-je-haushalt-in-euro',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'durchschnittliche-nettokaltmiete-median-der-angebotsmiete-nach-baualter-ab-2015': {
    title: 'durchschnittliche-nettokaltmiete-median-der-angebotsmiete-nach-baualter-ab-2015',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'durchschnittliche-wohnflaeche-pro-person-haushalte-insgesamt': {
    title: 'durchschnittliche-wohnflaeche-pro-person-haushalte-insgesamt',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'durchschnittsalter': {
    title: 'durchschnittsalter',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'ehescheidungen-auf-100-eheschliessungen': {
    title: 'ehescheidungen-auf-100-eheschliessungen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'eigenmittel': {
    title: 'eigenmittel',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'einrichtungen': {
    title: 'einrichtungen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'einschulung-an-eine-grundschule': {
    title: 'einschulung-an-eine-grundschule',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'einwohner-im-alter-von-unter-5-jahre': {
    title: 'einwohner-im-alter-von-unter-5-jahre',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'einwohner-melderegister-gesamt': {
    title: 'einwohner-melderegister-gesamt',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'einwohner-obere-variante': {
    title: 'einwohner-obere-variante',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'einwohnerdichte': {
    title: 'einwohnerdichte',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'endenergieverbrauch-strom-nahstrom-einschl-regenerativ': {
    title: 'endenergieverbrauch-strom-nahstrom-einschl-regenerativ',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'erteilte-wohnberechtigungsscheine': {
    title: 'erteilte-wohnberechtigungsscheine',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'erwerbseinkommen': {
    title: 'erwerbseinkommen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'fachschulabschluss': {
    title: 'fachschulabschluss',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'familien-insgesamt': {
    title: 'familien',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'feinstaub-anzahl-der-tage-mit-grenzwertueberschreitung': {
    title: 'feinstaub-anzahl-der-tage-mit-grenzwertueberschreitung',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'finanzierung-durch-ksv-sachsen': {
    title: 'finanzierung-durch-ksv-sachsen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'firmen-insgesamt': {
    title: 'firmen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'flugzeugbewegungen': {
    title: 'flugzeugbewegungen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'frauen': {
    title: 'frauen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'gebaeude-insgesamt': {
    title: 'gebaeude',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'gebaeude-mit-wohnungen-insgesamt': {
    title: 'gebaeude-mit-wohnungen-insgesamt',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'gebaeude': {
    title: 'gebaeude',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'gemeindeanteil-an-der-einkommensteuer': {
    title: 'gemeindeanteil-an-der-einkommensteuer',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'gesamtflaeche': {
    title: 'gesamtflaeche',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'gesamtmiete': {
    title: 'gesamtmiete',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'gewaehrleistungswohnung': {
    title: 'gewaehrleistungswohnung',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'gewerbeanmeldungen-insgesamt': {
    title: 'gewerbeanmeldungen-insgesamt',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'grundmiete': {
    title: 'grundmiete',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'handwerksbetriebe-insgesamt': {
    title: 'handwerksbetriebe-insgesamt',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'hauptquelle-des-lebensunterhalts-mehrere-einkommensarten': {
    title: 'hauptquelle-des-lebensunterhalts-mehrere-einkommensarten',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'haushalte-eine-person': {
    title: 'haushalte-eine-person',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'haushalte-insgesamt': {
    title: 'haushalte-insgesamt',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'hilfen-zur-erziehung-gesamt': {
    title: 'hilfen-zur-erziehung-gesamt',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'insolvenzen': {
    title: 'insolvenzen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'integrativ-unterrichtete-schueler-innen-gesamt': {
    title: 'integrativ-unterrichtete-schueler-innen-gesamt',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'ist-aufkommen-grundsteuer-a': {
    title: 'ist-aufkommen-grundsteuer-a',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'iu-internationale-hochschule-erfurt-in-leipzig-studenten': {
    title: 'iu-internationale-hochschule-erfurt-in-leipzig-studenten',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'jugendquote': {
    title: 'jugendquote',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'kinder-insgesamt': {
    title: 'kinder',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'kontaktabbruch-bzw-kontakt-konnte-nicht-hergestellt-werden': {
    title: 'kontaktabbruch-bzw-kontakt-konnte-nicht-hergestellt-werden',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'kontakte-gesamt': {
    title: 'kontakte',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'kraftfahrzeuge-insgesamt': {
    title: 'kraftfahrzeuge',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'lebendgeborene-insgesamt': {
    title: 'lebendgeborene-insgesamt',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'lebendgeborene': {
    title: 'lebendgeborene',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'ledig': {
    title: 'ledig',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'leipziger-staedtische-bibliotheken-bestand-belletristik': {
    title: 'leipziger-staedtische-bibliotheken-bestand-belletristik',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'leistungen': {
    title: 'leistungen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'leistungsbereiche-nach-sgb-viii-11-jugendarbeit': {
    title: 'leistungsbereiche-nach-sgb-viii-11-jugendarbeit',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'maenner': {
    title: 'maenner',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'messen-und-ausstellungen': {
    title: 'messen-und-ausstellungen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'migranten': {
    title: 'migranten',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'mit-neuem-wohnraum-versorgt': {
    title: '-mit-neuem-wohnraum-versorgt',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'mit-wohnraum-versorgte-haushalte-durch-kooperation-mit-weiteren-anbietern': {
    title: 'mit-wohnraum-versorgte-haushalte-durch-kooperation-mit-weiteren-anbietern',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'mitglieder-badminton': {
    title: 'mitglieder-badminton',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'monatliche-grundmiete-haushalte-insgesamt': {
    title: 'monatliche-grundmiete-haushalte',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'neuanmeldungen': {
    title: 'neuanmeldungen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'nord-sued-ausdehnung': {
    title: 'nord-sued-ausdehnung',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'obere-variante': {
    title: 'obere-variante',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'ohne-mindestens-hauptschulabschluss': {
    title: 'ohne-mindestens-hauptschulabschluss',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'persoenliches-einkommen': {
    title: 'persoenliches-einkommen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'persoenliches-nettoeinkommen-personen-insgesamt': {
    title: 'persoenliches-nettoeinkommen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'personal-insgesamt': {
    title: 'personal',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'personen-gesamt': {
    title: 'personen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'plaetze-insgesamt': {
    title: 'plaetze',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'platzanlagen': {
    title: 'platzanlagen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'saldo-ueberschuss-der-lebendgeborenen-bzw-gestorbenen-maenner': {
    title: 'saldo-ueberschuss-der-lebendgeborenen-bzw-gestorbenen-maenner',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'saldo-ueberschuss-der-zu-bzw-fortzuege-auslaender': {
    title: 'saldo-ueberschuss-der-zu-bzw-fortzuege-auslaender',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'schauspiel-leipzig-alle-buehnen-einschliesslich-vermietungen-und-gastspiele-veranstaltungen': {
    title: 'schauspiel-leipzig',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'schulen-einrichtungen': {
    title: 'schulen-einrichtungen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'schulen-insgesamt': {
    title: 'schulen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'sportraeume-und-sporthallen': {
    title: 'sportraeume',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'stadtgeschichtliches-museum-insgesamt': {
    title: 'stadtgeschichtliches-museum',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'straftaten-insgesamt': {
    title: 'straftaten',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'strassen-insgesamt-einschliesslich-autobahn': {
    title: 'strassen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'strassenbahn-linien': {
    title: 'strassenbahn',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'temperatur-lufttemperatur-jahresmittel': {
    title: 'temperatur',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'trinkwasserprobeentnahmen-insgesamt': {
    title: 'trinkwasserprobeentnahmen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'unternehmen-insgesamt': {
    title: 'unternehmen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'veranstaltungen-kursveranstaltungen-sprachen-darunter-englisch': {
    title: 'veranstaltungen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'verarbeitendes-gewerbe': {
    title: 'verarbeitendes-gewerbe',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'verkehrsflaeche': {
    title: 'verkehrsflaeche',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'verkehrsunfaelle-verkehrsunfaelle-insgesamt': {
    title: 'verkehrsunfaelle',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'wahlbeteiligung': {
    title: 'wahlbeteiligung',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'wirtschaftliche-lage': {
    title: 'wirtschaftliche-lage',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'wohneigentum': {
    title: 'wohneigentum',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'wohnflaeche-insgesamt': {
    title: 'wohnflaeche',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'wohnungen': {
    title: 'wohnungen',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'wohnungsnotfaelle-haushalte': {
    title: 'wohnungsnotfaelle-haushalte',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'zuzuege-insgesamt': {
    title: 'Zuzüge',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },
'zuzuege-ueber-die-stadtgrenze': {
    title: 'Zuzüge über die Stadtgrenze',
    scale: chroma.scale('YlGnBu'),
    unit: '',
  },

  
  'durchschnittsalter': {
    title: 'Durchschnittsalter',
    scale: chroma.scale('YlOrBr'),
    unit: '',
  },
  'einrichtungen': {
    title: 'Einrichtungen',
    scale: chroma.scale('OrRd'),
    unit: 'Einrichtungen',
  },
  'einwohner-insgesamt': {
    title: 'Population',
    scale: chroma.scale('BuPu'),
    unit: 'Menschen',
  },
  'einwohnerdichte': {
    title: 'Bevölkerungsdichte',
    scale: chroma.scale('BuPu'),
    unit: 'Menschen',
  },
  'erwerbseinkommen': {
    title: 'Bruttomonatsentgelt',
    scale: chroma.scale('PuBu'),
    unit: '€'
  },
  'familien-insgesamt': {
    title: 'Familien',
    scale: chroma.scale('OrRd'),
    unit: 'Familien',
  },
  'firmen-insgesamt': {
    title: 'Firmen',
    scale: chroma.scale('OrRd'),
    unit: 'Firmen',
  },
  'gebaeude-mit-wohnungen-insgesamt': {
    title: 'Gebäude mit Wohnungen',
    scale: chroma.scale('OrRd'),
    unit: '',
  },
  'gebaeude': {
    title: 'Gebäude',
    scale: chroma.scale('OrRd'),
    unit: '',
  },
  'gesamtmiete': {
    title: 'Gesamtmiete',
    scale: chroma.scale('PuBu'),
    unit: '€'
  },
  'grundmiete': {
    title: 'Grundmiete',
    scale: chroma.scale('PuBu'),
    unit: '€'
  },
  'gesamtflaeche': {
    title: 'Gesamtfläche',
    scale: chroma.scale('Greys'),
    unit: 'km²'
  },
  'handwerksbetriebe-insgesamt': {
    title: 'Handwerksbetriebe',
    scale: chroma.scale('OrRd'),
    unit: '',
  },
  'haushalte-insgesamt': {
    title: 'Haushalte',
    scale: chroma.scale('OrRd'),
    unit: '',
  },
  'haushaltseinkommen': {
    title: 'Einkommen',
    scale: chroma.scale('PuBu'),
    unit: '€'
  },
  'jugendquote': {
    title: 'Alter',
    scale: chroma.scale('YlOrBr'),
    unit: '',
  },
  'kinder-insgesamt': {
    title: 'Kinder',
    scale: chroma.scale('OrRd'),
    unit: '',
  },
  'kraftfahrzeuge-insgesamt': {
    title: 'Kraftfahrzeuge',
    scale: chroma.scale('Purples'),
    unit: 'Fahrzeuge'
  },
  'lebendgeborene': {
    title: 'Lebendgeborene',
    scale: chroma.scale('Purples'),
    unit: ''
  },
  'ledige': {
    title: 'Ledige',
    scale: chroma.scale('Purples'),
    unit: ''
  },
  'maenner': {
    title: 'Männer',
    scale: chroma.scale('Purples'),
    unit: ''
  },
  'migranten': {
    title: 'Zugewanderte',
    scale: chroma.scale('GnBu'),
    unit: 'Zugewanderte',
  },
  'mit-kindern': {
    title: 'Haushalte mit Kindern',
    scale: chroma.scale('Purples'),
    unit: ''
  },
  'plaetze-insgesamt': {
    title: 'Plätze',
    scale: chroma.scale('Purples'),
    unit: ''
  },
  'platzanlagen': {
    title: 'Platzanlagen',
    scale: chroma.scale('Purples'),
    unit: ''
  },
  'schulen-insgesamt': {
    title: 'Schulen',
    scale: chroma.scale('Purples'),
    unit: ''
  },
  'straftaten-insgesamt': {
    title: 'Straftaten',
    scale: chroma.scale('YlOrRd'),
    unit: 'Straftaten',
  },
  'unternehmen-insgesamt': {
    title: 'Unternehmen',
    scale: chroma.scale('Blues'),
    unit: 'Unternehmen',
  },
  'verarbeitendes-gewerbe': {
    title: 'Verarbeitendes gewerbe',
    scale: chroma.scale('Blues'),
    unit: '',
  },
  'verkehrsflaeche': {
    title: 'Verkehrsfläche',
    scale: chroma.scale('YlOrBr'),
    unit: '',
  },
  'wahlbeteiligung': {
    title: 'Wahlbeteiligung',
    scale: chroma.scale('YlOrBr'),
    unit: '',
  },
  'wirtschaflriche-lage': {
    title: 'Wirtschaftliche Lage',
    scale: chroma.scale('YlOrBr'),
    unit: '',
  },
  'wohneigentum': {
    title: 'Wohneigentum',
    scale: chroma.scale('YlOrBr'),
    unit: '',
  },
  'wohnflaeche-insgesamt': {
    title: 'Wohnfläche',
    scale: chroma.scale('YlOrBr'),
    unit: '',
  },
  'wohnungen': {
    title: 'Wohnungen',
    scale: chroma.scale('RdPu')
  },
  'zukunftsaussicht': {
    title: 'Zukunftsaussichten',
    scale: chroma.scale('YlOrBr'),
    unit: '',
  },
  'zuzuege-ueber-die-stadtgrenze': {
    title: 'Zuzüge über die Stadtgrenze',
    scale: chroma.scale('YlOrBr'),
    unit: '',
  },
}

const center = [51.340199, 12.430103];

function Hooks() {
  useMapEvent('click', (e) => {
    console.log(e.latlng)
  })
  return null
}

const Map = () => {

  const [cache, setCache] = useState({})

  const [showOffcanvas, setShowOffcanvas] = useState(true);

  const [loadings, setLoadings] = useState({
    districts: true,
    categories: true,
  });

  const [showMarker, setShowMarker] = useState({
    bike_lanes: false,
    bus_stops: false,
    train_stops: false,
    tram_stops: false,
    swimming_pools: false,
    playgrounds: false,
    daycares: false,
    data_overlay: false,
    markets: false,
  });

  const [selectedLevel1, setSelectedLevel1] = useState(null);
  const [selectedLevel2, setSelectedLevel2] = useState(null);
  const [selectedLevel3, setSelectedLevel3] = useState(null);
  const [selectedLevel4, setSelectedLevel4] = useState(null);
  const [selectedLevel5, setSelectedLevel5] = useState(null);
  const [selectedLevel6, setSelectedLevel6] = useState(null);
  const [selectedDataKey, setSelectedDataKey] = useState(null);
  const [selectedX, setSelectedX] = useState(null);
  const [selectedY, setSelectedY] = useState(null);
  const [showTotal, setShowTotal] = useState(false);

  const toggleDataOverlay = () => {
    setShowMarker({ ...showMarker, data_overlay: !showMarker.data_overlay })
  }

  const selectDataOverlayCategory = (key) => {
    setSelectedDataKey(key)

    if(!cache[key]) {
      setLoadings({ ...loadings, [key]: true })
      fetch(`${process.env.PUBLIC_URL}/data/leipzig-${key}.json`)
        .then(response => response.json())
        .then(response => {
          setLoadings(loadings => ({ ...loadings, [key]: false }))
          setCache(cache => ({ ...cache, [key]: response.data }))
          setShowMarker(showMarker => ({ ...showMarker, [key]: !showMarker[key] }))
        });
    } else {
      setShowMarker({ ...showMarker, [key]: !showMarker[key] })
    }
  }

  const toggleMarkers = (key) => {
    if(!cache[key]) {
      setLoadings({ ...loadings, [key]: true })
      fetch(`${process.env.PUBLIC_URL}/data/leipzig-${key.replace('_', '-')}.json`)
        .then(response => response.json())
        .then(data => {
          setCache({ ...cache, [key]: data })
          setShowMarker({ ...showMarker, [key]: !showMarker[key] })
          setLoadings({ ...loadings, [key]: false })
        });
    } else {
      setShowMarker({ ...showMarker, [key]: !showMarker[key] })
    }
  }

  const levelSetter = [setSelectedLevel1, setSelectedLevel2, 
    setSelectedLevel3, setSelectedLevel4, setSelectedLevel5, setSelectedLevel6];

  const setData = (inputData) => {
    if (inputData && Object.keys(inputData).indexOf('data') >= 0) {
      if (inputData.data && inputData.data.length > 0) {
        selectDataOverlayCategory(inputData.data[0]);
        return true;
      }
    }
    return false; 
  };

  const handleLevelChange = (newData, selectedLevel, index) => {
    if (newData) {
        if (!setData(newData)) {
          levelSetter[index](selectedLevel);
          setSelectedY(selectedLevel);
          const levelData = newData[selectedLevel];
          if (levelData) {
            const nextLevel = Object.keys(levelData)[0];
            if (index < levelSetter.length - 1) {
              handleLevelChange(levelData, nextLevel, index+1);
            }
          } else {
            for (var i=index; i<levelSetter.length; i++) {
              levelSetter[i](null);
            }
          }
        } else {
          for (var i=index; i<levelSetter.length; i++) {
            levelSetter[i](null);
          }
        }
    }
  };

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/leipzig-districts.json`)
    .then(res => res.json())
    .then(data => {
      setCache(cache => ({ ...cache, districts: data }))
      setLoadings(loadings => ({ ...loadings, districts: false }))
    })
    fetch(`${process.env.PUBLIC_URL}/data/categories.json`)
    .then(res => res.json())
    .then(data => {
      setCache(cache => ({ ...cache, categories: data }))
      setLoadings(loadings => ({ ...loadings, categories: false }))
      if (!setData(data)) {
        const level1 = Object.keys(data)[0];
        handleLevelChange(data, level1, 0);
      }
    })
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(cache[selectedDataKey]) {
      let selectedData = cache[selectedDataKey];
      let xKeys = Object.keys(selectedData)
      let yKeys = Object.keys(selectedData[xKeys[0]])
      setSelectedX(xKeys[xKeys.length - 1]);
      setSelectedY(yKeys[0]);
    }
  }, [cache, selectedDataKey])

  let databasis = null;
  let databasisMax = null;
  let databasisMin = null;
  let databasisMaxYears = null;

  if(
    cache[selectedDataKey] &&
    cache[selectedDataKey][selectedX] &&
    cache[selectedDataKey][selectedX][selectedY]
  ) {
    const isPercent = selectedY && (selectedY.indexOf("Anteil") >=0 || selectedY.indexOf("anteil") >=0 || selectedY.indexOf("Quote") >= 0 || selectedY.indexOf("quote") >= 0)
    const aggFun = (values) => showTotal ? ((isPercent && values.length > 0) ? (Math.round(values.reduce((sum, elem) => sum + elem.value, 0) / values.length)) : values.reduce((sum, elem) => sum + elem.value, 0)) : 0
    databasis = cache[selectedDataKey][selectedX][selectedY];
    const selectedYValues = Object.keys(cache[selectedDataKey]).map(key =>
      cache[selectedDataKey][key][selectedY] ?
        (
          showTotal ?
            aggFun(cache[selectedDataKey][key][selectedY])
            : cache[selectedDataKey][key][selectedY].map(d => d.value)
        ) : 0
    ).flat(1)
    databasisMax = Math.max(...selectedYValues)
    databasisMaxYears = []
    Object.keys(cache[selectedDataKey]).forEach(key => {
      if(
        cache[selectedDataKey][key][selectedY] &&
        cache[selectedDataKey][key][selectedY].map(d => d.value).includes(databasisMax)
      ) {
        databasisMaxYears.push(key)
      }
    })

    databasisMin = dataOverlayEntries[selectedDataKey].min || 0;
  }

  useEffect(() => {
    const categories = cache['categories'];
    if (categories) {
      handleLevelChange(categories, selectedLevel1, 0);
    }
  }, [selectedLevel1]);

  useEffect(() => {
    const categories = cache['categories'];
    if (categories) {
      const newData = categories[selectedLevel1];
      if (newData) {
        handleLevelChange(newData, selectedLevel2, 1);
      }
    }
  }, [selectedLevel2]);

  useEffect(() => {
    const categories = cache['categories'];
    if (categories) {
      if (categories[selectedLevel1]) {
        const newData = categories[selectedLevel1][selectedLevel2];
        if (newData) {
          handleLevelChange(newData, selectedLevel3, 2);
        }
      }
    }
  }, [selectedLevel3]);

  useEffect(() => {
    const categories = cache['categories'];
    if (categories) {
      if (categories[selectedLevel1] && categories[selectedLevel1][selectedLevel2]) {
        const newData = categories[selectedLevel1][selectedLevel2][selectedLevel3];
        if (newData) {
          handleLevelChange(newData, selectedLevel4, 3);
        }
      }
    }
  }, [selectedLevel4]);

  useEffect(() => {
    const categories = cache['categories'];
    if (categories) {
      if (categories[selectedLevel1] && categories[selectedLevel1][selectedLevel2]
         && categories[selectedLevel1][selectedLevel2][selectedLevel3]) {
        const newData = categories[selectedLevel1][selectedLevel2][selectedLevel3][selectedLevel4];
        if (newData) {
          handleLevelChange(newData, selectedLevel5, 4);
        }
      }
    }
  }, [selectedLevel5]);

  useEffect(() => {
    const categories = cache['categories'];
    if (categories) {
      if (categories[selectedLevel1] && categories[selectedLevel1][selectedLevel2]
         && categories[selectedLevel1][selectedLevel2][selectedLevel3]
        && categories[selectedLevel1][selectedLevel2][selectedLevel3][selectedLevel4]) {
        const newData = categories[selectedLevel1][selectedLevel2][selectedLevel3][selectedLevel4][selectedLevel5];
        if (newData) {
          handleLevelChange(newData, selectedLevel6, 5);
        }
      }
    }
  }, [selectedLevel6]);

  // const dataOverlayScale = chroma.scale('Spectral');
  const dataOverlayScale = dataOverlayEntries[selectedDataKey] ? dataOverlayEntries[selectedDataKey].scale : null;

  return (
    <>
    <MapContainer
      style={{ height: '100vh' }}
      center={center}
      zoom={12}
      tap={false}
    >
      {!showMarker.bike_lanes && <TileLayer
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        url="https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}@2x.png?key=LtQePu1HTsFQi3NRcYZ5"
      />}
      {showMarker.bike_lanes && <TileLayer
        attribution='<a href="https://www.cyclosm.org" target="_blank">&copy; cyclosm</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
      />}
      <Hooks />
      <Markers showMarker={showMarker} cache={cache} />
      {
        showMarker.data_overlay &&
        !loadings.districts &&
        !loadings.categories &&
        <DataOverlay
          dataOverlayEntries={dataOverlayEntries}
          scale={dataOverlayScale}
          cache={cache}
          selectedLevel1={selectedLevel1}
          selectedLevel2={selectedLevel2}
          selectedLevel3={selectedLevel3}
          selectedLevel4={selectedLevel4}
          selectedDataKey={selectedDataKey}
          showTotal={showTotal}
          selectedX={selectedX}
          selectedY={selectedY}
        />
      }
      {
        showMarker.own_location &&
        <OwnLocationMarker />
      }
    </MapContainer>
      {
        !showOffcanvas &&
        <div style={{
          position: 'absolute',
          zIndex: 999,
          right: 20,
          bottom: 20,
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
        }}>
          <Button
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 60,
              height: 60,
            }}
            size="lg"
            onClick={() => setShowOffcanvas(true)}
          ><FontAwesomeIcon size="lg" icon={faCog} /></Button>
        </div>
      }
      {
        showMarker.data_overlay &&
        <div style={{ position: 'absolute', fontFamily: 'monospace', zIndex: 999, left: 10, bottom: 10, padding: 10, borderRadius: 10, background: 'white', cursor: 'pointer' }} onClick={() => setShowOffcanvas(true)}>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id={`tooltip-colorscale`}>
                Der maximal Wert wurde in {databasisMaxYears && databasisMaxYears.join(', ')} erreicht.
              </Tooltip>
            }
          >
              <div>{selectedY}&nbsp;({selectedX})</div>
          </OverlayTrigger>
              <ColorScale scale={dataOverlayScale} data={databasis} min={databasisMin} max={databasisMax} />
        </div>
      }
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        backdrop={false}
        placement={isMobile ? 'bottom' : 'end'}
        style={{
          height: isMobile ? '40vh' : '100vh',
          border: 0,
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px -10px 20px 0px',
        }}
      >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Einstellungen</Offcanvas.Title>
      </Offcanvas.Header>
        <Offcanvas.Body
          style={{
            padding: 0,
          }}
        >
          {loadings.districts && <div style={{ textAlign: 'center', padding: 10 }}><Spinner animation="border" size="sm" /></div>}
          {!loadings.districts &&
            <>
              <SwitchLine
                loading={loadings.data_overlay}
                checked={showMarker.data_overlay}
                onChange={e => toggleDataOverlay()}
                icon={<FontAwesomeIcon icon={faChartPie} />}
                label="Details zu Ortsteilen anzeigen"
              />
              {
                showMarker.data_overlay &&
                <>
                  <DataOverlayOptions
                    dataEntries={dataOverlayEntries}
                    cache={cache}
                    selectedLevel1={selectedLevel1}
                    selectedLevel2={selectedLevel2}
                    selectedLevel3={selectedLevel3}
                    selectedLevel4={selectedLevel4}
                    selectedLevel5={selectedLevel5}
                    selectedLevel6={selectedLevel6}
                    selectedDataKey={selectedDataKey}
                    showTotal={showTotal}
                    selectedX={selectedX}
                    selectedY={selectedY}
                    setSelectedX={setSelectedX}
                    setSelectedY={setSelectedY}
                    setShowTotal={setShowTotal}
                    selectDataOverlayCategory={selectDataOverlayCategory}
                    setSelectedLevel1={setSelectedLevel1}
                    setSelectedLevel2={setSelectedLevel2}
                    setSelectedLevel3={setSelectedLevel3}
                    setSelectedLevel4={setSelectedLevel4}
                    setSelectedLevel5={setSelectedLevel4}
                    setSelectedLevel6={setSelectedLevel4}
                    loadings={loadings}
                  />
                </>
              }
              <MarkerToggles
                showMarker={showMarker}
                toggleMarkers={toggleMarkers}
                setShowMarker={setShowMarker}
                loadings={loadings}
              />
              <div style={{ height: 1, background: '#eee', marginTop: 10, marginBottom: 10 }} />
            </>
          }

          <OffcanvasFooter />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Map;