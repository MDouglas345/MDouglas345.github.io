class CarrierAIState extends NPCAIState{
  constructor(master){
    super(master);
    this.TargetLocation;
    this.FrictionPercent;
  }

  SeekAlt(felapsed){

    let Forward = GetVectorFromAngle(this.RigidbodyRef.Orien);
    let ToTarget = this.TargetLocation.rSub(this.PosRef);


    this.Forward = copyInstance(Forward);
    this.ToTarget = copyInstance(ToTarget);

    ToTarget.Normalize();
    //ToTarget.Add(RandomVecInCircle());
    ToTarget.Add(Avoidance);
    Forward.Normalize();

    let cross = Cross2D(Forward, ToTarget);
    //console.log(Forward, ToTarget);

    this.RigidbodyRef.AddTorq(cross * this.TurnSpeed * Urgency);

    this.AngleToTarget = AngleBetweenVec(ToTarget, Forward);

    if (Dot(ToTarget, Forward) > this.ThrustRadius){this.Thrust(Forward, felapsed);}

    this.RigidbodyRef.AngVel *= this.FrictionPercent;

    //console.log(this.Master.SurroundTrigger.GetDetected());

  }
}

class CarrierPatrolAI extends CarrierAIState{
  constructor(master){
    super(master);
  }

  Update(felapsed){

  }
}
