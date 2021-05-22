class DrawFunction{
  constructor(){

  }

  Draw(){

  }
}

class DebugSquareFunction extends DrawFunction{
  constructor(){
    super();
  }

  Draw(context, imageRef, pos, scale){
    console.log(scale);
    context.fillRect(pos.X-(scale.X / 2), pos.Y-(scale.Y / 2), scale.X, scale.Y);
  }
}

class BDrawFunction extends DrawFunction{
  constructor(){
    super();
  }

  Draw(context, imageRef, Pos, scale){
    context.drawImage(imageRef,Pos.X, Pos.Y, 100 * scale, 100 * scale);
  }
}

class BRotatedDrawFunction extends DrawFunction{
  constructor(){
    super();
  }

  Draw(context, image, Pos, scale, rot){
    context.save();
    //context.setTransform(0.25, 0, 0, 0.25, Pos.X, Pos.Y); // sets scale and origin
    context.translate(Pos.X - scale.X / 2, Pos.Y - scale.Y / 2);
    context.rotate(rot);
    context.drawImage(image ,0, 0, scale.X, scale.Y);
    context.restore();
  }
}
