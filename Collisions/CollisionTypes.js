class CollisionType{
  constructor(){
    this.TypeID = -1;
    this.States = {
      "Active" : new CollisionTypeActive(),
      "Inactive" : new CollisionTypeInactive()
    }

    this.Disable();
  }

  Enable(){
    this.ActiveState = this.States["Active"];
  }

  Disable(){
    this.ActiveState = this.States["Inactive"];
  }

  IsActive(){
    return this.ActiveState.IsActive();
  }
}


class CollisionTypeState{
  constructor(){

  }

  IsActive(){

  }
}

class CollisionTypeActive extends CollisionTypeState{
  constructor(){
    super();
  }

  IsActive(){
    return true;
  }
}

class CollisionTypeInactive extends CollisionTypeState{
  constructor(){
    super();
  }

  IsActive(){
    return false;
  }
}
