class TriggerCollider extends CollisionType{
  constructor(Collider){
    this.ColliderType = Collider;
    this.TypeID = 2
    this.ColliderTypeID = Collider.TypeID;
    this.DetectedObjects = [];

    this.CollisionMatrixRef = this.CollisionMatrixRef = CollisionMatrix.FuncMatrix;
  }

   AddObjectToTrigger(object){
     this.DetectedObjects.push(object);
   }

   Clear(){
     this.DetectedObjects = null;
     this.DetectedObjects = [];
   }
}
