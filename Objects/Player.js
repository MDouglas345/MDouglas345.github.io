var Global = window || global;

class Player extends GameObject{
  constructor(){
    super();
    this.Name = "Player";
    this.Rigidbody = new Rigidbody();
    this.DrawRes = new PlayerRes();
    this.DrawRes.Dimensions = new Vec2(50,50);
    this.Rigidbody.Mass = 5;
  }
  EarlyUpdate(felapsed){

  }

Update(){
  console.log(this.Rigidbody.Orien);
  }
}
