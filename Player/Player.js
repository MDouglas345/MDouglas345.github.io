var Global = window || global;

/*
  Script that controls the player. Lots of magic can happen here. Especially with encapsulation!
*/

class Player extends Shootable
{
  constructor(){
    super();
    this.Name = "Player";

    this.HP = new UIReferenceVariable(100);
    this.MaxHP = new UIReferenceVariable(100);

    this.BATCounter = new UIReferenceVariable(0);

    this.BoostLimit = new UIReferenceVariable(50);
    this.BoostCurrent = new UIReferenceVariable(50);
    this.BoostSpeed = 3;
    this.Speed = 8;



    this.Rigidbody = new Rigidbody();
    this.Rigidbody.Enable();
    this.Rigidbody.Pos = new Vec2(0,300);



    this.Shots = 0;

    this.CollisionType = new CircleCollider(100);
    this.CollisionLayer = 0;

    this.DrawRes = new PlayerRes();
    this.DrawRes.Dimensions = new Vec2(275,300);
    this.Rigidbody.Mass = 5;
    this.Fired = false;

    this.Shield = new PlayerShield(new Vec2(300,300), 8);
    this.Shield.Rigidbody.ConnectToParent(this);

    this.HitSound = new SoundObject("ShipHit");

    this.Weapons = [];

    /*
    this.UIBATCounter = new UITextElement(this.BATCounter, 'italic 32px sans-serif', new Vec2(30,130) );
    this.UIHealthBar = new UIHealthBarElement(new Vec2(40,40), this.HP, this.MaxHP, 0);
    this.UIShieldBar = new UIShieldBarElement(new Vec2(40,60), this.Shield.uiHP, this.Shield.uiMaxHP, 0);
    this.Brave = new UIImage(21, new Vec2(20,30), new Vec2(50,50), 5);
    */



    /*
    console.log(this.UIBATCounter);

    Game.AddObject(this.UIBATCounter);
    Game.AddObject(this.UIHealthBar);
    Game.AddObject(this.UIShieldBar);
    Game.AddObject(this.Brave);
    */

  //  this.Shield.Rigidbody = this.Rigidbody;
    Game.AddObject(this.Shield);

      this.PlayerUI = new PlayerUI(this);


    this.LeftThruster = new psPlayerThruster(this, new Vec2(-50,-60));
    this.RightThruster = new psPlayerThruster(this, new Vec2(-50,63));

    this.LeftThruster.Rigidbody.SetParent(this);
    this.RightThruster.Rigidbody.SetParent(this);

    Game.AddObject(this.LeftThruster);
    Game.AddObject(this.RightThruster);


    //this.Thruster = new psPlayerThruster(this, new Vec2(-50,5));
    //this.Thruster.Rigidbody.SetParent(this);
    //Game.AddObject(this.Thruster);

    this.States = {
      "Normal" : new PlayerNormalState(this)
    };
    this.ActiveState;

  }

  Init(){
    this.InitState("Normal");
  }



  EarlyUpdate(felapsed){
    this.ActiveState.EarlyUpdate(felapsed);

/*
    if (Global.InputSystem.GetKeyState('A') == "keydown"){
      //this.Rigidbody.Orien -= 5 * felapsed;
      this.Rigidbody.AddAngVel(-5 * felapsed);
    }
    if (Global.InputSystem.GetKeyState('D') == "keydown"){
      //this.Rigidbody.Orien += 5 * felapsed;
      this.Rigidbody.AddAngVel(5 * felapsed);
    }

    if (Global.InputSystem.GetKeyState('W') == "keydown"){
      let Dir = GetVectorFromAngle(this.Rigidbody.Orien);
      this.Rigidbody.AddVel(Dir.rMult(8));

    }

    this.Rigidbody.AngVel *= 0.99;
    this.Rigidbody.Vel.Mult(0.99);
*/

  }

Update(felapsed){
  this.ActiveState.Update(felapsed);
  //console.log(this.Rigidbody.Pos);
  }

  LateUpdate(felapsed){
    this.ActiveState.LateUpdate(felapsed);

/*
    if (Global.InputSystem.GetKeyState(' ') == "keydown"){
      this.FireBullet();
    }
    */
  }

  Firing(){
    return new Promise ( resolve => {
      setTimeout(() =>{
        //Love JS and its inability to deep copy :D
        //need to find a way to deep copy!
        //let b = new Projectile(copyInstance(this.Rigidbody.Pos), copyInstance(this.Rigidbody));
        //let b = new Projectile(this.Rigidbody.Pos.rSub(new Vec2(this.DrawRes.Dimensions.X/2, this.DrawRes.Dimensions.Y/2)), copyInstance(this.Rigidbody));
        this.Fired = false;
        //console.log(this.Shots);
      }, 500)
    });
  }

  async FireBullet(){
    if (!this.Fired){
      this.Fired = true;
      let b = new pPlayerBlasterT1(this.Center(), copyInstance(this.Rigidbody));
      Game.AddObject(b);
      this.Shots++;
      let r = await this.Firing();
    }
  }

  OnHit(object){
    this.HitSound.Play();
    let MassRatio = object.Rigidbody.Mass / this.Rigidbody.Mass;
    let Dir = object.Rigidbody.Vel.Normal();
    let DesiredVel = Dir.rMult(50);
    this.Rigidbody.AddVel(DesiredVel);
    this.HP.variable -= object.Damage;

    if (this.HP.variable <= 0){ this.HP.variable = 0;this.TriggerDeath();}

  }

  CleanUp(){
    this.LeftThruster.NeedsDelete = true;
    this.RightThruster.NeedsDelete = true;
    this.Shield.NeedsDelete = true;
  }

  async TriggerDeath(){
    this.CleanUp();
    console.log("dead");
    //this.NeedsDelete = true;
    //Instead of Deleting the player (causes numerous issues) change the player to a dead state where no input is accepted to control ship

  }

  InitState(state){
    this.ActiveState = this.States[state];
    this.ActiveState.EnterState();
  }

  SwitchState(state){
    this.ActiveState.ExitState();
    this.ActiveState = this.States[state];
    this.ActiveState.EnterState();
  }

  OnCollide(){

  }
}
