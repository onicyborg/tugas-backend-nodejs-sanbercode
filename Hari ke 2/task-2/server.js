const http = require('http');

// Membuat server
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
});

// Menentukan port dan menjalankan server
const port = 3000;
server.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}/`);
});
