import DrawableCircle from './drawableCircle.mjs';

class Projectile extends DrawableCircle {

    damage;
    speed;
    velocity;

    constructor(x, y, radius, color, speed, velocity, damage) {
        super(x, y, radius, color);
        this.speed = speed;
        this.velocity = velocity;
        this.damage = damage;

    }

    update() {

        //Update the position
        this.x += this.velocity.x * this.speed;
        this.y += this.velocity.y * this.speed;
    }
}

export default Projectile;