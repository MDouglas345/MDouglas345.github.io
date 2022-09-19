import * as P from './PickUp.js';
import * as DR from '../Renderer/DrawRes.js'
import * as CT from '../Collisions/CircleCT.js'

export class BATPickUp extends P.PickUpable{
  constructor(){
    super();
    //this.DrawRes = new PlaceholderRes(new Vec2(50,50), 5, "#800080");
    this.DrawRes = new DR.BATPickUpRes();
    this.CollisionType = new CT.CircleCollider(40);
    this.CollisionLayer = 6;
    this.Rigidbody.Enable();

  }

  OnPickUp(object){
    console.log(object);
    object.BATCounter.variable++;
    this.NeedsDelete = true;
  }

  Update(felapsed){
    this.Rigidbody.Vel.Mult(0.99);
  }
}
