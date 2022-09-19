import * as S from './Shootable.js';
import * as R from '../Physics/Rigidbody.js';
import * as DR from '../Renderer/DrawRes.js';
import * as CC from '../Collisions/CircleCT.js';
import * as AI from '../AI/NPCAIState.js';
import * as So from '../Sound/SoundObject.js';
import * as UIR from '../UI/UIReferenceVariable.js';
import * as U from '../Utility/Utility.js'
export class Shield extends S.Shootable{
  constructor(dim, ColLayer){
    super();
    this.HP;
    this.MaxHP;
    this.RechargeRate;
    this.TimeToFade;

    this.Rigidbody = new R.Rigidbody();
    this.DrawRes = new DR.ShieldRes(dim);

    this.States;
    this.ActiveState;

    this.CollisionType = new CC.CircleCollider((dim.MagSqrt() / 2) * 0.9);
    this.CollisionLayer = ColLayer;

    this.ShieldDownSound = new So.SoundObject("Shield1Down");
    this.ShieldUpSound = new So.SoundObject("Shield1Up");

    this.ShieldHitSound = new So.SoundObject("ShieldHit");

  }

  Init(){
    this.States = {
      "Visible" : new ShieldVisible(this),
      "Invisible" : new ShieldInVisible(this),
      "Disable" : new ShieldDisabled(this)
    };

    this.ActiveState = this.States["Invisible"];


  }

  Update(felapsed){

    this.ActiveState.Update(felapsed);
  }

  OnHit(Object){
    this.ActiveState.OnHit(Object);
    if (this.HP <= 0){this.HP = 0;}

  }

  SwitchState(string){
    this.ActiveState.ExitState();
    this.ActiveState = this.States[string];
    this.ActiveState.EnterState();
  }

  Delete(){
    this.Rigidbody = null;
    this.DrawRes = null;
    this.CollisionType = null;
    this.CollisionLayer = null;
    this.ShieldDownSound = null;
    this.ShieldUpSound = null;
    this.ShieldHitSound = null;
    this.ActiveState = null;
    this.States = null;
  }

}

export class EnemyShieldV1 extends Shield{
  constructor(dim, ColLayer){
    super(dim, ColLayer);

    this.MaxHP = 25;
    this.HP = this.MaxHP;
    this.RechargeRate = 1;
    this.TimeToFade = 1;
  }
}

export class PlayerShieldV1 extends Shield{
  constructor(dim, ColLayer){
    super(dim, ColLayer);

    this.MaxHP = 50;
    this.HP = this.MaxHP;
    this.RechargeRate = 4;
    this.TimeToFade = 1;

  }
}

export class PlayerShield extends Shield{
  constructor(dim, Col){
    super(dim, Col);
    this.MaxHP = 50;
    this.HP = this.MaxHP;
    this.uiHP = new UIR.UIReferenceVariable(this.HP);
    this.uiMaxHP = new UIR.UIReferenceVariable(this.MaxHP);
    this.RechargeRate = 15;
    this.TimeToFade = 1;
  }

  OnHit(object){
    super.OnHit(object);

  }

  LateUpdate(felapsed){
      this.uiHP.variable = this.HP;
  }
}

















class ShieldState extends AI.NPCAIState{
  constructor(Master){
    super();
    this.Master = Master;
    this.DrawResRef = this.Master.DrawRes;
  }

  OnHit(object){

  }

  EnterState(){

  }

  ExitState(){

  }
}

class ShieldVisible extends ShieldState{
  constructor(Master){
    super(Master);

    this.CurrentTime = this.Master.TimeToFade;
  }

  Update(felapsed){
    if (this.Master.HP <= 0) {
      this.Master.SwitchState("Disable"); return;
    }


    this.DrawResRef.Opacity = U.Lerp(0, this.Master.TimeToFade, this.CurrentTime);

    this.CurrentTime -= felapsed;

    if (this.CurrentTime < 0 ) { this.CurrentTime = this.Master.TimeToFade; this.Master.SwitchState("Invisible");}

  }

  OnHit(object){
    this.Master.ShieldHitSound.Play();
    this.CurrentTime = this.Master.TimeToFade;
    this.Master.HP -= object.Damage;

  }

  EnterState(){
    this.CurrentTime = this.Master.TimeToFade;
  }

  ExitState(){
    this.CurrentTime = this.Master.TimeToFade;
  }
}

class ShieldInVisible extends ShieldState{
  constructor(Master){
    super(Master);
  }

  Update(felapsed){
    if (this.Master.HP <= 0) {
      this.Master.SwitchState("Disable"); return;
    }

      this.Master.HP += this.Master.RechargeRate * felapsed;
      if (this.Master.HP > this.Master.MaxHP){this.Master.HP = this.Master.MaxHP;}
  }

  OnHit(object){
      this.Master.ShieldHitSound.Play();
      this.Master.HP -= object.Damage;

      this.Master.SwitchState("Visible");
  }

  EnterState(){
    this.DrawResRef.Opacity = 0;
  }
}

class ShieldDisabled extends ShieldState{
  constructor(Master){
    super(Master);
    this.CurrentTime = 0;
    this.StartedRecover = false;
  }

  Update(felapsed){
    this.Recover();
  }

  async Recover(){
    if (this.StartedRecover){return;}
    this.StartedRecover = true;

    new Promise(resolve => {
      setTimeout(() =>{
        //Love JS and its inability to deep copy :D
        //need to find a way to deep copy!
        //let b = new Projectile(copyInstance(this.Rigidbody.Pos), copyInstance(this.Rigidbody));
        //let b = new Projectile(this.Rigidbody.Pos.rSub(new Vec2(this.DrawRes.Dimensions.X/2, this.DrawRes.Dimensions.Y/2)), copyInstance(this.Rigidbody));
        this.Master.HP = this.Master.MaxHP;
        this.Master.SwitchState("Invisible");

        //console.log(this.Shots);
      }, 5000)
    });
  }

  EnterState(){
    this.StartedRecover = false;
    this.DrawResRef.Opacity = 0;
    this.Master.CollisionType.Disable();
    this.Master.ShieldDownSound.Play();
  }

  ExitState(){
    this.StartedRecover = false;
    this.Master.CollisionType.Enable();
    this.Master.ShieldUpSound.Play();
  }
}
