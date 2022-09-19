/*
  Focus is always going to be a Vec2
*/

import * as GO from '../Objects/GameObject.js'
import * as U from '../Utility/Utility.js'
import * as CS from './CameraStates.js'
import * as M from '../main.js'

export class Camera extends GO.GameObject{
  constructor(Focus){
    super();
    this.Name = "mCamera";
    this.m_FocusPoint = Focus;
    this.Zoom = 0.25;
    this.ZOOMMIN = 0.2;
    this.ZOOMMAX = 3;
    this.RenderInstance;
    this.Dir;

    this.Rigidbody.Pos = new U.Vec2(0,0);
    this.Rigidbody.Enable();


    this.TitleScreen;

    this.States = {
      "Follow" : new CS.FollowState(this),
      "Start" : new CS.GameStartState(this)
    };

    this.InitalState("Start");


  }

  Update(felapsed){
    this.ActiveState.Update(felapsed);

    /*
    if (Global.InputSystem.GetKeyState('-') == "keydown"){
      this.Zoom += 0.5 * felapsed;
    }
    if (Global.InputSystem.GetKeyState('+') == "keydown"){
      this.Zoom -= 0.5 * felapsed;
    }
    this.Zoom = Clamp(this.Zoom, this.ZOOMMIN, this.ZOOMMAX);

    let point = this.m_FocusPoint.Center();
    this.Dir = point.rSub(new Vec2((this.RenderInstance.GetCanvasWidth() / 2) * (1/this.Zoom) , (this.RenderInstance.GetCanvasHeight() /2 * (1/this.Zoom))));
    */
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

    this.ActiveState.LateUpdate(felapsed);
    //this.Rigidbody.Pos = this.Dir;
    //this.Rigidbody.Orien = this.m_FocusPoint.Rigidbody.Orien;






  }

  Init(){
    this.RenderInstance = M.RenderSystem;

    for (var state in this.States){
      this.States[state].Init();
    }
  }

  InitalState(state){
    this.ActiveState = this.States[state];
    this.ActiveState.EnterState();
  }

  SwitchState(state){
    this.ActiveState.ExitState();
    this.ActiveState = this.States[state];
    this.ActiveState.EnterState();

  }

  ObjectInView(object){
    let offset = this.RenderInstance.WorldToScreen(object.Rigidbody.Pos);
    if (offset.X < 0 || offset.X > this.RenderInstance.GetCanvasWidth()){return false;}
    if (offset.Y < 0 || offset.Y > this.RenderInstance.GetCanvasHeight()){return false;}
    return true;
  }

}
