/*

  This File contains the core GameObject object.
  Most, if not all, game objects will extend from this class.
  This Object will aggregate data types (Rigidbody, Sprite, etc) and null them.
  If an actual object (Player, for example) needs these data types, they will initalize them in their own constructor.

*/
class GameObject{
  constructor(){
    this.Name = "Basic Object";
    this.Rigidbody = new NoRigidbody();
    this.DrawRes = new DrawRes();

  }
  Init(){

  }
  EarlyUpdate(felapsed){

  }

  Update(felapsed){

  }

  LateUpdate(felapsed){

  }

  Center(){
    return new Vec2(this.Rigidbody.Pos.X - (this.DrawRes.Dimensions.X/2), this.Rigidbody.Pos.Y - (this.DrawRes.Dimensions.Y/2));
  }
}
