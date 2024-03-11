let currentInput = '';
let history = [];
let darkMode = false;

function appendNumber(number) {
    currentInput += number;
    document.getElementById('display').value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    document.getElementById('display').value = '';
}

function calculateResult() {
    try {
        let result;
        if (currentInput.includes('^')) {
            calculatePower();
            return;
        } else if (currentInput.includes('sqrt(')) {
            calculateSquareRoot();
            return;
        } else if(currentInput.includes('%')) {
            calculatePercentage();
            return;
        } else {
            result = eval(currentInput);
        }
        document.getElementById('display').value = result;
        history.push(currentInput + '=' + result); // sebagai riwayat perhitungan
        updateHistory(); // pembaruan riwayat
        currentInput = result.toString();
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function calculatePower() {
    try {
        let parts = currentInput.split('^');
        let base = parseFloat(parts[0]);
        let exponent =parseFloat(parts[1]);
        let result = Math.pow(base, exponent);
        if (isNaN(result)) {
            throw new Error('Invalid calculation');
        }
        document.getElementById('display').value = result;
        history.push(currentInput + '=' + result); // sebagai riwayat perhitungan
        updateHistory(); // pembaruan riwayat
        currentInput = result.toString(); // menyimpan hasil sebagai input berikutnya
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function calculateSquareRoot() {
    try {
        let number = parseFloat(currentInput.substring(5)); // Mengambil angka setelah sqrt(
        let result= Math.sqrt(number);
        if (isNaN(result)) {
            throw new Error('Invalid calculation');
        }
        document.getElementById('display').value = result;
        history.push(currentInput + '=' + result); // sebagai riwayat perhitungan
        updateHistory(); // pembaruan riwayat
        currentInput = result.toString(); // menyimpan hasil sebagai input berikutnya
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function calculatePercentage() {
    try {
        let number = parseFloat(currentInput.substring(0, currentInput.length - 1));
        let result = number / 100;
        if (isNaN(result)) {
            throw new Error('Invalid calculation');
        }
        document.getElementById('display').value = result;
        history.push(currentInput + '=' + result); // sebagai riwayat perhitungan
        updateHistory(); // pembaruan riwayat
        currentInput = result.toString(); // menyimpan hasil sebagai input berikutnya
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function deleteLastInput() {
    currentInput = currentInput.slice(0, -1);
    document.getElementById('display').value = currentInput;
}

function updateHistory() {
    document.getElementById('history').innerText = history.join('\n'); // Memperbarui riwayat
}

// Dark Mode
function toggleDarkMode() {
    const body = document.body;
    const calculator = document.querySelector('.calculator');
    const display = document.getElementById('display');
    const keys = document.querySelectorAll('.keys button');

    if (!darkMode) {
        body.classList.add('dark-mode');
        calculator.classList.add('dark-mode-calculator');
        display.classList.add('dark-mode-display');
        keys.forEach(key => {
            key.classList.add('dark-mode-key');
        });
    } else {
        body.classList.remove('dark-mode');
        calculator.classList.remove('dark-mode-calculator');
        display.classList.remove('dark-mode-display');
        keys.forEach(key => {
            key.classList.remove('dark-mode-key');
        });
    }
    darkMode = !darkMode;
}

// Fungsi untuk memainkan efek suara ketika tombol ditekan
function playButtonSound() {
    var audio = document.getElementById("buttonSound");
    audio.play();
}