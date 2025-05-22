const canvas = document.getElementById('rouletteCanvas');
const ctx = canvas.getContext('2d');

let rotationSpeed = 10;
let angle = 0;
let ballY = canvas.height / 2;
let ballSpeed = 0;
let gravity = 0.2;
let bouncing = false;

// NOVO: variáveis para controle de parada
let spinning = false;
let spinTimeout = null;

function drawRouletteWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);

    // Draw the roulette wheel
    for (let i = 0; i < 36; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 200, (i * Math.PI) / 18, ((i + 1) * Math.PI) / 18);
        ctx.fillStyle = (i % 2 === 0) ? '#ff0000' : '#000000';
        ctx.fill();
        ctx.stroke();
    }

    ctx.restore();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, ballY, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.stroke();
}

function update() {
    // NOVO: desaceleração suave
    if (spinning && rotationSpeed > 0) {
        rotationSpeed *= 0.98; // desacelera gradualmente
        if (rotationSpeed < 0.002) {
            rotationSpeed = 0;
            spinning = false;
        }
    }
    angle += rotationSpeed;
    if (bouncing) {
        ballSpeed += gravity;
        ballY += ballSpeed;

        // Ajustar para centralizar o "chão" da bola
        if (ballY >= canvas.height / 2) {
            ballY = canvas.height / 2;
            ballSpeed *= -0.7; // Simulate bounce
            if (Math.abs(ballSpeed) < 1) {
                bouncing = false; // Stop bouncing when speed is low
            }
        }
    }

    drawRouletteWheel();
    drawBall();
    requestAnimationFrame(update);
}

function startGame() {
    rotationSpeed = 0.05; // Set initial rotation speed
    bouncing = true; // Start bouncing the ball
    spinning = true;

    // Limpa timeout anterior se houver
    if (spinTimeout) clearTimeout(spinTimeout);
    // Para a roleta após 3 segundos
    spinTimeout = setTimeout(() => {
        spinning = false;
    }, 3000);

    // Só inicia o update se não estiver rodando
    if (!window._rouletteRunning) {
        window._rouletteRunning = true;
        update();
    }
}

// Remover o auto start
// document.addEventListener('DOMContentLoaded', startGame);

// Adicionar evento ao botão
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('spinButton');
    if (btn) {
        btn.addEventListener('click', startGame);
    }
    // Desenhar roleta inicial
    drawRouletteWheel();
    drawBall();
});