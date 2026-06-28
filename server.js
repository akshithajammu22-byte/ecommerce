const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const HOST = 'localhost';

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Create HTTP server
const server = http.createServer((req, res) => {
    // Default route to index.html
    let filePath = req.url === '/' ? '/index.html' : req.url;
    
    // Remove query parameters
    filePath = filePath.split('?')[0];
    
    // Get full file path
    filePath = path.join(__dirname, filePath);
    
    // Get file extension
    const ext = path.extname(filePath).toLowerCase();
    
    // Prevent directory traversal attacks
    const realPath = path.resolve(filePath);
    const basePath = path.resolve(__dirname);
    
    if (!realPath.startsWith(basePath)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('403 Forbidden');
        return;
    }

    // Read and serve the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found - serve 404
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${err}`, 'utf-8');
            }
        } else {
            // Success - serve file
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Start server
server.listen(PORT, HOST, () => {
    console.log(`✅ Server is running!`);
    console.log(`📍 Open your browser and visit: http://${HOST}:${PORT}`);
    console.log(`🛑 Press Ctrl+C to stop the server`);
});