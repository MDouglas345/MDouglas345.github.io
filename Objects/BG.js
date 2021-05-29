var Global = window || global;
class BackgroundGameObject extends GameObject{
  constructor(){
    super();
    this.DrawRes = new DrawRes();
    this.Rigidbody = new NoRigidbody();
  }

  Update(felapsed){

  }
}

class BackgroundMaster extends GameObject{
  constructor(){
    super();
    this.BGLayers = [];
    console.log(this.BGLayers);

  }

  SetDimensions(vec){
    this.BGLayers.forEach(item =>{
      item.DrawRes.Dimensions = vec;
    });
  }

  SetLayerSprite(layer, id){
    this.BGLayers[layer].DrawRes.SpriteID = id;
  }

  AddLayer(){
    let layer = new BackgroundLayer();
    this.BGLayers.push(layer);
    Game.AddObject(layer);
  }
}

class BackgroundLayer extends GameObject{
  constructor(){
    super();
    this.DrawRes = new DrawRes();
    this.Rigidbody = new NoRigidbody();
    this.DrawRes.DrawFunc = new BRotatedDrawFunction();
  }
}

class DemoBGMaster extends BackgroundMaster{
  constructor(){
    super();

    this.AddLayer();
    this.AddLayer();
    this.AddLayer();



    this.SetDimensions(new Vec2(3000,3000));

    this.SetLayerSprite(0,2);
    this.SetLayerSprite(1,3);
    this.SetLayerSprite(2,4);

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
  }
}

class DemoP2 extends BackgroundGameObject{
  constructor(Focus, Offset){
    super(Focus, Offset);
    this.DrawRes = new DrawRes();
    this.DrawRes.Layer = 1;
    this.DrawRes.SpriteID = 3;
    this.DrawRes.DrawFunc = new BRotatedDrawFunction();
    this.DrawRes.Dimensions = new Vec2(3000,3000);
  }
}

class DemoP3 extends BackgroundGameObject{
  constructor(Focus, Offset){
    super(Focus, Offset);
    this.DrawRes = new DrawRes();
    this.DrawRes.Layer  = 2;
    this.DrawRes.SpriteID = 4;
    this.DrawRes.DrawFunc = new BRotatedDrawFunction();
    this.DrawRes.Dimensions = new Vec2(3000,3000);
  }
}
