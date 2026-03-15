# Digitales Wartezimmer

Webbasierte Anwendung zur Organisation des Patientenflusses in einer Arztpraxis.

Das Projekt wurde im Rahmen des Moduls **„Projekt: Software Development“** im Studiengang **Softwareentwicklung an der IU Internationale Hochschule** entwickelt.

Die Anwendung ermöglicht es, Patient:innen digital zu registrieren, automatisch in einer Warteliste zu priorisieren und Untersuchungsräumen zuzuweisen.

---

# Projektziel

In vielen Arztpraxen wird der Patientenfluss noch manuell organisiert, beispielsweise über Papierlisten oder einfache Tabellen. Dies führt häufig zu unklaren Zuständen, ineffizienter Raumkoordination und unnötigen Wartezeiten.

Ziel dieser Anwendung ist die Entwicklung eines **digitalen Dashboards**, das folgende Aufgaben unterstützt:

- digitale Registrierung von Patient:innen
- transparente Wartelistenverwaltung
- Übersicht über Untersuchungsräume
- strukturierte Organisation des Patientenflusses

Die Anwendung verarbeitet **keine medizinischen Daten** und dient ausschließlich der organisatorischen Praxisverwaltung.

---

# Hauptfunktionen

Die Anwendung stellt folgende Kernfunktionalitäten bereit:

### Patientenmanagement
- Registrierung neuer Patient:innen
- automatische Speicherung der Ankunftszeit

### Warteliste
- Anzeige aller wartenden Patient:innen
- automatische Sortierung nach Ankunftszeit (FIFO-Prinzip)

### Raumverwaltung
- drei Untersuchungsräume
- Anzeige des Raumstatus (frei / belegt)

### Patientenfluss
- Zuweisung des nächsten wartenden Patienten zu einem Raum
- Anzeige des aktuell behandelten Patienten
- Beenden einer Behandlung

### Dashboard
- Übersicht über Warteliste
- Status der Untersuchungsräume
- aktuell aktive Behandlungen

---

# Technologie-Stack

Die Anwendung basiert auf einer klassischen **Client-Server-Architektur**.

## Frontend

- React
- Vite
- CSS

Das Frontend stellt eine **Single Page Application (SPA)** dar und kommuniziert über eine REST-API mit dem Backend.

## Backend

- Node.js
- Express

Das Backend implementiert die Geschäftslogik der Anwendung und stellt die REST-Endpunkte bereit.

## Datenbank

- SQLite

Die Daten werden lokal in einer SQLite-Datenbank gespeichert.

## ORM

- Prisma

Prisma wird verwendet, um die Kommunikation zwischen Anwendung und Datenbank zu abstrahieren.

## Tests

- Jest

Jest wird für Unit-Tests der Backendlogik verwendet.

