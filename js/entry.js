const GameView = require('./game_view.js');
const bindControls = require('./binds.js');

document.addEventListener("DOMContentLoaded", () => {
  bindControls();
  const gameView = new GameView({});
  gameView.start();
});
