import * as CT from './CollisionTypes.js';

export class NoCollider extends CT.CollisionType{
  constructor(){
    super();
    this.TypeID = 0;
  }

  IsActive(){
    return false;
  }
}
