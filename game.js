let roll, clouds, strawberry, poison;
let rollImg, cloudsImg, strawberryImg, poisonImg;
let strawberryG;
let x1 = 0;
let x2;
let vis = 0;
let score = 0;

let scrollSpeed = 3;

function preload() {
  rollImg = loadImage("./images/roll.png");
  cloudsImg = loadImage("./images/clouds.png");
  strawberryImg = loadImage("./images/strawberry.png");
  poisonImg = loadImage("./images/poison.png");
}

function setup() {
  new Canvas(500, 500);
  x2 = width;
  
  strawberryG = new Group();
  poisonG = new Group();

  
  roll = new Sprite();
  roll.addImg(rollImg);
  
  // roll.overlaps(strawberryG, collect);
  
  block = new Sprite(250, 250, 20, 20);
  roll.overlaps(block, collect);
  roll.overlaps(poisonG, die);
}

function die(roll, poison) {
  strawberry.remove();
  roll.y = 250;
}
function draw() {
  clear();
  background(209, 240, 255);
  
  // score text
  textSize(20);
  fill(255);
  text("Strawberries: " + score, 20, 50)
  // game over text
  textSize(40);
  fill(0, vis);
  text("GAME OVER", 120, 250);
  
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
  
  // create sprite groups
  createStrawberry();
  createPoison();
  
  // strawberry condition
  if (roll.overlaps(strawberryG)) {
    strawberry.remove();
    score += 50;
  } else if (roll.overlaps(poisonG)) {
    strawberry.remove();
    roll.y = 250;
    vis = 255;
  }
  
  //roll.y = mouseY;
  //roll.x = mouseX;
  roll.moveTowards(mouse);
}


function createStrawberry() {
  i1 = round(random(500));
  i2 = round(random(500));
  if (frameCount % 50 == 0) {
    let strawberry = new Sprite(i1, i2);
    
    strawberry.addImage(strawberryImg);
    strawberry.scale = 0.5;
    strawberry.velocity.x = -3;
    strawberry.lifetime = 150;
    strawberryG.add(strawberry);
  }
}

function createPoison() {
  i1 = round(random(250, 500));
  i2 = round(random(500));
  if (frameCount % 90 == 0) {
    let poison = new Sprite(i1, i2);
    poison.addImage(poisonImg);
    poison.velocity.x = -3;
    poison.lifetime = 150;
    poisonG.add(poison);
  }
}

function collect (roll, block) {
  console.log("gottem");
  block.remove();
}