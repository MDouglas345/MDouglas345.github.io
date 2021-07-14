class UITextElement extends UIElement{
  constructor(Text, font, loc){
    super();
    this.DrawRes = new UITextRes(Text, loc, font);
  }
}
