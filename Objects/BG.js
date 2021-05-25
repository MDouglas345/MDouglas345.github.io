class BackgroundGameObject extends GameObject{
  constructor(){
    super();
    this.DrawRes = new DrawRes();
        this.Rigidbody = new Rigidbody();
  }

  Update(felapsed){

  }
}

class DemoP1 extends BackgroundGameObject{
  constructor(Focus, Offset){
    super();

    this.Focus = Focus;
    this.Offset = Offset;
    this.DrawRes = new DrawRes();
    this.DrawRes.Layer = 0;
    this.DrawRes.SpriteID = 2;
    this.DrawRes.DrawFunc = new BRotatedDrawFunction();
    this.DrawRes.Dimensions = new Vec2(3000,3000);
  }

  Update(felapsed){
    let off = this.Rigidbody.Pos.rSub(this.Focus.Rigidbody.Pos);
    //this.Rigidbody.Pos.Add(off.rMult(0.05));
  }
}

class DemoP2 extends BackgroundGameObject{
  constructor(Focus, Offset){
    super(Focus, Offset);
    this.DrawRes = new DrawRes();
    this.DrawRes.Layer = 1;
  }
}

class DemoP3 extends BackgroundGameObject{
  constructor(Focus, Offset){
    super(Focus, Offset);
    this.DrawRes = new DrawRes();
    this.DrawRes = 2;
  }
}
