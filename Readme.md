Pruki: Modernes, KI-gestütztes, modulares App-Framework
Projektüberblick
Dieses Projekt ist ein modular aufgebautes, KI-gestütztes App-Framework.
Jedes Modul ist in einem eigenen Ordner unter modules-meta abgelegt und enthält:

Das eigentliche Modul (ESM, TypeScript/JavaScript)
Einen zugehörigen, optimal abgestimmten Testblock (Playwright)
Eine README mit KI-Workflow-Anweisungen
Technologien:

Node.js (ESM, "type": "module")
TypeScript
Docker (für reproduzierbare Dev- und Testumgebungen, zentraler Multi-Modul-Workflow)
Playwright (End-to-End-Testing)
KI-gestützter Entwicklungsworkflow (ChatGPT, Gemini CLI, Google AI Studio, Cascade)
Initiales Setup
1. Voraussetzungen
Windows 11 Pro (Hyper-V aktiviert)
Node.js (empfohlen: LTS)
Docker Desktop (WSL2 oder Hyper-V Backend)
Git
Playwright
Gemini CLI
Cascade
2. Projektstruktur
plaintext
C:\Pruki\
│
├─ modules-meta\
│   └─ <modul-name>\
│        ├─ README.md
│        ├─ <modul>.ts / .js
│        └─ <modul>.spec.ts (Playwright-Testblock)
│
├─ docker\
│   └─ Dockerfile
│   └─ docker-compose.yml
│
├─ package.json  (mit "type": "module")
├─ tsconfig.json
├─ playwright.config.ts
└─ ...
Modul-Workflow (Best Practice)
Modulplanung:
Lege mit ChatGPT die Modulidee und Anforderungen fest.
Erstelle im Modulordner eine README.md mit allen Details.
KI-Prompt-Optimierung:
ChatGPT erstellt ein Prompt für Google AI Studio.
Cascade überarbeitet das Prompt.
Prompt wird an Google AI Studio gegeben.
Arbeitsanweisung & Response:
Die komplette Arbeitsanweisung kommt in die response.md.
Cascade optimiert diese Response nochmals.
Umsetzung mit Gemini CLI:
Die Response inkl. aller Infos und Umsetzungshinweise wird an Gemini CLI übergeben.
Gemini CLI baut und debuggt das Modul und den Testblock, bis alles reibungslos funktioniert.
Test-First:
Für jedes Modul wird zuerst ein Playwright-Testblock gebaut.
Modul und Testblock sind optimal aufeinander abgestimmt.
Modularer Aufbau:
Jeder Modulordner enthält:
README.md (mit KI-Workflow, Anforderungen, Prompt, Response)
Das eigentliche Modul
Den zugehörigen Playwright-Test
Docker-Integration
Entwicklung und Tests laufen standardmäßig in Docker-Containern.
Nutze docker compose up für reproduzierbare Dev- und Testumgebungen.
Beispiel docker-compose.yml und Dockerfile sind im docker-Verzeichnis.

### Zentrale Docker- und Compose-Strategie für alle Module
- Es gibt **ein gemeinsames Dockerfile** und **ein zentrales docker-compose.yml** für das ganze Projekt.
- Jedes Modul kann als eigener Service im Compose-File eingetragen werden (siehe Kommentar im Compose-File).
- Beispiel für einen neuen Service (z. B. core.app-shell):

  ```yaml
  core-app-shell:
    build:
      context: ..
      dockerfile: docker/Dockerfile
    working_dir: /app/modules-meta/core.app-shell
    volumes:
      - ../modules-meta/core.app-shell:/app/modules-meta/core.app-shell:delegated
    command: ["npx", "playwright", "test"]
    environment:
      - CI=true
  ```
- Mit `docker compose up --build` werden alle Module/Services getestet.
- Keine Einzeldockerfiles pro Modul nötig – alles läuft über die zentrale Infrastruktur.

ESM-Konfiguration
In der package.json steht:
json
{
  "type": "module",
  ...
}
Alle Imports/Exports nutzen die moderne ES6-Syntax.
Test-Driven Development mit Playwright
Jeder Modulordner enthält einen Playwright-Testblock (*.spec.ts).
Tests werden mit npx playwright test ausgeführt.
Tests und Modulcode sind immer synchron entwickelt.
Zusammenarbeit mit Cascade
Cascade ist der zentrale KI-Dev-Assistant und kennt diesen Workflow.
Cascade hilft beim:
Optimieren von Prompts und Arbeitsanweisungen
Generieren von Modulcode und Tests
Docker-Integration und Troubleshooting
Automatisierten Tests und Debugging
Beispiel für einen neuen Modul-Ordner
plaintext
modules-meta/core.app-shell/
├─ README.md      ← KI-Workflow, Anforderungen, Prompts, Response
├─ app-shell.ts   ← Modul (ESM)
└─ app-shell.spec.ts ← Playwright-Testblock
Empfohlener Arbeitsablauf
Modulidee mit ChatGPT planen, README anlegen
Prompt für AI Studio generieren und optimieren
Response in README/response.md dokumentieren, von Cascade prüfen lassen
Gemini CLI baut und debuggt Modul + Testblock
Modul und Testblock in Docker-Umgebung testen
Nächstes Modul nach gleichem Muster