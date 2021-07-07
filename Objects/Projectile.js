class Projectile extends Shootable{
  constructor(pos, ori, damage, speed){
    super();
    this.Name = "Projectile";
    this.Rigidbody = new Rigidbody();
    this.Rigidbody.Enable();
    //this.DrawRes = new DefaultProjectile();
    this.DrawRes = new PlaceholderRes(new Vec2(15,5), 3, "#FFA300");
    //this.DrawRes.Dimensions = new Vec2(25,10);

    this.CollisionType = new CircleCollider(10);
    this.CollisionLayer = 1;

    this.Rigidbody.Mass = 1;
    this.Rigidbody.Pos = pos;
    this.Rigidbody.Orien = ori.Orien;

    this.Damage = damage;
    this.Speed = speed;

    let dir = GetVectorFromAngle(this.Rigidbody.Orien);
    dir.Mult(this.Speed);

    this.Rigidbody.Vel = dir.rAdd(ori.Vel);

    this.AutoDelete();

  }

  OnHit(object){
    this.NeedsDelete = true;
    object.OnHit(this)
  }

  Deleting(){
    return new Promise ( resolve => {
      setTimeout(() =>{
        //Love JS and its inability to deep copy :D
        //need to find a way to deep copy!
        //let b = new Projectile(copyInstance(this.Rigidbody.Pos), copyInstance(this.Rigidbody));
        //let b = new Projectile(this.Rigidbody.Pos.rSub(new Vec2(this.DrawRes.Dimensions.X/2, this.DrawRes.Dimensions.Y/2)), copyInstance(this.Rigidbody));
        if (this){this.NeedsDelete = true;}
        //console.log(this.Shots);
      }, 4000)
    });
  }

  async AutoDelete(){
    let r = await this.Deleting();
  }



  OnCollide(object){

    if (object instanceof Projectile){
      this.NeedsDelete = true;
      return;
    }

    this.OnHit(object);
  }
}

class pPlayerBlasterT1 extends Projectile{
  constructor(pos, ori){
    super(pos, ori, 10, 1000);
    this.DrawRes = new BulletRes(14);

  }
}

class pBlasterT1 extends Projectile{
  constructor(pos, ori,){
    super(pos, ori, 10, 1000);

    this.CollisionLayer = 3;
    //this.DrawRes = new PlaceholderRes(new Vec2(15,5), 3, "#FF0000");
    this.DrawRes = new BulletRes(15);
  }
}
