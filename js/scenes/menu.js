import phaser from "phaser";

import { CST } from "../CST";

export class MenuScene extends phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.MENU });
  }
  create() {
    this.add
      .image(
        this.game.renderer.width / 2,
        this.game.renderer.height * 0.2,
        CST.IMAGE.LOGO
      )
      .setDepth(1);
    this.add
      .image(0, 0, CST.IMAGE.TITLE)
      .setOrigin(0)
      .setDepth(0);
    const playButton = this.add
      .image(
        this.game.renderer.width / 2,
        this.game.renderer.height / 2,
        CST.IMAGE.PLAY
      )
      .setDepth(1);
    const optionsButton = this.add
      .image(
        this.game.renderer.width / 2,
        this.game.renderer.height / 2 + 100,
        CST.IMAGE.OPTIONS
      )
      .setDepth(1);

    const cat = this.add.sprite(100, 100, CST.SPRITE.CAT);
    cat.setScale(2);
    cat.setVisible(false);

    this.anims.create({
      key: "walk",
      frameRate: 4,
      repeat: -1,
      frames: this.anims.generateFrameNumbers(CST.SPRITE.CAT, {
        frames: [0, 1, 2, 3]
      })
    });

    playButton.setInteractive();
    playButton.on("pointerover", () => {
      cat.setVisible(true);
      cat.play("walk");
      cat.x = playButton.x - playButton.width;
      cat.y = playButton.y;
    });
    playButton.on("pointerout", () => {
      cat.setVisible(false);
    });
    playButton.on("pointerup", () => {
      this.scene.start(CST.SCENES.PLAY);
    });

    optionsButton.setInteractive();
    optionsButton.on("pointerover", () => {
      cat.setVisible(true);
      cat.play("walk");
      cat.x = optionsButton.x - optionsButton.width;
      cat.y = optionsButton.y;
    });
    optionsButton.on("pointerout", () => {
      cat.setVisible(false);
    });
    optionsButton.on("pointerup", () => {
      console.log("open the gates");
    });
    //this.sound.pauseOnBlur = false; // play music when out of focus.
    //this.sound.play(CST.AUDIO.TITLE, { loop: true });
  }
}
