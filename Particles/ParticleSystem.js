/*
  Particle systems need to manage whether particles get deleted.
*/

/*
  Depending on the type of effect you are trying to achieve (a stream or just an expanse) you will either only AddParticles in the Update()(for a stream) or call CreateParticles() in the constructor, or some blend of both
*/


class ParticleSystem extends GameObject{
  constructor(starAmount){
    super();
    this.Particles = [];
    this.ParticleLimit = starAmount;
    this.Active = true;
    this.DrawRes = new DrawRes();
    this.ParticleCount = 0;

    this.ParticleType = Particle;


  }

  CreateParticles(){
    for (let i = 0; i < this.ParticleLimit; i++){
      let p = new this.ParticleType();
      this.Particles.push(p);
      Game.AddObject(p);
    }
  }

  AddParticle(){
    if (this.ParticleCount < this.ParticleLimit){
      let p = new this.ParticleType();
      this.Particles.push(p);
      Game.AddObject(p);
      this.ParticleCount++;
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

  Delete(){
    this.Particles.forEach( item =>{
      item.NeedsDelete = true;
    });
    this.Particles = null;
    this.DrawRes = null;
  }
}
