const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const HOST = 'localhost';

// MIME types for joke generator
const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
};

// Create HTTP server
const server = http.createServer((req, res) => {
    // Parse URL
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    // Remove trailing slash except for root
    if (pathname !== '/' && pathname.endsWith('/')) {
        pathname = pathname.slice(0, -1);
    }

    // Route mapping for joke generator
    let filePath;
    if (pathname === '/' || pathname === '/joke') {
        filePath = '/joke-index.html';
    } else if (pathname === '/style' || pathname === '/joke.css') {
        filePath = '/joke-styles.css';
    } else if (pathname === '/script' || pathname === '/joke.js') {
        filePath = '/joke-script.js';
    } else {
        filePath = pathname;
    }
    
    // Get full file path
    filePath = path.join(__dirname, filePath);
    
    // Get file extension
    const ext = path.extname(filePath).toLowerCase();
    
    // Prevent directory traversal attacks
    const realPath = path.resolve(filePath);
    const basePath = path.resolve(__dirname);
    
    if (!realPath.startsWith(basePath)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('403 Forbidden - Access Denied', 'utf-8');
        return;
    }

    // Read and serve the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                send404(res);
            } else {
                // Server error
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(`Server Error: ${err.message}`, 'utf-8');
            }
        } else {
            // Success - serve file
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            res.writeHead(200, {
                'Content-Type': contentType,
                'Cache-Control': 'no-cache'
            });
            res.end(content, 'utf-8');
            
            // Log the request
            console.log(`✅ ${req.method} ${pathname} - ${ext || 'directory'}`);
        }
    });
});

// Send 404 response
function send404(res) {
    const notFoundPage = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>404 - Page Not Found</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .container {
                text-align: center;
                background: white;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            }
            h1 {
                font-size: 48px;
                margin: 0;
                color: #333;
            }
            p {
                color: #666;
                font-size: 18px;
                margin: 20px 0;
            }
            a {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                text-decoration: none;
                border-radius: 5px;
                transition: transform 0.3s;
            }
            a:hover {
                transform: translateY(-2px);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>404</h1>
            <p>Page Not Found</p>
            <p>The file you're looking for doesn't exist.</p>
            <a href="/">Go Back Home</a>
        </div>
    </body>
    </html>
    `;
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(notFoundPage, 'utf-8');
}

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use!`);
        console.log(`Try running on a different port or close the application using the port.`);
        process.exit(1);
    } else {
        console.error(`Server error: ${err}`);
    }
});

// Start server
server.listen(PORT, HOST, () => {
    console.log('\n╔═══════════════════════════════════════════╗');
    console.log('║   Random Joke Generator Server 🚀        ║');
    console.log('╚═══════════════════════════════════════════╝\n');
    console.log(`✅ Server is running!`);
    console.log(`😂 Open your browser and visit:`);
    console.log(`   http://${HOST}:${PORT}\n`);
    console.log(`📝 Server Details:`);
    console.log(`   - Host: ${HOST}`);
    console.log(`   - Port: ${PORT}`);
    console.log(`   - API: JokeAPI (jokeapi.dev)`);
    console.log(`   - Features: Get jokes, Save favorites, Local storage\n`);
    console.log(`🛑 To stop the server, press Ctrl+C\n`);
});