import * as S from './Shootable.js';
import * as U from '../Utility/Utility.js'
import * as DR from '../Renderer/DrawRes.js'
import * as CT from '../Collisions/CircleCT.js'
import * as So from '../Sound/SoundObject.js'
import * as M from '../main.js'
import * as BPU from './BATPickUp.js'

export class Astroid extends S.Shootable{
  static AstroidHit;
  constructor(size){
    super();
    this.size;
    
    if (size){this.size = size;}
    else{this.size = U.getRandomFloat(5) + 1;}

    this.Name = "Astroid";
    this.Rigidbody.Disable();

    let RandomSize = new U.Vec2(100, 100);
    RandomSize.Mult(this.size);

    this.DrawRes = new DR.AstroidRes(RandomSize);

    this.CollisionType = new CT.CircleCollider(RandomSize.MagSqrt() * 0.4);

    this.CollisionLayer = 2;

    this.Rigidbody.Orien = U.getRandomInt();
    this.RotSpeed = 2;

    this.AstroidHit = new So.SoundObject("ShipHit");



  }

  async MakeActiveTemp(){
    this.Rigidbody.Enable();
    let r = await this.MATDisableTimer();

  }

  MATDisableTimer(){
    return new Promise ( resolve => {
      setTimeout(() =>{
        //Love JS and its inability to deep copy :D
        //need to find a way to deep copy!
        //let b = new Projectile(copyInstance(this.Rigidbody.Pos), copyInstance(this.Rigidbody));
        //let b = new Projectile(this.Rigidbody.Pos.rSub(new Vec2(this.DrawRes.Dimensions.X/2, this.DrawRes.Dimensions.Y/2)), copyInstance(this.Rigidbody));
        this.Rigidbody.Disable();
        //console.log(this.Shots);
      }, 2000)
    });
  }

  EarlyUpdate(felapsed){
    this.Rigidbody.Vel.Mult(0.99);
    this.Rigidbody.AngVel *= 0.993;
  }

  OnHit(object){
    if (this.NeedsDelete){return;}
    this.AstroidHit.Play();
    if (this.DrawRes.Dimensions.Mag() < 99999){this.NeedsDelete = true; return;}

    let force = this.Rigidbody.Vel.rSub(object.Rigidbody.Vel);
    force = force.MagSqrt();

    for (let i = 0; i < 4; i++){
      let chance = U.getRandomFloat(1);

      let randomsize = (U.getRandomFloat(0.4) + 0.4);
      randomsize *= this.size;


      var p;
      if (chance < 0.4){ p = new AstroidBAT(randomsize);}
      else {p = new Astroid(randomsize); p.DrawRes.SpriteID = 10;}
      p.MakeActiveTemp();



      let f = U.RandomVecInCircle();
      f.Mult(force);


      p.Rigidbody.Pos = U.copyInstance(this.Rigidbody.Pos);
      p.Rigidbody.Vel = f.rMult(0.4);
      p.Rigidbody.AngVel = U.getRandomFloat(10) - 5;

      M.GameSystem.AddObject(p);
    }

    this.NeedsDelete = true;
  }
}

export class AstroidBAT extends Astroid{
  constructor(size){
    super(size);
    this.DrawRes.SpriteID = 11;
  }

  OnHit(object){
      this.AstroidHit.Play();
    let BATAmount = U.getRandomInt(5) + 1;
    for (let i = 0; i < BATAmount; i++){
      let B = new BPU.BATPickUp();
      B.Rigidbody.Pos = U.copyInstance(this.Rigidbody.Pos);
      let f = U.RandomVecInCircle();

      B.Rigidbody.Vel = f.rMult(100);
      M.GameSystem.AddObject(B);
    }
    this.NeedsDelete = true;
  }
}
