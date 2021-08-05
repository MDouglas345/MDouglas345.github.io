class UITextElement extends UIElement{
  constructor(Text, font, loc){
    super();
    this.DrawRes = new UITextRes(Text, loc, font);
  }
}

class UITitleTextElement extends UITextElement{
  constructor(Text, font, loc){
    super();
    this.DrawRes = new UITitleTextRes(Text, loc, font);
  }
}
