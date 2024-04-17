<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Canvas Game</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <div class="fixed text-white text-2xl ml-3 mt-3"><span>Score: </span><span id="scoreText">0</span></div>
    <div class="gameOverMenu" >
        <div class="bg-white max-w-md w-full p-6 text-center">
            <h1 id="gameOverScoreText" class="text-4xl font-bold">0</h1>
            <p class="text-gray-700">Points</p>
            <button id="startGameBtn" class="bg-blue-500 text-white w-full mt-4 py-4 rounded-full">Start game</button>
        </div>
    </div>
    <canvas></canvas>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script type="module" src="js/main.mjs"></script>
</body>

</html>