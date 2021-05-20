var Global = window || global;

class Player extends GameObject{
  constructor(){
    super();
    this.Name = "Player";
    this.Rigidbody = new Rigidbody();
    this.DrawRes = new PlayerRes();
    this.Rigidbody.Mass = 0.5;
  }

Update(){
  console.log("Player updating");
  
  }
}
