import Player from './include/player.mjs';
import Projectile from './include/projectile.mjs';
import Enemy from './include/enemy.mjs';
import Particle from './include/particle.mjs';
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

//Spawn enemies interval
let spawnEnemiesInterval;

//Score text
const scoreText = document.getElementById("scoreText");

//Game over score text
const gameOverScoreText = document.getElementById("gameOverScoreText");

//Game over menu
const gameOverMenu = document.getElementById("gameOverMenu");

//Start game button
const startGameBtn = document.getElementById("startGameBtn");

//Instantiate the player
var player = new Player(canvas.width / 2, canvas.height / 2, 40, 'rgba(235, 25, 250, 1)');

let gameOver = false;

let score = 0;

//Projectiles array
let projectiles = [];

//Enemies array
let enemies = [];

//particles array
let particles = [];

//Functions to start and stop the game
function startGame() {
    //Reset entities arrays
    enemies = [];
    projectiles = [];
    particles = [];

    //Reset score
    score = 0;
    scoreText.innerText = score;

    //Disable the game over menu
    gameOverMenu.classList.add("disabled");

    //Reset the game state
    gameOver = false;
    spawnEnemies();
    update();
}

function stopGame() {

    //Prints
    console.log("Game Over!");
    console.log(`Your score is: ${score}!`);

    //Set the game over score text
    gameOverScoreText.innerText = score;

    //Enable the game over menu
    gameOverMenu.classList.remove("disabled");

    //Stop spawning enemies
    clearInterval(spawnEnemiesInterval);

    //Set the game over flag
    gameOver = true;

}

//Listen for click event
window.addEventListener('click', (event) => {

    if (!gameOver) {
        //Get the x and y velocity of the projectile based on pos clicked
        const angle = Math.atan2(event.clientY - player.y, event.clientX - player.x);
        const projVel = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        };
        const projSpeed = 7;

        //Get the position at the edge of the player at the velocity(direction) of the projectile
        const projX = player.x + player.radius * projVel.x;
        const projY = player.y + player.radius * projVel.y;
        const projSpawnPos = {
            x: projX,
            y: projY,
        };

        //Get the projectile dmg
        const projDmg = 15;

        //Push a projectile to the projectiles array
        projectiles.push(new Projectile(projSpawnPos.x, projSpawnPos.y, 10, 'red', projSpeed, projVel, projDmg));
    }
});

window.addEventListener('keypress', function (event) {
    // Check if the key pressed is the one you're interested in
    if (event.key === ' ') {
        if (gameOver) {
            //If space is pressed and gameOver is true reset the game
            startGame();
        }

    }
});

//Start the game when the start game button is clicked
startGameBtn.addEventListener('click', function () {
    startGame();
})

function spawnEnemies() {
    spawnEnemiesInterval = setInterval(() => {
        //Get the x and y velocity of the enemy based on pos its spawn position
        const enemyPos = Utils.generateRandomEdgePosition(0, 0, canvas.width, canvas.height);
        const angle = Math.atan2(player.y - enemyPos.y, player.x - enemyPos.x);
        const enemyVel = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }


        //Get the size of the enemy between 15 and 60
        const enemySize = (Math.random() * 45) + 15;

        //Get the speed of the enemy
        let enemySpeed = 0;
        if (enemySize < 30) {
            enemySpeed = 4;
        } else if (enemySize >= 30 && enemySize < 45) {
            enemySpeed = 3;
        } else {
            enemySpeed = 2;
        }

        //Get enemy color
        const enemyColors = [
            'rgba(65, 250, 55, 1)',//light green
            'rgba(18, 251, 255, 1)', //light blue
            'rgba(82, 66, 255, 1)', //water blue
            'rgba(255, 8, 119, 1)', //dark pink
            'rgba(255, 116, 3, 1)', //strong orange
        ];

        const enemyColorIdx = Math.floor(Math.random() * 4);

        //Push an enemy to the enemies array
        enemies.push(new Enemy(enemyPos.x, enemyPos.y, enemySize, enemyColors[enemyColorIdx], enemySpeed, enemyVel));
    }, 1000);
}

//Update function to update for every frame
function update() {
    //Update logic goes here

    //Update the projectiles
    projectiles.forEach((projectile, projIdx) => {
        projectile.update();

        //Check if projectiles are outside of the screen
        if (!Utils.checkForCircleRectCollision(projectile, 0, 0, canvas.width, canvas.height)) {
            //Remove the projectile if its outside of screen
            projectiles.splice(projIdx, 1);
        }
    });

    //Update the enemies
    enemies.forEach((enemy, enemyIdx) => {
        enemy.update();

        //Check if an enemy collides with the player
        if (Utils.checkForCircularCollision(player, enemy)) {
            stopGame();
        }

        //Check for collision with all projectiles
        for (let projIdx = 0; projIdx < projectiles.length; projIdx++) {
            const projectile = projectiles[projIdx];

            if (Utils.checkForCircularCollision(projectile, enemy)) {
                //If collision is detected reduce the radius of enemy and if its below a certain amount kill it

                //Spawn particles
                const particlesAmount = 12;
                let particleVelocity = null;
                let particleRadius = null;
                let particleSpeed = null;
                for (let index = 0; index < particlesAmount; index++) {
                    particleVelocity = { x: Math.random() - 0.5, y: Math.random() - 0.5 };
                    particleRadius = (Math.random() * 4) + 1;
                    particleSpeed = (Math.random() * 7) + 3;

                    particles.push(new Particle(projectile.x, projectile.y, particleRadius, enemy.color, particleSpeed, particleVelocity));
                }

                //Remove the projetile
                projectiles.splice(projIdx, 1);

                //Use the gsap lib to make a transition animation between the new and old enemy radius
                gsap.to(enemy, {
                    duration: 0.2,
                    radius: enemy.radius - projectile.damage
                });

                //Reduce and check with health coz it happens instantly
                enemy.health -= projectile.damage;

                //If enemy health is less than 15
                if (enemy.health <= 15) {
                    //Delete the enemy
                    enemies.splice(enemyIdx, 1);

                    //Give score
                    score += enemy.scoreGiven;

                    //Update score text
                    scoreText.innerText = score;
                }
                break;
            }
        }

        //Check if enemies are outside of the screen
        if (!Utils.checkForCircleRectCollision(enemy, 0, 0, canvas.width, canvas.height)) {
            //Remove the enemy if its outside of screen
            enemies.splice(enemyIdx, 1);
        }
    });

    //Update particles
    particles.forEach((particle, particleIdx) => {

        particle.update();

        //Check if particles alpha is 0 or less
        if (particle.alpha <= 0) {
            //Remove the enemy if its outside of screen
            particles.splice(particleIdx, 1);
        }
    });

    //Draw logic goes here

    //Clear the cavnas with the specified color
    canvContext.fillStyle = 'rgba(0,0,0,0.2)';
    canvContext.fillRect(0, 0, canvas.width, canvas.height);

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

    //Draw the particles
    particles.forEach(particle => {
        particle.draw(canvContext);
    });

    // Request the next frame
    if (!gameOver) {
        requestAnimationFrame(update);
    }
}

//Call the functions that happen overtime
spawnEnemies();
update();
