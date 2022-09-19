import * as GO from './GameObject.js'
import * as DR from '../Renderer/DrawRes.js'
export class StarField extends GO.GameObject{
  constructor(){
    super();
    this.DrawRes = new DR.StarFieldRes();
    this.Rigidbody.Enable();
  }
}
