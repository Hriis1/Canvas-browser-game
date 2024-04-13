import Player from './include/player.mjs';
import Projectile from './include/projectile.mjs';

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
var player = new Player(canvas.width / 2, canvas.height / 2, 30, 'blue');

//Projectiles array
let projectiles = [];

//Listen for click event
window.addEventListener('click', (event) => {

    //Get the x and y velocity of the projectile based on pos clicked
    const angle = Math.atan2(event.clientY - player.y, event.clientX - player.x);
    const projVel = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }

    //Push a projectile to the projectiles array
    projectiles.push(new Projectile(player.x, player.y, 5, 'red', projVel));
});

//Update function to update for every frame
function update() {
    //Update logic goes here

    //Update the projectiles
    projectiles.forEach(projectile => {
        projectile.update();
        projectile.draw(canvContext);
    });

    //Draw logic goes here

    //Clear the cavnas
    canvContext.clearRect(0,0, canvas.width, canvas.height);

    //Draw the player
    player.draw(canvContext);

    //Draw the projectiles
    projectiles.forEach(projectile => {
        projectile.draw(canvContext);
    });

    // Request the next frame
    requestAnimationFrame(update);
}
update();
