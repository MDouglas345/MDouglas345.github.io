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


import * as P from './Player/Player.js';
import * as M from './main.js';
import * as CP from './Objects/Cryptopolid.js'
import * as NP from './Objects/PlanetNightly.js'
import * as BG from './Objects/BG.js'
import * as SF from './Objects/StarField.js'
import * as AS from './Particles/AstroidSystem.js'
import * as PS from './Physics/Physics.js'
import * as QT from './QuadTree/QuadTree.js'
import * as CH from './Collisions/CollisionHandler.js'
import * as C from './Camera/Camera.js'
import * as SPS from './Particles/psSpaceParallax.js'

export class Game{
  //static Entities = ObjectManager.Entities;
  constructor(){
    
  }

  Init(){

    this.ObjectHandleInstance = M.OManager;

    this.m_Player = new P.Player();

  //  this.PlanetDemo = new Earth();
    this.Cryptopolid = new CP.Cryptopolid();
    this.Nightly = new NP.PlanetNightly();



    //this.BGMaster = new DemoBGMaster(this.m_Player);

    this.BGMaster = new BG.SpaceBackground();
    this.Stars = new SF.StarField();

    this.Astroids = new AS.AstroidSystem(this.m_Player);

    this.Physics = new PS.PhysicsSystem();

    this.QuadTree = new QT.QuadTree(this.m_Player);

    this.CollisionHandler = new CH.CollisionHandler(this.QuadTree);

    //this.EnemyDemo = new EnemyScouter();

    this.m_Camera = new C.Camera(this.m_Player);

    this.StarSystem = new SPS.psStarParallax(10,this.m_Camera);
    //this.StarSystem = new StarSystem(20);


    //this.BattleTest();
    M.GameSystem.AddObject(this.m_Player);
    M.GameSystem.AddObject(this.m_Camera);
    //Game.AddObject(this.DebugObject);
    M.GameSystem.AddObject(this.BGMaster);
    M.GameSystem.AddObject(this.Stars);
    //Game.AddObject(this.PlanetDemo)
    M.GameSystem.AddObject(this.Cryptopolid);
    M.GameSystem.AddObject(this.Nightly);
    M.GameSystem.AddObject(this.Astroids);
    //Game.AddObject(this.EnemyDemo);
    M.GameSystem.AddObject(this.StarSystem);


    this.ObjectHandleInstance.m_Entities.forEach(layer =>{
      layer.forEach(item =>{
        item.Init();
      });
    });

  }

  BattleTest(){
    for (let i = 0; i < 5; i++){
      let p = new EnemyScouter();
      Game.AddObject(p);
    }
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


   GetObjectByName(name){
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

    return M.OManager.GetObjectByName(name);
  }

   AddObject(object){
    /*
    this.Entities.push(object);
    Renderer.AddObject(object);
    */
    M.OManager.AddObject(object);



  }


}
