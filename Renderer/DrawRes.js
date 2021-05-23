class DrawRes{
  constructor(){
    this.SpriteID = -1;
    this.DrawFunc = new DrawFunction();
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
  }
}

class PlayerRes extends DrawRes{
  constructor(){
    super();
    this.SpriteID = 0;
    this.DrawFunc = new BRotatedDrawFunction();
  }
}
