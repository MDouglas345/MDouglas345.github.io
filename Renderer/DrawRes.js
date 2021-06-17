/*
  All Rendering types will go here. This encapsulation makes it easy to have many different configurations
  for objects to swap even in runtime.
  Consists of an ID that matches with Renderer.ImageRefs array
  A reference to a class that handles the actual rendering keyCode
  A Dimensions which mirrors the in game size of an object.
*/

class DrawRes{
  constructor(){
    this.SpriteID = -1;
    this.DrawFunc = new DrawFunction();
    this.Layer = 0;
    this.Dimensions = new Vec2(1,1);
    this.Opacity = 1;
  }

  Draw(context, imageRef, pos, scale, rot, opacity){
    this.DrawFunc.Draw(context, imageRef, pos, scale, rot, opacity);
  }
}

class DebugSquareRes extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 0;
    this.DrawFunc = new DebugSquareFunction();
    this.Layer = 0;
  }
}

class SpaceBlackRes extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 0;
    this.DrawFunc = new BGBlack();
    this.Layer = 0;
  }
}

class PlayerRes extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 0;
    this.DrawFunc = new BRotatedDrawFunction();
    this.Layer = 3;
  }
}

class DefaultProjectile extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 1;
    this.DrawFunc = new BRotatedDrawFunction();
    this.Layer = 2;
  }
}

class DebugObjectSprite extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 1;
    this.DrawFunc = new BRotatedDrawFunction();
    this.Layer  = 2;
  }
}

class PlayerThrusterRes extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 6;
    this.DrawFunc = new RotatedOpacityDrawFunction();
    this.Dimensions =new Vec2(10,10);
    this.Layer = 2;
  }
}

class QuadTreeNodeRes extends DrawRes{
  constructor(dim){
    super();
    this.SpriteID = 0;
    this.DrawFunc = new NodeDrawFunction();
    this.Dimensions = dim;
    this.Layer = 5;
  }
}

class PlaceholderRes extends DrawRes{
  constructor(dim, layer, color){
    super();
    this.SpriteID = 0;
    this.DrawFunc = new PlaceHolderDrawFunction(color);
    this.Dimensions = dim;
    this.Layer = layer;


  }
}
