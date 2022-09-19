/*
  Implement Quadtree architecure here. Need more research on how its done tho.
*/
import * as U from '../Utility/Utility.js'
import * as M from '../main.js'
import * as N from './Node.js'

export class QuadTree{

  static CoveredArea = new U.Vec2(10000,10000);

  constructor(Target){
    this.Target = Target;
    this.Entities = M.OManager.m_Entities;
    this.Root;

  }

  CreateTree(){
    let pos = U.copyInstance(this.Target.Rigidbody.Pos);
    pos.Add(new U.Vec2(300,300));
    //console.log(pos);
    this.Root = new N.Node(pos.rSub(QuadTree.CoveredArea.rDivide(2)), QuadTree.CoveredArea);
    this.Entities.forEach(layer =>{
      layer.forEach(item =>{
        if (item.CollisionType.IsActive()){
                  this.Root.Insert(item);
        }
      });
    });
  }

  ClearTree(){
    this.Root.Clear();
    this.Root = null;

  }

  GetRegionalData(){
    let Combine = {
      Data : [],
      Index : 0
    };
    this.Root.GetChildren(Combine);
    return Combine.Data;
  }
}
