class Food{
    constructor(foodStock,lastFed){
    this.image = loadImage("Milk.js");
    }

    getFoodStock(){
      var foodStockRef  = database.ref('food');
      gameStateRef.on("value",function(data){
         food = data.val();
      })
     
    }

    update(foodS){
      database.ref('food').update({
        food : foodStock
      })
    }
  

    
     display(){
    if(keyIsDown(UP_ARROW) && foodStock.index != null){
      image(this.image, 10,10);
      
    }
  }
}