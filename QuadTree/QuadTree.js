/*
  Implement Quadtree architecure here. Need more research on how its done tho.
*/
var Global = window || global;

class QuadTree{
  static CoveredArea = new Vec2(100000,100000);

  constructor(Target){
    this.Target = Target;
    this.Entities = Global.OManager.m_Entities;
    this.Root;
  }

  CreateTree(){
    this.Root = new Node(this.Target.Rigidbody.Pos.rSub(QuadTree.CoveredArea.rDivide(2)), QuadTree.CoveredArea);
    this.Entities.forEach(layer =>{
      layer.forEach(item =>{
        if (!(item.CollisionType instanceof NoCollider)){
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
    let Data = [];
    this.Root.GetChildren(Data, 0);
    return Data;
  }
}
