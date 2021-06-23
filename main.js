//Idea : find a way to dynamically include all JS files in directory

/* Function is called when document is loaded*/

window.addEventListener('DOMContentLoaded', Init, false);

/*The controller merges different aspects of the Game */

var GameSystem;
var RenderSystem;
var InputSystem;
var OManager;

var Global = window || global;

var PrevTime;
var ElapsedTime;


window.addEventListener('resize', ResizeTrigger);

document.addEventListener("keyup", function(event){

  if (InputSystem){
    InputSystem.HandleButtonEvent(event.keyCode, event.type);
  }
},true);

function copyInstance(original){
  var copied = Object.assign(
    Object.create(
      Object.getPrototypeOf(original)
    ), original
  );
  return copied;
}

document.addEventListener("keydown", function(event){

  if (InputSystem){
    InputSystem.HandleButtonEvent(event.keyCode, event.type);
  }
},true);


function Init(){
  OManager = new ObjectManager();
  RenderSystem = new Renderer();
  GameSystem = new Game();
  InputSystem = new Controller();

  RenderSystem.SetCamera(GameSystem.m_Camera);
  RenderSystem.SetEntities(GameSystem.Entities);

  Global.InputSystem = InputSystem;


  GameSystem.m_Camera.Init();


  ResizeTrigger();

  GameSystem.Init();

  PrevTime = 0;
  ElapsedTime = 0;

  requestAnimationFrame(mainloop);

}

function mainloop(timestep){
  timestep = timestep / 1000
  ElapsedTime = timestep - PrevTime;
  PrevTime = timestep;

  //console.log(ElapsedTime);

  //if (ElapsedTime > 0.0166){Elapsed = 0;}

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
