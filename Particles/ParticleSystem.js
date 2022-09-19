/*
  Particle systems need to manage whether particles get deleted.
*/

/*
  Depending on the type of effect you are trying to achieve (a stream or just an expanse) you will either only AddParticles in the Update()(for a stream) or call CreateParticles() in the constructor, or some blend of both
*/

import * as GO from '../Objects/GameObject.js'
import * as DR from '../Renderer/DrawRes.js'
import * as DF from '../Renderer/DrawFunction.js'
import * as M from '../main.js'
import * as P from './Particle.js'
export class ParticleSystem extends GO.GameObject{
  constructor(starAmount){
    super();
    this.Particles = [];
    this.ParticleLimit = starAmount;
    this.Active = true;
    this.DrawRes = new DR.DrawRes();
    this.ParticleCount = 0;

    this.ParticleType = P.Particle;


  }

  CreateParticles(){
    for (let i = 0; i < this.ParticleLimit; i++){
      let p = new this.ParticleType();
      this.Particles.push(p);
      M.GameSystem.AddObject(p);
    }
  }

  AddParticle(){
    if (this.ParticleCount < this.ParticleLimit){
      let p = new this.ParticleType();
      this.Particles.push(p);
      M.GameSystem.AddObject(p);
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
      item.DrawRes.DrawFunc = new DF.DrawFunction();
    });
  }
  Enable(){
    this.Particles.forEach(item =>{
      item.DrawRes.DrawFunc = new DF.BRotatedDrawFunction();
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
