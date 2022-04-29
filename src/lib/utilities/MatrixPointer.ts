import * as app from '..';

export class MatrixPointer extends app.Pointer {
  constructor(address: bigint) {
    super(address, 4*16);
  }

  get value() {
    return app.Matrix.from(this.buffer);
  }

  set value(value: app.Matrix) {
    this.buffer = value.toBuffer();
  }

  toString() {
    return this.value.toString();
  }
}
