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
    this.Children = [];
    this.ParentOffset = new Vec2(0,0);
    this.NeedsDelete = false;

  }
  Init(){

  }
  HandleChildren(){
    this.Children.forEach(item =>{
      //Need to rotate the object based on the parent offset
      //Post pone
      item.Rigidbody.Pos = this.Rigidbody.Pos.rAdd(this.ParentOffset);
    });
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

  Delete(){
    this.Name = null;
    this.Rigidbody = null;
    this.DrawRes = null;
    this.Children = null;
    this.ParentOffset = null;
    this.NeedsDelete = null;
  }
}
