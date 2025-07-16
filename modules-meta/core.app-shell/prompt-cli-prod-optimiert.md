# Prompt für Gemini CLI / AI Studio: Produktionsreife Optimierung core.app-shell

Bitte erweitere und optimiere das Electron-Modul `core.app-shell` für Pruki gemäß folgender Vorgaben. Ziel ist maximale Sicherheit, Testbarkeit, Wartbarkeit und Produktionsreife – alle Änderungen müssen dokumentiert und getestet werden. Nach erfolgreicher Umsetzung ist die Datei `test-notes.md` zu aktualisieren.

---

## 1. Preload Script & Sicherheit
- Verwende `contextBridge` im `preload.js`, um ausschließlich gezielt whitelisted APIs (z.B. `api.sendPing()`) an den Renderer zu exposen – niemals das gesamte `ipcRenderer`-Objekt.
- Baue das Preload-Skript so, dass es modular und für weitere Pruki-Module erweiterbar bleibt.

## 2. IPC Architektur
- Definiere alle IPC-Channels und deren Argumente/Return-Types als TypeScript-Interfaces.
- Implementiere umfassende Fehlerbehandlung für alle IPC-Handler.

## 3. Build & Distribution
- Integriere `electron-builder` in die `package.json`-Skripte für die Erzeugung von Distributables (`.exe`, `.dmg`, `.deb`).
- Optimiere das Asset-Handling und implementiere Code-Splitting/Lazy Loading im React-Frontend.

## 4. Testing
- Ergänze Unit-Tests für React-Komponenten und Main-Prozess (z.B. mit Jest oder Vitest).
- Mocke externe Abhängigkeiten in E2E-Tests.
- Konfiguriere Playwright für HTML-Testreporting.

## 5. Logging & Crash-Reporting
- Implementiere zentrales Logging für Main- und Renderer-Prozess (z.B. Sentry).
- Integriere Electron Crash Reporter für automatische Fehlerberichte.

## 6. UX & Fensterverwaltung
- Implementiere Loading/Splash Screens.
- Ermögliche Window-Resizing, Minimieren/Maximieren und speichere Fensterpositionen/-größen.

## 7. Docker & CI/CD
- Optimiere das Produktions-Docker-Image (kleineres Base-Image, nur Prod-Abhängigkeiten).
- Stelle sicher, dass `xvfb-run` korrekt für Electron in Headless-Umgebungen konfiguriert ist.

## 8. Port-Konflikt vermeiden
- Vite-Dev-Server und alle lokalen Entwicklungs-URLs müssen auf Port 5174 laufen (nicht 5173).

---

**Ziel:**
Eine maximal sichere, testbare, wartbare und produktionsreife Electron-App-Shell für Pruki, die alle genannten Verbesserungen implementiert und als Vorlage für weitere Module dient. Alle Änderungen und neuen Features müssen dokumentiert und getestet werden. Nach erfolgreicher Umsetzung ist die Datei `test-notes.md` mit dem neuen Stand und ggf. weiteren Lessons Learned zu aktualisieren.
