/* Function is called when document is loaded*/

window.addEventListener('DOMContentLoaded', Init, false);

/*The controller merges different aspects of the Game */

var GameSystem;
var RenderSystem;
var InputSystem;

var Global = window || global;

var PrevTime;
var ElapsedTime;

document.addEventListener("keydown", function(event){

  if (InputSystem){
    InputSystem.HandleButtonEvent(event.keyCode, event.type);
  }
},true);

document.addEventListener("keyup", function(event){

  if (InputSystem){
    InputSystem.HandleButtonEvent(event.keyCode, event.type);
  }
},true);


function Init(){

  GameSystem = new Game();
  InputSystem = new Controller();
  Global.InputSystem = InputSystem;


  RenderSystem = new Renderer(GameSystem.Entities, GameSystem.m_Camera);

  //console.log(GameSystem.Entities);

  PrevTime = 0;
  ElapsedTime = 0;

  requestAnimationFrame(mainloop);

}

function mainloop(timestep){
  timestep = timestep / 1000
  ElapsedTime = timestep - PrevTime;
  PrevTime = timestep;

  RenderSystem.Clear();

  GameSystem.EarlyUpdate(ElapsedTime);
  GameSystem.Update(ElapsedTime);
  GameSystem.LateUpdate(ElapsedTime);

  RenderSystem.Update();
  //RenderSystem.Debug();



  requestAnimationFrame(mainloop);
}
