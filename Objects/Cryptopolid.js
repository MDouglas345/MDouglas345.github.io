import * as DR from '../Renderer/DrawRes.js'
import * as U from '../Utility/Utility.js'
import * as DF from '../Renderer/DrawFunction.js'
import * as P from './Planet.js'
export class Cryptopolid extends P.Planet{
  constructor(){
    super();
    this.Name = "Cryptopolid";
    this.DrawRes = new DR.DrawRes();
    this.DrawRes.Layer = 2
    this.DrawRes.Dimensions = new U.Vec2(1200,1200);
    this.DrawRes.SpriteID = 8;
    this.DrawRes.DrawFunc = new DF.BRotatedDrawFunction();
    this.Rigidbody.Pos = new U.Vec2(5000,-1500);
  }

}
