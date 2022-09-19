
import * as M from '../main.js'
import * as U from '../Utility/Utility.js'
export class DrawFunction{
  constructor(){

  }

  Draw(){

  }
}

export class DebugSquareFunction extends DrawFunction{
  constructor(){
    super();
  }

  Draw(context, imageRef, pos, scale, rot){
    context.fillRect(pos.X-(scale.X / 2), pos.Y-(scale.Y / 2), scale.X, scale.Y);
  }
}

export class NodeDrawFunction extends DrawFunction{
  constructor(){
    super();
  }

  Draw(context, imageRef, pos, scale, rot){
    //console.log(pos);
    context.strokeStyle = "#FF0000";
    context.strokeRect(pos.X-(scale.X / 2), pos.Y-(scale.Y / 2), scale.X, scale.Y);
  }
}

export class BDrawFunction extends DrawFunction{
  constructor(){
    super();
  }

  Draw(context, imageRef, Pos, scale){
    context.drawImage(imageRef,Pos.X, Pos.Y, 100 * scale, 100 * scale);
  }
}

export class BackgroundFunction extends DrawFunction{
  constructor(color){
    super();
    this.color = color;

  }

  Draw(context, imageRef, Pos, scale){
    context.fillStyle = this.color;
    context.fillRect(0,0,M.RenderSystem.GetCanvasWidth(), M.RenderSystem.GetCanvasHeight());
  }
}

export class BRotatedDrawFunction extends DrawFunction{
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



export class RotatedOpacityDrawFunction extends DrawFunction{
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

export class BGBlack extends DrawFunction{
  constructor(){
    super();
  }

  Draw(context, image, Pos, scale, rot){
    context.fillStyle = "#000000";
    context.fillRect(0, 0, scale.X, scale.Y);
  }
}

export class DebugPositionDrawFunc extends DrawFunction{
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

export class PlaceHolderDrawFunction extends DrawFunction{
  constructor(color){
    super();
    this.Color = color;
  }

  Draw(context, image, Pos, scale, rot){
    context.save();
    context.translate(Pos.X , Pos.Y );
    context.rotate(rot);
    context.fillStyle = this.Color;
    context.fillRect(-scale.X/2, -scale.Y/2, scale.X, scale.Y);
    context.restore();
  }
}

export class UITextDrawFunction extends DrawFunction{
  constructor(UIRes){
    super();
    this.UIRes = UIRes;
  }
  Draw(context, image, Pos, scale, rot){
    context.font = this.UIRes.Font;
    context.strokeStyle = "#FFFFFF";
    context.strokeText(this.UIRes.TextToDisplay.variable, this.UIRes.ScreenLocation.X, this.UIRes.ScreenLocation.Y);

  }
}

export class UITextFillFunction extends DrawFunction{
  constructor(UIRes){
    super();
    this.UIRes = UIRes;
  }

  Draw(context, image, Pos, scale, rot){
    context.font = this.UIRes.Font;
    context.fillStyle = this.UIRes.FillStyle;
    context.fillText(this.UIRes.TextToDisplay.variable, this.UIRes.ScreenLocation.X, this.UIRes.ScreenLocation.Y);

  }
}

export class UITextFillStrokeFunction extends DrawFunction{
  constructor(UIRes){
    super();
    this.UIRes = UIRes;
  }

  Draw(context, image, Pos, scale, rot){
    context.font = this.UIRes.Font;
    context.fillStyle = this.UIRes.FillStyle;
    context.strokeStyle = this.UIRes.StrokeStyle;
    context.lineWidth = this.UIRes.StrokeStrength;
    context.fillText(this.UIRes.TextToDisplay.variable, this.UIRes.ScreenLocation.X, this.UIRes.ScreenLocation.Y);
    context.strokeText(this.UIRes.TextToDisplay.variable, this.UIRes.ScreenLocation.X, this.UIRes.ScreenLocation.Y);

  }
}

export class UITitleDrawFunction extends DrawFunction{
  constructor(UIRes){
    super();
    this.UIRes = UIRes;
    this.FillStrokeFunc = new UITextFillStrokeFunction(this.UIRes);
  }
  Draw(context, image, Pos, scale, rot){
    context.save();
    context.globalAlpha = this.UIRes.TitleOpacity.variable;
    this.FillStrokeFunc.Draw(context, image, Pos, scale, rot);
  }
}
export class UIBarDrawFunctionBasic extends DrawFunction{
  constructor(UIRes){
    super();
    this.UIRes = UIRes;


  }
  Draw(context, image, Pos, scale, rot){

    let fillpercent = U.InvLerp(this.UIRes.MinValue,this.UIRes.MaxValue.variable, this.UIRes.CurrentValue.variable);
    //console.log(this.UIRes.MinValue,this.UIRes.MaxValue.variable, this.UIRes.CurrentValue.variable);
    //console.log(fillpercent);
    context.fillStyle = this.UIRes.ForegroundColor;
    context.fillRect(this.UIRes.ScreenLocation.X, this.UIRes.ScreenLocation.Y, fillpercent * this.UIRes.Width, this.UIRes.Height);
  }
}

export class UIBarDrawFunction extends DrawFunction{
  constructor(UIRes){
    this.UIRes = UIRes;
  }
  Draw(context, image, Pos, scale, rot){
  }

}

export class UIImageDraw extends DrawFunction{
  constructor(res){
    super();
    this.UIRes = res;
  }

  Draw(context, image, Pos, scale, rot){
    context.drawImage(image, this.UIRes.ScreenLocation.X, this.UIRes.ScreenLocation.Y, this.UIRes.Dimensions.X, this.UIRes.Dimensions.X );
  }
}
