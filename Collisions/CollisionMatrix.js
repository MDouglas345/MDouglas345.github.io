class CollisionMatrix{
  static Matrix = null;
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

    CollisionMatrix.Matrix = {

      1 : {
        0 : function(){},
        1 : CircleCirclCol
      },

      0 : {
        0 : function(){},
        1 : function(){}
      },


    };

  }
}
