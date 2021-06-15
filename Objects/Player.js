var Global = window || global;

/*
  Script that controls the player. Lots of magic can happen here. Especially with encapsulation!
*/

class Player extends GameObject
{
  constructor(){
    super();
    this.Name = "Player";
    this.Rigidbody = new Rigidbody();
    this.Rigidbody.Enable();
    this.Rigidbody.Pos = new Vec2(0,300);

    this.Shots = 0;

    this.CollisionType = new CircleCollider(100);
    this.CollisionLayer = 0;

    this.DrawRes = new PlayerRes();
    this.DrawRes.Dimensions = new Vec2(175,200);
    this.Rigidbody.Mass = 5;
    this.Fired = false;

    this.StarSystem = new psStarParallax(500,this);
    Game.AddObject(this.StarSystem);


    this.LeftThruster = new psPlayerThruster(this, new Vec2(-40,-40));
    this.RightThruster = new psPlayerThruster(this, new Vec2(-40,43));

    this.LeftThruster.Rigidbody.SetParent(this);
    this.RightThruster.Rigidbody.SetParent(this);

    Game.AddObject(this.LeftThruster);
    Game.AddObject(this.RightThruster);

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
      let Dir = GetVectorFromAngle(this.Rigidbody.Orien);
      this.Rigidbody.AddVel(Dir.rMult(15));

    }

    this.Rigidbody.AngVel *= 0.99;

  }

Update(){
  //console.log(this.Rigidbody.Pos);
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
        this.Shots++;
        //console.log(this.Shots);
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
