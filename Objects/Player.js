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
    if (Global.InputSystem.GetKeyState('A') == "keydown"){
      this.Rigidbody.Orien += 5 * felapsed;
    }
    if (Global.InputSystem.GetKeyState('D') == "keydown"){
      this.Rigidbody.Orien -= 5 * felapsed;
    }
    if (Global.InputSystem.GetKeyState('W') == "keydown"){

    }
  }

Update(){
  //console.log(this.Rigidbody.Orien);
  }
}
