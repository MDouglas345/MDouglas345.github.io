class ScouterAIState extends NPCAIState{
  constructor(Master){
    super();
    this.Master = Master;
    this.PosRef = this.Master.Rigidbody.Pos;
    this.VelRef = this.Master.Rigidbody.Vel;
    this.RigidbodyRef = this.Master.Rigidbody;

    this.Target;
    this.TargetLocation;
    this.StateSpeed;
  }

  Init(){
    this.Target = this.Master.Target.Rigidbody.Pos;
  }

  Seek(){
    let toTarget = this.PosRef.rSub(this.TargetLocation);
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


    console.log(this.Master.PatrolSpeed);
    this.RandomDistance;

    this.FindNewTargetLocation();
  }

  Init(){
    super.Init();
    this.StateSpeed = this.Master.PatrolSpeed;
  }

  Update(felapsed){

    let steering = this.Seek();

    this.RigidbodyRef.AddAcc(steering);

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
      console.log("here");
      this.Master.SwitchStates("Attack");
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
    let Dir = RandomVecInCircle();
    //console.log(Dir);
    this.RandomDistance = getRandomFloat(4000) + 5000;
    Dir.Mult(this.RandomDistance);

    this.TargetLocation = Dir.rAdd(this.PosRef);
  }
}

class ScouterAttackState extends ScouterAIState{
  constructor(Master){
    super(Master);
    this.ShootingRange = 500;

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



    if (Math.abs(AngleBetweenVec(steering, this.VelRef)) > 0.2){
      this.VelRef.Mult(0.99);
      steering.Mult(1.5);
    }

    this.RigidbodyRef.AddAcc(steering);



    this.Master.FaceVelocity();

    let dist = this.PosRef.rSub(this.Target);
    if (dist.MagSqrt() > this.Master.DetectPlayerRadius){
      this.Master.SwitchStates("Wander");
    }
  }
}
