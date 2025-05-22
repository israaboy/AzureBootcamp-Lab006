export class Ball {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 400;
        this.y = 50;
        this.radius = 10;
        this.velocity = { x: 0, y: 0 };
        this.gravity = 0.5;
        this.bounceFactor = 0.7;
    }

    update(deltaTime) {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.y += this.gravity;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        this.ctx.strokeStyle = '#333';
        this.ctx.stroke();
    }

    bounce(surface) {
        this.velocity.y = -this.velocity.y * this.bounceFactor;
    }
}