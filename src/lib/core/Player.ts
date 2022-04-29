import * as app from '..';
import {playerOffsets} from './offsets/playerOffsets';

export class Player extends app.Entity {
  private oldLastVisibleTime = 0;
  constructor(address: bigint,
    readonly isLocal: boolean,
    readonly lifeState = new app.UInt8Pointer(address + playerOffsets.lifeState),
    readonly viewAngles = new app.VectorPointer(address + playerOffsets.viewAngles),
    readonly bleedoutState = new app.UInt8Pointer(address + playerOffsets.bleedoutState),
    readonly cameraPos = new app.VectorPointer(address + playerOffsets.cameraPos),
    readonly lastVisibleTime = new app.FloatPointer(address + playerOffsets.lastVisibleTime)) {
    super(address);
  }

  get isVisible() {
    const visible = this.lastVisibleTime.value > 0 && this.lastVisibleTime.value > this.oldLastVisibleTime;
    this.oldLastVisibleTime = this.lastVisibleTime.value;
    return visible;
  }
  
  get isValid() {
    return this.name.value
      && !this.lifeState.value
      && !app.shallowEquals(this.localOrigin.value, new app.Vector(0, 0, 0));
  }

  get bodyPos() {
    var v = this.localOrigin.value;
    const HEADOFFSET = 35;
    v.z += HEADOFFSET - 5;
    return v;
  }
  
  createColor(otherPlayer: app.Player, mode?: string) {
    return this.isLocal ? '#0000FF' : this.isSameTeam(otherPlayer, mode)
      ? (this.bleedoutState.value ? '#FFFF00' : '#00FF00')
      : (this.bleedoutState.value ? '#FFA500' : '#FF0000');
  }

  isSameTeam(otherPlayer: app.Player, mode?: string) {
    switch (mode) {
      case 'control':
        return this.teamNum.value % 2 === otherPlayer.teamNum.value % 2;
      default:
        return this.teamNum.value === otherPlayer.teamNum.value;
    }
  }

  toString() {
    return app.serialize(this);
  }
}
