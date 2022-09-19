//Issue arose, need to create a class that manages all gameobjects and all subsystems simply refer to this file
//For the sake of sanity, the structure of these Entities will be identical to the Renderer's version of all objects.

//Need to abstract all GameObject Data from the Game and Renderer files to here
import *  as Main from '../main.js';

export class ObjectManager{
  static Entities = [];
  static Layers = [];
  constructor(){
    this.m_Entities = ObjectManager.Entities;
    this.m_TwoLayers = ObjectManager.Layers;

    this.TwoContext = Main.TwoContext;

    this.AddLayer();
    this.AddLayer();
    this.AddLayer();
    this.AddLayer();
    this.AddLayer();
    this.AddLayer();

    

  }

  Init(){

  }

   AddObject(object){
    this.m_Entities[object.DrawRes.Layer].push(object);
    //this.m_TwoLayers[object.DrawRes.layer].add(object.TwoObject);
  }

   GetObjectByName(name){
    for (let i = 0; i < this.m_Entities.length; i++){
      for (let x = 0; x < this.m_Entities[i].length; x++){
        if (this.m_Entities[i][x].Name === name){
          return this.m_Entities[i][x];
        }
      }
    }

    return null;
  }

  AddLayer(){
    this.m_Entities.push([]);
    this.m_TwoLayers.push(this.TwoContext.makeGroup());
  }

  CleanUp(){
    this.m_Entities.forEach(function(layer, Lindex){
      layer.forEach(function(item, Iindex, array){
        if (item.NeedsDelete){
          item.Delete();
          array.splice(Iindex, 1);
        }
      });
    });
  }

}
