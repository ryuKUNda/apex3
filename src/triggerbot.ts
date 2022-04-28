import * as app from './lib';
import {ui} from './ui';
const container = <HTMLElement> document.querySelector('.container');
const content = <HTMLElement> document.querySelector('.content');
const status = <HTMLElement> document.querySelector('.status');
const frameTime = 1000 / 40;
const triggerbot = new app.Triggerbot();
const inputService = new app.InputService("/dev/input/event3");


ui((x) => {
  return renderAsync(x);
});

function loadStyle() {
  container.style.display = 'inherit';
  status.style.display = 'inherit';

  content.textContent = 'Triggerbot running. Keep this window open.';
  status.textContent = "Waiting on keyboard...";
}

async function renderAsync(core: app.Core) {
  while (true) {
    const beginTime = Date.now();
    const players = await core.playersAsync();
    const localPlayer = players.find(x => x.isLocal);
    if (localPlayer) await triggerbot.updateAsync(localPlayer, players, inputService);
    await new Promise(x => setTimeout(x, frameTime - (Date.now() - beginTime)));
  }
}

async function beforeUnload() {
  if (!await inputService.End()) {
    console.log("Could not release the keyboard since it wasn't found!");
  }
}

window.onload = async () => {
  loadStyle();
  

  if (!await inputService.Start()) {
    status.textContent = "Could not find keyboard!";
    return;
  }

  status.textContent = "Keyboard found!";
  console.log("keyboard found!");
}

document.getElementById('trigger-button')?.addEventListener("click", async function() {
  setTimeout(async function(){
    for(let i = 0; i < 20; i++) {
      await inputService.PressKey(37);
    }
  }, 2000);
  
})

window.addEventListener("beforeunload", beforeUnload);
