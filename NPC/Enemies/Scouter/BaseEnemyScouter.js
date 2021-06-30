class EnemyScouter extends Enemy{
  constructor(mom){
    super();
    this.Rigidbody.Enable();
    this.Rigidbody.Mass = 2;
    this.DrawRes = new ScouterRes();
    this.MotherShip = mom;
    this.ThrustForce = 300;
    this.MaxVel = 500;
    this.States = {
      "default" : new ScouterAIState(this),
      "Wander" : new ScouterWanderState(this),
      "Attack" : new ScouterAttackState(this)
    };


    this.SwitchStates("Wander");

    this.PatrolSpeed = 100;
    this.ChaseSpeed = 200;
    this.FleeSpeed = 300;

    this.FireRate = 0.7;

    this.ShootersSpot;
    this.Shields = new EnemyShieldV1(new Vec2(300,300), 3);
    this.Shields.Rigidbody.Pos = copyInstance(this.Rigidbody.Pos);

    //this.Shields.Rigidbody.SetParent(this);
    this.Shields.Rigidbody= this.Rigidbody;

    Game.AddObject(this.Shields);
    console.log(this.Shields);

    this.CollisionType = new CircleCollider(100);
    this.CollisionLayer = 3;

    this.DetectPlayerRadius = 2500;
    this.Target;
  }

  Init(){
    this.Target = Game.GetObjectByName("Player");

    for (let item in this.States){
      this.States[item].Init();
    }
  }

  Update(felapsed){
    //console.log(this.ActiveState);
    this.ActiveState.Update(felapsed);

    this.Rigidbody.Vel.Mult(0.99);
  }

  FaceVelocity(){
    this.Rigidbody.Orien = GetAngleFromVector(this.Rigidbody.Vel);
  }

  FaceTarget(){
    let lookAt = this.Target.Rigidbody.Pos.rSub(this.Rigidbody.Pos);
    this.Rigidbody.Orien = GetAngleFromVector(lookAt);
  }

  OnHit(object){
    let MassRatio = object.Rigidbody.Mass / this.Rigidbody.Mass;
    let Dir = object.Rigidbody.Vel.Normal();
    let DesiredVel = Dir.rMult(50);
    this.Rigidbody.AddVel(DesiredVel);
    console.log("hit");
  }

}
