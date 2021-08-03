class Particle extends GameObject{
  constructor(){
    super();
    this.Name = "Particle";
    this.Rigidbody = new Rigidbody();
    this.DrawRes = new DrawRes();
  }
}

class SpaceParticle extends Particle{
  constructor(){
    super();
    this.Name = "Space Particle";
    this.DistanceToPlayer = getRandomInt(10);
    this.DrawRes.Dimensions = new Vec2(10 * (1/this.DistanceToPlayer),10 * (1/this.DistanceToPlayer));
    this.DrawRes.Layer = 1;

  }

  Debug(){
    this.DistanceToPlayer = 1;
    this.DrawRes.Dimensions = new Vec2(10,10);
    this.Rigidbody.Pos = new Vec2(0,0);
  }
}

class StarParticle extends Particle{
  constructor(){
    super();
    this.Name = "Star";
    this.DistanceToPlayer = getRandomInt(10);
    this.DrawRes = new StarRes();
    this.DrawRes.Dimensions = new Vec2(10 * (1/this.DistanceToPlayer),10 * (1/this.DistanceToPlayer));
  }
}

class PlayerThrusterParticle extends Particle{
  constructor(){
    super();
    this.Name = "Player Thrust Particle";
    this.DrawRes = new PlayerThrusterRes();
    this.Life = 0.115;
    this.Lifetime = this.Life;
    this.Rigidbody.Mass = 10;
  }

  Restart(locate, vel){
    this.Lifetime = this.Life;
    this.Rigidbody.Pos = locate;
    this.Rigidbody.Vel.Mult(0);
    //this.Rigidbody.Vel = vel.Normal();
    //this.Rigidbody.Vel.Mult(getRandomFloat(1));
    //this.Rigidbody.Vel = vel.rMult(getRandomFloat(1) + 1);
    this.Rigidbody.Vel = vel;

  }
}
