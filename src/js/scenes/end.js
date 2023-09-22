class End extends Phaser.Scene {
  constructor() {
    super({ key: 'End' });
  }

  create() {
    const music = this.sound.add('music').setLoop(true);
    music.play();
    const info = this.add.text(
      10,
      10,
      ['Work in progress sur la fin', 'Touche enter pour restart'],
      {
        font: '24px Arial',
        fill: '#FFFFFF',
      }
    );

    this.input.keyboard.on('keyup-ENTER', () => {
      music.stop();
      this.scene.start('Menu');
    });
  }
}
export default End;
