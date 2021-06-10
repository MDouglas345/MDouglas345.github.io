class NodeRep extends GameObject{
  constructor(orig, dim){
    super();
    this.Rigidbody.Pos = orig;
    this.Rigidbody.Disable();
    this.DrawRes = new QuadTreeNodeRes(dim);
  }
}
