class CollisionHandler{
  constructor(QuadTree){
    this.QuadTreeRef = QuadTree;
    this.CollisionsDetected = [];

    this.CollisionMatrix = new CollisionMatrix()

    this.CollisionMode = new CHSingleThreaded();
  }

  CheckCollisions(){
    let ObjectZones = this.QuadTreeRef.GetRegionalData();

    this.CollisionsDetected = this.CollisionMode.CheckCollisions(ObjectZones);

    this.CollisionsDetected.forEach(collision => {
      collision.ObjectA.OnCollide(collision.ObjectB);
      collision.ObjectB.OnCollide(collision.ObjectA);

      //collision.ObjectA.Rigidbody.Vel.Mult(-1);
      //collision.ObjectB.Rigidbody.Vel.Mult(-1);
    });


  }

}
