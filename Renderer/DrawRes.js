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
    this.DrawFunc = new BackgroundFunction("black");
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

class AstroidRes extends DrawRes{
  constructor(dim){
    super();
    this.SpriteID = 9;
    this.DrawFunc = new BRotatedDrawFunction();
    this.Layer = 3;
    this.Dimensions = dim;
  }
}

class StarRes extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 5;
    this.DrawFunc = new BRotatedDrawFunction();
    this.Layer = 1;
    this.Dimensions;
  }
}

class DebugObjectSprite extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 1;
    this.DrawFunc = new BRotatedDrawFunction();
    this.Layer = 2;
  }
}

class PlayerThrusterRes extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 6;
    this.DrawFunc = new RotatedOpacityDrawFunction();
    this.Dimensions =new Vec2(15,15);
    this.Layer = 3;
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

class ScouterRes extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 12;
    this.DrawFunc = new BRotatedDrawFunction();
    this.Dimensions = new Vec2(250, 275);
    this.Layer = 3;
  }
}

class ShieldRes extends DrawRes{
  constructor(dim){
    super();
    this.SpriteID = 13;
    this.DrawFunc = new RotatedOpacityDrawFunction();
    this.Dimensions = dim;
    this.Layer = 3;
    this.Opacity = 0;
  }
}

class BulletRes extends DrawRes{
  constructor(id){
    super();
    this.SpriteID = id;
    this.DrawFunc = new BRotatedDrawFunction();
    this.Dimensions = new Vec2(30,10);
    this.Layer = 2;
  }
}

class ShipDebrisRes extends DrawRes{
  constructor(){
    super();
     let chance = getRandomFloat(1);
     if (chance < 0.3){ this.SpriteID = 16;}
     else if (chance < 0.6) { this.SpriteID = 17;}
     else{this.SpriteID = 18;}

     this.DrawFunc = new BRotatedDrawFunction();
     this.Dimensions = new Vec2(100,100);
     this.Layer = 3;

  }
}

class UIRes extends DrawRes{
  constructor(){
    super();
    this.ScreenLocation = new Vec2(0,0);
    this.Layer = 5;
  }
}

class UITextRes extends UIRes{
  constructor(Text, loc, font){
    super();
    this.TextToDisplay = Text;
    this.ScreenLocation = loc;
    this.Font = font;
    this.FillStyle = "#FFFFFF";
    this.StrokeStyle = "#FFFFFF";
    this.StrokeStrength = 1;
    this.DrawFunc = new UITextFillFunction(this);
  }
}

class UITitleTextRes extends UIRes{
  constructor(Text, loc, font){
    super();
    this.TextToDisplay = Text;
    this.ScreenLocation = loc;
    this.Font = font;
    this.FillStyle = "#FB542B";
    this.StrokeStyle = "#FFFFFF";
    this.StrokeStrength = 4;
    this.DrawFunc = new UITextFillStrokeFunction(this);
  }
}

class UIBarRes extends UIRes{
  constructor(Pos, CurrentValue, MaxValue, MinValue, width, height, ForegroundBarColor, BackgroundColor){
    super();
    this.CurrentValue = CurrentValue;
    this.MaxValue = MaxValue;
    this.MinValue = MinValue;
    this.ForegroundColor = ForegroundBarColor;
    this.BackgroundColor = BackgroundColor;
    this.ScreenLocation = Pos;
    this.Width = width;
    this.Height = height;

    this.DrawFunc = new UIBarDrawFunctionBasic(this);
  }
}

class UIImageRes extends UIRes{
  constructor(spriteid, loc, dim){
    super();
    this.ScreenLocation = loc;
    this.Dimensions = dim;
    this.SpriteID = spriteid;

    this.DrawFunc = new UIImageDraw(this);
  }
}

class BATPickUpRes extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 19;
    this.DrawFunc = new BRotatedDrawFunction();
    this.Dimensions = new Vec2(50,50);
    this.Layer = 4;
  }
}

class StarFieldRes extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 23;
    this.Layer = 2;
    this.Dimensions = new Vec2(100000,100000);
    this.DrawFunc = new BRotatedDrawFunction();
  }
}
