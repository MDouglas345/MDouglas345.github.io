import * as PS from './ParticleSystem.js'
import * as P from './Particle.js'
import * as U from '../Utility/Utility.js'
import * as M from '../main.js'
import * as A from '../Objects/Astroids.js'
export class AstroidSystem extends PS.ParticleSystem{
  constructor(Target){
    super();
    this.Target = Target;
    this.ParticleLimit = 100;
    this.DrawRes.Layer = 3;

    this.ParticleType = P.Astroid;

    this.CreateParticles();
  }

  CreateParticles(){
    for (let i = 0; i < this.ParticleLimit; i++){
      let p = new A.Astroid();
      p.Rigidbody.Pos = new U.Vec2(U.getRandomFloat(20000) - 10000,U.getRandomFloat(20000) - 10000);
      this.Particles.push(p);
      M.GameSystem.AddObject(p);
    }
  }
}
