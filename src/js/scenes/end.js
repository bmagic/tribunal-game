class End extends Phaser.Scene {
  constructor() {
    super({ key: 'End' });
  }

  init(data) {
    this.win = data.win || false;
  }
  create() {
    let music;

    if (this.win) {
      music = this.sound.add('music').setLoop(true);
      const info = this.add.text(
        10,
        10,
        ['Work in progress sur la fin Good', 'Touche enter pour restart'],
        {
          font: '24px Arial',
          fill: '#FFFFFF',
        }
      );
      this.add
        .timeline([
          {
            at: 300,
            sound: 'win',
          },
          {
            at: 1400,
            run: () => {
              music.play();
            },
          },
        ])
        .play();
    } else {
      music = this.sound.add('sad').setLoop(true).setVolume(0.2);
      const info = this.add.text(
        10,
        10,
        ['Work in progress sur la fin Perdue', 'Touche enter pour restart'],
        {
          font: '24px Arial',
          fill: '#FFFFFF',
        }
      );
      this.add
        .timeline([
          {
            at: 300,
            sound: 'loose',
          },
          {
            at: 1400,
            sound: 'laugh',
          },
          {
            at: 3600,
            run: () => {
              music.play();
            },
          },
        ])
        .play();
    }

    this.input.keyboard.on('keyup-ENTER', () => {
      music.stop();
      this.scene.start('Menu');
    });

    // Fullscreen
    this.input.keyboard.on('keyup-F', () => {
      this.scale.toggleFullscreen();
    });
  }
}
export default End;
