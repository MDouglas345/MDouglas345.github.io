import * as E from '../../../Objects/Enemy.js'
import * as DR from '../../../Renderer/DrawRes.js'
import * as SS from './ScouterAIStates.js'
import * as CT from '../../../Collisions/CircleCT.js'
import * as T from '../../../Objects/Trigger.js'
import * as Sh from '../../../Objects/Shield.js'
import * as M from '../../../main.js'
import * as So from '../../../Sound/SoundObject.js'
import * as U from '../../../Utility/Utility.js'
import * as SD from '../../../Objects/ShipDebris.js'
export class EnemyScouter extends E.Enemy{
  constructor(mom){
    super();

    this.Rigidbody.Enable();
    this.Rigidbody.Mass = 2;
    this.DrawRes = new DR.ScouterRes();
    this.MotherShip = mom;
    this.ThrustForce = 300;
    this.MaxVel = 500;

    this.SurroundTrigger = new T.Trigger(this, new CT.CircleCollider(400), 5);

    this.Identifier;

    if (this.MotherShip != null){this.Identifier = this.MotherShip.GetChildID();}


    this.States = {
      "default" : new SS.ScouterAIState(this),
      "Wander" : new SS.ScouterWanderStateAlt(this),
      "Attack" : new SS.ScouterAttackStateAlt(this)
    };


    this.SwitchStates("Wander");

    this.PatrolSpeed = 200;
    this.ChaseSpeed = 550;
    this.FleeSpeed = 800;

    this.FireRate = 0.7;

    this.ShootersSpot;

    //this.Shields = new Sh.EnemyShieldV1(new U.Vec2(300,300), 7);
    //this.Shields.Rigidbody.ConnectToParent(this);
    //this.Shields.Rigidbody.Pos = copyInstance(this.Rigidbody.Pos);
    //this.Shields.Rigidbody.SetParent(this);
    //this.Shields.Rigidbody= this.Rigidbody;

    //M.GameSystem.AddObject(this.Shields);

    this.CollisionType = new CT.CircleCollider(100);
    this.CollisionLayer = 3;



    this.DetectPlayerRadius = 2500;
    this.Target;

    this.HitSound = new So.SoundObject("ShipHit");
  }

  Init(){
    this.Target = M.GameSystem.GetObjectByName("Player");

    for (let item in this.States){
      this.States[item].Init();
    }
  }

  NewStartPos(pos){
    this.Rigidbody.Pos = U.copyInstance(pos);

    for (let item in this.States){
      this.States[item].PosRef = this.Rigidbody.Pos;
    }

  }

  Update(felapsed){
    //console.log(this.ActiveState);
    this.ActiveState.Update(felapsed);

    this.Rigidbody.Vel.Mult(0.99);
  }

  FaceVelocity(){
    this.Rigidbody.Orien = U.GetAngleFromVector(this.Rigidbody.Vel);
  }

  FaceTarget(){
    let lookAt = this.Target.Rigidbody.Pos.rSub(this.Rigidbody.Pos);
    this.Rigidbody.Orien = U.GetAngleFromVector(lookAt);
  }

  CleanUp(){
    this.Shields.NeedsDelete = true;
    this.Shields = null;
    this.States = null;
  }

  Delete(){
    //this.Shields.NeedsDelete = true;
    //this.Shields = null;
    this.States = null;
  }

  OnHit(object){
    super.OnHit();
    let MassRatio = object.Rigidbody.Mass / this.Rigidbody.Mass;
    let Dir = object.Rigidbody.Vel.Normal();
    let DesiredVel = Dir.rMult(50);
    this.Rigidbody.AddVel(DesiredVel);
    this.HP -= object.Damage;

    if (this.HP <= 0){ this.TriggerDeath();}
    console.log("hit");
  }

  async TriggerDeath(){

    //let force = this.Rigidbody.Vel.rSub(object.Rigidbody.Vel);

    let force = 700;

    for (let i = 0; i < 4; i++){
      let chance = U.getRandomFloat(1);

      let randomsize = U.getRandomFloat(0.4) + 0.2;
      randomsize *= this.size;


      var p;
      p = new SD.ShipDebris();



      let f = U.RandomVecInCircle();
      f.Mult(force);


      p.Rigidbody.Pos = U.copyInstance(this.Rigidbody.Pos);
      p.Rigidbody.Vel = f.rMult(0.4);
      p.Rigidbody.AngVel = U.getRandomFloat(10) - 5;

      M.GameSystem.AddObject(p);
    }

    this.NeedsDelete = true;
    //this.CleanUp();
  }
}
