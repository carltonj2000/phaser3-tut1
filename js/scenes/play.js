import phaser from "phaser";

import { CST } from "../CST";

export class PlayScene extends phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.PLAY });
  }
  preload() {
    this.anims.create({
      key: "dazzle",
      frameRate: 10,
      frames: this.anims.generateFrameNames("daze", {
        prefix: "daze0",
        suffix: ".png",
        start: 0,
        end: 41
      }),
      repeat: -1
    });
    this.textures.addSpriteSheetFromAtlas("hooded", {
      frameHeight: 64,
      frameWidth: 64,
      atlas: "characters",
      frame: "hooded"
    });
    this.textures.addSpriteSheetFromAtlas("mandy", {
      frameHeight: 64,
      frameWidth: 64,
      atlas: "characters",
      frame: "mandy"
    });
    this.anims.create({
      key: "right",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("hooded", {
        frames: [143, 144, 145, 146, 147, 148, 149, 150, 151]
      })
    });
    this.anims.create({
      key: "left",
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("anna", {
        frames: [9, 10, 11, 12, 13, 14, 15, 16, 17]
      })
    });
  }
  create() {
    const daze = this.add
      .sprite(100, 100, "daze", "daze015.png")
      .play("dazzle");
    window.daze = daze;
    daze.on("animationupdate", () => {
      console.log("ahh");
    });
    daze.on("animationrepeat", () => {
      console.log("levelup");
    });
    const anna = this.add
      .sprite(200, 200, "anna")
      .setScale(2)
      .anims.playReverse("left");
    window.anna = anna;
    const hooded = this.add
      .sprite(300, 300, "hooded")
      .setScale(2)
      .play("right");
    window.hooded = hooded;
  }
}
