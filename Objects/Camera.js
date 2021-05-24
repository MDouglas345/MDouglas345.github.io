/*
  Focus is always going to be a Vec2
*/
class Camera extends GameObject{
  constructor(Focus){
    super();
    this.m_FocusPoint = Focus;
    this.Zoom = 1;
  }
  LateUpdate(felapsed){
    //let dir = this.Rigidbody.Pos.rSub(this.m_FocusPoint);
    let Focus = this.m_FocusPoint.rSub(new Vec2(500, 500));
    let dir = Focus.rSub(this.Rigidbody.Pos);
    this.Rigidbody.Pos.Add(dir);
    console.log(dir);

    if (Global.InputSystem.GetKeyState('-') == "keydown"){
      this.Zoom += 0.5 * felapsed;
    }
    if (Global.InputSystem.GetKeyState('+') == "keydown"){
      this.Zoom -= 0.5 * felapsed;
    }


  }

}
