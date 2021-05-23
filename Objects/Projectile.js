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


  }

  EarlyUpdate(felapsed){

    let dir = Vec2.GetVectorFromAngle(this.Rigidbody.Orien);
    dir.Mult(5);
    console.log(dir);
    this.Rigidbody.AddVel(dir);
  }
}
