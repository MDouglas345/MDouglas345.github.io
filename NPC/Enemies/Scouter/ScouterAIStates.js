import * as AI from '../../../AI/NPCAIState.js'
import * as U from '../../../Utility/Utility.js'
import * as M from '../../../main.js'
import * as Pr from '../../../Objects/Projectile.js'

export class ScouterAIState extends AI.NPCAIState{
  constructor(Master){
    super(Master);
    this.PosRef = this.Master.Rigidbody.Pos;
    this.VelRef = this.Master.Rigidbody.Vel;
    this.RigidbodyRef = this.Master.Rigidbody;



    this.Target;
    this.TargetLocation;
    this.StateSpeed;

    this.AngleToTarget;
    this.Forward;
    this.ToTarget;

    this.FrictionPercent;
    this.TurnSpeed;

  }

  Init(){
    this.Target = this.Master.Target.Rigidbody.Pos;
  }

  SeekAlt(felapsed){

    let Surrounding = this.Master.SurroundTrigger.GetDetected();
    //console.log(Surrounding);
    let Avoidance = new U.Vec2(0,0);
    let Urgency = 1;

    var found = 0;
    for (let i = 0; i < Surrounding.length; i++){
      if (i > 2){continue;}
      let weight = this.PosRef.rSub(Surrounding[i].Rigidbody.Pos);
      if (weight.Mag() <= 0.2){weight = U.RandomVecInCircle();}


      //let weight = item.Rigidbody.Pos.rSub(this.PosRef);
      //if (weight.Mag() < 1000){Urgency += 0.01;}
      Avoidance.Add(weight);
    }
    /*
    Surrounding.forEach((item) => {
      if (found > 3){continue;}
      found++;
      let weight = this.PosRef.rSub(item.Rigidbody.Pos);
      if (weight.Mag() <= 0.2){weight = RandomVecInCircle();}


      //let weight = item.Rigidbody.Pos.rSub(this.PosRef);
      //if (weight.Mag() < 1000){Urgency += 0.01;}
      Avoidance.Add(weight);
    });
    */
  //  console.log(Avoidance);
    Avoidance.Normalize();
    //Avoidance.Mult(10);


    let Forward = U.GetVectorFromAngle(this.RigidbodyRef.Orien);
    let ToTarget = this.TargetLocation.rSub(this.PosRef);


    this.Forward = U.copyInstance(Forward);
    this.ToTarget = U.copyInstance(ToTarget);

    ToTarget.Normalize();
    //ToTarget.Add(RandomVecInCircle());
    ToTarget.Add(Avoidance);
    Forward.Normalize();

    let cross = U.Cross2D(Forward, ToTarget);
    //console.log(Forward, ToTarget);

    this.RigidbodyRef.AddTorq(cross * this.TurnSpeed * Urgency);

    this.AngleToTarget = U.AngleBetweenVec(ToTarget, Forward);

    if (U.Dot(ToTarget, Forward) > this.ThrustRadius){this.Thrust(Forward, felapsed);}

    this.RigidbodyRef.AngVel *= this.FrictionPercent;

    //console.log(this.Master.SurroundTrigger.GetDetected());

  }

  Thrust(forward, felapsed){
    this.RigidbodyRef.AddVel(forward.rMult(this.StateSpeed * felapsed));
  }

  Seek(){
    let toTarget = this.TargetLocation.rSub(this.PosRef);
    let DesiredVel = toTarget.Normal();
    DesiredVel.Mult(this.StateSpeed);

    return DesiredVel;
  }

  Seek2(){
    let toTarget = this.PosRef.rSub(this.TargetLocation);
    //let toTarget = this.TargetLocation.rSub(this.PosRef);
    //console.log(this.PosRef, this.TargetLocation);
    let DesiredVel = toTarget.Normal();
    //console.log(this.StateSpeed);
    DesiredVel.Mult(this.StateSpeed);


    DesiredVel = this.VelRef.rSub(DesiredVel);

    return DesiredVel;
  }

}

class ScouterWanderState extends ScouterAIState{
  constructor(Master){
    super(Master);
    this.TargetLocation;

    this.RandomDistance;

    this.FindNewTargetLocation();
  }

  Init(){
    super.Init();
    this.StateSpeed = this.Master.PatrolSpeed;
  }

  Update(felapsed){

    let steering = this.SeekAlt(felapsed);

    return;
    this.RigidbodyRef.AddVel(steering.rMult(felapsed));


    if (Math.abs(AngleBetweenVec(steering, this.VelRef)) > 3){
      this.VelRef.Mult(0.99);
    }
    //Truncate(this.RigidbodyRef.Vel, this.Master.MaxVel);

    if (this.OnTarget()){
      this.FindNewTargetLocation();
    }

    this.Master.FaceVelocity();

    let dist = this.PosRef.rSub(this.Target);

    if (dist.MagSqrt() < this.Master.DetectPlayerRadius){
      //this.Master.SwitchStates("Attack");
    }
  }

  OnTarget(){
    let Dist = this.PosRef.rSub(this.TargetLocation);
    if (Dist.Mag() < 50000){return true;}
    return false;
  }

  Wander(){
    let toTarget = this.PosRef.rSub(this.TargetLocation);
    let DesiredVel = toTarget.Normal();
    DesiredVel.Mult(this.Master.PatrolSpeed);

    DesiredVel = this.RigidbodyRef.Vel.rSub(DesiredVel);
    return DesiredVel;
  }

  FindNewTargetLocation(){
    let Dir = U.RandomVecInCircle();
    //console.log(Dir);
    this.RandomDistance = U.getRandomFloat(4000) + 5000;
    Dir.Mult(this.RandomDistance);

    this.TargetLocation = Dir.rAdd(this.PosRef);
  }
}

export class ScouterWanderStateAlt extends ScouterWanderState{
  constructor(Master){
    super(Master);
    this.TargetLocation;
    this.RandomDistance;

    this.FrictionPercent = 0.9;
    this.TurnSpeed = 5;
    this.ThrustRadius = 0.02;

    this.FindNewTargetLocation();
  }

  Update(felapsed){
    this.SeekAlt(felapsed);

    if (this.OnTarget()){
      this.FindNewTargetLocation();
    }

    let dist = this.PosRef.rSub(this.Target);
    if (dist.MagSqrt() < this.Master.DetectPlayerRadius){
      this.Master.SwitchStates("Attack");
    }
  }
}

export class ScouterAttackState extends ScouterAIState{
  constructor(Master){
    super(Master);
    this.ShootingRange = 700;
    this.Fired = false;

  }

  Init(){
    super.Init();
    this.StateSpeed = this.Master.ChaseSpeed;
  }

  Update(felapsed){
    let toTarget = this.PosRef.rSub(this.Target);
    this.TargetLocation = toTarget.Normal();
    this.TargetLocation.Mult(this.ShootingRange);
    this.TargetLocation.Add(this.Target);

    let steering = this.Seek();


    let angle = Math.abs(U.AngleBetweenVec(steering, this.VelRef));
    //console.log(angle, steering);
    if (angle > 0.2){
      this.VelRef.Mult(0.99);
      steering.Mult(3);
    }

    this.RigidbodyRef.AddVel(steering.rMult(felapsed));

    this.Firing();

    this.Master.FaceTarget();

    let dist = this.PosRef.rSub(this.Target);
    if (dist.MagSqrt() > this.Master.DetectPlayerRadius){
      this.Master.SwitchStates("Wander");
    }
  }

   ShootAtPlayer (){
    return new Promise ( resolve => {
      setTimeout(() =>{
        //Love JS and its inability to deep copy :D
        //need to find a way to deep copy!
        //let b = new Projectile(copyInstance(this.Rigidbody.Pos), copyInstance(this.Rigidbody));
        //let b = new Projectile(this.Rigidbody.Pos.rSub(new Vec2(this.DrawRes.Dimensions.X/2, this.DrawRes.Dimensions.Y/2)), copyInstance(this.Rigidbody));
        this.Fired = false;
        //console.log(this.Shots);
      }, 750)
    });
  }

  async Firing(){
    if (!this.Fired){
      this.Fired = true;
      let b = new Pr.pBlasterT1(this.Master.Center(), U.copyInstance(this.Master.Rigidbody));
      M.GameSystem.AddObject(b);
      this.Shots++;
      let r = await this.ShootAtPlayer();
    }
  }
}


export class ScouterAttackStateAlt extends ScouterAttackState{
  constructor(Master){
    super(Master);
    this.ShootingRange = 1000;
    this.TargetDistance = 200;
    this.TurnSpeed = 0.5;
    this.Angle = this.Master.Rigidbody.Orien;
    this.TargetAngle;

    this.FrictionPercent = 0.9;
    this.TurnSpeed = 30;
    this.ThrustRadius = 0.02;

  }

  Init(){
    super.Init();
    this.StateSpeed = this.Master.ChaseSpeed;
  }

  Update(felapsed){

    let toTarget = this.PosRef.rSub(this.Target);
    this.TargetLocation = toTarget.Normal();
    this.TargetLocation.Mult(this.TargetDistance);
    this.TargetLocation.Add(this.Target);

    this.SeekAlt(felapsed);

    let dist = toTarget.MagSqrt();

    let ToTarget = this.Target.rSub(this.PosRef);
    ToTarget.Normalize();
    let dot = U.Dot(ToTarget, this.Forward);



    if (dot > 0.6){this.Firing();}

    if (dist > this.Master.DetectPlayerRadius){
      this.Master.SwitchStates("Wander");
    }

  }

}

export class ScouterGaurdAI extends ScouterWanderStateAlt{
  constructor(master){
    super(master);
    this.GaurdPoint = new U.Vec2(0,0);
    this.AllowedDistToPoint = 2000;

    this.FindNewTargetLocation();

  }

  InitGaurdPoint(pos){
    this.GaurdPoint = pos;


  }

  Update(felapsed){
    this.SeekAlt();

    if (this.OnTarget()){
      this.FindNewTargetLocation();
    }

    let dist = this.PosRef.rSub(this.Target);

    if (dist.MagSqrt() < this.Master.DetectPlayerRadius){
      this.Master.SwitchStates("GaurdAttack");
    }

    dist = this.PosRef.rSub(this.GaurdPoint);

    if (dist.MagSqrt() < this.AllowedDistToPoint){
      this.Master.SwitchStates("Return");
    }
  }
}

export class ScouterGaurdAttackAI extends ScouterAttackStateAlt{
  constructor(master){
    super(master);
  }

  Update(felapsed){
    let toTarget = this.PosRef.rSub(this.Target);
    this.TargetLocation = toTarget.Normal();
    this.TargetLocation.Mult(this.TargetDistance);
    this.TargetLocation.Add(this.Target);

    this.SeekAlt(felapsed);

    let dist = toTarget.MagSqrt();

    let ToTarget = this.Target.rSub(this.PosRef);
    ToTarget.Normalize();
    let dot = U.Dot(ToTarget, this.Forward);



    if (dot > 0.6){this.Firing();}

    if (dist > this.Master.DetectPlayerRadius){
      this.Master.SwitchStates("GaurdWander");
    }

  }
}

export class ScouterGaurdReturnAI extends ScouterWanderStateAlt{
  constructor(master){
    super(master);
  }
  EnterState(){
    this.TargetLocation ;
  }
  Update(felasped){

  }
}
