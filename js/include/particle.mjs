import DrawableCircle from './drawableCircle.mjs';

class Particle extends DrawableCircle {

    speed;
    velocity;
    alpha = 1.0;

    constructor(x, y, radius, color, speed, velocity) {
        super(x, y, radius, color);
        this.speed = speed;
        this.velocity = velocity;
    }

    update() {

        //Update the position
        this.x += this.velocity.x * this.speed;
        this.y += this.velocity.y * this.speed;

        //Decreese alpha overtime
        this.alpha-=0.01;
    }

    draw(canvasContext) {
        //Set the globalAlpha value of the canvas context for the part of the code between canvasContext.save() and anvasContext.restore()
        canvasContext.save();
        canvasContext.globalAlpha = this.alpha;

        super.draw(canvasContext);

        canvasContext.restore();
    }
}

export default Particle;