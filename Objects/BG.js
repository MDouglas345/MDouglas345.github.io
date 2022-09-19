var Global = window || global;
import * as Dr from '../Renderer/DrawRes.js';
import * as R from '../Physics/Rigidbody.js';
import * as DR from '../Renderer/DrawRes.js';
import * as Vec from '../Utility/Utility.js';
import * as M from '../main.js';
import * as GO from './GameObject.js'

export class BackgroundGameObject extends GO.GameObject{
  constructor(){
    super();
    this.DrawRes = new Dr.DrawRes();
    this.Rigidbody = new R.NoRigidbody();
  }

  Update(felapsed){

  }
}

export class BackgroundMaster extends BackgroundGameObject{
  constructor(){
    super();
    this.BGLayers = [];

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
    M.GameSystem.AddObject(layer);
  }
}

export class BackgroundLayer extends BackgroundGameObject{
  constructor(){
    super();
    this.DrawRes.DrawFunc = new DR.BRotatedDrawFunction();
  }
}

export class SpaceBackground extends BackgroundMaster{
  constructor(){
    super();
    this.DrawRes = new DR.SpaceBlackRes();
    this.DrawRes.Dimensions = new Vec.Vec2(6000,5000);
    this.DrawRes.Layer = 0;
  }
}

export class DemoBGMaster extends BackgroundMaster{
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
