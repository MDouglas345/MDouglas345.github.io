class DebugObject extends GameObject{
  constructor(){
    super();
    this.Name = "D1";
    this.Rigidbody = new Rigidbody();
    this.DrawRes = new DebugSquareRes();
    this.Rigidbody.Mass = 0.5;
  }
}
