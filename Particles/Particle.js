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
    this.DistanceToPlayer = getRandomInt(50);
    this.DrawRes.Dimensions = new Vec2(10 * (1/this.DistanceToPlayer),10 * (1/this.DistanceToPlayer));
    this.DrawRes.Layer = 1;

  }

  Debug(){
    this.DistanceToPlayer = 1;
    this.DrawRes.Dimensions = new Vec2(10,10);
    this.Rigidbody.Pos = new Vec2(0,0);
  }
}
