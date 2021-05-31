class ParticleSystem extends GameObject{
  constructor(starAmount){
    super();
    this.Particles = [];
    this.ParticleLimit = starAmount;
    this.Active = true;
    this.DrawRes = new DrawRes();

    this.ParticleType = Particle;


  }

  CreateParticles(type){
    for (let i = 0; i < this.ParticleLimit; i++){
      let p = new this.ParticleType();
      this.Particles.push(p);
      Game.AddObject(p);
    }
  }

  SetParticleSprite(id){
    this.Particles.forEach(item =>{
      item.DrawRes.SpriteID = id;
    });
  }
  Disable(){
    this.Particles.forEach(item =>{
      item.DrawRes.DrawFunc = new DrawFunction();
    });
  }
  Enable(){
    this.Particles.forEach(item =>{
      item.DrawRes.DrawFunc = new BRotatedDrawFunction();
    });
  }
}

class psStarParallax extends ParticleSystem{
  constructor(starAmount, focus){
    super(starAmount);

    this.Focus = focus;
    this.ParticleType = SpaceParticle;

    this.CreateParticles();
    this.SetParticleSprite(5);
    this.RandomizePositions();
    this.Enable();

  }

  RandomizePositions(){
    this.Particles.forEach(item =>{
      item.Rigidbody.Pos = new Vec2(getRandomInt(5000), getRandomInt(5000));
    });
  }

  Update(felapsed){
    this.Particles.forEach(item =>{
      let vel = this.Focus.Rigidbody.Vel.rMult(-1);
      vel.Mult(1/item.DistanceToPlayer);
      item.Rigidbody.Vel = vel;
    });
  }


}
