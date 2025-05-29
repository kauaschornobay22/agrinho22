function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(222);
}
let harvester;
let crops = [];
let obstacles = [];
let city;
let score = 0;
let gameOver = false;
let speed = 3;

function setup() {
  createCanvas(800, 600);
  harvester = new Harvester();
  city = new City();
  noStroke();
  frameRate(60);
}

function draw() {
  background(135, 206, 235);  // Fundo azul claro (simulando o céu)

  if (gameOver) {
    textSize(40);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2);
    textSize(20);
    text("Pontuação: " + score, width / 2, height / 2 + 40);
    text("Pressione F5 para reiniciar", width / 2, height / 2 + 70);
    return;
  }

  // Desenha a cidade
  city.show();

  // Atualiza e desenha a colhedeira
  harvester.update();
  harvester.show();

  // Gera novos grãos e obstáculos
  if (frameCount % 60 === 0) {
    crops.push(new Crop());
    obstacles.push(new Obstacle());
  }

  // Desenha e atualiza os grãos
  for (let i = crops.length - 1; i >= 0; i--) {
    crops[i].update();
    crops[i].show();

    // Verifica se a colhedeira coletou o grão
    if (harvester.collects(crops[i])) {
      crops.splice(i, 1);
      score += 10;  // Ganha pontos ao colher um grão
    }
  }

  // Desenha e atualiza os obstáculos
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();

    // Verifica colisão com obstáculos
    if (harvester.hits(obstacles[i])) {
      gameOver = true;
    }
  }

  // Verifica se a colhedeira chegou à cidade com grãos
  if (harvester.x > city.x - 30 && harvester.x < city.x + 30) {
    score += 50;  // Ganha mais pontos por entregar os grãos
    harvester.reset();  // Reseta a colhedeira
  }

  // Exibe a pontuação
  fill(0);
  textSize(20);
  text("Pontuação: " + score, 20, 30);
}

// Classe para a colhedeira
class Harvester {
  constructor() {
    this.x = 50;
    this.y = height - 70;
    this.w = 60;
    this.h = 40;
    this.speed = 5;
  }

  update() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < width - this.w) {
      this.x += this.speed;
    }
  }

  show() {
    fill(255, 204, 0);  // Colhedeira amarela
    rect(this.x, this.y, this.w, this.h);
  }

  // Verifica se a colhedeira coleta um grão
  collects(crop) {
    let d = dist(this.x + this.w / 2, this.y + this.h / 2, crop.x, crop.y);
    return d < (this.w / 2 + crop.size / 2);
  }

  // Verifica se a colhedeira bateu em um obstáculo
  hits(obstacle) {
  }

  // Reseta a posição da colhedeira
  reset() {
    this.x = 50;
  }
}


//chatgpt
//jogo muito top agricola para fazer no p5js com todos os codigos 


// Classe para os grãos
class Crop {
  constructor() {
    this.x = random(100, width - 100);
    this.y = 0;
    this.size = 20;
    this.speed = speed;
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(0, 255, 0);  // Grãos verdes
    ellipse(this.x, this.y, this.size);
  }
}

// Classe para os obstáculos
class Obstacle {
  constructor() {
    this.x = random(100, width - 100);
    this.y = 0;
    this.size = 30;
    this.speed = speed;
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(255, 0, 0);  // Obstáculos vermelhos
    ellipse(this.x, this.y, this.size);
  }
}

// Classe para a cidade (onde o jogador entrega os grãos)
class City {
  constructor() {
    this.x = width - 80;
    this.y = height - 70;
    this.w = 60;
    this.h = 40;
  }

  show() {
    fill(0, 0, 255);  // Cidade azul
    rect(this.x, this.y, this.w, this.h);
  }
}
