
class Astroid extends Shootable{
  constructor(){
    super();
    this.Name = "Astroid";
    this.Rigidbody.Enable();
    let RandomSize = new Vec2(getRandomFloat(200) + 100, getRandomFloat(200) + 100);
    this.DrawRes = new PlaceholderRes(RandomSize, 4, '#A52A2A');
    this.CollisionType = new CircleCollider(RandomSize.MagSqrt() * 0.6);
    this.CollisionLayer = 2;
    this.Rigidbody.Orien = getRandomInt();
    this.RotSpeed = 2;

  }

  EarlyUpdate(felapsed){
    this.Rigidbody.Vel.Mult(0.99);
    this.Rigidbody.AngVel *= 0.999;
  }

  OnHit(object){
    if (this.DrawRes.Dimensions.Mag() < 10000){this.NeedsDelete = true; return;}

    let force = this.Rigidbody.Vel.rSub(object.Rigidbody.Vel);
    force = force.MagSqrt();

    for (let i = 0; i < 4; i++){
      var p = new Astroid();
      let f = RandomVecInCircle();
      f.Mult(force);
      p.DrawRes = new PlaceholderRes(this.DrawRes.Dimensions.rDivide(2), 4, '#A52A2A');
      p.Rigidbody.Pos = copyInstance(this.Rigidbody.Pos);
      p.Rigidbody.Vel = f.rMult(0.4);
      p.Rigidbody.AngVel = getRandomFloat(10) - 5;

      Game.AddObject(p);
    }
    this.NeedsDelete = true;
  }
}
