/*
  All Rendering types will go here. This encapsulation makes it easy to have many different configurations
  for objects to swap even in runtime.
  Consists of an ID that matches with Renderer.ImageRefs array
  A reference to a class that handles the actual rendering keyCode
  A Dimensions which mirrors the in game size of an object.
*/
import * as DF from './DrawFunction.js';
import * as Vec from '../Utility/Utility.js';
import * as U from '../Utility/Utility.js'

export class DrawRes{
  constructor(){
    this.SpriteID = -1;
    this.DrawFunc = new DF.DrawFunction();
    this.Layer = 0;
    this.Dimensions = new Vec.Vec2(1,1);
    this.Opacity = 1;
  }

  Draw(context, imageRef, pos, scale, rot, opacity){
    this.DrawFunc.Draw(context, imageRef, pos, scale, rot, opacity);
  }
}

export class DebugSquareRes extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 0;
    this.DrawFunc = new DF.DebugSquareFunction();
    this.Layer = 0;
  }
}

export class SpaceBlackRes extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 0;
    this.DrawFunc = new DF.BackgroundFunction("black");
    this.Layer = 0;
  }
}

export class PlayerRes extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 0;
    this.DrawFunc = new DF.BRotatedDrawFunction();
    this.Layer = 3;
  }
}

export class DefaultProjectile extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 1;
    this.DrawFunc = new DF.BRotatedDrawFunction();
    this.Layer = 2;
  }
}

export class AstroidRes extends DrawRes{
  constructor(dim){
    super();
    this.SpriteID = 9;
    this.DrawFunc = new DF.BRotatedDrawFunction();
    this.Layer = 3;
    this.Dimensions = dim;
  }
}

export class StarRes extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 5;
    this.DrawFunc = new DF.BRotatedDrawFunction();
    this.Layer = 1;
    this.Dimensions;
  }
}

export class DebugObjectSprite extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 1;
    this.DrawFunc = new DF.BRotatedDrawFunction();
    this.Layer = 2;
  }
}

export class PlayerThrusterRes extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 6;
    this.DrawFunc = new DF.RotatedOpacityDrawFunction();
    this.Dimensions =new Vec.Vec2(15,15);
    this.Layer = 3;
  }
}

export class QuadTreeNodeRes extends DrawRes{
  constructor(dim){
    super();
    this.SpriteID = 0;
    this.DrawFunc = new DF.NodeDrawFunction();
    this.Dimensions = dim;
    this.Layer = 5;
  }
}

export class PlaceholderRes extends DrawRes{
  constructor(dim, layer, color){
    super();
    this.SpriteID = 0;
    this.DrawFunc = new DF.PlaceHolderDrawFunction(color);
    this.Dimensions = dim;
    this.Layer = layer;
  }
}

export class ScouterRes extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 12;
    this.DrawFunc = new DF.BRotatedDrawFunction();
    this.Dimensions = new Vec.Vec2(250, 275);
    this.Layer = 3;
  }
}

export class ShieldRes extends DrawRes{
  constructor(dim){
    super();
    this.SpriteID = 13;
    this.DrawFunc = new DF.RotatedOpacityDrawFunction();
    this.Dimensions = dim;
    this.Layer = 3;
    this.Opacity = 0;
  }
}

export class BulletRes extends DrawRes{
  constructor(id){
    super();
    this.SpriteID = id;
    this.DrawFunc = new DF.BRotatedDrawFunction();
    this.Dimensions = new U.Vec2(30,10);
    this.Layer = 2;
  }
}

export class ShipDebrisRes extends DrawRes{
  constructor(){
    super();
     let chance = U.getRandomFloat(1);
     if (chance < 0.3){ this.SpriteID = 16;}
     else if (chance < 0.6) { this.SpriteID = 17;}
     else{this.SpriteID = 18;}

     this.DrawFunc = new DF.BRotatedDrawFunction();
     this.Dimensions = new U.Vec2(100,100);
     this.Layer = 3;

  }
}

export class UIRes extends DrawRes{
  constructor(){
    super();
    this.ScreenLocation = new Vec.Vec2(0,0);
    this.Layer = 5;
  }
}

export class UITextRes extends UIRes{
  constructor(Text, loc, font){
    super();
    this.TextToDisplay = Text;
    this.ScreenLocation = loc;
    this.Font = font;
    this.FillStyle = "#FFFFFF";
    this.StrokeStyle = "#FFFFFF";
    this.StrokeStrength = 1;
    this.DrawFunc = new DF.UITextFillFunction(this);
  }
}

export class UITitleTextRes extends UIRes{
  constructor(Text, loc, font){
    super();
    this.TextToDisplay = Text;
    this.ScreenLocation = loc;
    this.Font = font;
    this.FillStyle = "#FB542B";
    this.StrokeStyle = "#FFFFFF";
    this.StrokeStrength = 4;
    this.DrawFunc = new DF.UITextFillStrokeFunction(this);
  }
}

export class UIBarRes extends UIRes{
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

    this.DrawFunc = new DF.UIBarDrawFunctionBasic(this);
  }
}

export class UIImageRes extends UIRes{
  constructor(spriteid, loc, dim){
    super();
    this.ScreenLocation = loc;
    this.Dimensions = dim;
    this.SpriteID = spriteid;

    this.DrawFunc = new DF.UIImageDraw(this);
  }
}

export class BATPickUpRes extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 19;
    this.DrawFunc = new DF.BRotatedDrawFunction();
    this.Dimensions = new Vec.Vec2(50,50);
    this.Layer = 4;
  }
}

export class StarFieldRes extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 23;
    this.Layer = 2;
    this.Dimensions = new Vec.Vec2(100000,100000);
    this.DrawFunc = new DF.BRotatedDrawFunction();
  }
}
