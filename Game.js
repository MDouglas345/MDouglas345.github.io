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

var Global = window || global;

class Game{
  //static Entities = ObjectManager.Entities;
  constructor(){
    this.ObjectHandleInstance = Global.OManager;

    this.m_Player = new Player();

    this.PlanetDemo = new Earth();
    this.Cryptopolid = new Cryptopolid();

    this.m_Camera = new Camera(this.m_Player);

    this.BGMaster = new DemoBGMaster(this.m_Player);

    this.BGMaster = new SpaceBackground();

    this.Astroids = new AstroidSystem(this.m_Player);

    this.Physics = new PhysicsSystem();

    this.QuadTree = new QuadTree(this.m_Player);

    this.CollisionHandler = new CollisionHandler(this.QuadTree);

    this.EnemyDemo = new EnemyScouter();

  }

  Init(){
    Game.AddObject(this.m_Player);
    Game.AddObject(this.m_Camera);
    //Game.AddObject(this.DebugObject);
    Game.AddObject(this.BGMaster);
    Game.AddObject(this.PlanetDemo)
    Game.AddObject(this.Cryptopolid);
    Game.AddObject(this.Astroids);
    Game.AddObject(this.EnemyDemo);

    this.ObjectHandleInstance.m_Entities.forEach(layer =>{
      layer.forEach(item =>{
        item.Init();
      });
    });



  }

  EarlyUpdate(elapsed){
    this.ObjectHandleInstance.m_Entities.forEach(layer =>{
      layer.forEach(item =>{
        item.EarlyUpdate(elapsed);
      });
    });
  }

  Update(elapsed){
    //console.log(this.m_Player.Rigidbody.Pos);
    //console.log(this.ObjectHandleInstance.m_Entities[2]);
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

    this.QuadTree.CreateTree();
    //if (this.m_Player.Shots > 5){debugger;}
    //console.log(this.m_Player.Shots);
    //console.log(this.QuadTree);
    this.CollisionHandler.CheckCollisions();

    this.ObjectHandleInstance.m_Entities.forEach(layer =>{
      layer.forEach(item =>{
        item.Update(elapsed);
      });
    });

    /*
    Collision detection and correction
    */



  }

  LateUpdate(elapsed){
    this.ObjectHandleInstance.m_Entities.forEach(layer =>{
      layer.forEach(item =>{
        item.LateUpdate(elapsed);
      });
    });

    //Delete cycle
  //console.log(this.ObjectHandleInstance.m_Entities);
  this.ObjectHandleInstance.CleanUp();
  this.QuadTree.ClearTree();

  //console.log(this.ObjectHandleInstance.m_Entities);


  }


  static GetObjectByName(name){
    /*
    this.Entities.forEach(item =>{
      if (item.Name === name){console.log(item);return item;}

    });
    */

    /*for (let i = 0; i < this.Entities.length; i++){
      if (this.Entities[i].Name === name){return this.Entities[i];}
    }

    return null;
    */

    return ObjectManager.GetObjectByName(name);
  }

  static AddObject(object){
    /*
    this.Entities.push(object);
    Renderer.AddObject(object);
    */
    ObjectManager.AddObject(object);



  }


}
