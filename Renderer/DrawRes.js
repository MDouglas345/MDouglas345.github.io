class DrawRes{
  constructor(){
    this.SpriteID = -1;
    this.DrawFunc = new DrawFunction();
  }

  Draw(context, imageRef, pos, scale){
    this.DrawFunc.Draw(context, imageRef, pos, scale);
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
    this.DrawFunc = new BDrawFunction();
  }
}
