class ScouterAIState extends NPCAIState{
  constructor(Master){
    super();
    this.Master = Master;
  }


}

class ScouterWanderState extends ScouterAIState{
  constructor(Master){
    super(Master);
  }

  Update(felapsed){
    let dist = this.Master.Rigidbody.Pos.rSub(this.Master.Target.Rigidbody.Pos);
    if (dist.Mag() < 50000){
      this.Master.SwitchStates("Attack");
    }
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
