class ScouterAIState extends NPCAIState{
  constructor(Master){
    super();
    this.Master = Master;
  }


}

class ScouterWanderState extends ScouterAIState{
  constructor(Master){
    super(Master);
    this.TargetLocation = copyInstance(this.Master.Rigidbody.Pos);

    this.RigidbodyRef = this.Master.Rigidbody;

    this.PosRef = this.Master.Rigidbody.Pos;
    this.VelRef = this.Master.Rigidbody.Vel;
    this.RandomDistance;

    this.FindNewTargetLocation();
  }

  Update(felapsed){


    this.Master.FaceVelocity();

    let dist = this.Master.Rigidbody.Pos.rSub(this.Master.Target.Rigidbody.Pos);
    if (dist.Mag() < 50000){
      this.Master.SwitchStates("Attack");
    }
  }

  FindNewTargetLocation(){
    let Dir = RandomVecInCircle();
    //console.log(Dir);
    this.RandomDistance = getRandomFloat(4000) + 5000;
    Dir.Mult(this.RandomDistance);

    this.TargetLocation = Dir.rAdd(this.PosRef);
    console.log(this.TargetLocation);
  }
}

class ScouterAttackState extends ScouterAIState{
  constructor(Master){
    super(Master);
  }

  Update(felapsed){
    let dist = this.Master.Rigidbody.Pos.rSub(this.Master.Target.Rigidbody.Pos);
    if (dist.Mag() > 50000){
      this.Master.SwitchStates("Wander");
    }
  }
}
