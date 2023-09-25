import Phaser from 'phaser';
import Loading from './scenes/loading';
import Menu from './scenes/menu';
import Counter from './scenes/counter';
import Judgment from './scenes/judgment';
import End from './scenes/end';
import BossIntro from './scenes/bossIntro';
import Pause from './scenes/pause';

//Define the global variables
globalThis.theme;

const config = {
  type: Phaser.AUTO,

  backgroundColor: '#000000',
  scene: [Loading, Menu, End, Judgment, Counter, BossIntro, Pause],
  scale: {
    parent: 'game',
    width: 1920,
    height: 1080,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    mode: Phaser.Scale.FIT,
  },
  fx: {
    glow: {
      distance: 32,
      quality: 0.1,
    },
  },
};

const game = new Phaser.Game(config);
