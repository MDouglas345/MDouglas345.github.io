var Global = window || global;


class CollisionMode{
  constructor(){
    this.CollisionMatrixRef = CollisionMatrix.Matrix;
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
        var cindex = -1;
      for (let x = 0; x < objectzones[s].length; x++){
        checked.push([]);
        cindex++;
        for (let y = 0; y < objectzones[s].length; y++){
          if (x == y){continue;}
          if (checked.length > y && checked[y].includes(x)){ continue;}
          checked[x].push(y);
          perfcounter++;
          let f = this.CollisionMatrixRef[objectzones[s][x].CollisionType.TypeID][objectzones[s][y].CollisionType.TypeID];
          
          f(objectzones[s][x],objectzones[s][y]);
        }
      }
      checked = null;
    }
    //console.log(perfcounter);


  }
}
