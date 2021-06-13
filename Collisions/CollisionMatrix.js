class CollisionMatrix{
  static Matrix = null;
  constructor(){

    const CircleCirclCol = function(objectA, objectB){
      let Difference = objectA.Rigidbody.Pos.rSub(objectB.Rigidbody.Pos);
      Difference = Difference.MagSqrt();
      if (Difference < (objectA.CollisionType.Radius + objectB.CollisionType.Radius)){
        console.log("Colliding");
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
