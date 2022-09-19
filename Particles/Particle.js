import * as GO from '../Objects/GameObject.js'
import * as R from '../Physics/Rigidbody.js'
import * as DR from '../Renderer/DrawRes.js'
import * as U from '../Utility/Utility.js'
export class Particle extends GO.GameObject{
  constructor(){
    super();
    this.Name = "Particle";
    this.Rigidbody = new R.Rigidbody();
    this.DrawRes = new DR.DrawRes();
  }
}

export class SpaceParticle extends Particle{
  constructor(){
    super();
    this.Name = "Space Particle";
    this.DistanceToPlayer = U.getRandomInt(10);
    this.DrawRes.Dimensions = new U.Vec2(10 * (1/this.DistanceToPlayer) + 20,10 * (1/this.DistanceToPlayer) + 20);
    this.DrawRes.Layer = 1;

  }

  Debug(){
    this.DistanceToPlayer = 1;
    this.DrawRes.Dimensions = new U.Vec2(10,10);
    this.Rigidbody.Pos = new U.Vec2(0,0);
  }
}

export class StarParticle extends Particle{
  constructor(){
    super();
    this.Name = "Star";
    this.DistanceToPlayer = U.getRandomInt(10);
    this.DrawRes = new DR.StarRes();
    this.DrawRes.Dimensions = new U.Vec2(10 * (1/this.DistanceToPlayer),10 * (1/this.DistanceToPlayer));
  }
}

export class PlayerThrusterParticle extends Particle{
  constructor(){
    super();
    this.Name = "Player Thrust Particle";
    this.DrawRes = new DR.PlayerThrusterRes();
    this.Life = 0.115;
    this.Lifetime = this.Life;
    this.Rigidbody.Mass = 10;
  }

  Restart(locate, vel){
    this.Lifetime = this.Life;
    this.Rigidbody.Pos = locate;
    this.Rigidbody.Vel.Mult(0);
    //this.Rigidbody.Vel = vel.Normal();
    //this.Rigidbody.Vel.Mult(getRandomFloat(1));
    //this.Rigidbody.Vel = vel.rMult(getRandomFloat(1) + 1);
    this.Rigidbody.Vel = vel;

  }
}
