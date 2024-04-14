class Utils {
    static generateRandomEdgePosition(rectX, rectY, rectW, rectH) {

        //Chose a edge to gen position of
        //1 - top, 2 - bot, 3 - left, 4 - right
        const randomEdge = Math.floor(Math.random() * 4) + 1;

        let x, y;

        switch (randomEdge) {
            case 1:
                //top edge
                x = (Math.random() * rectW) + rectX;
                y = rectY;
                break;
            case 2:
                //bottom edge
                x = (Math.random() * rectW) + rectX;
                y = rectY + rectH;
                break;
            case 3:
                //left edge
                x = rectX;
                y = (Math.random() * rectW) + rectY;
                break;
            case 4:
                //righr edge
                x = rectX + rectW;
                y = y = (Math.random() * rectW) + rectY;
                break;
        }

        return { x, y };
    }

    static checkForCircularCollision(circle1, circle2) {

        //Find out the distance between the centers of the circles
        const dist = Math.hypot(circle1.x - circle2.x, circle1.y - circle2.y);

        //If the distance is less than the sum of radiuses then they are colliding
        return dist < circle1.radius + circle2.radius;
    }
}

export default Utils;