const GameView = require('./game_view.js');
const checks = require('./checks.js');

const bindControls = () => {
  const restart = document.getElementById("restart-button");
  const play = document.getElementById("play-button");
  const pause = document.getElementById("pause-button");

  let gameView;

  restart.addEventListener("click", e => {
    if (checks()) return;

    document.getElementById("myCanvas").remove();

    const width = document.getElementById("width").value;
    const height = document.getElementById("height").value;
    const bgColor = document.getElementById("background-color").value;

    const canvas = document.createElement("canvas");
    canvas.id = "myCanvas";
    canvas.width = width;
    canvas.height = height;
    canvas.hidipi = "off";
    canvas.style = `background: ${bgColor}`;

    document.querySelector("body").appendChild(canvas);

    const numCircles = document.getElementById("numCircles").value;
    const radius = document.getElementById("radius").value;
    const speed = document.getElementById("speed").value;
    const numEndCircles = document.getElementById("endCircles").value;
    const startColor = document.getElementById("start-color").value;
    const endColor = document.getElementById("end-color").value;

    const options = {
      numCircles,
      radius,
      speed,
      startColor,
      endColor,
      numEndCircles
    };

    gameView = new GameView(options);
    gameView.start();
  });

  play.addEventListener("click", () => {
    gameView.paused = false;
  });

  pause.addEventListener("click", () => {
    gameView.paused = true;
  });

  gameView = new GameView({});
  gameView.start();
};

module.exports = bindControls;
