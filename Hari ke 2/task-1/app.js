const fs = require('fs');

// Nama file yang akan dibaca
const filePath = './latihan-baca-file.txt';

// Membaca file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Gagal membaca file:', err);
        return;
    }
    console.log('Isi file:', data);
});