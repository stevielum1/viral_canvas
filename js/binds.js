const GameView = require('./game_view.js');
const checks = require('./checks.js');

const bindControls = () => {
  let gameView;

  const restart = document.getElementById("restart-button");
  const play = document.getElementById("play-button");
  const pause = document.getElementById("pause-button");

  play.addEventListener("click", () => {
    gameView.paused = false;
    play.style.display = "none";
    pause.style.display = "block";
  });

  pause.addEventListener("click", () => {
    gameView.paused = true;
    play.style.display = "block";
    pause.style.display = "none";
  });

  restart.addEventListener("click", e => {
    if (checks()) return;

    document.getElementById("myCanvas").remove();

    const width = parseInt(document.getElementById("width").value);
    const height = parseInt(document.getElementById("height").value);
    const bgColor = document.getElementById("background-color").value;
    const bgOpacity = document.getElementById("background-opacity").value;

    const canvas = document.createElement("canvas");
    canvas.id = "myCanvas";
    canvas.width = width;
    canvas.height = height;

    const rgb = getRGB(bgColor);

    canvas.style = `background: rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${bgOpacity}`;

    document.querySelector("body").appendChild(canvas);

    const numCircles = parseInt(document.getElementById("numCircles").value);
    const radius = parseInt(document.getElementById("radius").value);
    const speed = parseInt(document.getElementById("speed").value);
    const numEndCircles = parseInt(document.getElementById("endCircles").value);
    const startColor = document.getElementById("start-color").value;
    const endColor = document.getElementById("end-color").value;

    const options = {
      numCircles,
      radius,
      speed,
      startColor,
      endColor,
      numEndCircles,
      width,
      height
    };
    gameView.stop();
    gameView = new GameView(options);
    gameView.start();
  });

  const about = document.getElementById("about");
  const modalBackground = document.getElementById("modal-background");
  
  about.addEventListener("click", e => {
    modalBackground.style.display = "block";
  });

  modalBackground.addEventListener("click", e => {
    modalBackground.style.display = "none";
  });
  
  gameView = new GameView({});
  gameView.start();
};

const getRGB = hex => {
  const colors = [];
  colors.push(parseInt(hex.substr(1,2), 16));
  colors.push(parseInt(hex.substr(3,2), 16));
  colors.push(parseInt(hex.substr(5,2), 16));
  return colors;
};

module.exports = bindControls;
