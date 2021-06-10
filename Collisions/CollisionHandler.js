class CollisionHandler{
  constructor(QuadTree){
    this.QuadTreeRef = QuadTree;
    this.CollisionsDetected = [];
  }

  CheckCollisions(){
    let ObjectZones = this.QuadTreeRef.GetRegionalData();
  }


}
