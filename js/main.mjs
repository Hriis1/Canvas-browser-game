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
canvas.width = innerWidth - 5;
canvas.height = innerHeight - 5;

//The canvus context
var canvContext = canvas.getContext('2d');
if (canvContext == null) {
    throw new Error("Canvas context is null!");
}

//Instantiate the player
var player = new Player(canvas.width / 2, canvas.height / 2, 40, 'blue');

let gameOver = false;

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
    const projSpeed = 7;

    //Push a projectile to the projectiles array
    projectiles.push(new Projectile(player.x, player.y, 10, 'red', projSpeed, projVel));
});

window.addEventListener('keypress', function (event) {
    // Check if the key pressed is the one you're interested in
    if (event.key === ' ') {
        if(gameOver) {
            //If space is pressed and gameOver is true reset the game
            enemies = [];
            projectiles = [];
            gameOver = false;
            update();
        }
        
    }
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

        //Get the size of the enemy between 15 and 30
        const enemySize = Math.random() * 15 + 15;

        //Push an enemy to the enemies array
        enemies.push(new Enemy(enemyPos.x, enemyPos.y, enemySize, 'green', enemySpeed, enemyVel));
    }, 1000);
}

//Update function to update for every frame
function update() {
    //Update logic goes here

    //Update the projectiles
    projectiles.forEach((projectile, projIdx) => {
        projectile.update();

        //Check if projectiles are outside of the screen
        if(!Utils.checkForCircleRectCollision(projectile, 0, 0, canvas.width, canvas.height))
        {
            //Remove the projectile if its outside of screen
            projectiles.splice(projIdx, 1);
        }
    });

    //Update the enemies
    enemies.forEach((enemy, enemyIdx) => {
        enemy.update();

        //Check if an enemy collides with the player
        if (Utils.checkForCircularCollision(player, enemy)) {
            console.log("Game Over!");
            gameOver = true;
        }

        //Check for collision with all projectiles
        for (let projIdx = 0; projIdx < projectiles.length; projIdx++) {
            const projectile = projectiles[projIdx];

            if (Utils.checkForCircularCollision(projectile, enemy)) {
                //If collision is detected remove both the projectile and the enemy
                enemies.splice(enemyIdx, 1);
                projectiles.splice(projIdx, 1);
                break;
            }
        }

        //Check if enemies are outside of the screen
        if(!Utils.checkForCircleRectCollision(enemy, 0, 0, canvas.width, canvas.height))
        {
            //Remove the enemy if its outside of screen
            enemies.splice(enemyIdx, 1);
        }
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
    if (!gameOver) {
        requestAnimationFrame(update);
    }
}

//Call the functions that happen overtime
spawnEnemies();
update();
