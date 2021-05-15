class Vec2{
  constructor(x,y){
    this.X = x;
    this.Y = y;
  }

  Add(other){
    this.X += other.X;
    this.Y += other.Y;
  }

  rAdd(other){
    let sum = new Vec2(0,0);
    sum.X = this.X + other.X;
    sum.Y = this.Y + other.Y;
    return sum;
  }

  Sub(other){
    this.X -= other.X;
    this.Y -= other.Y;
  }

  rSub(other){
    let sum = new Vec2(0,0);
    sum.X = (this.X - other.X);
    sum.Y = (this.Y - other.Y);
    return sum;
  }

  Mult(other){
    this.X *= other;
    this.Y *= other;
  }

  rMult(other){
    let sum = new Vec2(0,0);
    sum.X = this.X * other;
    sum.Y = this.Y * other;
    return sum;
  }

  Dot(other){
    /* Need to freshen up my vector math.*/
  }
}
