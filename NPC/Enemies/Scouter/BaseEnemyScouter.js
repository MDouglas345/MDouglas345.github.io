class EnemyScouter extends Enemy{
  constructor(mom){
    super();
    this.Rigidbody.Enable();
    this.Rigidbody.Mass = 2;
    this.DrawRes = new PlaceholderRes(new Vec2(200,200), 3, "#FF44AA");
    this.MotherShip = mom;
    this.ThrustForce = 300;
    this.MaxVel = 500;
    this.States = {
      "default" : new ScouterAIState(this),
      "Wander" : new ScouterWanderState(this),
      "Attack" : new ScouterAttackState(this)
    };


    this.SwitchStates("Wander");

    this.PatrolSpeed = 500;
    this.ChaseSpeed = 300;
    this.FleeSpeed = 700;


    this.DetectPlayerRadius = 3000;
    this.Target;
  }

  Init(){
    this.Target = Game.GetObjectByName("Player");

    for (let item in this.States){
      this.States[item].Init();
    }
  }

  Update(felapsed){
    console.log(this.ActiveState);
    this.ActiveState.Update(felapsed);

    this.Rigidbody.Vel.Mult(0.99);
  }

FaceVelocity(){
  this.Rigidbody.Orien = GetAngleFromVector(this.Rigidbody.Vel);
}

}
