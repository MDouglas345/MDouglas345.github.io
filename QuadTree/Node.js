
class NodeState{
  constructor(Parent){
    this.NodeMaster = Parent;
  }


  Insert(object){

  }
}


class NodeEmptyState extends NodeState{
  constructor(Parent){
    super(Parent);
  }

  Insert(object){


    this.NodeMaster.SubEntities.push(object);
    this.NodeMaster.ObjectCount++;
    //console.log(this.NodeMaster.ObjectCount, Node.ObjectLimit);

    //console.log(this.NodeMaster.Bounds.Dimensions.Mag());
    if (this.NodeMaster.ObjectCount >= Node.ObjectLimit && this.NodeMaster.Bounds.Dimensions.Mag() > 100){
      //console.log("here");
      this.NodeMaster.AllocateChildren();
      this.NodeMaster.RelocateEntities();
      this.NodeMaster.SetState(1);
    }
  }

  Clear(){
    this.NodeMaster.SubEntities = null;
  }
}

class NodeFillState extends NodeState{
  constructor(Parent){
    super(Parent);
  }

  Insert(object){
    let Quadrant = this.NodeMaster.GetQuadrant(object.Rigidbody.Pos);

    switch(Quadrant){
      case 0: //UpperLeft
        this.NodeMaster.UpperLeftNode.Insert(object)
        break;
      case 1: //UpperRight
      this.NodeMaster.UpperRightNode.Insert(object)
        break;
      case 2: //LowerLeft
      this.NodeMaster.LowerLeftNode.Insert(object)
        break;
      case 3: //LowerRight
      this.NodeMaster.LowerRightNode.Insert(object)
        break;
    }
  }

  Clear(){
    this.NodeMaster.UpperLeftNode.Clear();
    this.NodeMaster.UpperRightNode.Clear();
    this.NodeMaster.LowerLeftNode.Clear();
    this.NodeMaster.LowerRightNode.Clear();

    this.NodeMaster.UpperLeftNode = null;
    this.NodeMaster.UpperRightNode = null;
    this.NodeMaster.LowerLeftNode = null;
    this.NodeMaster.LowerRightNode = null;
  }

}

class Node{
  static ObjectLimit = 10;
  constructor(orig, Dim){
    //console.log(orig);

    this.State = new NodeEmptyState(this);

    this.UpperLeftNode;
    this.UpperRightNode;
    this.LowerLeftNode;
    this.LowerRightNode;

    this.ObjectCount = 0;

    this.Bounds = new Bounds(orig, Dim);

    this.SubEntities = [];


  }

  Insert(object){
    this.State.Insert(object);

  }

  GetQuadrant(pos){
    let Dim = this.Bounds.Dimensions.rDivide(2);
    let center = this.Bounds.Origin.rAdd(Dim);
    let Diff = center.rSub(pos);

    if (Diff.X < 0 && Diff.Y > 0){ //LowerLeft Quadrant
      return 2;
    }
    if (Diff.X > 0 && Diff.Y > 0){ //LowerRight Quadrant
      return 3;
    }
    if (Diff.X > 0 && Diff.Y < 0){ //UpperRight Quadrant
      return 1;
    }
    if (Diff.X < 0 && Diff.Y < 0){ //UpperLeft Quadrant
      return 0;
    }
  }

  Clear(){
    this.State.Clear();
    this.ObjectCount = null;
  }

  AllocateChildren(){
    let Dim = this.Bounds.Dimensions.rDivide(2);
    let center = this.Bounds.Origin.rAdd(Dim);

    this.UpperLeftNode = new Node(center.rSub(Dim), Dim);
    this.UpperRightNode = new Node(new Vec2(center.X + Dim.X, center.Y), Dim);
    this.LowerLeftNode = new Node(new Vec2(center.X, center.Y + Dim.Y), Dim);
    this.LowerRightNode = new Node(center.rAdd(Dim), Dim);
  }

  RelocateEntities(){
    this.SubEntities.forEach(object =>{
      let Quadrant = this.GetQuadrant(object.Rigidbody.Pos);

      switch(Quadrant){
        case 0: //UpperLeft
          this.UpperLeftNode.Insert(object)
          break;
        case 1: //UpperRight
        this.UpperRightNode.Insert(object)
          break;
        case 2: //LowerLeft
        this.LowerLeftNode.Insert(object)
          break;
        case 3: //LowerRight
        this.LowerRightNode.Insert(object)
          break;
      }
    });

    this.SubEntities = null;
  }

  SetState(i){
    //console.log(i);
    switch(i){
      case 0:
        this.State = new NodeEmptyState(this);
        break;
      case 1:
        this.State = new NodeFillState(this);
        break;
    }
  }
}
