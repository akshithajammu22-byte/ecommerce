const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8000;
const HOST = 'localhost';

// MIME types
const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
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

    // Default route to index.html
    let filePath = pathname === '/' ? '/index.html' : pathname;
    
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
                // Try index.html if directory requested
                if (fs.existsSync(path.join(filePath, 'index.html'))) {
                    fs.readFile(path.join(filePath, 'index.html'), (err2, content2) => {
                        if (!err2) {
                            res.writeHead(200, { 'Content-Type': mimeTypes['.html'] });
                            res.end(content2, 'utf-8');
                            return;
                        }
                        send404(res);
                    });
                    return;
                }
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
            console.log(`✅ ${req.method} ${req.url} - ${ext || 'directory'}`);
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
                background: #007bff;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                transition: background 0.3s;
            }
            a:hover {
                background: #0056b3;
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
    console.log('║        ShopHub Server Started! 🚀         ║');
    console.log('╚═══════════════════════════════════════════╝\n');
    console.log(`✅ Server is running!`);
    console.log(`📍 Open your browser and visit:`);
    console.log(`   http://${HOST}:${PORT}\n`);
    console.log(`📝 Server Details:`);
    console.log(`   - Host: ${HOST}`);
    console.log(`   - Port: ${PORT}`);
    console.log(`   - Environment: Development\n`);
    console.log(`🛑 To stop the server, press Ctrl+C\n`);
});