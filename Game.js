/* Should only contain and manage game objects */

/*
  This File is responsibe for giving gameobjects information for their update Function
  All internal systems will congregate here.
  Done : PhysicsSystem
  ToDo : ParticleSystem
*/

class Game{
  static Entities = [];
  constructor(){
    this.m_Player = new Player();

    this.m_Player.Rigidbody.Position = new Vec2(50,50);
    this.m_Camera = new Camera(this.m_Player.Rigidbody);



    this.Entities = Game.Entities;

    this.Physics = new PhysicsSystem(this.Entities);

    /*
    this.Entities.push(this.m_Player);
    this.Entities.push(this.m_Camera);
    this.Entities.push(new DebugObject());
    */



  }

  Init(){
    Game.AddObject(this.m_Player);
    Game.AddObject(this.m_Camera);
    Game.AddObject(new DebugObject());
  }

  EarlyUpdate(elapsed){
    this.Entities.forEach(item =>{
      item.EarlyUpdate(elapsed);
    });
  }

  Update(elapsed){

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

    this.Entities.forEach(item =>{
      item.Update(elapsed);
    });

    /*
    Collision detection and correction
    */


  }

  LateUpdate(elapsed){
    this.Entities.forEach(item =>{
      item.LateUpdate(elapsed);
    });
  }

  static AddObject(object){

    this.Entities.push(object);
    Renderer.AddObject(object);
  }


}
