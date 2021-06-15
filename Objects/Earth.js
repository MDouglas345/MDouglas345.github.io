class Earth extends Planet{
  constructor(){
    super();
    this.DrawRes = new DrawRes();
    this.DrawRes.Layer = 2
    this.DrawRes.Dimensions = new Vec2(700,600);
    this.DrawRes.SpriteID = 7;
    this.DrawRes.DrawFunc = new BRotatedDrawFunction();

    this.CollisionType = new CircleCollider(200);
    this.CollisionLayer = 1;
  }
}
