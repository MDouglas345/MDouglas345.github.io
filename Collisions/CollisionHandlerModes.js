var Global = window || global;


class CollisionMode{
  constructor(){
    this.CollisionMatrixRef = CollisionMatrix.FuncMatrix;
    this.LayerMatrix = CollisionMatrix.LayersMatrix;
  }

  CheckCollisions(objectzones){

  }
}


class CHSingleThreaded extends CollisionMode{
  constructor(){
    super();
  }

  CheckCollisions(objectzones){
    var perfcounter = 0;
    var DetectedCollisions = [];

    for (let s = 0; s < objectzones.length; s++){
        var checked = []
      for (let x = 0; x < objectzones[s].length; x++){
        checked.push([]);
        for (let y = 0; y < objectzones[s].length; y++){
          if (x == y){continue;}
          if (checked.length > y && checked[y].includes(x)){ continue;}
          if (!this.LayerMatrix[objectzones[s][x].CollisionLayer][objectzones[s][y].CollisionLayer]){continue;}
          checked[x].push(y);
          perfcounter++;
          let f = this.CollisionMatrixRef[objectzones[s][x].CollisionType.TypeID][objectzones[s][y].CollisionType.TypeID];

          let Col = f(objectzones[s][x],objectzones[s][y]);

          if (Col){
            DetectedCollisions.push(Col);
          }

        }
      }
      checked = null;
    }
    //console.log(perfcounter);

    return DetectedCollisions;
  }
}
