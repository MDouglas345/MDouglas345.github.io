/*

  This File contains the core GameObject object.
  Most, if not all, game objects will extend from this class.
  This Object will aggregate data types (Rigidbody, Sprite, etc) and null them.
  If an actual object (Player, for example) needs these data types, they will initalize them in their own constructor.

*/
class GameObject{
  constructor(){
    this.Name = "Basic Object";
    this.Rigidbody = new Rigidbody();
    this.Rigidbody.Disable();
    this.DrawRes = new DrawRes();
    this.Children = [];
    this.ParentOffset = new Vec2(0,0);
    this.NeedsDelete = false;
    this.CollisionType = new NoCollider();

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
    return new Vec2(this.Rigidbody.Pos.X, this.Rigidbody.Pos.Y );
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
