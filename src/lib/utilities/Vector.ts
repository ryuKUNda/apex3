import * as app from '..';

export class Vector {
  constructor(public x: number, public y: number, public z: number) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

  subtract(v: Vector) {
    return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  multiply(f: number) {
    return new Vector(this.x * f, this.y * f, this.z * f);
  }

  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  dotProduct(v: Vector) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  normalize() {
    const l = this.magnitude();
    if (l != 0) {
      this.x /= l;
      this.y /= l;
      this.z /= l;
    }
  }

  angleBetween(v: Vector) {
    return Math.acos(this.dotProduct(v))
  }

  static from(buffer: DataView) {
    const x = buffer.getFloat32(0, true);
    const y = buffer.getFloat32(4, true);
    const z = buffer.getFloat32(8, true);
    return new Vector(x, y, z);
  }

  toBuffer() {
    const buffer = new DataView(new ArrayBuffer(0xC));
    buffer.setFloat32(0, this.x, true);
    buffer.setFloat32(4, this.y, true);
    buffer.setFloat32(8, this.z, true);
    return buffer;
  }
  
  toString() {
    return app.serialize(this);
  }
}
