/* Should only contain and manage game objects */

class Game{
  constructor(){
    console.log("Game is here");
    this.Entities = [];
    this.Entities.push(new GameObject());
  }

  Update(){
    console.log("Game is updating");

    this.Entities.forEach(item => {

      console.log(item.Name + " " + item.Position);

;    });

  }


}
