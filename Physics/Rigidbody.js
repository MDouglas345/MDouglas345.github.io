class Rigidbody{
  constructor(){
    this.Pos = new Vec2(0,0);
    this.Vel = new Vec2(0,0);
    this.Acc = new Vec2(0,0);

    this.Mass = 1;

  }

  get Position(){
    return [this.Pos.X,this.Pos.Y];
  }

  set Position(pos){
    this.Pos = pos;
  }

  get Velocity(){
    return [this.Vel.X,this.Vel.Y];
  }

  set Velocity(vel){
    this.Vel = vel;
  }

  get Acceleration(){
    return [this.Acc.X,this.Acc.Y];
  }

  set Acceleration(acc){
    this.Acc = acc;
  }

  get Position(){
    return [this.Pos.X,this.Pos.Y];
  }

  set Position(acc){
    this.Pos = acc;
  }


  AddAcc(other){
    this.Acc.Add(other.rDivide(this.Mass));
  }

  ResetAcc(){
    this.Acc.Mult(0);
  }

  Update(elapsed){
    /*Simple euler integration goes here*/

    this.Vel.Add(this.Acc.rMult(elapsed));
    this.Pos.Add(this.Vel.rMult(elapsed));


  }
}

class NoRigidbody extends Rigidbody{
  constructor(){
    super();
  }
  Update(){
    //console.log("Not updating rigid");
  }
}
