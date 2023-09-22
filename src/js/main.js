import Phaser from 'phaser';
import Loading from './scenes/loading';
import Menu from './scenes/menu';
import Counter from './scenes/counter';
import Judgement from './scenes/judgment';
import End from './scenes/end';

//Define the global variables
globalThis.theme;
globalThis.difficulty = 1;

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: '#000000',
  scene: [Loading, Menu, End, Judgement, Counter],
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

const game = new Phaser.Game(config);
