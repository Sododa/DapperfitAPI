import http from 'http';
import app from './app/app.js';

// creating the server
// declaring the server
const PORT = process.env.PORT || 7000;
const server = http.createServer(app);
server.listen(PORT, console.log(`server is running on port ${PORT}`));