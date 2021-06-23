class EnemyScouter extends Enemy{
  constructor(mom){
    super();
    this.Rigidbody.Enable();
    this.Rigidbody.Mass = 30;
    this.DrawRes = new PlaceholderRes(new Vec2(200,200), 3, "#FF44AA");
    this.MotherShip = mom;
    this.ThrustForce = 20;
    this.States = {
      "default" : new ScouterAIState(this),
      "Wander" : new ScouterWanderState(this),
      "Attack" : new ScouterAttackState(this)
    };
    this.SwitchStates("Wander");
  }

  Init(){
    this.Target = Game.GetObjectByName("Player");
  }

  Update(felapsed){
    this.ActiveState.Update(felapsed);
  }

FaceVelocity(){
  this.Rigidbody.Orien = GetAngleFromVector(this.Rigidbody.Vel);
}

}
