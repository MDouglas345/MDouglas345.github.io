class Node{
  static ObjectLimit = 10;
  constructor(orig, Dim){
    this.UpperLeftNode;
    this.UpperRightNode;
    this.LowerLeftNode;
    this.LowerRightNode;
    this.Bounds = new Bounds(orig, Dim);
  }
}
