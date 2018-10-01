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

  const widthEl = document.getElementById("width");
  const heightEl = document.getElementById("height");
  const bgColorEl = document.getElementById("background-color");
  const bgOpacityEl = document.getElementById("background-opacity");
  const numCirclesEl = document.getElementById("numCircles");
  const radiusEl = document.getElementById("radius");
  const speedEl = document.getElementById("speed");
  const numEndCirclesEl = document.getElementById("endCircles");
  const startColorEl = document.getElementById("start-color");
  const endColorEl = document.getElementById("end-color");

  handleChange(widthEl);
  handleChange(heightEl);
  handleChange(bgColorEl);
  handleChange(bgOpacityEl);
  handleChange(numCirclesEl);
  handleChange(radiusEl);
  handleChange(speedEl);
  handleChange(numEndCirclesEl);
  handleChange(startColorEl);
  handleChange(endColorEl);

  restart.addEventListener("click", e => {
    if (checks()) return;

    document.getElementById("myCanvas").remove();

    const width = parseInt(widthEl.value);
    const height = parseInt(heightEl.value);
    const bgColor = bgColorEl.value;
    const bgOpacity = bgOpacityEl.value;

    const canvas = document.createElement("canvas");
    canvas.id = "myCanvas";
    canvas.width = width;
    canvas.height = height;

    const rgb = getRGB(bgColor);

    canvas.style = `background: rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${bgOpacity}`;

    document.querySelector("body").appendChild(canvas);

    const numCircles = parseInt(numCirclesEl.value);
    const radius = parseInt(radiusEl.value);
    const speed = parseInt(speedEl.value);
    const numEndCircles = parseInt(numEndCirclesEl.value);
    const startColor = startColorEl.value;
    const endColor = endColorEl.value;

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

  const modalBackground = document.getElementById("modal-background");

  modalBackground.addEventListener("click", () => {
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

const handleChange = el => {
  const startVal = el.value;
  el.addEventListener("input", e => {
    setTimeout(() => {
      if (e.target.value !== startVal) {
        showPopup();
      }
    }, 1000);
  });
};

const showPopup = () => {
  const settingsChanged = document.getElementById("settings-changed");
  settingsChanged.style.opacity = "1";
  setTimeout(() => {
    settingsChanged.style.opacity = "0";
  }, 3000);
};

module.exports = bindControls;
