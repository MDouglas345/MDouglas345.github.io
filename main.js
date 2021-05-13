/* Function is called when document is loaded*/

window.addEventListener('DOMContentLoaded', Init, false);

/*The controller merges different aspects of the Game */

var GameSystem;
var RenderSystem;

function Init(){
  GameSystem = new Game();
  RenderSystem = new Renderer();
  
  main();
}

function main(){
  console.log("We are here.");

}
