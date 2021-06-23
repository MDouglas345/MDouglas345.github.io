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
    return (this.X * this.X + this.Y * this.Y);
  }

  MagSqrt(){
    return Math.sqrt(this.Mag());
  }

  Normal(){
    return this.rDivide(this.MagSqrt());
  }
  Normalize(){
    this.Divide(this.MagSqrt());
  }
}

function Clamp(source, min, max){
  return Math.min(Math.max(source, min), max);
}

function getRandomInt(max) {
  if (!max){max = 999999;}
  return Math.floor(Math.random() * max);
}

function getRandomFloat(max){
  if (!max){max = 999999;}
  return (Math.random() * max);
}

function Lerp(x, y, a){
  return x * (1 - a) + y * a;
}

function GetVectorFromAngle(other){
  let vec = new Vec2(0,0);
  vec.X = Math.cos(-other);
  vec.Y = Math.sin(other);

  return vec;
}

function GetAngleFromVector(vec){
  return Math.atan2(vec.Y, vec.X);
}

function RotateVecByAngle(vec, angle){
    let dir = new Vec2(0,0);
    dir.X = vec.X * Math.cos(angle) - vec.Y * Math.sin(angle);
    dir.Y = vec.X * Math.sin(angle) + vec.X * Math.cos(angle);
    //console.log(dir, vec, angle);
    return dir
}

function AngleBetweenVec(vec1, vec2){
  let res = Math.atan2(vec2.Y, vec2.X) - Math.atan2(vec1.Y, vec1.X);
  return res;
}

function RandomVecInCircle(){
  let theta = getRandomFloat();
  return GetVectorFromAngle(theta);
}

function Truncate(vector, maxlength){
  if (vector.MagSqrt() > maxlength){
    vector.Normalize();
    vector.Mult(maxlength);
  }
}
function rTruncate(vector, maxlength){
  if (vector.MagSqrt() > maxlength){
    let vec = vector.Normal();
    vec.Mult(maxlength);
    return vec;
  }
}
