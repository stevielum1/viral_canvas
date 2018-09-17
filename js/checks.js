const MIN_WIDTH = 100;
const MAX_WIDTH = 1300;
const MIN_HEIGHT = 100;
const MAX_HEIGHT = 700;
const MIN_NUM_CIRCLES = 1;
const MAX_NUM_CIRCLES = 2500;
const MIN_RADIUS = 1;
const MAX_RADIUS = 20;
const MIN_SPEED = 1;
const MAX_SPEED = 200;
const MIN_NUM_END_CIRCLES = 1;

const checks = () => {
  const width = parseInt(document.getElementById("width").value);
  const height = parseInt(document.getElementById("height").value);
  const numCircles = parseInt(document.getElementById("numCircles").value);
  const radius = parseInt(document.getElementById("radius").value);
  const speed = parseInt(document.getElementById("speed").value);
  const numEndCircles = parseInt(document.getElementById("endCircles").value);

  if (width < MIN_WIDTH || width > MAX_WIDTH) {
    alert(`Width must be between ${MIN_WIDTH} and ${MAX_WIDTH}`);
    return true;
  }
  if (height < MIN_HEIGHT || height > MAX_HEIGHT) {
    alert(`Height must be between ${MIN_HEIGHT} and ${MAX_HEIGHT}`);
    return true;
  }
  if (numCircles < MIN_NUM_CIRCLES || numCircles > MAX_NUM_CIRCLES) {
    alert(`Num Circles must be between ${MIN_NUM_CIRCLES} and ${MAX_NUM_CIRCLES}`);
    return true;
  }
  if (radius < MIN_RADIUS || radius > MAX_RADIUS) {
    alert(`Radius must be between ${MIN_RADIUS} and ${MAX_RADIUS}`);
    return true;
  }
  if (speed < MIN_SPEED || speed > MAX_SPEED) {
    alert(`Speed must be between ${MIN_SPEED} and ${MAX_SPEED}`);
    return true;
  }
  if (numEndCircles < MIN_NUM_END_CIRCLES || numEndCircles > numCircles) {
    alert(`End Circles must be between ${MIN_NUM_END_CIRCLES} and ${numCircles}`);
    return true;
  }
  return false;
};

module.exports = checks;
