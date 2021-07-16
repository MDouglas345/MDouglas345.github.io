class BATPickUp extends PickUpable{
  constructor(){
    super();
    //this.DrawRes = new PlaceholderRes(new Vec2(50,50), 5, "#800080");
    this.DrawRes = new BATPickUpRes();
    this.CollisionType = new CircleCollider(40);
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
