import * as app from '..';

export class Matrix {
  constructor(public matrix: Array<number>) {
    this.matrix = matrix;
  }

  static from(buffer: DataView) {
    var matrix = new Array<number>(16);
    for (let i = 0; i < matrix.length; i++) {
      matrix[i] = buffer.getFloat32(i*4, true);
    }
    return new Matrix(matrix);
  }

  toBuffer() {
    const buffer = new DataView(new ArrayBuffer(4 * 16));

    for (let i = 0; i < this.matrix.length; i++) {
      buffer.setFloat32(i*4, this.matrix[i], true);
    }

    return buffer;
  }
  
  toString() {
    return app.serialize(this);
  }
}