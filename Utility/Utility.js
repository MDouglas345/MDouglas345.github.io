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

  Divide(other){
    this.X /= other;
    this.Y /= other;
  }

  rDivide(other){
    let sum = new Vec2(0,0);
    sum.X = this.X / other;
    sum.Y = this.Y / other;
    return sum;
  }

  Dot(other){
    /* Need to freshen up my vector math.*/
  }

  Cross(other){
    let x = (this.X * other.Y) - (this.Y * other.X);
    return x;
  }

  Mag(){
    return (this.X * this.X + this.Y + this.Y);
  }

  MagSqrt(){

  }

  static GetVectorFromAngle(other){
    let vec = new Vec2(0,0);
    vec.X = Math.cos(-other);
    vec.Y = Math.sin(other);

    return vec;
  }

}

function Clamp(source, min, max){
  return Math.min(Math.max(source, min), max);
}

function getRandomInt(max) {
  if (!max){max = 999999;}
  return Math.floor(Math.random() * max);
}

function Lerp(x, y, a){
  return x * (1 - a) + y * a;
}
