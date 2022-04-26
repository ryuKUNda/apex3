import * as app from '..';
import { Vector } from '../utilities/Vector';

export class Triggerbot {
  

  constructor(
    private readonly context: CanvasRenderingContext2D,
    private readonly inFov = 10,
    private readonly maximumDistance = 200) {
    }

  async updateAsync(localPlayer: app.Player, players: Array<app.Player>, mode?: string) {
    var audio = new Audio('https://www.myinstants.com/media/sounds/movie_1.mp3');
    for (const x of players) {
      if (x.isLocal) continue;
      if (localPlayer.isSameTeam(x, mode)) continue;
      if (!x.isValid) continue;
      
      const d = localPlayer.localOrigin.value
        .subtract(x.localOrigin.value)
        .multiply(0.0254);

      if (d.magnitude() > this.maximumDistance) continue;

      if (this.angleFov(localPlayer, x.bodyPos) < this.inFov) continue;
      
      audio.play();
      this.context.fillRect(100, 100, 100, 100);
    }
  }

  private angleFov(localPlayer: app.Player, dst: Vector) {
    var d = localPlayer.cameraPos.value.subtract(dst);
    d.normalize();

    const angle = localPlayer.viewAngles.value.angleBetween(d);
    const angleDegrees = angle * (180 / Math.PI);
    return Math.max(angleDegrees, 0);
  }
}
