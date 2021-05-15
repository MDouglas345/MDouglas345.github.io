class Vec2{
  constructor(x,y){
    this.X = x;
    this.Y = y;
  }

  Add(other){
    this.X += other.X;
    this.Y += other.Y;
  }

  Sub(other){
    this.X -= other.X;
    this.Y -= other.Y;
  }

  Mult(other){
    this.X *= other;
    this.Y *= other;
  }

  Dot(other){
    /* Need to freshen up my vector math.*/
  }
}
