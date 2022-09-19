import * as DR from '../Renderer/DrawRes.js'
import * as U from '../Utility/Utility.js'
import * as DF from '../Renderer/DrawFunction.js'
import * as P from './Planet.js'
export class PlanetNightly extends P.Planet{
  constructor(){
    super();
    this.Name = "Nightly";
    this.DrawRes = new DR.DrawRes();
    this.DrawRes.Layer = 2
    this.DrawRes.Dimensions = new U.Vec2(3500,3300);
    this.DrawRes.SpriteID = 20;
    this.DrawRes.DrawFunc = new DF.BRotatedDrawFunction();
    this.Rigidbody.Pos = new U.Vec2(1500,12000);
  }
}
