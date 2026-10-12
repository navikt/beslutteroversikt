# Frontend for kvalitetssikringsoversikt

Intern applikasjon for å vise oversikt over brukere under kvalitetssikring av § 14 a-vedtak.

Enhetsfilteret støtter valg av flere enheter med utkast til kvalitetssikring. Listen hentes fra
`GET /veilarbvedtaksstotte/api/beslutteroversikt/enheter` og viser både `medTilgang` og `utenTilgang`.
Enhetene i `medTilgang` er valgt som standard ved oppstart. Søk på navn eller
enhetsnummer i feltet, og fjern valgte enheter for å utvide søket igjen. Uten valgte enheter
begrenses ikke søket på enhet.
«Nullstill filtervalg» fjerner både status- og enhetsfilteret. Enhetsfeltet viser «Alle enheter»
når ingen enheter er valgt.

Testversjon av løsningen: [https://navikt.github.io/beslutteroversikt](https://navikt.github.io/beslutteroversikt)

![Skjermutklipp av hvordan Kvalitetssikringsoversikt ser ut i frontend.](readme_illustrasjon_kvalitetssikringsoversikt.png)
