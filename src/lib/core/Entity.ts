import * as app from '..';
import {entityOffsets} from './offsets/entityOffsets';

export abstract class Entity {
  static oldLastVisibleTime = new Map();

  constructor(
    readonly address: bigint,
    readonly localOrigin = new app.VectorPointer(address + entityOffsets.localOrigin),
    readonly teamNum = new app.UInt8Pointer(address + entityOffsets.iTeamNum),
    readonly name = new app.UInt64Pointer(address + entityOffsets.iName),
    readonly glowEnable = new app.UInt8Pointer(address + entityOffsets.glowEnable),
    readonly glowThroughWalls = new app.UInt8Pointer(address + entityOffsets.glowThroughWall),
    readonly lastVisibleTime = new app.FloatPointer(address + entityOffsets.lastVisibleTime)) {}

    get isVisible() {
      const oldLastVisTime = Entity.oldLastVisibleTime.get(this.address);
      const visible = this.lastVisibleTime.value > 0 && this.lastVisibleTime.value > oldLastVisTime;
      Entity.oldLastVisibleTime.set(this.address, this.lastVisibleTime.value);
      return visible;
    }
}
