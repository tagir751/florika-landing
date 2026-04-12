const path = require('path');
const fs = require('fs');

// Логирование в файл для отладки
const log = (m) => {
  try {
    fs.appendFileSync(
      path.join(__dirname, 'debug.log'),
      `[${new Date().toISOString()}] ${m}\n`
    );
  } catch (e) {}
};

try {
  log('=== APP START ===');
  
  // Критичные переменные окружения
  process.env.NODE_ENV = 'production';
  process.env.HOSTNAME = process.env.HOSTNAME || '127.0.0.1';
  process.env.PORT = process.env.PORT || '3000';
  
  log(`ENV: PORT=${process.env.PORT}, HOSTNAME=${process.env.HOSTNAME}`);
  
  // Абсолютный путь к серверу
  const serverPath = path.resolve(__dirname, '.next/standalone/server.js');
  log(`Server path: ${serverPath}`);
  
  if (!fs.existsSync(serverPath)) {
    log('ERROR: server.js NOT FOUND at ' + serverPath);
    process.exit(1);
  }
  
  log('Requiring server...');
  require(serverPath);
  log('Server loaded successfully');
  
} catch (e) {
  log('CRASH: ' + e.message + '\n' + e.stack);
  process.exit(1);
}

// Обработка ошибок
process.on('uncaughtException', (e) => {
  log('UNCAUGHT EXCEPTION: ' + e.message);
  process.exit(1);
});

process.on('unhandledRejection', (e) => {
  log('UNHANDLED REJECTION: ' + (e.message || e));
  process.exit(1);
});
