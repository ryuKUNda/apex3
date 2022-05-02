import * as app from '..';

export class Triggerbot {
  constructor(
    private readonly maximumDistance = 200) {
    }

  async updateAsync(localPlayer: app.Player, players: Array<app.Player>, inputService: app.InputService, viewMatrix: app.Matrix, mode?: string) {
    const centerX = 1920 / 2;
    const centerY = 1080 / 2;
    for (const x of players) {
      if (x.isLocal) continue;
      if (localPlayer.isSameTeam(x, mode)) continue;
      if (!x.isValid) continue;
      if (!x.isVisible) continue;

      const d = localPlayer.localOrigin.value
        .subtract(x.localOrigin.value)
        .multiply(0.0254);

      if (d.magnitude() > this.maximumDistance) continue;
//447 532 456 515
//960 540
      const [x1, y1, x2, y2] = this.targetScreenBox(x, viewMatrix);
      if (this.pointInBox(x1, y1, x2, y2, centerX, centerY)) {
        await inputService.PressKey(37);
      }
    }
  }

  targetScreenBox(target: app.Player, viewMatrix: app.Matrix) {
    var footPos = target.localOrigin.value;
    var headPos = new app.Vector(target.localOrigin.value.x, target.localOrigin.value.y, target.localOrigin.value.z + 50);

    const foot = footPos.toScreen(viewMatrix);
    const head = headPos.toScreen(viewMatrix);
    if (foot.z <= 0 || head.z <= 0) return [];
    const h = Math.abs(head.y - foot.y);
    const w = h / 3;

    return [foot.x - (w/2), head.y, foot.x + (w/2), foot.y];
  }

  pointInBox(x1: number, y1: number, x2: number, y2: number, x: number, y: number) {
    return (x > x1 && x < x2 && y > y1 && y < y2);
  }
}
