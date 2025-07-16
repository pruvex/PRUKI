# Gemini CLI Prompt für core.app-shell (Pruki)

**Kontext:**  
Das Modul `core.app-shell` ist die zentrale Electron-App-Shell für das modulare Desktop-Framework Pruki. Es steuert das Hauptfenster, IPC, Renderer-Frontend (React + Vite) und dient als Vorlage für alle weiteren Module. Ziel ist eine maximal sichere, testbare, wartbare und produktionsreife Umsetzung – vollautomatisiert, CI/CD-fähig und dockerisiert.

---

## Anforderungen & Vorgaben

### 1. Main-Prozess (`main/index.ts`)
- Electron-Hauptfenster (800x600, Titel: `Pruki`)
- Im Dev-Modus: Lade Vite-Frontend (`http://localhost:5174`)
- Im Prod-Modus: Lade `dist/index.html`
- Sichere Trennung von Main-/Renderer-Kontext
- Umfassendes Error-Handling und Logging

### 2. IPC-Handler (`main/ipc/index.ts`)
- Beispiel-IPC-Handler (`ping`) mit Konsolenausgabe
- TypeScript-Interfaces für alle Channels (Argumente/Return-Types)
- Erweiterbar für weitere Module
- Export über `registerIpcHandlers(window)`
- Robuste Fehlerbehandlung

### 3. Preload-Skript & Sicherheit
- Nutze `contextBridge`, um nur whitelisted APIs (z.B. `api.sendPing()`) an den Renderer zu exposen – niemals das gesamte `ipcRenderer`-Objekt!
- Preload modular und erweiterbar halten

### 4. Renderer-Frontend (React + Vite + TypeScript)
- Einstiegspunkt: `renderer/main.tsx`
- Beispielkomponente: `<div data-testid="app-ready">Pruki is running</div>`
- TailwindCSS für Basestil
- Alle UI-Komponenten mit stabilen `data-testid`-Attributen
- Code-Splitting/Lazy Loading demonstrieren

### 5. Vite-Konfiguration
- Output: `dist/`
- Dev-Server läuft auf Port 5174 (nicht 5173, Port-Konflikt vermeiden!)
- Automatisch generierte `index.html` mit eingebundenem Bundle

### 6. package.json
- ESM-Modus (`type: module`)
- Scripts:
  - `dev`: startet Vite + Electron parallel (Dev-Modus)
  - `build`: baut das Vite-Frontend
  - `start`: startet Electron im Prod-Modus
- Abhängigkeiten: Electron, React, Vite, TailwindCSS, Playwright (für QA), electron-builder, electron-is-dev, etc.

### 7. Testing und QA
  Alle Playwright-, Unit- und E2E-Tests für dieses Modul sollen zentral im Verzeichnis C:\KI\Pruki\Test-App\Tests abgelegt werden.
  Die Testdateien müssen das jeweilige Modul eindeutig testen und referenzieren.
  Playwright-Testblock (E2E, automatisiert): startet die App, prüft Fensterstart und Sichtbarkeit von data-testid="app-ready", führt IPC-Test (ping) aus, schließt die App sauber, Testabdeckung für alle Kernfunktionen
  Unit-Tests für React-Komponenten und Main-Prozess (Jest oder Vitest)
  Mocking externer Abhängigkeiten in E2E-Tests
  Playwright für HTML-Testreporting konfigurieren
- Playwright-Testblock (E2E, automatisiert)
  - Startet die App mit `npm run dev`
  - Prüft Fensterstart und Sichtbarkeit von `data-testid="app-ready"`
  - Führt IPC-Test (`ping`) aus
  - Schließt die App sauber
  - Testabdeckung für alle Kernfunktionen
- Unit-Tests für React-Komponenten und Main-Prozess (Jest oder Vitest)
- Mocking externer Abhängigkeiten in E2E-Tests
- Playwright für HTML-Testreporting konfigurieren

### 8. Logging & Crash-Reporting
- Zentrales Logging für Main- und Renderer-Prozess (z.B. Sentry oder electron-log)
- Electron Crash Reporter für automatische Fehlerberichte

### 9. UX & Fensterverwaltung
- Loading/Splash Screens implementieren
- Window-Resizing, Minimieren/Maximieren, Fensterposition/-größe speichern

### 10. Build & Distribution
- electron-builder in package.json für `.exe`, `.dmg`, `.deb`-Erzeugung
- Optimiertes Asset-Handling

### 11. Docker & CI/CD
- Multi-Stage Dockerfile (Dev/Prod), möglichst kleines Base-Image (z.B. node:20-alpine)
- Nur Prod-Abhängigkeiten im finalen Image
- `xvfb-run` für Electron in Headless-Umgebungen konfigurieren
- Docker Compose Beispiel bereitstellen
- Playwright-Tests laufen im Container
- Plattformübergreifend (Windows, macOS, Linux)

---

## Wichtige Hinweise

- **Port 5174** für alle lokalen Entwicklungs-URLs und Vite-Server verwenden.
- Alle Renderer-Komponenten müssen über `data-testid` testbar sein.
- Der gesamte Workflow soll agentisch und CI/CD-ready sein – keine Nacharbeiten erforderlich!
- Alle Besonderheiten, Schritte und Verbesserungen im Modul-README dokumentieren.

---

## Nach der Umsetzung

- Schreibe die Datei `test-notes.md` automatisch so, dass sie alle umgesetzten Schritte, Lessons Learned, Verbesserungen und Optimierungsvorschläge enthält.

---

## Ziel

Eine produktionsreife, testgetriebene, dockerisierte Electron-App-Shell für Pruki, die als Vorlage für alle weiteren Module dient und von Gemini CLI automatisch, fehlerfrei und CI/CD-tauglich generiert werden kann.

---

**Alle relevanten Infos aus den vorhandenen .md-Dateien (README, test-notes, prompt) sind in diesen Prompt eingeflossen.**

---

**CLI-Aufgabe:**  
1. Generiere das vollständige Modul `core.app-shell` nach obigen Vorgaben.
2. Integriere das Modul sinnvoll in die bestehende Docker/Compose-Infrastruktur.
3. Aktualisiere nach der Umsetzung automatisch die Datei `test-notes.md` mit einer Übersicht der Schritte und weiteren Optimierungsvorschlägen.

---

**Hinweis:**
Port 5173 ist global durch das Cascade Dashboard belegt. Verwende für Pruki durchgehend Port 5174 für den Vite-Dev-Server und alle lokalen Entwicklungs-URLs. Passe alle Konfigurationen und Tests entsprechend an.

Erstelle ein vollständig produktionsreifes Electron-Modul namens `core.app-shell` als zentrale App-Shell für das modulare Desktop-Framework **Pruki**. Die Umsetzung muss alle Dateien, Skripte, Testblöcke und Docker-Setups generieren, sodass das Modul direkt CI/CD-fähig, testgetrieben und plattformübergreifend einsetzbar ist.

## Anforderungen & Vorgaben

### 1. Main-Prozess (`main/index.ts`)
- Electron-Hauptfenster (800x600, minimales UI, Titel: `Pruki`)
- Im Dev-Modus: Lade Vite-Frontend (`http://localhost:5174`)
- Im Prod-Modus: Lade `dist/index.html`
- Sichere Trennung von Main-/Renderer-Kontext
- Sauberes Error-Handling und Logging

### 2. IPC-Handler (`main/ipc/index.ts`)
- Beispiel-IPC-Handler (`ping`) mit Konsolenausgabe
- Erweiterbar für weitere Module
- Export über `registerIpcHandlers(window)`

### 3. Renderer-Frontend (React + Vite + TypeScript)
- Einstiegspunkt: `renderer/main.tsx`
- Beispielkomponente: `<div data-testid="app-ready">Pruki is running</div>`
- TailwindCSS für Basestil
- Alle UI-Komponenten mit stabilen `data-testid`-Attributen

### 4. Vite-Konfiguration
- Output: `dist/`
- Automatisch generierte `index.html` mit eingebundenem Bundle
- Vite-Dev-Server läuft auf Port 5174 (nicht 5173)

### 5. package.json
- ESM-Modus (`type: module`)
- Scripts:
  - `dev`: startet Vite + Electron parallel (Dev-Modus)
  - `build`: baut das Vite-Frontend
  - `start`: startet Electron im Prod-Modus
- Abhängigkeiten: Electron, React, Vite, TailwindCSS, Playwright (für QA)

### 6. Playwright-Testblock (E2E, automatisiert)
- Startet die App mit `npm run dev`
- Prüft Fensterstart und Sichtbarkeit von `data-testid="app-ready"`
- Führt einen IPC-Test (`ping`) aus
- Schließt die App sauber
- Testabdeckung für alle Kernfunktionen

### 7. Docker-Integration
- Multi-Stage Dockerfile für Dev und Prod
- Installiert alle Abhängigkeiten (Node, Electron, Playwright, Vite)
- Startet App und Tests in Container
- Beispiel für Docker Compose
- Plattformübergreifend (Windows, macOS, Linux)

### 8. CI/CD & QA
- Modul ist vollständig automatisiert testbar
- Playwright-Tests laufen in CI/CD
- Alle Renderer-Komponenten testbar über `data-testid`
- IPC-Integration für weitere Module vorbereitet

### 9. Produktionsreife & Erweiterbarkeit
- Fokus auf Klarheit, Trennung von Concerns, Modularität
- Sauberes Error-Handling, Logging, QA
- Dokumentation und Beispiel für Integration in Pruki

---

**Wichtig:**
- Generiere alle Dateien, Skripte, Konfigurationen und Tests so, dass das Modul direkt lauffähig, testbar und CI/CD-ready ist.
- Die Umsetzung muss Gemini CLI/AI Studio-kompatibel sein und keine Nacharbeiten erfordern.
- Halte dich an Best Practices für Electron, React, TypeScript, Playwright und Docker.
- Dokumentiere jeden Schritt und alle Besonderheiten im README des Moduls.

---

**Ziel:**
Eine produktionsreife, testgetriebene Electron-App-Shell für Pruki, die als Vorlage für alle weiteren Module dient und von Gemini automatisch, fehlerfrei und CI/CD-tauglich generiert werden kann.