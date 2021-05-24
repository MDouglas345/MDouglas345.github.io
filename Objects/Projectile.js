class Projectile extends GameObject{
  constructor(pos, ori){
    super();
    this.Name = "Projectile";
    this.Rigidbody = new Rigidbody();
    this.DrawRes = new DefaultProjectile();
    this.DrawRes.Dimensions = new Vec2(25,10);

    this.Rigidbody.Mass = 1;
    this.Rigidbody.Pos = pos;
    this.Rigidbody.Orien = ori.Orien;

    let dir = Vec2.GetVectorFromAngle(this.Rigidbody.Orien);
    dir.Mult(1000);
    this.Rigidbody.Vel = dir;

  }

  EarlyUpdate(felapsed){

  }
}
