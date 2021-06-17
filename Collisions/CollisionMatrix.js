class CollisionMatrix{
  static FuncMatrix = null;

  static LayersMatrix = null;

  constructor(){

    const CircleCirclCol = function(objectA, objectB){
      var PosDifference = objectA.Rigidbody.Pos.rSub(objectB.Rigidbody.Pos);
      let Difference = PosDifference.MagSqrt();
      if (Difference < (objectA.CollisionType.Radius + objectB.CollisionType.Radius)){
        let point = PosDifference.Normal();
        point.Mult(Difference - objectA.CollisionType.Radius);
        point = objectB.Rigidbody.Pos.rAdd(point);

        return new CollisionIdentifier(objectA,objectB, point)
      }
    }

    CollisionMatrix.FuncMatrix = {

      1 : {
        0 : function(){},
        1 : CircleCirclCol
      },

      0 : {
        0 : function(){},
        1 : function(){}
      },


    };

    //Needs to be customied per game Needs
    CollisionMatrix.LayersMatrix = {
      0 : {
        0 : false,
        1 : false,
        2 : true
      },
      1 : {
        0 : false,
        1 : false,
        2 : true
      },
      2 : {
        0 : false,
        1 : true,
        2 : false
      }
    };

  }
}
