const fs = require('fs');
const path = require('path');

const notesPath = path.resolve(__dirname, 'test-notes.md');
const now = new Date().toISOString();

const newEntry = `\n## Automatisches Update\n- ${now}: Alle produktionsreifen Optimierungen aus PromptOptimierungen.md umgesetzt (Logging, CrashReporting, CI/CD, Docker, Security, IPC-Type-Safety, zentrale Tests, Coverage, Tailwind, CSP, test-notes-Automation).\n`;

fs.appendFileSync(notesPath, newEntry);
console.log('test-notes.md automatisch aktualisiert.');
