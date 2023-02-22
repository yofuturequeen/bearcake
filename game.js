let roll, clouds, strawberry, poison, flour, cake;
let rollImg, cloudsImg, strawberryImg, poisonImg, flourImg, cakeImg;
let strawberryG, flourG, poisonG;
let x1 = 0;
let x2;
let vis = 0;
let score = 0;
let gameOver = false;

let scrollSpeed = 3;

function preload() {
  rollImg = loadImage("images/roll.png");
  cloudsImg = loadImage("images/clouds.png");
  strawberryImg = loadImage("images/strawberry.png");
  poisonImg = loadImage("images/poison.png");
  flourImg = loadImage("images/flour.png");
  cakeImg = loadImage("images/cake.png");
}

function setup() {
  new Canvas(500, 500);
  x2 = width;
  
  strawberryG = new Group();
  poisonG = new Group();
  flourG = new Group();
  
  // createStrawberry(); 
  
  i1 = round(random(500));
  i2 = round(random(500));
  
  
  roll = new Sprite();
  roll.addImg(rollImg);
  

  
  // roll.overlaps(strawberryG, collect);
  

  //roll.overlaps(poisonG, die);
  
}


function draw() {
  clear();
  background(209, 240, 255);
  
  // score text
  textSize(20);
  fill(255);
  text("Score: " + score, 400, 50)
  // game over text
  textSize(40);
  fill(0, vis);
  text("GAME OVER", 120, 280);
  
  // make cloud background "move"
  image(cloudsImg, x1, 0, width, height);
  image(cloudsImg, x2 , 0, width, height);
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
  
  if (x1 < -width) {
    x1 = width;
  }
  if (x2 < -width){
    x2 = width;
  }
  
  if (frameCount % 50 == 0) {
    createStrawberry();
  }

  if (frameCount % 90 == 0) {
    createPoison();
  }
  
  if (frameCount % 70 == 0) {
    createFlour();
  }
  
  // overlap conditions
  if (roll.overlaps(strawberryG)) {
    strawberryG.remove();
    score += 20;
  } else if (roll.overlaps(flourG)) {
    flourG.remove();
    //collect();
    score += 20;
  } else if (roll.overlaps(poisonG)) {
    roll.y = 250;
    gameOver = true;
  }
  
  if (gameOver) {
    vis = 255;
    strawberryG.removeAll();
    flourG.removeAll();
    poisonG.removeAll();
    textSize(20);
    text("Score: " + score, 130, 220);
    image(cakeImg, 250, 150)
    textSize(12);
    text("Nice cake ;) refresh to play again", 150, 310)
  }

  roll.position.x = mouseX;
  roll.position.y = mouseY;
  
}


function createStrawberry() {
  strawberryG = new Group();
  i1 = round(random(500));
  i2 = round(random(500));
  let strawberry = new Sprite(i1, i2);
  strawberry.addImage(strawberryImg);
  strawberry.velocity.x = -3;
  strawberry.lifetime = 150;
  strawberryG.add(strawberry);
}

function createFlour() {
  flourG = new Group();
  i1 = round(random(500));
  i2 = round(random(500));
  let flour = createSprite(i1, i2);
    flour.addImage(flourImg);
    flour.velocity.x = -3;
    flour.lifetime = 150;
    //flourG.amount = 1;
    flourG.add(flour);
}

function createPoison() {
  poisonG = new Group();
  i1 = round(random(250, 500));
  i2 = round(random(500));
  let poison = new Sprite(i1, i2);
  poison.addImage(poisonImg);
  poison.velocity.x = -3;
  poison.lifetime = 150;
  poisonG.add(poison);
}