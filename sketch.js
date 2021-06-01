//Create variables here
var dog, dogImg,happyDog, database, foodS, foodStock;
var feed, addFood;
var lastFed, fedTime;
var foodObj;


function preload()
{
	//load images here
  happyDog = loadImage("images/dogImg1.png");
  dogImg = loadImage("images/dogImg.png");
}

function setup() {
	createCanvas(800,500);
  database = firebase.database();
  database.ref('Food').on("value", function(data){
    foodStock = data.val();

  })

  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodObj = new Food(20,12);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  

background(46,139,87);

  //if(keyDown(UP_ARROW)){
   //writeStock(foodStock);
   //dog.addImage(happyDog);
  //}

  foodObj.display();

  fill(255);
  textSize(15);
  if(lastFed>=12){
    text("last feed: "+ lastFed%12 +"PM", 350,30);
  }
  else if(lastFed == 0){
    text("last feed:12AM",350,30);
  }
  else{
    text("last feed: "+ lastFed + "AM",350,30);
  }
  
  drawSprites();
  //add styles here
  fill("black");
   text(foodStock, 10,10);

}


function writeStock(x){
  if(x<=0){
    x =0
  }
  else{
    x = x-1
  }
    database.ref('/').update({
     Food:x
    })
}


function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
   Feedtime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}