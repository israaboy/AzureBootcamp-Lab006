const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let mario;
let gravity = 0.5;
let isJumping = false;
let jumpStrength = 10;
let score = 0;
let gameStarted = false;
let obstacles = [];
let gameInterval;

function init() {
    mario = {
        x: 50,
        y: canvas.height / 2,
        width: 40,
        height: 40,
        color: 'red',
        velocityY: 0
    };
    obstacles = [];
    score = 0;
    gameInterval = setInterval(updateGame, 1000 / 60);
}

function handleKeyDown(event) {
    if (event.code === 'Space') {
        if (!gameStarted) {
            gameStarted = true;
            init();
        } else {
            isJumping = true;
            mario.velocityY = -jumpStrength;
        }
    }
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateMario();
    updateObstacles();
    checkCollisions();
    drawMario();
    drawObstacles();
    updateScore();
}

function updateMario() {
    if (isJumping) {
        mario.velocityY += gravity;
        mario.y += mario.velocityY;
        if (mario.y >= canvas.height - mario.height) {
            mario.y = canvas.height - mario.height;
            isJumping = false;
        }
    }
}

// Alterado: gerar conjunto de obstáculos somente se o último conjunto estiver longe o bastante
function updateObstacles() {
    const PIPE_GAP = 120;
    const PIPE_WIDTH = 20;
    const MIN_HORIZONTAL_GAP = 150;
    // Verifica se deve spawnar um novo conjunto
    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < canvas.width - MIN_HORIZONTAL_GAP) {
        // Gera gap com margens mínimas
        let gapStart = Math.random() * (canvas.height - PIPE_GAP - 40) + 20;
        // Cano superior
        obstacles.push({
            x: canvas.width,
            y: 0,
            width: PIPE_WIDTH,
            height: gapStart
        });
        // Cano inferior
        obstacles.push({
            x: canvas.width,
            y: gapStart + PIPE_GAP,
            width: PIPE_WIDTH,
            height: canvas.height - (gapStart + PIPE_GAP)
        });
    }
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= 5;
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
            score++;
        }
    }
}

// Modificado: desenhar retângulos usando coordenadas diretas
function drawObstacles() {
    ctx.fillStyle = 'green';
    for (let obstacle of obstacles) {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

// Modificado: usar verificação de interseção simples para colisões
function checkCollisions() {
    for (let obstacle of obstacles) {
        if (mario.x < obstacle.x + obstacle.width &&
            mario.x + mario.width > obstacle.x &&
            mario.y < obstacle.y + obstacle.height &&
            mario.y + mario.height > obstacle.y) {
            endGame();
        }
    }
}

function drawMario() {
    ctx.fillStyle = mario.color;
    ctx.fillRect(mario.x, mario.y, mario.width, mario.height);
}

function updateScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

function endGame() {
    clearInterval(gameInterval);
    alert('Game Over! Your score: ' + score);
}

document.addEventListener('keydown', handleKeyDown);