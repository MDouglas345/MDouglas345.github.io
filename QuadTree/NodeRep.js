import * as GO from '../Objects/GameObject.js'
import * as DR from '../Renderer/DrawRes.js'
export class NodeRep extends GO.GameObject{
  constructor(orig, dim){
    super();
    this.Rigidbody.Pos = orig;
    this.Rigidbody.Disable();
    this.DrawRes = new DR.QuadTreeNodeRes(dim);
  }
}
