# Phaser 3 - Game

The code in this repository is based on the
[Phaser 3 Game Tutorial](https://www.youtube.com/watch?v=wDOym-mXxO4)
video.
[The github repo](https://github.com/jestarray/gate)
is used for the assets in the dist folder.
[A free texture packer](https://gammafp.github.io/atlas-packer-phaser/).

## Typescript

Note that I finally decided not to got with typescript due to many errors seen.
But including the `phaser.d.ts` is a good idea in order to get syntax hightlighting.

- `npm install -g typescript`
- `tsc --init`
- for vscode auto-correct to work copy to `node_modules/@types` the file from
  [here](https://github.com/photonstorm/phaser3-docs/tree/master/typescript).
- vscode auto-correct FAILED with the following `better` suggestion
  - `npm install --save-dev github:photonstorm/phaser3-docs`
  - add `"files": ["node_modules/phaser3-docs/typescript/phaser.d.ts"]` to tsconfig.json
