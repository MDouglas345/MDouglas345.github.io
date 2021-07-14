class ShipDebris extends GameObject{
  constructor(){
    super();
    this.Rigidbody.Enable();
    this.DrawRes = new ShipDebrisRes();
    this.TimedDelete();
  }


  async TimedDelete(){
    new Promise(resolve => {
      setTimeout(() =>{
        this.NeedsDelete = true;
      }, 5000)
    });
  }
}
