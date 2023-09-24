import Phaser from 'phaser';
import Loading from './scenes/loading';
import Menu from './scenes/menu';
import Counter from './scenes/counter';
import Judgment from './scenes/judgment';
import End from './scenes/end';
import BossIntro from './scenes/bossIntro';

import emissions from '../assets/desktops/emissions.json';

//Define the global variables
globalThis.theme;

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: '#000000',
  scene: [Loading, Menu, End, Judgment, Counter, BossIntro],
  scale: {
    parent: 'game',
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  fx: {
    glow: {
      distance: 32,
      quality: 0.1,
    },
  },
};

console.log(emissions);
var div = document.getElementById('logs');
div.addEventListener('add', (e) => {
  const judgment = e.detail.judgment;
  const desktop = e.detail.desktop;

  const emission = emissions[`s${desktop.saison}e${desktop.emission}`];
  const url = `${emission.url}&t=${desktop.time}s`;

  if (judgment != 'perdu') {
    div.innerHTML += `<div><a class="${
      judgment == desktop.jugement ? 'correct' : 'wrong'
    }" target="_blank" href="${url}">${
      judgment == desktop.jugement ? 'Correct' : 'Faux'
    } ce bureau ${
      desktop.jugement == 'relaxe' ? 'a été relaxé' : "n'a pas été relaxé"
    } (Saison ${desktop.saison} Episode ${desktop.emission} Bureau ${
      desktop.id
    })</a></div>`;
  } else {
    div.innerHTML += `<div><a class=wrong target="_blank" href="${url}">Vous n'avez pas répondu assez vite</a>`;
  }
});

const game = new Phaser.Game(config);
