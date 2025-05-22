const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const marioImage = new Image();
marioImage.src = 'assets/mario.png';

const gravity = 0.5;
const jumpStrength = 10;
let mario = {
    x: 50,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    velocityY: 0,
    isJumping: false
};

let pipes = [];
let score = 0;
let gameOver = false;

function createPipe() {
    const pipeHeight = Math.random() * (canvas.height - 100) + 20;
    pipes.push({
        x: canvas.width,
        y: 0,
        width: 50,
        height: pipeHeight
    });
    pipes.push({
        x: canvas.width,
        y: pipeHeight + 100,
        width: 50,
        height: canvas.height - pipeHeight - 100
    });
}

function drawMario() {
    ctx.drawImage(marioImage, mario.x, mario.y, mario.width, mario.height);
}

function drawPipes() {
    ctx.fillStyle = 'green';
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
    });
}

function updatePipes() {
    pipes.forEach(pipe => {
        pipe.x -= 2;
    });
    if (pipes.length && pipes[0].x < -pipes[0].width) {
        pipes.shift();
        pipes.shift();
        score++;
    }
}

function detectCollision() {
    for (let pipe of pipes) {
        if (mario.x < pipe.x + pipe.width &&
            mario.x + mario.width > pipe.x &&
            mario.y < pipe.y + pipe.height &&
            mario.y + mario.height > pipe.y) {
            gameOver = true;
        }
    }
}

function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2);
        ctx.fillText('Score: ' + score, canvas.width / 2 - 50, canvas.height / 2 + 40);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mario.velocityY += gravity;
    mario.y += mario.velocityY;

    if (mario.y + mario.height >= canvas.height) {
        gameOver = true;
    }

    drawMario();
    drawPipes();
    updatePipes();
    detectCollision();

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !gameOver) {
        mario.velocityY = -jumpStrength;
    }
});

setInterval(createPipe, 1500);

marioImage.onload = () => {
    gameLoop();
};