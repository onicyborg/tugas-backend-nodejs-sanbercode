function tambah(a, b) {
    return a + b;
}

function kurang(a, b) {
    return a - b;
}

function kali(a, b) {
    return a * b;
}

function bagi(a, b) {
    if (b !== 0) {
        return a / b;
    } else {
        throw new Error('Pembagian dengan nol tidak diperbolehkan');
    }
}

module.exports = {
    tambah,
    kurang,
    kali,
    bagi
};
