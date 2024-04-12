//Select the canvas
const canvas = document.querySelector("canvas");

//Set its width and height to the full width and height of the page
canvas.width = innerWidth;
canvas.height = innerHeight;

//The canvus context
const canvContext = canvas.getContext('2d');

//Instantiate the player
const player = new Player(100,100, 30, 'blue');

