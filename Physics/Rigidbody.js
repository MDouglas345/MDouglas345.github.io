class Rigidbody{
  constructor(){
    this.Pos = new Vec2(0,0);
    this.Vel = new Vec2(0,0);
    this.Acc = new Vel(0,0);
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
    this.Vel = pos;
  }

  get Acceleration(){
    return [this.Acc.X,this.Acc.Y];
  }

  set Acceleration(acc){
    this.Acc = acc;
  }
}
