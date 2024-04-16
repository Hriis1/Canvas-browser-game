import DrawableCircle from './drawableCircle.mjs';

class Enemy extends DrawableCircle {

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

    //Draw the player
    draw(canvasContext) {

        //Sepecify a circle shape at x and y with radius
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        //Draw with rh players color
        canvasContext.fillStyle = this.color;


        //Draw the specified shape
        canvasContext.fill();
    }
}

export default Enemy;