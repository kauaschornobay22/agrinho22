let currentQuestion = 0;
let responses = []; // Para armazenar as respostas
let gameOver = false;

let questions = [
  {
    question: "Você gosta de campo?",
    options: ["S", "N"],
    answers: {
      'S': "Que bom! O campo é maravilhoso!",
      'N': "Que pena! O campo tem tantas coisas boas..."
    },
    bgColor: [255, 255, 200] // Cor do fundo para essa pergunta (amarelo claro)
  },
  {
    question: "Você gosta de ver o nascer e o pôr do sol no campo?",
    options: ["S", "N"],
    answers: {
      'S': "Sim! O céu no campo é incrível.",
      'N': "Ah, você deveria ver! É um espetáculo da natureza."
    },
    bgColor: [255, 200, 200] // Cor do fundo (rosa claro)
  },
  {
    question: "Você já ajudou a plantar algo no campo?",
    options: ["S", "N"],
    answers: {
      'S': "Que ótimo! Plantar é muito gratificante.",
      'N': "Seria legal tentar! O campo tem muito o que ensinar."
    },
    bgColor: [200, 255, 200] // Cor do fundo (verde claro)
  },
  {
    question: "Você gosta de estar rodeado de animais no campo?",
    options: ["S", "N"],
    answers: {
      'S': "Sim, os animais fazem o campo ser ainda mais especial.",
      'N': "Entendo! Nem todos gostam, mas eles são parte da vida no campo."
    },
    bgColor: [200, 255, 255] // Cor do fundo (azul claro)
  },
  {
    question: "Você já visitou uma fazenda?",
    options: ["S", "N"],
    answers: {
      'S': "Que legal! As fazendas têm uma energia única.",
      'N': "Você deveria! É uma experiência inesquecível."
    },
    bgColor: [255, 255, 255] // Cor do fundo (branco)
  },
  {
    question: "Você sabe como cuidar de uma horta ou jardim?",
    options: ["S", "N"],
    answers: {
      'S': "Ótimo! Cuidar de plantas é algo muito especial.",
      'N': "Não tem problema! O campo pode te ensinar."
    },
    bgColor: [255, 255, 150] // Cor do fundo (amarelo pálido)
  },
  {
    question: "Você gosta de ouvir o som de um rio ou riacho?",
    options: ["S", "N"],
    answers: {
      'S': "O som da água é relaxante, não é?",
      'N': "Entendo, algumas pessoas preferem um ambiente mais silencioso."
    },
    bgColor: [200, 220, 255] // Cor do fundo (azul bem suave)
  },
  {
    question: "Você tem medo de insetos ou animais do campo?",
    options: ["S", "N"],
    answers: {
      'S': "Eles podem ser assustadores, mas fazem parte da natureza.",
      'N': "Legal! O campo tem muitos animais interessantes."
    },
    bgColor: [255, 240, 240] // Cor do fundo (rosa muito suave)
  },
  {
    question: "Você gosta de caminhar pelas trilhas do campo?",
    options: ["S", "N"],
    answers: {
      'S': "Caminhar no campo é uma experiência incrível!",
      'N': "Compreendo, as trilhas podem ser desafiadoras."
    },
    bgColor: [240, 255, 240] // Cor do fundo (verde bem suave)
  },
  {
    question: "Você conhece alguma técnica de cultivo orgânico?",
    options: ["S", "N"],
    answers: {
      'S': "Isso é maravilhoso! O cultivo orgânico é o futuro.",
      'N': "Você deveria aprender! É um estilo de vida saudável."
    },
    bgColor: [255, 235, 150] // Cor do fundo (amarelo suave)
  },
  {
    question: "Você gostaria de morar em uma casa de campo, longe da cidade?",
    options: ["S", "N"],
    answers: {
      'S': "Que bom! A vida no campo é tranquila e pacífica.",
      'N': "Entendo, a vida na cidade tem suas vantagens."
    },
    bgColor: [200, 200, 255] // Cor do fundo (azul claro)
  }
];

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  textSize(24);
}

function draw() {
  // Mudar o fundo com base na pergunta atual
  background(questions[currentQuestion].bgColor);

  if (gameOver) {
    // Tela de fim de jogo
    background(255, 100, 100); // Cor do fundo no fim (vermelho claro)
    textSize(32);
    fill(0);
    text('Fim de jogo!', width / 2, height / 2 - 50);
    textSize(24);
    text('Obrigado por jogar!', width / 2, height / 2);
    textSize(18);
    text('Pressione "R" para reiniciar', width / 2, height / 2 + 40);
  } else {
    // Tela de perguntas
    textSize(28);
    fill(0);
    text(questions[currentQuestion].question, width / 2, height / 4);

    //eu presiso que voce crie um jogo no p5js sobre uma pessoa que estava no campo e perguntando voce gosta de campo e entao vai aparecer "s" para sim que funcione e "n" para não então se a resposta for s entao diga "que bom" e se for n diga " que pena" e algumas outras perguntas sobre campo e que mude de cor a cada pergunta
    //chatgpt
    textSize(22);
    fill(0);
    text('Pressione "S" para SIM', width / 2, height / 2);
    text('Pressione "N" para NÃO', width / 2, height / 2 + 40);

    // Exibe a resposta anterior
    if (responses.length > 0) {
      textSize(20);
      text(responses[responses.length - 1], width / 2, height / 2 + 80);
    }

    // Exibe a pergunta e a contagem
    textSize(20);
    text('Pergunta ' + (currentQuestion + 1) + ' de ' + questions.length, width / 2, height - 30);
  }
}

function keyPressed() {
  if (gameOver && (key === 'R' || key === 'r')) {
    // Reinicia o jogo
    responses = [];
    currentQuestion = 0;
    gameOver = false;
  } else if (!gameOver) {
    // Verifica se a resposta está correta
    if ((key === 'S' || key === 's') || (key === 'N' || key === 'n')) {
      let answer = (key === 'S' || key === 's') ? 'S' : 'N';
      
      // Adiciona a resposta à lista de respostas
      responses.push(questions[currentQuestion].answers[answer]);

      // Avança para a próxima pergunta
      currentQuestion++;
      if (currentQuestion >= questions.length) {
        gameOver = true; // Fim de jogo
      }
    }
  }
}
