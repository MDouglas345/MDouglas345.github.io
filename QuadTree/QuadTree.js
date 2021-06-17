/*
  Implement Quadtree architecure here. Need more research on how its done tho.
*/
var Global = window || global;

class QuadTree{

  static CoveredArea = new Vec2(10000,10000);

  constructor(Target){
    this.Target = Target;
    this.Entities = Global.OManager.m_Entities;
    this.Root;

  }

  CreateTree(){
    let pos = copyInstance(this.Target.Rigidbody.Pos);
    pos.Add(new Vec2(300,300));
    //console.log(pos);
    this.Root = new Node(pos.rSub(QuadTree.CoveredArea.rDivide(2)), QuadTree.CoveredArea);
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
    let Combine = {
      Data : [],
      Index : 0
    };
    this.Root.GetChildren(Combine);
    return Combine.Data;
  }
}
