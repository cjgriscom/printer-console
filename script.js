document.addEventListener('DOMContentLoaded', function () {
    loadPrinters();
});

function addPrinter() {
    let name = prompt("Enter the printer's name:");
    if (!name) return;
    let ip = prompt("Enter the printer's IP address:");
    if (!ip) return;

    let printers = getPrinters();
    printers.push({ name, ip });
    localStorage.setItem('printers', JSON.stringify(printers));
    loadPrinters();
}

function loadPrinters() {
    let printers = getPrinters();
    const listElement = document.getElementById('printerList');
    listElement.innerHTML = '';
    printers.forEach((printer, index) => {
        const printerItem = document.createElement('li');
        printerItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        printerItem.innerHTML = `
            <span onclick="openPrinter('${printer.ip}')" style="cursor: pointer;">${printer.name}</span>
            <button class="btn btn-danger btn-sm" onclick="removePrinter(${index})">X</button>
        `;
        listElement.appendChild(printerItem);
    });
}

function openPrinter(ip) {
    window.open('http://' + ip, '_blank');
}

function removePrinter(index) {
    let printers = getPrinters();
    printers.splice(index, 1);
    localStorage.setItem('printers', JSON.stringify(printers));
    loadPrinters();
}

function getPrinters() {
    let printers = localStorage.getItem('printers');
    return printers ? JSON.parse(printers) : [];
}
