import * as GO from './GameObject.js'
import * as R from '../Physics/Rigidbody.js'
import * as M from '../main.js'
import * as ES from '../NPC/Enemies/Scouter/BaseEnemyScouter.js'
export class Planet extends GO.GameObject{
  constructor(){
    super();
    this.DistanceToPlayer = 99999999999999999999;
    this.Focus;
    this.Rigidbody = new R.Rigidbody();
    this.Rigidbody.Enable();

    this.EnemiesToSpawn = 5;
  }

  Init(){
    this.Focus = M.GameSystem.GetObjectByName("Player");

    for (let i = 0; i < this.EnemiesToSpawn; i++){
      let e = new ES.EnemyScouter();
      //e.Rigidbody.Pos = copyInstance(this.Rigidbody.Pos);
      e.NewStartPos(this.Rigidbody.Pos);

      M.GameSystem.AddObject(e);
    }
  }

  Update(){
    let vel = this.Focus.Rigidbody.Vel.rMult(-1);
    vel.Mult(1/this.DistanceToPlayer);

    this.Rigidbody.Vel = vel;
  }
}
