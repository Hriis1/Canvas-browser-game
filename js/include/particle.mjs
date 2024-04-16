import DrawableCircle from './drawableCircle.mjs';

class Particle extends DrawableCircle {

    speed;
    velocity;

    constructor(x, y, radius, color, speed, velocity) {
        super(x, y, radius, color);
        this.speed = speed;
        this.velocity = velocity;
    }

    update() {

        //Update the position
        this.x += this.velocity.x * this.speed;
        this.y += this.velocity.y * this.speed;
    }
}

export default Particle;