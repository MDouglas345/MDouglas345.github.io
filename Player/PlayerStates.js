import * as M from '../main.js'
import * as U from '../Utility/Utility.js'

export class PlayerState{
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

export class PlayerNormalState extends PlayerState{
  constructor(player){
    super(player);

  }

  EarlyUpdate(felapsed){
    if (M.InputSystem.GetKeyState('A') == "keydown"){
      //this.Rigidbody.Orien -= 5 * felapsed;
      this.RigidbodyRef.AddAngVel(-5 * felapsed);
    }
    if (M.InputSystem.GetKeyState('D') == "keydown"){
      //this.Rigidbody.Orien += 5 * felapsed;
      this.RigidbodyRef.AddAngVel(5 * felapsed);
    }

    if (M.InputSystem.GetKeyState('W') == "keydown"){
      let Dir = U.GetVectorFromAngle(this.RigidbodyRef.Orien);
      this.RigidbodyRef.AddVel(Dir.rMult(8));

    }

    this.RigidbodyRef.AngVel *= 0.99;
    this.RigidbodyRef.Vel.Mult(0.99);
    
    //console.log(this.RigidbodyRef.Vel, this.RigidbodyRef.AngVel)
  }
  Update(felapsed){

  }

  LateUpdate(felapsed){
    if (M.InputSystem.GetKeyState(' ') == "keydown"){
      this.Master.FireBullet();
    }
  }
}
