class CarrierShip extends Enemy{
  constructor(){
    super();
    this.Rigidbody.Enable();
    this.DrawRes = new PlaceholderRes(new Vec2(300,110), 4, "#FF0000")
    this.ChildrenLimit = 15;
    this.Children = [];

    this.States = {

    };
    
    this.ActiveState;
  }
}
