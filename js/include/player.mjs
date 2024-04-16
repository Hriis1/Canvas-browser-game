import DrawableCircle from './drawableCircle.mjs';

class Player extends DrawableCircle {

    constructor(x, y, radius, color) {
        super(x, y, radius, color);
    }
}

export default Player;