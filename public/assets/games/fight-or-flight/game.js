// game.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 430;
canvas.height = window.innerHeight;

class PlayerShip {
  constructor(x, y, width, height, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
  }

  move(event) {
    const rect = canvas.getBoundingClientRect();
    this.x = event.clientX - rect.left - this.width / 2;
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

const playerImage = new Image();
playerImage.src = "/assets/games/fight-or-flight/img/friendly.png"; // Provide the correct path to the player image

const player = new PlayerShip(
  canvas.width / 2 - 25,
  canvas.height - 60,
  50,
  50,
  playerImage
);

let projectiles = [];
let enemies = [];
let gameOver = false;
let gameWon = false;
let enemySpeed, spawnRate, projectileSpeed, winScore;
let enemySpawnInterval;
let score = 0;

const enemyImage = new Image();
enemyImage.src = "/assets/games/fight-or-flight/img/enemy.png"; // Provide the correct path to the enemy image

const backgroundImage = new Image();
backgroundImage.src = "/assets/games/fight-or-flight/img/sky.jpg"; // Provide the correct path to the background image

let backgroundY = 0;
const backgroundSpeed = 2;

class Projectile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 10;
    this.color = "yellow";
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.y -= projectileSpeed;
  }
}

class Ship {
  constructor(x, y, width, height, image, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = image;
    this.speed = speed;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update() {
    this.y += this.speed;
  }
}

function isOverlapping(x, y, ships) {
  for (let ship of ships) {
    if (
      x < ship.x + ship.width &&
      x + 50 > ship.x &&
      y < ship.y + ship.height &&
      y + 50 > ship.y
    ) {
      return true;
    }
  }
  return false;
}

function spawnEnemies() {
  enemySpawnInterval = setInterval(() => {
    let x, y;
    do {
      x = Math.random() * (canvas.width - 50);
      y = 0;
    } while (isOverlapping(x, y, enemies));
    enemies.push(new Ship(x, y, 50, 50, enemyImage, enemySpeed));
  }, spawnRate);
}

function detectCollisions() {
  projectiles.forEach((projectile, pIndex) => {
    enemies.forEach((enemy, eIndex) => {
      if (
        projectile.x < enemy.x + enemy.width &&
        projectile.x + projectile.width > enemy.x &&
        projectile.y < enemy.y + enemy.height &&
        projectile.y + projectile.height > enemy.y
      ) {
        setTimeout(() => {
          enemies.splice(eIndex, 1);
          projectiles.splice(pIndex, 1);
          score += 10;
        }, 0);
      }
    });
  });

  enemies.forEach((enemy, eIndex) => {
    if (enemy.y + enemy.height > canvas.height) {
      gameOver = true;
    }

    if (
      enemy.x < player.x + player.width &&
      enemy.x + enemy.width > player.x &&
      enemy.y < player.y + player.height &&
      enemy.y + enemy.height > player.y
    ) {
      gameOver = true;
    }
  });
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function drawBackground() {
  ctx.drawImage(backgroundImage, 0, backgroundY, canvas.width, canvas.height);
  ctx.drawImage(
    backgroundImage,
    0,
    backgroundY - canvas.height,
    canvas.width,
    canvas.height
  );
  backgroundY += backgroundSpeed;
  if (backgroundY >= canvas.height) {
    backgroundY = 0;
  }
}

function checkWinCondition() {
  if (score >= winScore) {
    gameWon = true;
    clearInterval(enemySpawnInterval);
    document.getElementById("youWinOverlay").style.display = "block";
    window.parent.postMessage({ type: "GAME_WON", score: score }, "*"); // Send message to parent
  }
}

function gameLoop() {
  if (gameOver || gameWon) {
    if (gameOver) {
      document.getElementById("gameOverOverlay").style.display = "block";
      window.parent.postMessage({ type: "GAME_LOST", score: score }, "*");
    }
    clearInterval(enemySpawnInterval);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBackground();

  player.draw();
  projectiles.forEach((projectile, index) => {
    projectile.update();
    projectile.draw();
    if (projectile.y < 0) {
      projectiles.splice(index, 1);
    }
  });

  enemies.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });

  detectCollisions();
  drawScore();
  checkWinCondition();

  requestAnimationFrame(gameLoop);
}

function startGame(difficulty) {
  document.getElementById("difficultySelection").style.display = "none";
  document.getElementById("gameOverOverlay").style.display = "none";
  document.getElementById("youWinOverlay").style.display = "none";
  score = 0;
  gameOver = false;
  gameWon = false;
  projectiles = [];
  enemies = [];

  switch (difficulty) {
    case "easy":
      enemySpeed = 3;
      spawnRate = 2000;
      projectileSpeed = 10;
      winScore = 50;
      break;
    case "medium":
      enemySpeed = 5;
      spawnRate = 1000;
      projectileSpeed = 15;
      winScore = 70;
      break;
    case "hard":
      enemySpeed = 7;
      spawnRate = 500;
      projectileSpeed = 20;
      winScore = 100;
      break;
  }

  spawnEnemies();
  gameLoop();
}

window.addEventListener("mousemove", (event) => {
  player.move(event);
});

window.addEventListener("click", () => {
  projectiles.push(new Projectile(player.x + player.width / 2 - 2.5, player.y));
});

function restartGame() {
  clearInterval(enemySpawnInterval);
  document.getElementById("difficultySelection").style.display = "block";
  document.getElementById("gameOverOverlay").style.display = "none";
  document.getElementById("youWinOverlay").style.display = "none";
  gameOver = false;
  gameWon = false;
  projectiles = [];
  enemies = [];
}


