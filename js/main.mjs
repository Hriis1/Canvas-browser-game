import Player from './include/player.mjs';
import Projectile from './include/projectile.mjs';
import Enemy from './include/enemy.mjs';
import Utils from './include/utils.mjs';

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

//Enemies array
let enemies = [];

//Listen for click event
window.addEventListener('click', (event) => {

    //Get the x and y velocity of the projectile based on pos clicked
    const angle = Math.atan2(event.clientY - player.y, event.clientX - player.x);
    const projVel = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    const projSpeed = 3;

    //Push a projectile to the projectiles array
    projectiles.push(new Projectile(player.x, player.y, 5, 'red', projSpeed, projVel));
});

function spawnEnemies() {
    setInterval(() => {
        //Get the x and y velocity of the enemy based on pos its spawn position
        const enemyPos = Utils.generateRandomEdgePosition(0, 0, canvas.width, canvas.height);
        const angle = Math.atan2(player.y - enemyPos.y, player.x - enemyPos.x);
        const enemyVel = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        //Get the speed of the enemy
        const enemySpeed = 3;

        //Get the size of the enemy between 5 and 20
        const enemySize = Math.random() * 15 + 5;

        //Push an enemy to the enemies array
        enemies.push(new Enemy(enemyPos.x, enemyPos.y, enemySize, 'green', enemySpeed, enemyVel));
    }, 1000);
}

//Update function to update for every frame
function update() {
    //Update logic goes here

    //Update the projectiles
    projectiles.forEach(projectile => {
        projectile.update();
    });

    //Update the enemies
    enemies.forEach(enemy => {
        enemy.update();
    });

    //Draw logic goes here

    //Clear the cavnas
    canvContext.clearRect(0, 0, canvas.width, canvas.height);

    //Draw the player
    player.draw(canvContext);

    //Draw the projectiles
    projectiles.forEach(projectile => {
        projectile.draw(canvContext);
    });

    //Draw the enemies
    enemies.forEach(enemy => {
        enemy.draw(canvContext);
    });

    // Request the next frame
    requestAnimationFrame(update);
}

//Call the functions that happen overtime
spawnEnemies();
update();
