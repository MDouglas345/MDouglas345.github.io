import * as GO from './GameObject.js'
import * as DR from '../Renderer/DrawRes.js'
export class ShipDebris extends GO.GameObject{
  constructor(){
    super();
    this.Rigidbody.Enable();
    this.DrawRes = new DR.ShipDebrisRes();
    this.TimedDelete();
  }


  async TimedDelete(){
    new Promise(resolve => {
      setTimeout(() =>{
        this.NeedsDelete = true;
      }, 5000)
    });
  }
}
