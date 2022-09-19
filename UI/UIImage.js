import * as UI from './UIElement.js';
import * as DR from '../Renderer/DrawRes.js';

export class UIImage extends UI.UIElement{
constructor(spriteid, loc, dim, layer){
  super();
  this.DrawRes = new DR.UIImageRes(spriteid, loc, dim);
  this.DrawRes.Layer = layer;
  }
}

class UITitleImage extends UIImage{
  constructor(spriteid, loc, dim, layer){
    super();
    
  }
}
