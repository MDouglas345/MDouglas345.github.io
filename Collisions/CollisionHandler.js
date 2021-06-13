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
    
    console.log(this.CollisionsDetected);
  }

}
