class CollisionHandler{
  constructor(QuadTree){
    this.QuadTreeRef = QuadTree;
    this.CollisionsDetected = [];

    this.CollisionMode = new CHSingleThreaded();
  }

  CheckCollisions(){
    let ObjectZones = this.QuadTreeRef.GetRegionalData();

    this.CollisionsDetected = this.CollisionMode.CheckCollisions(ObjectZones);
  }


}
