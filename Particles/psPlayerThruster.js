//connecting objects : Polar coordiantes, rotate then translate to object center
import * as PS from './ParticleSystem.js'
import * as U from '../Utility/Utility.js'
import * as P from './Particle.js'
export class psPlayerThruster extends PS.ParticleSystem{
  constructor(Player, offset){
    super();
    this.Player = Player;
    this.Offset = offset;
    //this.Rigidbody.Pos = this.Player.Center();
    this.Rigidbody.Pos = this.Player.Rigidbody.Pos.rAdd(this.Offset);
    this.ParticleLimit = 15;

    this.ParticleType = P.PlayerThrusterParticle;

    //this.DrawRes = new PlayerThrusterRes();
    this.DrawRes.Layer = 5;

    //this.CreateParticles();
  }


  Update(felapsed){
    this.AddParticle();
    let index = 0;

    let vec = U.GetVectorFromAngle(this.Player.Rigidbody.Orien);
    vec.Mult(-1 * 100);

    for (let i = 0; i < this.Particles.length; i++){
      let item = this.Particles[i];

      item.DrawRes.Opacity = U.Lerp(0,2,item.Lifetime);
      item.Lifetime -= felapsed;

      if (item.Lifetime < 0){item.Restart(this.Rigidbody.Pos, U.copyInstance(vec));}

    }
  }

  EarlyUpdate(felapsed){

  }

  LateUpdate(felapsed){

  }

  Debug(){
    this.Particles.forEach(item =>{
      item.Rigidbody.Pos = new Vec2(0,0);
    });
  }

  UpdatePos(){
    this.Rigidbody.Pos = this.Player.Center();
    this.Rigidbody.Pos.Add(this.Offset);
  }






}
