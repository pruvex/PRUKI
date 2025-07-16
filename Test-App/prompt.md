# Prompt für Gemini CLI: Test-App

**Ziel:**
Erstelle eine vollständige, produktionsreife Beispielanwendung in TypeScript (ESM) mit Playwright-Testblock im Ordner `Test-App`.

**Anforderungen:**
- Lege eine Datei `app.ts` an, die ein einfaches, aber sinnvolles Modul implementiert (z. B. eine kleine Utility oder eine Mini-API)
- Lege eine Datei `app.spec.ts` an, die mit Playwright den Modulcode umfassend testet (Test-First-Prinzip)
- Implementiere eine SelfCheck-Funktion, die prüft, ob das Modul wie erwartet funktioniert und Fehler korrekt behandelt werden
- Schreibe sauberen, dokumentierten TypeScript-Code (ESM, moderne Syntax)
- Stelle sicher, dass alle Imports/Exports ESM-konform sind
- Die Tests müssen mit `npx playwright test` direkt lauffähig sein
- Dokumentiere alle wichtigen Schritte und Besonderheiten in der README.md

**Vorgehen:**
1. Erstelle zuerst den Playwright-Testblock (Test-First)
2. Implementiere dann das eigentliche Modul
3. Baue eine SelfCheck-Funktion ein, die das Modul prüft
4. Dokumentiere die Umsetzung und Besonderheiten in der README.md
5. Stelle sicher, dass alles produktionsreif, robust und verständlich ist

**Output:**
- `app.ts` (Modul)
- `app.spec.ts` (Playwright-Test)
- README.md (Dokumentation)

**Arbeite agentisch und iterativ, bis alle Tests grün sind und die App produktionsreif ist.**
