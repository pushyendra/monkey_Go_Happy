var backImage,backgr;
var player, player_running;
var ground,ground_img;
var FoodGroup
var bananaImage;
var END =0;
var PLAY =1;
var gameState = PLAY;


function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadAnimation("banana.png")
  obstacle_img = loadImage("stone.png")
}


function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;

}

function draw() { 
  background(0);

 stroke("white")
 textSize(20)
 fill("white")
 player.collide(ground);

  if(gameState===PLAY){
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  if(FoodGroup.isTouching(player)){
    FoodGroup.destroyEach();
    score = score + 2
    player.scale += + 0.1
  }

  // FoodGroup.visible = true
  
    if(touches.length<0 || keyDown("space") ) {
      player.velocityY = -12;
      touches=[];
    }
    player.velocityY = player.velocityY + 0.8;
    
  
  spawnFood();
  spawnObstacles();
  drawSprites();
  text("Score:"+score,550,50)
  if(obstaclesGroup.isTouching(player)){
    gameState = END;
  }
}else if(gameState === END){
  backgr.velocityX = 0
  player.visible = false;

  FoodGroup.destroyEach();
  obstaclesGroup.destroyEach();

  player.scale = 0.1;

  textSize(30)
  fill(255)
  text("Game Over!",300,220)
  text("Press space to restart",300,250)
  textSize(20);

  score=0



}

if(keyDown(32)){
  reset();

  
}


}

function spawnFood(){
if(frameCount % 80 === 0){
  var banana = createSprite(600,250,40,10)
  banana.addAnimation("banaa",bananaImage);
  banana.y = random(120,200)
 
  banana.scale=0.05;
  banana.velocityX = -4;
 
  //  console.log("error")

  banana.lifetime = 300;
  player.depth = banana.depth+1
  FoodGroup.add(banana)
}
}
function spawnObstacles(){
  if(frameCount % 100 === 0){
    var obstacle = createSprite(800,350,10,40)
    obstacle.velocityX = -(4+2*score/100)
    obstacle.addImage("obst",obstacle_img)

    console.log("red")

    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
 gameState = PLAY;
 player.visible = true;
 backgr.velocityX = -4
//  player.scale = 0.1

}

