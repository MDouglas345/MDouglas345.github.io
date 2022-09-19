import * as S from './Shootable.js'
export class Enemy extends S.Shootable{
  constructor(){
    super();
    this.HP = 50;
    this.Shields = 100;

    this.States = null;
    this.ActiveState = null;
    this.Target = null;

    this.HitSound;
  }

  SwitchStates(name){
    this.ActiveState = this.States[name];
  }

  OnHit(){
    this.HitSound.Play();
  }

  CleanUp(){

  }
  async TriggerDeath(){
    this.CleanUp();
    this.NeedsDelete = true;
  }
}
