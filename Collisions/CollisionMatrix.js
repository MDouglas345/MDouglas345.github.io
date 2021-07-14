/*
  This beautiful little class NEEDS documentation. Basically I have a look up table where different objects have a collision layer and collision collider type.
  pull up the collision matrix function for when two objects are in contact.
  To determine if two objects are colliding I use the collision layer matrix. Where I assigned each layer a number and define which other layers it interacts with

  By convention :
  The collision layer matrix info!

  0 = Player things (including the player)
  1 = Player Projectiles
  2 = Astroids and other envirnment things the player can shoot at
  3 = Enemy things
  4 = Enemy Projectiles
  5 = Trigger for Detecting other Enemy AI
  6 = Trigger for Player PickUp


  By convention :
  The Collision Matrix (shape - shape detection methods)
  0 = No Collider
  1 = Circle Collider
  2 = Trigger Collider
*/

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

    const TriggerFilter = function(objectA, objectB){
      console.log("here");
      objectA.CollisionType.Clear();
      let f = CollisionMatrix.FuncMatrix[objectA.CollisionType.ColliderTypeID][objectB.CollisionType.ID];
      let Col = f(objectA, objectB);
      if (Col){objectA.CollisionType.AddObjectToTrigger(objectB);}
      return Col;
    }

    const TriggerFilterAlt = function(objectA, objectB){
      console.log("here");
      objectB.CollisionType.Clear();
      let f = CollisionMatrix.FuncMatrix[objectA.CollisionType.ColliderTypeID][objectB.CollisionType.ID];
      let Col = f(objectA, objectB);
      if (Col){objectB.CollisionType.AddObjectToTrigger(objectA);}
      return Col;
    }

    CollisionMatrix.FuncMatrix = {

      1 : {
        0 : function(){},
        1 : CircleCirclCol,
        2 : TriggerFilterAlt
      },

      0 : {
        0 : function(){},
        1 : function(){}
      },

      2 : {
        0 : function(){},
        1 : TriggerFilter,
        2 : TriggerFilter
      }


    };

    //Needs to be customied per game Needs
    CollisionMatrix.LayersMatrix = {
      0 : {
        0 : false,
        1 : false,
        2 : true,
        3 : true,
        4 : false,
        5 : false,
        6 : true
      },
      1 : {
        0 : false,
        1 : false,
        2 : true,
        3 : true,
        4 : true,
        5 : false
      },
      2 : {
        0 : true,
        1 : true,
        2 : false,
        3 : false,
        4 : true,
        5 : false
      },
      3 : {
        0 : true,
        1 : true,
        2 : true,
        3 : false,
        4 : false,
        5 : true
      },
      4 : {
        0 : true,
        1 : true,
        2 : true,
        3 : false,
        4 : false,
        5 : false
      },
      5 :{
        0 : false,
        1 : false,
        2 : false,
        3 : true,
        4 : false,
        5 : false
      },
      6 : {
        0 : true,
        1 : false,
        2 : false,
        3 : false,
        4 : false,
        5 : false,
        6 : false,
        7 : false
      },
      7 : {
        0 : true,
        1 : true,
        2 : false,
        3 : false,
        4 : false,
        5 : false,
        6 : false,
        7: false
      }
    };

  }
}
