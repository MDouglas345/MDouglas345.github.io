import * as CM from './CollisionMatrix.js'
import * as CHM from './CollisionHandlerModes.js'
export class CollisionHandler{
  constructor(QuadTree){
    this.QuadTreeRef = QuadTree;
    this.CollisionsDetected = [];

    this.CollisionMatrix = new CM.CollisionMatrix()

    this.CollisionMode = new CHM.CHSingleThreaded();
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
