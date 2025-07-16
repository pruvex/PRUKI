# Prompt für Gemini CLI: Agentische Optimierung und Finalisierung core.app-shell

**Ziel:**
Alle noch offenen Punkte aus dem bisherigen Entwicklungsstand des Moduls `core.app-shell` agentisch, produktionsreif und CI/CD-tauglich umsetzen. Nach Abschluss sollen alle Schritte und Verbesserungen automatisch in `test-notes.md` dokumentiert werden.

---

## Offene Aufgaben (aus test-notes.md & prompt.md):

1. **Logging & Crash-Reporting**
   - Implementiere zentrales Logging (z.B. electron-log oder Sentry) für Main- und Renderer-Prozess.
   - Integriere Electron Crash Reporter für automatische Fehlerberichte.

2. **Unit-Tests**
   - Ergänze Unit-Tests für React-Komponenten (z.B. mit Jest oder Vitest) und für die Main-Prozess-Logik.
   - Lege alle Tests zentral in `C:\KI\Pruki\Test-App\Tests` ab und referenziere das jeweilige Modul eindeutig.

3. **CI/CD Pipeline**
   - Erstelle oder optimiere eine vollständige CI/CD-Pipeline, die automatisiert Build, Test (inkl. Playwright und Unit-Tests) und Deployment für das Electron-Modul durchführt.
   - Automatisiere das Update von `test-notes.md` als Teil der Pipeline oder per Skript.

4. **Docker-Optimierung**
   - Optimiere das Multi-Stage Dockerfile für minimale Image-Größe (z.B. node:20-alpine, nur Prod-Abhängigkeiten).
   - Stelle sicher, dass Playwright-Tests im Container laufen und alle Abhängigkeiten vorhanden sind.
   - Ergänze ein Beispiel für Docker Compose, das das Modul und die Tests integriert.

5. **Build & Distribution**
   - Verfeinere die electron-builder-Konfiguration für cross-platform Builds (.exe, .dmg, .deb) und verbessere das Asset-Handling.

6. **UX/UI-Verbesserungen**
   - Implementiere einen Splashscreen und persistente Fensterposition/-größe im Main-Prozess.
   - Optimiere die TailwindCSS-Konfiguration für Production Builds (PurgeCSS).

7. **Security**
   - Härte die Content Security Policy (CSP) und prüfe weitere Sicherheitsmaßnahmen für die Electron-App.

8. **IPC Type Safety**
   - Implementiere robustes Type-Checking für alle IPC-Kommunikationen.

9. **Test Coverage**
   - Erweitere die Testabdeckung gemäß den Anforderungen im Hauptprompt und dokumentiere alle Testfälle.

---

## Wichtige Hinweise
- Alle neuen und optimierten Testdateien müssen zentral in `C:\KI\Pruki\Test-App\Tests` abgelegt werden.
- Die Datei `test-notes.md` muss nach der Umsetzung automatisch mit allen Schritten, Lessons Learned und weiteren Optimierungsvorschlägen aktualisiert werden.
- Alle Änderungen müssen CI/CD-ready, produktionsreif und agentisch nachvollziehbar sein.

---

## CLI-Aufgabe
1. Setze alle oben genannten offenen Aufgaben agentisch und produktionsreif um.
2. Lege alle neuen/optimierten Tests zentral in `C:\KI\Pruki\Test-App\Tests` ab.
3. Aktualisiere nach Abschluss automatisch die Datei `test-notes.md` mit allen umgesetzten Schritten, Lessons Learned und weiteren Verbesserungsvorschlägen.

---

**Mit diesem Prompt kann Gemini CLI alle noch fehlenden Optimierungen und Finalisierungsschritte für das Modul core.app-shell automatisiert und nachvollziehbar durchführen.**
