

/*
  Script that controls the player. Lots of magic can happen here. Especially with encapsulation!
*/
import * as S from '../Objects/Shootable.js';
import * as UIR from '../UI/UIReferenceVariable.js';
import * as R from '../Physics/Rigidbody.js';
import * as Vec from '../Utility/Utility.js';
import * as CC from '../Collisions/CircleCT.js';
import * as DR from '../Renderer/DrawRes.js';
import * as So from '../Sound/SoundObject.js';
import * as Sh from '../Objects/Shield.js';
import * as M from '../main.js';
import * as PUI from '../Objects/PlayerUI.js';
import * as TUI from '../UI/UITextElement.js';
import * as PTS from '../Particles/psPlayerThruster.js'
import * as U from '../Utility/Utility.js'
import * as PS from './PlayerStates.js'
import * as Pr from '../Objects/Projectile.js'

export class Player extends S.Shootable
{
  constructor(){
    super();
    this.Name = "Player";

    this.HP = new UIR.UIReferenceVariable(100);
    this.MaxHP = new UIR.UIReferenceVariable(100);

    this.BATCounter = new UIR.UIReferenceVariable(0);

    this.BoostLimit = new UIR.UIReferenceVariable(50);
    this.BoostCurrent = new UIR.UIReferenceVariable(50);
    this.BoostSpeed = 3;
    this.Speed = 8;



    this.Rigidbody = new R.Rigidbody();
    this.Rigidbody.Enable();
    this.Rigidbody.Pos = new Vec.Vec2(0,300);



    this.Shots = 0;

    this.CollisionType = new CC.CircleCollider(100);
    this.CollisionLayer = 0;

    this.DrawRes = new DR.PlayerRes();
    this.DrawRes.Dimensions = new Vec.Vec2(275,300);
    this.Rigidbody.Mass = 5;
    this.Fired = false;

    this.Shield = new Sh.PlayerShield(new Vec.Vec2(300,300), 8);
    this.Shield.Rigidbody.ConnectToParent(this);

    this.HitSound = new So.SoundObject("ShipHit");

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
    M.GameSystem.AddObject(this.Shield);

      this.PlayerUI = new PUI.PlayerUI(this);


    this.LeftThruster = new PTS.psPlayerThruster(this, new U.Vec2(-50,-60));
    this.RightThruster = new PTS.psPlayerThruster(this, new U.Vec2(-50,63));

    this.LeftThruster.Rigidbody.SetParent(this);
    this.RightThruster.Rigidbody.SetParent(this);

    M.GameSystem.AddObject(this.LeftThruster);
    M.GameSystem.AddObject(this.RightThruster);


    //this.Thruster = new psPlayerThruster(this, new Vec2(-50,5));
    //this.Thruster.Rigidbody.SetParent(this);
    //Game.AddObject(this.Thruster);

    this.States = {
      "Normal" : new PS.PlayerNormalState(this)
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
      let b = new Pr.pPlayerBlasterT1(this.Center(), U.copyInstance(this.Rigidbody));
      M.GameSystem.AddObject(b);
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
    //console.log("dead");
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
