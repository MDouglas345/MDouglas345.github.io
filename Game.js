/* Should only contain and manage game objects */

class Game{
  constructor(){
    console.log("Game is here");
    this.m_Player = new Player();
    this.Entities = [];
    this.Entities.push(this.m_Player);
    this.Entities.push(new GameObject());
  }

  Update(){
    console.log("Game is updating");
    /*
    Stages to go through in order
    1. Rigidbody Update
    2. Collision Detection and correction
    3. Game Elements update?
    */


    /*
    Rigidbody update
    */
    this.Entities.forEach(item => {

      item.Rigidbody.Update();

   });

    /*
    Collision detection and correction
    */



  }


}
