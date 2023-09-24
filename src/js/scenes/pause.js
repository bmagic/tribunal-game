class Pause extends Phaser.Scene {
  constructor() {
    super({ key: 'Pause' });
  }

  create() {
    this.pauseText = this.add.text(500, 300, 'Pause', {
      font: '100px Arial',
      fill: '#FFFFFF',
    });

    //Resume Judgment
    this.input.keyboard.on('keyup-P', () => {
      this.scene.resume('Judgment');
      this.scene.stop('Pause');
    });

    // Mute key
    this.input.keyboard.on('keyup-M', () => {
      if (globalThis.theme.volume > 0) {
        globalThis.theme.setVolume(0);
      } else {
        globalThis.theme.setVolume(0.2);
      }
    });
  }
}
export default Pause;
