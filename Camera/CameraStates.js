

class CameraState extends NPCAIState{
  constructor(Master){
    super(Master);
  }

  Update(felapsed){

  }

  Init(){

  }

  LateUpdate(felapsed){

  }

  EnterState(){

  }

  ExitState(){

  }
}

class FollowState extends CameraState{
  constructor(Master){
    super(Master);
  }

  Init(){
    console.log("Start follow");
  }

  Update(felapsed){
  //  this.ActiveState.Update(felapsed);
    if (Global.InputSystem.GetKeyState('-') == "keydown"){
      this.Master.Zoom += 0.5 * felapsed;
    }
    if (Global.InputSystem.GetKeyState('+') == "keydown"){
      this.Master.Zoom -= 0.5 * felapsed;
    }


    this.Master.Zoom = Clamp(this.Master.Zoom, this.Master.ZOOMMIN, this.Master.ZOOMMAX);
    /*
    let v1 = this.Master.Rigidbody.Pos.rAdd(new Vec2((this.Master.RenderInstance.GetCanvasWidth() / 2) * (1/this.Master.Zoom) , (this.Master.RenderInstance.GetCanvasHeight() /2 * (1/this.Master.Zoom))));
    let Push = this.Master.m_FocusPoint.Rigidbody.Pos.rSub(v1);

    console.log(this.Master.m_FocusPoint.Rigidbody.Pos);

    let D = Push.MagSqrt();
    let S = (D / 100) * 150;
    Push.Normalize();
    Push.Mult(S);

    this.Master.Rigidbody.Vel = Push;
    */


    //let point = this.Master.m_FocusPoint.Center();
    //this.Master.Dir = point.rSub(new Vec2((this.Master.RenderInstance.GetCanvasWidth() / 2) * (1/this.Master.Zoom) , (this.Master.RenderInstance.GetCanvasHeight() /2 * (1/this.Master.Zoom))));
  }
  LateUpdate(felapsed){



    let v1 = this.Master.Rigidbody.Pos.rAdd(new Vec2((this.Master.RenderInstance.GetCanvasWidth() / 2) * (1/this.Master.Zoom) , (this.Master.RenderInstance.GetCanvasHeight() /2 * (1/this.Master.Zoom))));
    let Push = this.Master.m_FocusPoint.Rigidbody.Pos.rSub(v1);



    let D = Push.MagSqrt();
    let S = (D / 100) * 150;
    Push.Normalize();
    Push.Mult(S);

    this.Master.Rigidbody.Vel = Push;


    /*
    //let dir = this.Rigidbody.Pos.rSub(this.m_FocusPoint);
    let Focus = this.m_FocusPoint.rSub(new Vec2(this.RenderInstance.ClientWidth / 2 , this.RenderInstance.ClientHeight/2));
    //let Focus = this.m_FocusPoint;
    console.log(this.RenderInstance.ClientWidth, this.RenderInstance.ClientHeight);
    let dir = Focus.rSub(this.Rigidbody.Pos);
    this.Rigidbody.Pos.Add(dir);
    */

    //let dir = this.m_FocusPoint.rSub(new Vec2((this.RenderInstance.GetCanvasWidth() / 2) * (1/this.Zoom) , (this.RenderInstance.GetCanvasHeight() /2 * (1/this.Zoom))));

    //this.Master.Rigidbody.Pos = this.Master.Dir;
    //this.Rigidbody.Orien = this.m_FocusPoint.Rigidbody.Orien;

  }

  EnterState(){

    let point = this.Master.m_FocusPoint.Center();
    this.Master.Dir = point.rSub(new Vec2((this.Master.RenderInstance.GetCanvasWidth() / 2) * (1/this.Master.Zoom) , (this.Master.RenderInstance.GetCanvasHeight() /2 * (1/this.Master.Zoom))));

  }
}

class GameStartState extends CameraState{
  constructor(Master){
    super(Master);

    //this.Master.Rigidbody.Enable();
    this.Targets = [];
    /*
    this.Targets.push(new Vec2(1500,6000));
    this.Targets.push(new Vec2(5000,1500));
    this.Targets.push(new Vec2(0,0));
    */






    this.Current = 0;
  }

  Init(){
    let p = Game.GetObjectByName("Player");
    let c = Game.GetObjectByName("Cryptopolid");
    let n = Game.GetObjectByName("Nightly");

    this.AddPoint(n.Rigidbody.Pos);
    this.AddPoint(c.Rigidbody.Pos);
    this.AddPoint(p.Rigidbody.Pos);
  }

  EnterState(){
    this.Master.Rigidbody.Pos = new Vec2(-1000, 25000);
  }

  ExitState(){
    this.Master.TitleScreen = new TitleScreen();
    Game.AddObject(this.Master.TitleScreen);
  }

  AddPoint(vec){
    //let v2 = this.Master.Rigidbody.Pos.rSub(new Vec2((this.Master.RenderInstance.GetCanvasWidth() / 2) * (1/this.Master.Zoom) , (this.Master.RenderInstance.GetCanvasHeight() /2 * (1/this.Master.Zoom))));
    //vec.Add(v2);
    this.Targets.push(vec);
  }

  Update(felapsed){
    let v1 = this.Master.Rigidbody.Pos.rAdd(new Vec2((this.Master.RenderInstance.GetCanvasWidth() / 2) * (1/this.Master.Zoom) , (this.Master.RenderInstance.GetCanvasHeight() /2 * (1/this.Master.Zoom))));
    let Push = this.Targets[this.Current].rSub(v1);


    let D = Push.MagSqrt();
    let S = (D/ 100) * 150;
    Push.Normalize();
    Push.Mult(S);

    this.Master.Rigidbody.Vel = Push;



    //let Dist = this.Master.Rigidbody.Pos.rSub(new Vec2((this.Master.RenderInstance.GetCanvasWidth() / 2) * (1/this.Master.Zoom) , (this.Master.RenderInstance.GetCanvasHeight() /2 * (1/this.Master.Zoom))));

    //let D = Dist.MagSqrt()

    if (D < 100){this.Current++;};

    if (this.Current > this.Targets.length-1){
      this.Master.SwitchState("Follow");
    }

      //console.log(D);
  }
}
