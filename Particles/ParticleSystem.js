/*
  Particle systems need to manage whether particles get deleted.
*/

class ParticleSystem extends GameObject{
  constructor(starAmount){
    super();
    this.Particles = [];
    this.ParticleLimit = starAmount;
    this.Active = true;
    this.DrawRes = new DrawRes();

    this.ParticleType = Particle;


  }

  CreateParticles(){
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
