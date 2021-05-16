class DrawRes{
  constructor(){
    this.SpriteID = 0;
    this.DrawFunc = new DrawFunction();
  }

  Draw(){

  }
}

class DebugSquareRes extends DrawRes{
  constructor(){
    this.SpriteID = 1;
    this.DrawFunction = bDrawFunction();
  }
}
