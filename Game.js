/* Should only contain and manage game objects */

class Game{
  constructor(){
    console.log("Game is here");
    this.m_Player = new Player();
    this.Entities = [];

    this.Physics = new PhysicsSystem(this.Entities);

    this.Entities.push(this.m_Player);
    this.Entities.push(new GameObject());


  }

  Update(elapsed){
    console.log("Game is updating");
    /*
    Stages to go through in order
    1. Rigidbody Update
    2. Collision Detection and correction
    3. Game Elements update?
    */


    /*
    Rigidbody update
    instead, gonna create a dedicated physics class that will go through all
    gameobjects and calling their rigidbody update and passing args
    The idea being that all objects could have a rigidbody or not and will update accordingly
    */

    this.Physics.Update(elapsed);

    /*
    Collision detection and correction
    */




  }


}
