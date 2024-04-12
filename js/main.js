import { Player } from './include/player.js';

//Select the canvas
var canvas = document.querySelector("canvas");
if (canvas == null) {
    throw new Error("Something went wrong with creating the canvas!");
}

//Set its width and height to the full width and height of the page
canvas.width = innerWidth;
canvas.height = innerHeight;

//The canvus context
var canvContext = canvas.getContext('2d');
if (canvContext == null) {
    throw new Error("Canvas context is null!");
}

//Instantiate the player
var player = new Player(100, 100, 30, 'blue');
player.draw(canvContext);
