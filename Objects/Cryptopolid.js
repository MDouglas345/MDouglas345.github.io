class Cryptopolid extends Planet{
  constructor(){
    super();
    this.DrawRes = new DrawRes();
    this.DrawRes.Layer = 2
    this.DrawRes.Dimensions = new Vec2(1200,1200);
    this.DrawRes.SpriteID = 8;
    this.DrawRes.DrawFunc = new BRotatedDrawFunction();
    this.Rigidbody.Pos = new Vec2(0,0);
  }

}
