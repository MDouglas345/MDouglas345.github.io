class Camera extends GameObject{
  constructor(Focus){
    super();
    this.m_FocusPoint = Focus;
    this.Zoom = 1;
  }
  LateUpdate(felapsed){
    console.log("Camera is updating");
  }

}
