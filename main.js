//Idea : find a way to dynamically include all JS files in directory

/* Function is called when document is loaded*/

import Two from './Two/two.min.js';

import * as OM from './ObjectManager/ObjectManager.js';
import * as S from './Sound/Sound.js';
import * as R from './Renderer/Renderer.js';
import * as G from './Game.js';
import * as I from './Controller/Controller.js';
import * as TR from './Renderer/TwoRenderer.js'




export var TwoContext = new Two({
  type : Two.Types.webgl,
  fullscreen : true,
  autostart : true
}).appendTo(document.body);

window.addEventListener('DOMContentLoaded', Init, false);

/*The controller merges different aspects of the Game */

export var GameSystem;
export var RenderSystem;
export var InputSystem;
export var SoundSystem;
export var OManager;


var PrevTime;
var ElapsedTime;




window.addEventListener('resize', ResizeTrigger);

document.addEventListener("keyup", function(event){

  if (InputSystem){
    InputSystem.HandleButtonEvent(event.keyCode, event.type);
  }
},true);



document.addEventListener("keydown", function(event){

  if (InputSystem){
    InputSystem.HandleButtonEvent(event.keyCode, event.type);
  }
},true);


function Init(){
  
  
  OManager = new OM.ObjectManager();
  SoundSystem = new S.Sound();
  RenderSystem = new R.Renderer();
  GameSystem = new G.Game();
  InputSystem = new I.Controller();

  
  GameSystem.Init();


  RenderSystem.SetCamera(GameSystem.m_Camera);
  RenderSystem.SetEntities(GameSystem.Entities);

  

  ResizeTrigger();

  

  PrevTime = 0;
  ElapsedTime = 0;

  requestAnimationFrame(mainloop);

}

function mainloop(timestep){
  timestep = timestep / 1000
  ElapsedTime = timestep - PrevTime;
  PrevTime = timestep;



  if (ElapsedTime > 0.02){
    ElapsedTime = 0;
  }

    //console.log(ElapsedTime);
  /*
  if (Global.InputSystem.GetKeyState(' ') == "keydown"){
    ElapsedTime = 0;
  }
  */
  //console.log(1/ElapsedTime);


  RenderSystem.Clear();

  GameSystem.EarlyUpdate(ElapsedTime);
  GameSystem.Update(ElapsedTime);
  GameSystem.LateUpdate(ElapsedTime);

  RenderSystem.Update();
  SoundSystem.Play();
  //RenderSystem.Debug();



  requestAnimationFrame(mainloop);
}

function Resize(){
  return new Promise(() =>{
    RenderSystem.GameViewContext.canvas.width = window.innerWidth;
    RenderSystem.GameViewContext.canvas.height = window.innerHeight;
    RenderSystem.ClientHeight = window.innerWidth;
    RenderSystem.ClientWidth = window.innerHeight;
  });
}

async function ResizeTrigger(){
  await Resize();
}
