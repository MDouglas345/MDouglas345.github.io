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

  Draw(context, imageRef, pos, scale, rot){
    context.fillRect(pos.X-(scale.X / 2), pos.Y-(scale.Y / 2), scale.X, scale.Y);
  }
}

class NodeDrawFunction extends DrawFunction{
  constructor(){
    super();
  }

  Draw(context, imageRef, pos, scale, rot){
    //console.log(pos);
    context.strokeRect(pos.X-(scale.X / 2), pos.Y-(scale.Y / 2), scale.X, scale.Y);
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
    context.translate(Pos.X , Pos.Y );
    context.rotate(rot);
    context.drawImage(image ,-scale.X/2, -scale.Y/2, scale.X, scale.Y);
    context.restore();
  }
}



class RotatedOpacityDrawFunction extends DrawFunction{
  constructor(){
    super();
  }

  Draw(context, image, Pos, scale, rot, opacity){
    context.save();
    context.globalAlpha = opacity;
    context.translate(Pos.X , Pos.Y );
    context.rotate(rot);
    context.drawImage(image ,-scale.X/2, -scale.Y/2, scale.X, scale.Y);
    context.restore();
  }


}

class BGBlack extends DrawFunction{
  constructor(){
    super();
  }

  Draw(context, image, Pos, scale, rot){
    context.fillRect(0, 0, scale.X, scale.Y);
  }
}

class DebugPositionDrawFunc extends DrawFunction{
  constructor(){
    super();
    this.DrawFunc1 = new DebugSquareFunction();
    this.DrawFunc2 = new BRotatedDrawFunction();
  }
  Draw(context, image, Pos, scale, rot){
    this.DrawFunc2.Draw(context, image, Pos, scale, rot);
    this.DrawFunc1.Draw(context, image, Pos, scale, rot);
  }
}
