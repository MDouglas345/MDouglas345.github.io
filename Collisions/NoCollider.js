class NoCollider extends CollisionType{
  constructor(){
    super();
    this.TypeID = 0;
  }

  IsActive(){
    return false;
  }
}
