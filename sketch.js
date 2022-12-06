var space,spaceImage;
var rocket,rocketImage;
var asteroid,asteroidImage,asteroidsGroup;
var survivalTime;
var gameState="help";

function preload(){
  spaceImage=loadImage("spacebackground.jpg");
  rocketImage=loadImage("rocket.webp");
  asteroidImage=loadImage("asteroid2.png");
  
}

function setup() {
  createCanvas(400,400);
  
  asteroidsGroup=new Group();
  
  space=createSprite(200,200);
  space.addImage(spaceImage);
  
  rocket=createSprite(50,200);
  rocket.addImage(rocketImage);
  rocket.scale=0.1;
  rocket.setCollider("rectangle",0,0,rocket.width,rocket.height);
  rocket.debug=true;
  
  survivalTime=0;
}

function draw() {
  background("black");
  
  if(gameState==="play"){
    space.velocityX=-2;
    if(space.x<-1210){
      space.x=200;
    }
    
    if(keyDown(UP_ARROW)&&rocket.y>35){
      rocket.y=rocket.y-5;
    }
    if(keyDown(DOWN_ARROW)&&rocket.y<385){
      rocket.y=rocket.y+5;
    }
    
    spawnAsteroids();
    
    survivalTime=survivalTime+Math.round(getFrameRate()/60);
    
    if(rocket.isTouching(asteroidsGroup)){
      gameState="end";
    }
  }
  
  drawSprites();
  if(gameState==="end"){
    asteroidsGroup.setLifetimeEach(-1);
    asteroidsGroup.setVelocityXEach(0);
    space.velocityX=0;
    
    textSize(20);
    stroke("black");
    fill("red");
    text("GAME OVER",130,200);
    textSize(15);
    fill("white");
    text("Press 'R' to retry",140,300);
    
    if(keyDown("r")){
      asteroidsGroup.destroyEach();
      rocket.y=200;
      survivalTime=0;
      gameState="help";
    }
  }
  textSize(15);
  stroke("black");
  fill("white");
  text("Survival Time: "+survivalTime,150,12);
  
  if(gameState==="help"){
    textSize(17);
    stroke("black");
    fill("white");
    text("Use up and down arrow keys to move the rocket",25,80);
    text("Save the spaceship by escaping from asteroids",25,300);
    text("Press space to start",130,200);
    if(keyDown("space")){
      gameState="play";
    }
  }
}

function spawnAsteroids() {
  if(frameCount%35===0){
    asteroid=createSprite(460,Math.round(random(45,375)));
    asteroid.addImage(asteroidImage);
    asteroid.scale=0.25;
    asteroid.velocityX=-6;
    if(asteroid.velocityX<25){
      asteroid.velocityX=asteroid.velocityX-(survivalTime/60);
    }
    asteroid.lifetime=90;
    asteroid.setCollider("rectangle",0,0,asteroid.width,145);
    asteroid.debug=true;
    
    asteroidsGroup.add(asteroid);
  }
}