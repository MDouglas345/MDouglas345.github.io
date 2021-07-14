
class NodeState{
  constructor(Parent){
    this.NodeMaster = Parent;
  }

  GetChildren(combine){

  }
  Insert(object){

  }

  Clear(){

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
    if (this.NodeMaster.ObjectCount > Node.ObjectLimit && this.NodeMaster.Bounds.Dimensions.Mag() > 999999){
      //console.log("here");
      this.NodeMaster.AllocateChildren();
      this.NodeMaster.RelocateEntities();
      this.NodeMaster.SetState(1);
      this.NodeMaster.ObjectCount = 0;
    }
  }

  GetChildren(combine){

    if (this.NodeMaster.ObjectCount == 0){return;}

    combine.Data.push([]);
    combine.Data[combine.Index] = [];
    //console.log(copyInstance(this.NodeMaster.SubEntities));
    this.NodeMaster.SubEntities.forEach(object => {
      combine.Data[combine.Index].push(object);
    });

    combine.Index++;
  }

  Clear(){
    this.NodeMaster.SubEntities = null;
    this.NodeMaster.ObjectCount = null;
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

    this.NodeMaster.SubEntities = null;
    this.NodeMaster.ObjectCount = null;
  }

  GetChildren(combine){
    this.NodeMaster.UpperRightNode.GetChildren(combine);
    this.NodeMaster.UpperLeftNode.GetChildren(combine);
    this.NodeMaster.LowerRightNode.GetChildren(combine);
    this.NodeMaster.LowerLeftNode.GetChildren(combine);
    return;
  }

}

class Node{
  static ObjectLimit = 20;
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

    //this.ObjectRepresentative = new NodeRep(orig.rAdd(Dim.rDivide(2)), Dim);

  //  Game.AddObject(this.ObjectRepresentative)


  }

  Insert(object){
    this.State.Insert(object);

  }

  GetQuadrant(pos){
    let Dim = this.Bounds.Dimensions.rDivide(2);
    let center = this.Bounds.Origin.rAdd(Dim);
    //console.log(center);
    let Diff = center.rSub(pos);
    //console.log(Diff);

    if (Math.abs(Diff.X) > QuadTree.CoveredArea.X || Math.abs(Diff.Y) > QuadTree.CoveredArea.Y){ return -1;}

    if (Diff.X > 0 && Diff.Y < 0){ //LowerLeft Quadrant
      //console.log("LowerLeft, center : " + center);
      return 2;
    }
    if (Diff.X < 0 && Diff.Y < 0){ //LowerRight Quadrant
      //console.log("lowerRight, center : " + center);
      return 3;
    }
    if (Diff.X < 0 && Diff.Y > 0){ //UpperRight Quadrant
      //console.log("upperRight, center : " + center);
      return 1;
    }
    if (Diff.X > 0 && Diff.Y > 0){ //UpperLeft Quadrant
      //console.log("upperLeft, center : " + center);
      return 0;
    }
  }

  Clear(){
    this.State.Clear();
    this.ObjectCount = null;
    this.SubEntities = null;
    //this.ObjectRepresentative.NeedsDelete = true;
  }

  AllocateChildren(){
    let Dim = this.Bounds.Dimensions.rDivide(2);
    let center = this.Bounds.Origin.rAdd(Dim);

    this.UpperLeftNode = new Node(center.rSub(Dim), Dim);
    this.UpperRightNode = new Node(new Vec2(center.X, center.Y - Dim.Y), Dim);
    this.LowerLeftNode = new Node(new Vec2(center.X - Dim.X, center.Y), Dim);
    this.LowerRightNode = new Node(center, Dim);
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
    this.SubEntities = [];
    this.ObjectCount = 0;
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

  GetChildren(combine){
    this.State.GetChildren(combine);
    /*
    if (this.State instanceof NodeFillState){
      this.UpperRightNode.GetChildren(array,index);
      this.UpperLeftNode.GetChildren(array,index);
      this.LowerRightNode.GetChildren(array,index);
      this.LowerLeftNode.GetChildren(array,index);
      return;
    }

    array.push([]);
    array[index] = [];
    this.SubEntities.forEach(object =>{
      array[index].push(object);
    });
    index++;
    */
  }

}
