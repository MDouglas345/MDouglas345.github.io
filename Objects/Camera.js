/*
  Focus is always going to be a Vec2
*/

var Global = window || global;

class Camera extends GameObject{
  constructor(Focus){
    super();
    this.Name = "mCamera";
    this.m_FocusPoint = Focus;
    this.Zoom = 1;
    this.ZOOMMIN = 0.25;
    this.ZOOMMAX = 1.5;
    this.RenderInstance;
    this.Dir;

    this.Rigidbody.Pos = new Vec2(0,0);


  }
  Update(felapsed){
    let point = this.m_FocusPoint.Center();
    this.Dir = point.rSub(new Vec2((this.RenderInstance.GetCanvasWidth() / 2) * (1/this.Zoom) , (this.RenderInstance.GetCanvasHeight() /2 * (1/this.Zoom))));
  }
  LateUpdate(felapsed){
    /*
    //let dir = this.Rigidbody.Pos.rSub(this.m_FocusPoint);
    let Focus = this.m_FocusPoint.rSub(new Vec2(this.RenderInstance.ClientWidth / 2 , this.RenderInstance.ClientHeight/2));
    //let Focus = this.m_FocusPoint;
    console.log(this.RenderInstance.ClientWidth, this.RenderInstance.ClientHeight);
    let dir = Focus.rSub(this.Rigidbody.Pos);
    this.Rigidbody.Pos.Add(dir);
    */

    //let dir = this.m_FocusPoint.rSub(new Vec2((this.RenderInstance.GetCanvasWidth() / 2) * (1/this.Zoom) , (this.RenderInstance.GetCanvasHeight() /2 * (1/this.Zoom))));

    this.Rigidbody.Pos = this.Dir;
    //this.Rigidbody.Orien = this.m_FocusPoint.Rigidbody.Orien;


    if (Global.InputSystem.GetKeyState('-') == "keydown"){
      this.Zoom += 0.5 * felapsed;
    }
    if (Global.InputSystem.GetKeyState('+') == "keydown"){
      this.Zoom -= 0.5 * felapsed;
    }
    this.Zoom = Clamp(this.Zoom, this.ZOOMMIN, this.ZOOMMAX);



  }

  Init(){
    this.RenderInstance = Global.RenderSystem;
  }

  ObjectInView(object){
    let offset = this.RenderInstance.WorldToScreen(object.Rigidbody.Pos);
    if (offset.X < 0 || offset.X > this.RenderInstance.GetCanvasWidth()){return false;}
    if (offset.Y < 0 || offset.Y > this.RenderInstance.GetCanvasHeight()){return false;}
    return true;
  }

}
