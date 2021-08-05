var Global = window || global;

class PlayerState{
  constructor(player){
    this.Master = player;
    this.RigidbodyRef = player.Rigidbody;

  }

  EarlyUpdate(felapsed){

  }

  Update(felapsed){

  }

  EarlyUpdate(felapsed){

  }

  EnterState(){

  }

  ExitState(){

  }
}

class PlayerNormalState extends PlayerState{
  constructor(player){
    super(player);

  }

  EarlyUpdate(felapsed){
    if (Global.InputSystem.GetKeyState('A') == "keydown"){
      //this.Rigidbody.Orien -= 5 * felapsed;
      this.RigidbodyRef.AddAngVel(-5 * felapsed);
    }
    if (Global.InputSystem.GetKeyState('D') == "keydown"){
      //this.Rigidbody.Orien += 5 * felapsed;
      this.RigidbodyRef.AddAngVel(5 * felapsed);
    }

    if (Global.InputSystem.GetKeyState('W') == "keydown"){
      let Dir = GetVectorFromAngle(this.RigidbodyRef.Orien);
      this.RigidbodyRef.AddVel(Dir.rMult(8));

    }

    this.RigidbodyRef.AngVel *= 0.99;
    this.RigidbodyRef.Vel.Mult(0.99);
    
    console.log(this.RigidbodyRef.Vel, this.RigidbodyRef.AngVel)
  }
  Update(felapsed){

  }

  LateUpdate(felapsed){
    if (Global.InputSystem.GetKeyState(' ') == "keydown"){
      this.Master.FireBullet();
    }
  }
}
