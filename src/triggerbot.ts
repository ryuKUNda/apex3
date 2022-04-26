import * as app from './lib';
import {ui} from './ui';
const container = <HTMLElement> document.querySelector('.container');
const content = <HTMLElement> document.querySelector('.content');
const frameTime = 1000 / 40;
const triggerbot = new app.Triggerbot();


ui((x) => {
  container.style.display = 'inherit';
  content.textContent = 'Triggerbot running. Keep this window open.';
  return renderAsync(x);
});

async function renderAsync(core: app.Core) {
  while (true) {
    const beginTime = Date.now();
    const players = await core.playersAsync();
    const localPlayer = players.find(x => x.isLocal);
    if (localPlayer) await triggerbot.updateAsync(localPlayer, players);
    await new Promise(x => setTimeout(x, frameTime - (Date.now() - beginTime)));
  }
}
