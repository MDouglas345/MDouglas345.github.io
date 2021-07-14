class EnemyScouter extends Enemy{
  constructor(mom){
    super();
    this.Rigidbody.Enable();
    this.Rigidbody.Mass = 2;
    this.DrawRes = new ScouterRes();
    this.MotherShip = mom;
    this.ThrustForce = 300;
    this.MaxVel = 500;

    this.SurroundTrigger = new Trigger(this, new CircleCollider(400), 5);

    this.States = {
      "default" : new ScouterAIState(this),
      "Wander" : new ScouterWanderStateAlt(this),
      "Attack" : new ScouterAttackStateAlt(this)
    };


    this.SwitchStates("Wander");

    this.PatrolSpeed = 200;
    this.ChaseSpeed = 550;
    this.FleeSpeed = 800;

    this.FireRate = 0.7;

    this.ShootersSpot;

    this.Shields = new EnemyShieldV1(new Vec2(300,300), 7);
    this.Shields.Rigidbody.ConnectToParent(this);
    //this.Shields.Rigidbody.Pos = copyInstance(this.Rigidbody.Pos);
    //this.Shields.Rigidbody.SetParent(this);
    //this.Shields.Rigidbody= this.Rigidbody;

    Game.AddObject(this.Shields);
    console.log(this.Shields);

    this.CollisionType = new CircleCollider(100);
    this.CollisionLayer = 3;



    this.DetectPlayerRadius = 2500;
    this.Target;

    this.HitSound = new SoundObject("ShipHit");
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

  CleanUp(){
    this.Shields.NeedsDelete = true;
    this.Shields = null;
    this.States = null;
  }

  Delete(){
    this.Shields.NeedsDelete = true;
    this.Shields = null;
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
      let chance = getRandomFloat(1);

      let randomsize = getRandomFloat(0.4) + 0.2;
      randomsize *= this.size;


      var p;
      p = new ShipDebris();



      let f = RandomVecInCircle();
      f.Mult(force);


      p.Rigidbody.Pos = copyInstance(this.Rigidbody.Pos);
      p.Rigidbody.Vel = f.rMult(0.4);
      p.Rigidbody.AngVel = getRandomFloat(10) - 5;

      Game.AddObject(p);
    }

    this.NeedsDelete = true;
    //this.CleanUp();
  }
}
