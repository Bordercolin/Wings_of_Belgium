window.addEventListener('load', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const gameOverMenu = document.getElementById('gameOverMenu');
    const gameOverMessage = document.getElementById('gameOverMessage');
    const restartButton = document.getElementById('restartButton');
    const homeButton = document.getElementById('homeButton');

    canvas.width = 430;
    canvas.height = window.innerHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const diamondSize = 50;
    const cubeSize = 20;
    const minDistance = 100; // Minimum distance from the center diamond
    const maxCubes = 10;
    const normalSpeed = 2; // Speed of normal cube movement
    const redSpeed = 4; // Speed of red cube movement
    const minRedTime = 3000; // Minimum time in milliseconds before cubes turn red
    const maxRedTime = 10000; // Maximum time in milliseconds before cubes turn red
    let cubes = [];
    let gameOver = false;
    let gameWon = false;
    let timer = 5; // 30 seconds countdown timer
    let spawnInterval, updateInterval, timerInterval;
    let exp = 0; // Player's experience points

    function drawDiamond() {
        ctx.fillStyle = 'green';
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - diamondSize); // Top vertex
        ctx.lineTo(centerX + diamondSize, centerY); // Right vertex
        ctx.lineTo(centerX, centerY + diamondSize); // Bottom vertex
        ctx.lineTo(centerX - diamondSize, centerY); // Left vertex
        ctx.closePath();
        ctx.fill();
    }

    function spawnCube() {
        if (cubes.length >= maxCubes) return;

        let x, y;
        do {
            x = Math.random() * (canvas.width - cubeSize);
            y = Math.random() * (canvas.height - cubeSize);
        } while (Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) < minDistance);

        const redTime = Math.random() * (maxRedTime - minRedTime) + minRedTime;
        const cube = {
            x,
            y,
            dx: getRandomDirection(),
            dy: getRandomDirection(),
            color: 'blue',
            isRed: false,
            redTimer: setTimeout(() => turnRed(cube), redTime)
        };
        cubes.push(cube);
    }

    function getRandomDirection() {
        return (Math.random() - 0.5) * normalSpeed;
    }

    function turnRed(cube) {
        cube.color = 'red';
        cube.isRed = true;
    }

    function updateCubes() {
        cubes.forEach(cube => {
            if (cube.isRed) {
                let angle = Math.atan2(centerY - cube.y, centerX - cube.x);
                cube.dx = Math.cos(angle) * redSpeed;
                cube.dy = Math.sin(angle) * redSpeed;
            }
            cube.x += cube.dx;
            cube.y += cube.dy;

            if (cube.isRed && Math.sqrt((cube.x - centerX) ** 2 + (cube.y - centerY) ** 2) < diamondSize) {
                gameOver = true;
            }

            if (!cube.isRed && (cube.x < 0 || cube.x > canvas.width - cubeSize || Math.sqrt((cube.x - centerX) ** 2 + (cube.y - centerY) ** 2) < minDistance)) {
                cube.dx = -cube.dx;
            }
            if (!cube.isRed && (cube.y < 0 || cube.y > canvas.height - cubeSize || Math.sqrt((cube.x - centerX) ** 2 + (cube.y - centerY) ** 2) < minDistance)) {
                cube.dy = -cube.dy;
            }
        });
    }

    function drawCubes() {
        cubes.forEach(cube => {
            ctx.fillStyle = cube.color;
            ctx.fillRect(cube.x, cube.y, cubeSize, cubeSize);
        });
    }

    function drawTimer() {
        ctx.fillStyle = 'white';
        ctx.font = '24px serif';
        ctx.fillText(`Time: ${timer}s`, 10, 30);
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawDiamond();
        drawCubes();
        drawTimer();
        if (gameOver) {
            gameOverMessage.textContent = 'Game Over';
            gameOverMenu.classList.remove('hidden');
            window.parent.postMessage({ type: "GAME_LOST" }, "*");
            clearIntervals();
        } else if (gameWon) {
            gameOverMessage.textContent = 'You Win!';
            gameOverMenu.classList.remove('hidden');
            clearIntervals();
            exp += 100; // Award 100 EXP for winning
            window.parent.postMessage({ type: 'GAME_WON', score: exp }, '*'); // Send EXP to parent
        }
    }

    function handleClick(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        cubes = cubes.filter(cube => {
            if (cube.isRed && mouseX >= cube.x && mouseX <= cube.x + cubeSize && mouseY >= cube.y && mouseY <= cube.y + cubeSize) {
                clearTimeout(cube.redTimer);
                return false;
            }
            return true;
        });
    }

    function updateTimer() {
        if (timer > 0) {
            timer--;
        } else {
            gameWon = true;
        }
    }

    function clearIntervals() {
        clearInterval(spawnInterval);
        clearInterval(updateInterval);
        clearInterval(timerInterval);
    }

    function restartGame() {
        cubes = [];
        gameOver = false;
        gameWon = false;
        timer = 30;
        gameOverMenu.classList.add('hidden');
        clearIntervals();
        startGame();
    }

    function startGame() {
        spawnInterval = setInterval(spawnCube, 1000);
        updateInterval = setInterval(() => {
            updateCubes();
            update();
        }, 50);
        timerInterval = setInterval(updateTimer, 1000);
    }

    function goHome() {
        console.log('Going back to home screen...');
    }

    restartButton.addEventListener('click', restartGame);
    homeButton.addEventListener('click', goHome);
    canvas.addEventListener('click', handleClick);

    drawDiamond();
    startGame();
});
