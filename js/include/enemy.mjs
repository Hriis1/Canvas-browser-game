import DrawableCircle from './drawableCircle.mjs';

class Enemy extends DrawableCircle {

    speed;
    velocity;
    health;
    scoreGiven;

    constructor(x, y, radius, color, speed, velocity) {
        super(x, y, radius, color);
        this.speed = speed;
        this.velocity = velocity;
        this.health = radius;
        this.scoreGiven = Math.floor(radius);

    }

    update() {

        //Update the position
        this.x += this.velocity.x * this.speed;
        this.y += this.velocity.y * this.speed;
    }
}

export default Enemy;