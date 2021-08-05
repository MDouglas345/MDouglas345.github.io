class AstroidSystem extends ParticleSystem{
  constructor(Target){
    super();
    this.Target = Target;
    this.ParticleLimit = 100;
    this.DrawRes.Layer = 3;

    this.ParticleType = Astroid;

    this.CreateParticles();
  }

  CreateParticles(){
    for (let i = 0; i < this.ParticleLimit; i++){
      let p = new Astroid();
      p.Rigidbody.Pos = new Vec2(getRandomFloat(20000) - 10000,getRandomFloat(20000) - 10000);
      this.Particles.push(p);
      Game.AddObject(p);
    }
  }
}
