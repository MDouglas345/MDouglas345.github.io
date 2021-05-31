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
  }

  Draw(context, imageRef, pos, scale, rot){
    this.DrawFunc.Draw(context, imageRef, pos, scale, rot);
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
