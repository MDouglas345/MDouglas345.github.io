import * as CT from './CollisionTypes.js';

export class CircleCollider extends CT.CollisionType{
  constructor(radius){
    super();
    this.TypeID = 1;
    this.Radius = radius;

    this.Enable();
  }
}
