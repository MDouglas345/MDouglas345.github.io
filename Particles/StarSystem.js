class StarSystem extends ParticleSystem{
  constructor(staramount){
    super();
    this.ParticleLimit = staramount;

    this.CreateParticles();

  }

  CreateParticles(){
    for (let i = 0; i < this.ParticleLimit; i++){
      let p = new StarParticle();
      p.Rigidbody.Pos = new Vec2(getRandomFloat(20000) - 10000,getRandomFloat(20000) - 10000);
      this.Particles.push(p);
      Game.AddObject(p);
    }
  }
}
