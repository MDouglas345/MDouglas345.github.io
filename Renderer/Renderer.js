/*
  This file is argueably the most complicated to deal with.
  Should only contain data relevant to sprites, (animated sprites?)
*/

/*
  Main idea : This class initalizes and stores all Images in an Array with a unique ID to access them.
  There will be a Sprite class that contains the ID to the relevant Sprite ID in the array.
  GameObject will contain a Sprite object
*/

/*
  Another idea :
  Instead of intializing and storing direct images, I have a new class called DrawRes.
  This will contain a Sprite and a function of what to do when Draw is called.
  Draw will take a reference to the canvas and any other data relevant for the object being drawn.

  A step further would be to encapsulate the methods that are used to draw since they are likely to be resued.
  So in all, DrawRes would contain a Sprite ID and a reference to a DrawObject object, which would contain a
  function that accepts a context and any relevant information.
*/

class Renderer{
  constructor(e){

    this.GameViewContext = this.GameArea = document.getElementById("GameView").getContext("2d");
    this.Entities = e;
    this.Images = [];
  }

  Update(){
    console.log("Game is rendering");
    
    this.Entities.forEach(item =>{

      item.DrawRes.Draw();

    });
  }

}
