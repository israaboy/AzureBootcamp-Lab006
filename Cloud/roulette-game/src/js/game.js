import { Wheel } from './wheel.js';
import { Ball } from './ball.js';
import { Physics } from './physics.js';

class Game {
    constructor() {
        this.canvas = document.getElementById('rouletteCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.physics = new Physics();
        
        // Ensure canvas dimensions
        this.canvas.width = 800;
        this.canvas.height = 600;

        // Initialize game objects
        this.wheel = new Wheel(this.ctx);
        this.ball = new Ball(this.ctx);
        
        // Game state
        this.isSpinning = false;
        this.wheelSpeed = 0;
        this.lastTime = 0;
        
        // Bind methods
        this.gameLoop = this.gameLoop.bind(this);
        this.startSpin = this.startSpin.bind(this);
        
        // Add event listener
        document.getElementById('startButton').addEventListener('click', this.startSpin);
        
        // Start the game loop
        requestAnimationFrame(this.gameLoop);
    }

    startSpin() {
        if (!this.isSpinning) {
            this.isSpinning = true;
            this.wheelSpeed = 8;
            this.ball.velocity = { x: 5, y: 0 };
            this.ball.x = this.wheel.x;
            this.ball.y = this.wheel.y - this.wheel.radius + 20;
        }
    }

    update(deltaTime) {
        // Update wheel
        if (this.isSpinning) {
            this.wheelSpeed *= 0.995; // Gradual slowdown
            if (this.wheelSpeed < 0.01) {
                this.wheelSpeed = 0;
                this.isSpinning = false;
            }
        }
        this.wheel.update(this.wheelSpeed);

        // Update ball
        this.ball.update(deltaTime);
        this.physics.updateBallPhysics(this.ball, this.wheel);
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw game objects
        this.wheel.draw();
        this.ball.draw();
    }

    gameLoop(timestamp) {
        const deltaTime = timestamp - this.lastTime;
        this.lastTime = timestamp;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame(this.gameLoop);
    }
}

// Start the game when the window loads
window.addEventListener('load', () => {
    new Game();
});