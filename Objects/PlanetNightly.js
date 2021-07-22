class PlanetNightly extends Planet{
  constructor(){
    super();
    this.DrawRes = new DrawRes();
    this.DrawRes.Layer = 2
    this.DrawRes.Dimensions = new Vec2(3500,3300);
    this.DrawRes.SpriteID = 20;
    this.DrawRes.DrawFunc = new BRotatedDrawFunction();
    this.Rigidbody.Pos = new Vec2(5000,20);
  }
}
