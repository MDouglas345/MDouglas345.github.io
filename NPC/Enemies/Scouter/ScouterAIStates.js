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

    let steering = this.Seek();

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

class ScouterAttackStateAlt extends ScouterAIState{
  constructor(Master){
    super(Master);
    this.ShootingRange = 700;
    this.TurnSpeed = 0.5;
    this.Angle = this.Master.Rigidbody.Orien;
    this.TargetAngle;

  }

  Init(){
    super.Init();
    this.StateSpeed = this.Master.ChaseSpeed;
  }

  Update(felapsed){
    let toTarget = this.Target.rSub(this.PosRef);
    let TargetAngle = GetAngleFromVector(toTarget)
    let AngleDiff = this.Angle - TargetAngle;
        console.log(AngleDiff);
    AngleDiff *= (1/AngleDiff) * this.TurnSpeed * felapsed;

    //this.RigidbodyRef.AddAngVel(AngleDiff);
  }

}

class ScouterAttackState extends ScouterAIState{
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


    let angle = Math.abs(AngleBetweenVec(steering, this.VelRef));
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
      let b = new pBlasterT1(this.Master.Center(), copyInstance(this.Master.Rigidbody));
      Game.AddObject(b);
      this.Shots++;
      let r = await this.ShootAtPlayer();
    }
  }
}
