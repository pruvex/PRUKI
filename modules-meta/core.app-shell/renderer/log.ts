// Logging für Renderer-Prozess mit electron-log
import log from 'electron-log';

log.transports.file.level = 'info';
log.transports.file.format = '{h}:{i}:{s}.{ms} {level} {text}';

export default log;
