class Entity {
    x;
    y;
    radius;
    color;

    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    //Draw the player
    draw(canvasContext) {

        throw new Error('Subclasses must implement the draw(canvasContext)');
    }
}

export default Entity;