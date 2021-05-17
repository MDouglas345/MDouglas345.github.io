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
    context.fillRect(pos.X-(5*scale), pos.Y-(5*scale), 10 * scale, 10 * scale);
  }
}

class BDrawFunction extends DrawFunction{
  constructor(){
    super();
  }

  Draw(context, imageRef, Pos, scale){
    console.log(imageRef);
    context.drawImage(imageRef,Pos.X, Pos.Y, 50 * scale, 50 * scale);
  }
}
