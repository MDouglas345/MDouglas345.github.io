//Issue arose, need to create a class that manages all gameobjects and all subsystems simply refer to this file
//For the sake of sanity, the structure of these Entities will be identical to the Renderer's version of all objects.

//Need to abstract all GameObject Data from the Game and Renderer files to here

class ObjectManager{
  static Entities = [];
  constructor(){
    this.m_Entities = ObjectManager.Entities;

    this.AddLayer();
    this.AddLayer();
    this.AddLayer();
    this.AddLayer();
    this.AddLayer();
    this.AddLayer();

  }

  Init(){

  }

  static AddObject(object){
    this.Entities[object.DrawRes.Layer].push(object);
  }

  static GetObjectByName(name){
    for (let i = 0; i < this.Entities.length; i++){
      for (let x = 0; x < this.Entities[i].length; x++){
        if (this.Entities[i][x].Name === name){
          return this.Entities[i][x];
        }
      }
    }

    return null;
  }

  AddLayer(){
    this.m_Entities.push([]);
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
