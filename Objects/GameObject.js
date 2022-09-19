/*

  This File contains the core GameObject object.
  Most, if not all, game objects will extend from this class.
  This Object will aggregate data types (Rigidbody, Sprite, etc) and null them.
  If an actual object (Player, for example) needs these data types, they will initalize them in their own constructor.

*/
import * as RB from '../Physics/Rigidbody.js';
import * as DR from '../Renderer/DrawRes.js';
import * as Vec from '../Utility/Utility.js';
import * as Col from '../Collisions/NoCollider.js';
import * as U from '../Utility/Utility.js'

export class GameObject{
  constructor(){
    this.Name = "Basic Object";
    this.Rigidbody = new RB.Rigidbody();
    this.Rigidbody.Disable();
    this.DrawRes = new DR.DrawRes();
    this.Children = [];
    this.ParentOffset = new Vec.Vec2(0,0);
    this.NeedsDelete = false;

    this.CollisionType = new Col.NoCollider();
    this.CollisionLayer = -1;

    this.TwoObject;

  }
  Init(){

  }
  EarlyUpdate(felapsed){

  }

  Update(felapsed){

  }

  LateUpdate(felapsed){

  }

  GetRelativePos(pos){

  }

  GetRelativePosWithOff(off){
    let baseVec = GetVectorFromAngle(this.Rigidbody.Orien).rMult(off);
    let pos = this.Rigidbody.Pos.rAdd(baseVec);
    return pos;
  }

  Center(){
    //return new Vec2(this.Rigidbody.Pos.X - (this.DrawRes.Dimensions.X/2), this.Rigidbody.Pos.Y - (this.DrawRes.Dimensions.Y/2));
    return new U.Vec2(this.Rigidbody.Pos.X, this.Rigidbody.Pos.Y );
  }

  OnCollide(object){

  }

  Delete(){
    this.Name = null;
    this.Rigidbody = null;
    this.DrawRes = null;
    this.Children = null;
    this.ParentOffset = null;
    this.NeedsDelete = null;
  }

}
