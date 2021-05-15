/* Function is called when document is loaded*/

window.addEventListener('DOMContentLoaded', Init, false);

/*The controller merges different aspects of the Game */

var GameSystem;
var RenderSystem;

var PrevTime;
var ElapsedTime;



function Init(){

  GameSystem = new Game();
  RenderSystem = new Renderer(GameSystem.Entities);

  //console.log(GameSystem.Entities);

  var a = new Vec2(0,0);
  var b = new Vec2(5,5);

  a.Add(b);

  console.log(a);
  console.log(b);

  PrevTime = 0;
  ElapsedTime = 0;

  requestAnimationFrame(mainloop);

}

function mainloop(timestep){
  timestep = timestep / 1000;
  ElapsedTime = timestep - PrevTime;
  PrevTime = timestep;

  //console.log(ElapsedTime);

  GameSystem.Update(ElapsedTime);
  RenderSystem.Update();



  requestAnimationFrame(mainloop);
}
