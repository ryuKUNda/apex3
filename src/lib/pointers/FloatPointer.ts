import * as app from '..';

export class FloatPointer extends app.Pointer {
  constructor(address: bigint) {
    super(address, 0x4);
  }

  get value() {
    return this.buffer.getFloat32(0, true);
  }

  set value(value: number) {
    this.buffer.setFloat32(0, value, true);
  }

  toString() {
    return this.value.toString();
  }
}
