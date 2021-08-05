class StarField extends GameObject{
  constructor(){
    super();
    this.DrawRes = new StarFieldRes();
    this.Rigidbody.Enable();
  }
}
