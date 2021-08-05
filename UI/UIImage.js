class UIImage extends UIElement{
constructor(spriteid, loc, dim, layer){
  super();
  this.DrawRes = new UIImageRes(spriteid, loc, dim);
  this.DrawRes.Layer = layer;
  }
}

class UITitleImage extends UIImage{
  constructor(spriteid, loc, dim, layer){
    super();
    
  }
}
