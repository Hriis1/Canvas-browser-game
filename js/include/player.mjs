import Entity from './entity.mjs';

class Player extends Entity {

    constructor(x, y, radius, color) {
        super(x, y, radius, color);
    }

    //Draw the player
    draw(canvasContext) {

        //Sepecify a circle shape at x and y with radius
        canvasContext.beginPath();
        canvasContext.arc(this.x,this.y,this.radius,0,Math.PI*2, false);

        //Draw with rh players color
        canvasContext.fillStyle = this.color;


        //Draw the specified shape
        canvasContext.fill();
    }
}

export default Player;