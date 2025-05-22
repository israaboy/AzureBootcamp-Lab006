// physics.js
// Add your physics-related JavaScript code here.

export class Physics {
    constructor() {
        this.friction = 0.98;
        this.gravity = 0.5;
        this.bounceFactor = 0.7;
    }

    updateBallPhysics(ball, wheel) {
        // Update ball position
        ball.x += ball.velocity.x;
        ball.y += ball.velocity.y;

        // Apply gravity
        ball.velocity.y += this.gravity;

        // Apply friction
        ball.velocity.x *= this.friction;
        ball.velocity.y *= this.friction;

        // Check collision with wheel
        const dx = ball.x - wheel.x;
        const dy = ball.y - wheel.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > wheel.radius - ball.radius) {
            // Calculate collision angle
            const angle = Math.atan2(dy, dx);
            
            // Position correction
            ball.x = wheel.x + (wheel.radius - ball.radius) * Math.cos(angle);
            ball.y = wheel.y + (wheel.radius - ball.radius) * Math.sin(angle);

            // Velocity reflection
            const normalX = Math.cos(angle);
            const normalY = Math.sin(angle);
            
            const dot = ball.velocity.x * normalX + ball.velocity.y * normalY;
            
            ball.velocity.x = (ball.velocity.x - 2 * dot * normalX) * this.bounceFactor;
            ball.velocity.y = (ball.velocity.y - 2 * dot * normalY) * this.bounceFactor;

            // Add wheel rotation effect
            const wheelSpeedEffect = wheel.rotationSpeed * 0.1;
            ball.velocity.x += -normalY * wheelSpeedEffect;
            ball.velocity.y += normalX * wheelSpeedEffect;
        }
    }

    getRouletteNumber(ball, wheel) {
        if (Math.abs(ball.velocity.x) < 0.1 && Math.abs(ball.velocity.y) < 0.1) {
            const dx = ball.x - wheel.x;
            const dy = ball.y - wheel.y;
            const angle = Math.atan2(dy, dx);
            
            // Convert angle to degrees and normalize
            let deg = (angle * 180 / Math.PI + 360) % 360;
            
            // Calculate roulette number based on angle
            const numberIndex = Math.floor(deg / (360 / wheel.numbers.length));
            return wheel.numbers[numberIndex];
        }
        return null;
    }
}

export const physicsEngine = new Physics();