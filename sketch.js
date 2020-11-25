//Create variables here
var gameState;
var dog, happyDog, database, foodS, foodStock;
var bedroom_img, garden_img, washroom_img;
var lastFed, currenttime;

function preload(){
  //load images here
  dog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  bedroom = loadImage("virtual pet images/Bed-Room.png");
  garden = loadImage("virtual pet images/Garden.png");
  washroom = loadImage("virtual pet images/Wash-Room");
}

function setup(){
  createCanvas(500,500);
  dog = createSprite(dog,happyDog);
  gameState = ""
  bedroom_img.addImage("bedroom", bedroom_img);
  garden_img.addImage("garden", garden_img);
  washroom_img.addImage("washroom", washroom_img);
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  readState = database.ref("gameState");
  readState.on("value", function(data){
    gameState = data.val();
  });
}


function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  drawSprites();
  //add styles here
  text(foodStock, 20,20);

  if(gameState !== "hungry"){
    food.hide();
    dog.Remove();
  }
  else{
    food.show();
    dog.addImage(sadDog);
  }

  currenttime = hour();
  if(currenttime === lastFed+1){
    update("playing");
    foodObj.garden();
  }
  if(currenttime ===(lastFed+2)){
    update("sleeping");
    foodObj.garden();
  }
  if(currenttime > (lastFed+2) && currenttime <= (lastFed+4)){
    update("playing");
    foodObj.garden();
  }
  else{
    update("hungry");
    foodObj.display();
  }

  function update(state){
    database.ref('/').update({
      gameState: state
    });
  }
}



