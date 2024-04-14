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
}

export default Utils;