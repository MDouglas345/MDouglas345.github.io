/* Should only contain and manage game objects */

/*
  This File is responsibe for giving gameobjects information for their update Function
  All internal systems will congregate here.
  Done : PhysicsSystem
  ToDo : ParticleSystem
*/
/*
  Need to implement a quadtree to help with collision detection performance
*/

class Game{
  static Entities = [];
  constructor(){
    this.m_Player = new Player();
    console.log(this.m_Player);
    this.m_Player.Rigidbody.Pos = new Vec2(0,0);

    this.m_Camera = new Camera(this.m_Player);

    //this.BGMaster = new DemoBGMaster(this.m_Player);
    this.BGMaster = new SpaceBackground();

    //this.DebugObject = new DebugObject();
    //this.DebugObject.Rigidbody.Pos = new Vec2(0,0);
    //this.DebugObject.DrawRes.Dimensions = new Vec2(50,50);


    this.Entities = Game.Entities;

    this.Physics = new PhysicsSystem(this.Entities);
    //this.QuadTree = new QuadTree(this.Entities);



  }

  Init(){
    Game.AddObject(this.m_Player);
    Game.AddObject(this.m_Camera);
    //Game.AddObject(this.DebugObject);
    Game.AddObject(this.BGMaster);

    this.Entities.forEach(item =>{
      item.Init();
    });



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
    //this.QuadTree.Update();

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

  static GetObjectByName(name){
    /*
    this.Entities.forEach(item =>{
      if (item.Name === name){console.log(item);return item;}

    });
    */

    for (let i = 0; i < this.Entities.length; i++){
      if (this.Entities[i].Name === name){return this.Entities[i];}
    }

    return null;
  }

  static AddObject(object){

    this.Entities.push(object);
    Renderer.AddObject(object);
  }


}
