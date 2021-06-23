
class Astroid extends Shootable{
  constructor(size){
    super();
    this.size;

    if (size){this.size = size;}
    else{this.size = getRandomFloat(5) + 1;}

    this.Name = "Astroid";
    this.Rigidbody.Enable();

    let RandomSize = new Vec2(100, 100);
    RandomSize.Mult(this.size);

    this.DrawRes = new AstroidRes(RandomSize);

    this.CollisionType = new CircleCollider(RandomSize.MagSqrt() * 0.4);

    this.CollisionLayer = 2;

    this.Rigidbody.Orien = getRandomInt();
    this.RotSpeed = 2;

  }

  EarlyUpdate(felapsed){
    this.Rigidbody.Vel.Mult(0.99);
    this.Rigidbody.AngVel *= 0.999;
  }

  OnHit(object){
    if (this.DrawRes.Dimensions.Mag() < 99999){this.NeedsDelete = true; return;}

    let force = this.Rigidbody.Vel.rSub(object.Rigidbody.Vel);
    force = force.MagSqrt();

    for (let i = 0; i < 4; i++){

      let randomsize = getRandomFloat(0.4) + 0.2;
      randomsize *= this.size;

      var p = new Astroid(randomsize);
      p.DrawRes.SpriteID = 10;
      let f = RandomVecInCircle();
      f.Mult(force);


      p.Rigidbody.Pos = copyInstance(this.Rigidbody.Pos);
      p.Rigidbody.Vel = f.rMult(0.4);
      p.Rigidbody.AngVel = getRandomFloat(10) - 5;

      Game.AddObject(p);
    }

    this.NeedsDelete = true;
  }
}
