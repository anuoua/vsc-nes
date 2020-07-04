import 'nes-js';
import { Joypad } from 'nes-js/src/Joypad';

let nes;

let romBuffer = null;

const keyMap = {
  '87': Joypad.BUTTONS.UP,
  '83': Joypad.BUTTONS.DOWN,
  '65': Joypad.BUTTONS.LEFT,
  '68': Joypad.BUTTONS.RIGHT,
  '74': Joypad.BUTTONS.A,
  '75': Joypad.BUTTONS.B,
  '13': Joypad.BUTTONS.START,
  '32': Joypad.BUTTONS.SELECT,
};

function init() {
  document.getElementById('file').addEventListener('change', async (event) => {
    window.removeEventListener('keydown', keydown);
    window.removeEventListener('keyup', keyup);
    romBuffer = await event.target.files[0].arrayBuffer();
  });
  document.getElementById('run').addEventListener('click', () => {
    run(romBuffer);
  });
}

function pressPadButton(key) {
  if(nes === undefined)
    return;

  nes.pad1.pressButton(key);
}

function releasePadButton(key) {
  if(nes === undefined)
    return;

  nes.pad1.releaseButton(key);
}

function keydown(e) {
  keyMap[e.keyCode] !== undefined && pressPadButton(keyMap[e.keyCode]);
}

function keyup(e) {
  keyMap[e.keyCode] !== undefined && releasePadButton(keyMap[e.keyCode]);
}

async function run(buffer) {
  nes = new NesJs.Nes();

  nes.setRom(new NesJs.Rom(buffer));
  nes.setDisplay(new NesJs.Display(document.getElementById('nes-container')));
  nes.setAudio(new NesJs.Audio());

  window.addEventListener('keydown', keydown);

  window.addEventListener('keyup', keyup);

  nes.bootup();
  nes.run();
}

window.addEventListener('load', init);