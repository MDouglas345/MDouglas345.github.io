var Global = window || global;

/*
  Script that controls the player. Lots of magic can happen here. Especially with encapsulation!
*/

class Player extends GameObject{
  constructor(){
    super();
    this.Name = "Player";
    this.Rigidbody = new Rigidbody();
    this.DrawRes = new PlayerRes();
    this.DrawRes.Dimensions = new Vec2(175,200);
    this.Rigidbody.Mass = 5;
    this.Fired = false;
    this.Camera;

    this.StarSystem = new psStarParallax(500,this);
    Game.AddObject(this.StarSystem);
  }



  EarlyUpdate(felapsed){

    if (Global.InputSystem.GetKeyState('A') == "keydown"){
      //this.Rigidbody.Orien -= 5 * felapsed;
      this.Rigidbody.AddAngVel(-5 * felapsed);
    }
    if (Global.InputSystem.GetKeyState('D') == "keydown"){
      //this.Rigidbody.Orien += 5 * felapsed;
      this.Rigidbody.AddAngVel(5 * felapsed);
    }
    if (Global.InputSystem.GetKeyState(' ') == "keydown"){
      this.FireBullet();
    }
    if (Global.InputSystem.GetKeyState('W') == "keydown"){
      let Dir = Vec2.GetVectorFromAngle(this.Rigidbody.Orien);
      this.Rigidbody.AddVel(Dir.rMult(15));

    }

    this.Rigidbody.AngVel *= 0.99;

  }

Update(){

  }

  Firing(){
    return new Promise ( resolve => {
      setTimeout(() =>{
        //Love JS and its inability to deep copy :D
        //need to find a way to deep copy!
        //let b = new Projectile(copyInstance(this.Rigidbody.Pos), copyInstance(this.Rigidbody));
        //let b = new Projectile(this.Rigidbody.Pos.rSub(new Vec2(this.DrawRes.Dimensions.X/2, this.DrawRes.Dimensions.Y/2)), copyInstance(this.Rigidbody));
        let b = new Projectile(this.Center(), copyInstance(this.Rigidbody));
        Game.AddObject(b);
        this.Fired = false;
      }, 500)
    });
  }

  async FireBullet(){
    if (!this.Fired){
      this.Fired = true;
      let r = await this.Firing();
    }
  }
}
