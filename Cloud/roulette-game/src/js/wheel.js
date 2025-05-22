
export class Wheel {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 400;
        this.y = 300;
        this.radius = 200;
        this.rotation = 0;
        this.rotationSpeed = 0;
        this.numbers = Array.from({length: 37}, (_, i) => i); // 0-36
        this.colors = ['green', ...Array(36).fill().map(() => Math.random() < 0.5 ? 'red' : 'black')];
    }

    update(speed) {
        this.rotationSpeed = speed;
        this.rotation += speed;
        if (this.rotation >= 360) {
            this.rotation = this.rotation % 360;
        }
    }

    draw() {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);

        // Draw outer circle
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 5;
        ctx.stroke();

        // Draw segments
        for (let i = 0; i < this.numbers.length; i++) {
            const angle = (i * 360 / this.numbers.length) * Math.PI / 180;
            const nextAngle = ((i + 1) * 360 / this.numbers.length) * Math.PI / 180;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, this.radius, angle, nextAngle);
            ctx.closePath();
            ctx.fillStyle = this.colors[i];
            ctx.fill();
            ctx.stroke();

            // Draw numbers
            ctx.save();
            ctx.rotate(angle + (nextAngle - angle) / 2);
            ctx.fillStyle = 'white';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.numbers[i].toString(), this.radius * 0.8, 0);
            ctx.restore();
        }

        ctx.restore();
    }
}
