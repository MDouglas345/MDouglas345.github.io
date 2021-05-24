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

/*
  Additonal changes, Layers! Instead of taking a reference to all entities, Renderer will have a multidimensional array that
  holds all the objects sorted by which layer they are on. By convention, Layer 0 will be rendererd first, then 1.. etc
  This means that all objects that have a DrawRes object, will also have an attribute called Layers, which is an ID
  When a new object is created, static AddObject will Add the object to the Game.Entities and append that object to Layers[object.DrawRes.Layer]!

  TLDR : Objects that are meant to be in the forefront need to be at a higher Layer value i.e 3. Layer 0 is always going to be rendered first and things go on top.
*/

class Renderer{
  static Layers = [];
  constructor(e, c){

    this.GameViewContext = document.getElementById("GameView").getContext("2d");
    this.CanvasWidth = this.GameViewContext.canvas.width;
    this.CanvasHeight = this.GameViewContext.canvas.height;

    this.Layers = Renderer.Layers;
    this.Layers.push([]);// Layer 0
    this.Layers.push([]);// Layer 1
    this.Layers.push([]);// Layer 2


    //this.GameViewContext.scale(0.5,0.5);

    this.Entities = e;
    this.m_Camera = c;

    this.Images = [];

    this.Images.push(new Image());
    this.Images.push(new Image());

    this.Images[0].src = "Resources/brave-lion@3x.jpeg";
    this.Images[1].src = "Resources/laserBullet.png";
  }

  Update(){

    /*this.Entities.forEach(item =>{

      var ScreenSpace = this.WorldToScreen(item.Rigidbody);
      //console.log(this.GameViewContext, this.Images[item.DrawRes.SpriteID], ScreenSpace, item.DrawRes.Dimensions.rMult(this.m_Camera.Zoom) , item.Rigidbody.Orien);
      item.DrawRes.Draw(this.GameViewContext, this.Images[item.DrawRes.SpriteID], ScreenSpace, item.DrawRes.Dimensions.rMult(this.m_Camera.Zoom) , item.Rigidbody.Orien);

    });*/

    this.Layers.forEach(layer => {
      layer.forEach(item =>{
        var ScreenSpace = this.WorldToScreen(item.Rigidbody);
        item.DrawRes.Draw(this.GameViewContext, this.Images[item.DrawRes.SpriteID], ScreenSpace, item.DrawRes.Dimensions.rMult(this.m_Camera.Zoom) , item.Rigidbody.Orien);
      })
    });

  }

  Debug(){
    this.GameViewContext.fillRect(0 ,0 ,100 ,100);
  }

  Clear(){
    this.GameViewContext.clearRect(0,0,this.CanvasWidth, this.CanvasHeight);
  }

  WorldToScreen(item){
    let screenpos = item.Pos.rSub(this.m_Camera.Rigidbody.Pos);
    screenpos.Mult(this.m_Camera.Zoom);

    return screenpos;
  }

  static AddObject(object){
    this.Layers[object.DrawRes.Layer].push(object);
  }

}
