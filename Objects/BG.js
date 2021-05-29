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

class BackgroundMaster extends BackgroundGameObject{
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

class BackgroundLayer extends BackgroundGameObject{
  constructor(){
    super();
    this.DrawRes.DrawFunc = new BRotatedDrawFunction();
  }
}

class DemoBGMaster extends BackgroundMaster{
  constructor(focus){
    super();
    this.Focus = focus;

    this.AddLayer();
    this.AddLayer();
    this.AddLayer();

    this.SetDimensions(new Vec2(3000,3000));

    this.SetLayerSprite(0,2);
    this.SetLayerSprite(1,3);
    this.SetLayerSprite(2,4);

    this.pIndex = [];
    this.pIndex.push(0.9);
    this.pIndex.push(0.5);
    this.pIndex.push(0.2);

  }

  Update(felapsed){
    let i = 0;
    this.BGLayers.forEach(layer =>{
      layer.Rigidbody.Pos.X = -this.Focus.Rigidbody.Pos.X * this.pIndex[i];
      i++;
    });
  }
}
