class UIBarElement extends UIElement{
  constructor(Pos, CurrentValue, MaxValue, MinValue, width, height, FG, BG){
    super();
    this.CurrentValue = CurrentValue;
    this.MaxValue = MaxValue;
    this.MinValue = MinValue;
    this.Width = width;
    this.Height = height;
    this.ScreenLocation = Pos;
    this.DrawRes = new UIBarRes(Pos, CurrentValue, MaxValue, MinValue, width, height, FG, BG);
  }
}

class UIHealthBarElement extends UIBarElement{
  constructor(Pos, CurrentValue, MaxValue, MinValue){
    super(Pos, CurrentValue, MaxValue, MinValue, 120, 20, "#FF0000", "#000000");

  }
}

class UIShieldBarElement extends UIBarElement{
  constructor(Pos, CurrentValue, MaxValue, MinValue){
    super(Pos, CurrentValue, MaxValue, MinValue, 50, 20, "#0000FF", "#000000");

  }
}
