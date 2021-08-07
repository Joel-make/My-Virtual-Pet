var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var gameState=0;
var START=0;
var PLAY1=1;
var PLAY2=2;
var PLAY3=3;
function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
bg=loadImage("bg.jpg");
bg2=loadImage("bg2.jpg");
ball=loadImage("ball.png");
ball2=loadImage("ball2.png");
woof=loadSound("woof.mp3");
drinking=loadSound("drinking.mp4");
alert1=loadImage("alert.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  //Uncomment the correct code to create 
  feed=createButton("Feed the dog");
  feed.position(700,95);
  
  /*feed=createbutton("Feed the dog");
  feed.position(700,95);*/
  
  /*feed=createButton("Feed the dog");
  feed.position(70,950);*/
  
  /*feed=createButton("Feed the dog");
  feed.Position(700,95);*/
  
  //Uncomment the correct code to call FeedDog() using mousePressed
  //feed.Pressed(feedDog);
  //feed.mousePress(feedDog);
  feed.mousePressed(feedDog);
  //feed.mousePressed(addfoods);
 
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(bg);
  if(gameState===1)
  {
 
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);

  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
  console.log(foodObj);
  if(foodObj.foodStock===0)
  {
    textSize(25)
    strokeWeight(1)
    stroke("black");
    textFont("Copperplate Gothic");
    text("OH NO, you are out of stock,Press ADD FOOD to get more" ,50,380);
    image(alert1,25,370,40,40);
  }
  if(lastFed%1===0 && foodObj.foodStock>15)
  {
    textSize(25)
    strokeWeight(1)
    stroke("black");
    textFont("Copperplate Gothic");
    text("Your pet is hungry, Press Feed the dog to feed your pet" ,50,380);
    image(alert1,25,370,40,40);
  }
 
  if(foodObj.foodStock<15 && foodObj.foodStock>0)
  {
    textSize(25)
    strokeWeight(1)
    stroke("black");
    textFont("Copperplate Gothic");
    text("Your pet is Full, it only requires few bottle of milk" ,50,380);
    image(alert1,25,370,40,40);
  }
  if(keyDown("RIGHT_ARROW") && gameState===1)
  {
    //gameState=2;
   // woof.play();
  
  }
 
  drawSprites();
  }
  if(gameState===2)
  {
    dog.addImage(happyDog);
    image(ball,20,180,150,300);
    drawSprites(); 
  }
  if(keyWentDown("space") && gameState===2)
  {
    //gameState=3;
    woof.play();
  }
  if(gameState===3)
  {
    image(ball2,20,180,150,300);
    dog.visible=false;
    drawSprites(); 
  }
 console.log(World.seconds,gameState)
  if(World.seconds>5 && gameState===3)
  {
    dog.visible=true;
  }
  if(gameState===0)
  {
    push();
    strokeWeight(5)
    stroke("black");
    fill("white");
    textFont("Algerian");
    textSize(70)
    text("🐶My Virtual Pet🐶",150,200);
    pop();
    textFont("Time new roman");
    strokeWeight(0.5)
    stroke("blue")
    fill("black")
    textSize(35)
    text("Welcome, Press space to meet your pet",240,250);
if(keyWentDown("space") && gameState===0)
{
  gameState=1;
  woof.play();
  
}
  }

}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  drinking.play();
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
      foodObj.updateFoodStock(food_stock_val *0);
     woof.play();
     drinking.stop();
  }else{
      foodObj.updateFoodStock(food_stock_val -1);
      
  }
  
  //Uncomment correct code block to update food quantity and fed timing
  /*database.ref('/').OnUpdate({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })*/
  
  /*database.ref('/').Update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })*/
    
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
   
  /*database.ref('/').update({
    Food:foodObj.getFoodStock,
    FeedTime:hour()
  })*/
  
}

//function to add food stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}