const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const initializeDatabase = require('./lib/initDb');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  try {
    // Initialize database before starting the server
    await initializeDatabase();
    console.log('Database initialized successfully');

    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1); // Exit if database initialization fails
  }
}); 