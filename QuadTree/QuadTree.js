/*
  Implement Quadtree architecure here. Need more research on how its done tho.
*/
var Global = window || global;

class QuadTree{
  static CoveredArea = new Vec2(1000,1000);
  
  constructor(entities){
    this.Entities = entities;
    this.Root = new Node();
  }

  CreateTree(){

  }
}
