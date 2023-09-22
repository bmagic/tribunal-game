class Menu extends Phaser.Scene {
  constructor() {
    super({ key: "Menu" });
  }

  create() {
    //Start theme music
    globalThis.theme = this.sound.add("theme").setVolume(0.2).setLoop(true);
    globalThis.theme.play();

    //Display the image on left part
    this.add.image(0, 0, "affiche").setOrigin(0).setScale(0.6);

    //Display content on right part
    const content = [
      "En 2139, MONTARGIS-CITY ONE a été ravagée par de terribles",
      "bureaux. 100 millions de citoyens végètent dans les LEDs et la crasse.",
      "",
      "Pour lutter contre la criminalité galopante, des milices bureaulogiques",
      "ont été créées, les JUDGES - capables de juger et de gnouffer",
      "instantanément.",
      "",
      "Fort de son level 99 et de son LG G20 120 pouces, JUDGE ACKBOO",
      "est le plus redouté d'entre eux.",
      "",
      "Mais le Système se retourne contre Lui quand il est accusé à tort,",
      "d'un crime bureaulogique: des montres sur son bureau.",
      "",
      "Le responsable de cette machination n'est autre que l'infâme",
      "DR DROUX, qui lui a volé son amour d'enfance.",
      "Une rivalité sans pitié les oppose et menace MONTARGIS-CITY ONE.",
      "",
      "",
      "Pour sauver JUDGE ACKBOO et gnouffer DR DROUX, ta mission",
      "est simple: atteins toi aussi le niveau 99 en jugeant les bureaux",
      "de MONTARGIS-CITY ONE.",
    ];
    this.add.text(570, 40, content, {
      font: "22px Arial",
      fill: "#E82219",
      fontStyle: "bold",
    });

    //Add Menu
    const facile = this.add
      .image(550, 590, "facile")
      .setOrigin(0)
      .setScale(0.4);
    const moyen = this.add.image(730, 590, "moyen").setOrigin(0).setScale(0.4);
    const bureaulogue = this.add
      .image(915, 582, "bureaulogue")
      .setOrigin(0)
      .setScale(0.45);
    let button = [facile, moyen, bureaulogue];
    let glow = button[globalThis.difficulty].preFX.addGlow(0xe82219, 2);

    this.input.keyboard.on("keydown-LEFT", (event) => {
      glow.destroy();
      globalThis.difficulty =
        globalThis.difficulty == 0 ? 2 : globalThis.difficulty - 1;
      glow = button[globalThis.difficulty].preFX.addGlow(0xe82219, 2);
      this.sound.add("button").play();
    });

    this.input.keyboard.on("keydown-RIGHT", (event) => {
      glow.destroy();
      globalThis.difficulty =
        globalThis.difficulty == 2 ? 0 : globalThis.difficulty + 1;
      glow = button[globalThis.difficulty].preFX.addGlow(0xe82219, 2);
      this.sound.add("button").play();
    });

    this.input.keyboard.on("keyup-ENTER", (event) => {
      this.scene.start("Counter");
    });
  }
}
export default Menu;
