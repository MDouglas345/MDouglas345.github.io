import * as PS from './ParticleSystem.js'
import * as U from '../Utility/Utility.js'
import * as P from './Particle.js'
export class StarSystem extends PS.ParticleSystem{
  constructor(staramount){
    super();
    this.ParticleLimit = staramount;

    this.CreateParticles();

  }

  CreateParticles(){
    for (let i = 0; i < this.ParticleLimit; i++){
      let p = new P.StarParticle();
      p.Rigidbody.Pos = new U.Vec2(U.getRandomFloat(20000) - 10000,U.getRandomFloat(20000) - 10000);
      this.Particles.push(p);
      Game.AddObject(p);
    }
  }
}
