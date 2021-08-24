var trex, trex_running, edges;      
var groundImage;
var invisableGround, ground;
var trex_collided;
var clouds, cloudImage;
var obstacles1, obstacles2, obstacles3, obstacles4, obstacles5, obstacles6;
var score
var play = 1;
var end = 0;
var gameState = play;
var gameOver, restart, collided;
var gameOverImg, restartImg, collidedImg;
var checkPoint, die, jump;



function preload() {

trex_running=loadAnimation("trex1.png","trex2.png", "trex3.png");
  groundImage = loadImage("ground2.png");
 //trex_collided = loadImage("trex_collided.png");
  cloudImage = loadImage("cloud.png");
  obstacles1 = loadImage("obstacle1.png");
  obstacles2 = loadImage("obstacle2.png");
  obstacles3 = loadImage("obstacle3.png");
  obstacles4 = loadImage("obstacle4.png");
  obstacles5 = loadImage("obstacle5.png");
  obstacles6 = loadImage("obstacle6.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  collidedImg = loadAnimation("collided.png");
  checkPoint = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
}

function drawCloud() {
  if(frameCount % 50=== 0) {
    clouds = createSprite(width,height-300,45,20);
   clouds.velocityX = -3;
    clouds.y = Math.round(random(20,50));
    clouds.addImage(cloudImage);
    clouds.scale = 0.7;
    clouds.depth = trex.depth;
    trex.depth = trex.depth+1;
    clouds.lifetime = 200;
    cloudsGroup.add(clouds);
    }
  }

function drawObstacles() {
  if(frameCount % 50=== 0) {
    var obstacle = createSprite(width,height-55,25,60);
    obstacle.velocityX = -8;
    var number = Math.round(random(1,6));
    switch(number) {
      case 1: obstacle.addImage(obstacles1);
        break;
      case 2: obstacle.addImage(obstacles2);
        break;
      case 3: obstacle.addImage(obstacles3);
        break;
      case 4: obstacle.addImage(obstacles4);
        break;
      case 5: obstacle.addImage(obstacles5);
        break;
      case 6: obstacle.addImage(obstacles6);
        break;
        
      default: break;
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
   
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation('running', trex_running);
  trex.scale = 0.8; 
  trex.x = 50;
  
  ground = createSprite(width/2,height-40,width,20);
  ground.addImage('ground', groundImage);
  ground.x = ground.width/2;
  
  
  invisableGround = createSprite(width/2,height-25,width,10);
  invisableGround.visible = false;
  
   obstaclesGroup = createGroup();
   cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  score = 0;
  
  gameOver = createSprite(width/2,height/2-50);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  
  trex.addAnimation('collided', collidedImg);
  
  trex.setCollider('circle', 0,0,40);
  //trex.setCollider('rectangle',0,0,400,trex.height);
  

}

function reset() {
  gameState = play;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
  score = 0
}
  
function draw() {
  background(190);
  if(gameState=== play) {
    ground.velocityX = -(6+3*score/300);
     gameOver.visible = false;
    restart.visible = false;
    text("Score: "+ score, width-75,50);
  score = score + Math.round(frameCount/60);
  
  if(touches.length > 0||keyDown('Space')&& trex.y >= height-200) {
    trex.velocityY = -10;
    jump.play(); 
    touches = []
  }
    
  trex.velocityY = trex.velocityY+0.8;
  
  if(score > 0 && score%300===0) {
    checkPoint.play();
  }
  

  if(ground.x < 0) {
    ground.x = ground.width/2
   }
    
     drawCloud();
  
  drawObstacles();
    
  if(obstaclesGroup.isTouching(trex)) {
    gameState = end;
    die.play();
    //trex.velocityY = -9;
    //jump.play();
  }
    
   
 }
  
  else if(gameState=== end) {
    gameOver.visible = true;
    restart.visible = true
    trex.changeAnimation('collided', collidedImg);
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    if(touches.length > 0||mousePressedOver(restart)) {
      reset();
      touches = []
    }
  }
  
  trex.collide(invisableGround);
  
 
   drawSprites(); 

}
