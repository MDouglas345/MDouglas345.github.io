class Projectile extends Shootable{
  constructor(pos, ori){
    super();
    this.Name = "Projectile";
    this.Rigidbody = new Rigidbody();
    this.Rigidbody.Enable();
    this.DrawRes = new DefaultProjectile();
    this.DrawRes.Dimensions = new Vec2(25,10);

    this.CollisionType = new CircleCollider(20);
    this.CollisionLayer = 1;

    this.Rigidbody.Mass = 1;
    this.Rigidbody.Pos = pos;
    this.Rigidbody.Orien = ori.Orien;

    let dir = GetVectorFromAngle(this.Rigidbody.Orien);
    dir.Mult(1000);
    this.Rigidbody.Vel = dir;

  }

  OnHit(object){
    console.log(object);
    if (object instanceof Shootable){
      this.NeedsDelete = true;
      object.OnHit(this)
    }
  }

  OnCollide(object){
   this.OnHit(object);
  }
}
