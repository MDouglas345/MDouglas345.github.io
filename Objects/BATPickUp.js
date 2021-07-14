class BATPickUp extends PickUpable{
  constructor(){
    super();
    this.DrawRes = new PlaceholderRes(new Vec2(50,50), 5, "#800080");
    this.CollisionType = new CircleCollider(20);
    this.CollisionLayer = 6;
    this.Rigidbody.Enable();

  }

  OnPickUp(object){
    object.BATCounter++;
    this.NeedsDelete = true;
  }

  Update(felapsed){
    this.Rigidbody.Vel.Mult(0.99);
  }
}
