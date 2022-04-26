import * as app from '..';
import { Vector } from '../utilities/Vector';
import { RAD2DEG } from '../utilities/Math';

export class Triggerbot {
  constructor(
    private readonly inFov = 2,
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

      if (this.angleFov(localPlayer, x.bodyPos) > this.inFov) continue;
      
      audio.play();
    }
  }

  private angleFov(localPlayer: app.Player, dst: Vector): number {
    var d = dst.subtract(localPlayer.cameraPos.value);
    d.normalize();

    const f = localPlayer.viewAngles.value.forward();
    const angle = RAD2DEG(f.angleBetween(d));
    return Math.max(angle, 0);
  }
}
