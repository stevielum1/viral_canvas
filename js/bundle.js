/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/binds.js":
/*!*********************!*\
  !*** ./js/binds.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(/*! ./game_view.js */ "./js/game_view.js");
const checks = __webpack_require__(/*! ./checks.js */ "./js/checks.js");

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


/***/ }),

/***/ "./js/checks.js":
/*!**********************!*\
  !*** ./js/checks.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

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


/***/ }),

/***/ "./js/entry.js":
/*!*********************!*\
  !*** ./js/entry.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(/*! ./game_view.js */ "./js/game_view.js");
const bindControls = __webpack_require__(/*! ./binds.js */ "./js/binds.js");

document.addEventListener("DOMContentLoaded", () => {
  bindControls();
});


/***/ }),

/***/ "./js/game_view.js":
/*!*************************!*\
  !*** ./js/game_view.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

const NUM_CIRCLES = 100;
const RADIUS = 10;
const START_COLOR = new paper.Color("red");
const END_COLOR = new paper.Color("blue");
const NUM_END_CIRCLES = 1;
const SPEED = 10;
const SPEED_SCALE = 10;
const WIDTH = 700;
const HEIGHT = 400;

class GameView {
  constructor(options) {
    this.numCircles = options.numCircles || NUM_CIRCLES;
    this.radius = options.radius || RADIUS;
    this.startColor = options.startColor ? new paper.Color(options.startColor) : START_COLOR;
    this.endColor = options.endColor ? new paper.Color(options.endColor) : END_COLOR;
    this.numEndCircles = options.numEndCircles || NUM_END_CIRCLES;
    this.speed = (options.speed || SPEED) / SPEED_SCALE;
    this.width = options.width || WIDTH;
    this.height = options.height || HEIGHT;

    this.startTime = new Date().getTime();
    this.paused = false;
  }

  start() {
    paper.setup("myCanvas");
    this.createCircles();
    this.createCells();
    this.animateCircles();
  }

  stop() {
    view.onFrame = () => {};
  }

  createCircles() {
    this.startCircles = [];
    this.endCircles = [];

    for (let i = 0; i < this.numCircles; i++) {
      let centerX = Point.random().x * (view.size.width - 2 * this.radius) + this.radius;
      let centerY = Point.random().y * (view.size.height - 2 * this.radius) + this.radius;
      let center = new Point(centerX, centerY);
      let circle = new Path.Circle(center, this.radius);
      circle.fillColor = this.startColor;
      circle.direction = new Point(this.speed, this.speed);
      circle.direction.angle = Math.random() * 360;

      this.startCircles.push(circle);
    }

    const children = project.activeLayer.children;

    for (let i = 0; i < this.numEndCircles; i++) {
      children[i].fillColor = this.endColor;
      const idx = this.startCircles.indexOf(children[i]);
      this.startCircles.splice(idx, 1);
      this.endCircles.push(children[i]);
    }

  }
  
  createCells() {
    this.cells = {};
    this.cellWidth = (2.0 * this.radius);
    this.cellHeight = (2.0 * this.radius);

    for(let i = 0; i < this.width / this.cellWidth; i++) {
      for(let j = 0; j < this.height / this.cellHeight; j++) {
        const cell = [];
        project.activeLayer.children.forEach(circle => {
          if (i * this.cellWidth < circle.position.x &&
            circle.position.x <= (i+1) * this.cellWidth &&
            j * this.cellHeight < circle.position.y &&
            circle.position.y <= (j+1) * this.cellHeight) {
              cell.push(circle);
              }
        });
        this.cells[`${i}-${j}`] = cell;
      }
    }
  }
  
  animateCircles() {
    view.onFrame = () => {
      if (!this.paused) {
        const children = project.activeLayer.children;
        for(let i = 0; i < children.length; i++) {
          const child = children[i];
          this.updatePosition(child);
        }

        // for(let i = 0; i < this.startCircles.length; i++) {
        //   for(let j = 0; j < this.endCircles.length; j++) {
        //     const startCircle = this.startCircles[i];
        //     const endCircle = this.endCircles[j];
        //     this.checkCollision(startCircle, endCircle);
        //   }
        // }

        children.forEach(circle => {
          const cellX = Math.floor(circle.position.x / this.cellWidth);
          const cellY = Math.floor(circle.position.y / this.cellHeight);
          this.checkSurroundingCollisions(circle, cellX, cellY);
        });

        this.updateDisplay(this.startCircles.length, this.endCircles.length);
      }
    };
  }

  checkSurroundingCollisions(circle, x, y) {
    const upperLeft = this.cells[`${x-1}-${y-1}`] || null;
    const up = this.cells[`${x}-${y-1}`] || null;
    const upperRight = this.cells[`${x+1}-${y-1}`] || null;

    const left = this.cells[`${x-1}-${y}`] || null;
    const mid = this.cells[`${x}-${y}`] || null;
    const right = this.cells[`${x+1}-${y}`] || null;

    const lowerLeft = this.cells[`${x-1}-${y+1}`] || null;
    const lower = this.cells[`${x}-${y+1}`] || null;
    const lowerRight = this.cells[`${x+1}-${y+1}`] || null;

    if (upperLeft) {
      upperLeft.forEach(other => this.checkCollision(circle, other));
    }

    if (up) {
      up.forEach(other => this.checkCollision(circle, other));
    }

    if (upperRight) {
      upperRight.forEach(other => this.checkCollision(circle, other));
    }

    if (left) {
      left.forEach(other => this.checkCollision(circle, other));
    }

    if (mid) {
      mid.forEach(other => this.checkCollision(circle, other));
    }

    if (right) {
      right.forEach(other => this.checkCollision(circle, other));
    }

    if (lowerLeft) {
      lowerLeft.forEach(other => this.checkCollision(circle, other));
    }

    if (lower) {
      lower.forEach(other => this.checkCollision(circle, other));
    }
    
    if (lowerRight) {
      lowerRight.forEach(other => this.checkCollision(circle, other));
    }

  }

  checkCollision(start, end) {
    if (start === end) return;

    const xDist = start.position.x - end.position.x;
    const yDist = start.position.y - end.position.y;
    const dist = (xDist * xDist) + (yDist * yDist);

    if (dist <= (2 * this.radius) * (2 * this.radius)) {
      if (!start.fillColor.equals(end.fillColor)) {
        start.fillColor = this.endColor;

        if (this.startCircles.includes(start)) {
          const idx = this.startCircles.indexOf(start);
          this.startCircles.splice(idx, 1);
        }

        if (!this.endCircles.includes(start)) {
          this.endCircles.push(start);
        }
      }
    }
  }

  updatePosition(circle) {
    const oldCellX = Math.floor(circle.position.x / this.cellWidth);
    const oldCellY = Math.floor(circle.position.y / this.cellHeight);
    
    const dx = circle.direction.x;
    const dy = circle.direction.y;
    
    if (circle.position.x + dx + this.radius > view.bounds.right) {
      circle.direction.x = -circle.direction.x;
    }
    
    if (circle.position.x + dx - this.radius < 0) {
      circle.direction.x = -circle.direction.x;
    }
    
    if (circle.position.y + dy + this.radius > view.bounds.bottom) {
      circle.direction.y = -circle.direction.y;
    }
    
    if (circle.position.y + dy - this.radius < 0) {
      circle.direction.y = -circle.direction.y;
    }
    
    circle.position.x += circle.direction.x;
    circle.position.y += circle.direction.y;
    
    const newCellX = Math.floor(circle.position.x / this.cellWidth);
    const newCellY = Math.floor(circle.position.y / this.cellHeight);

    if (oldCellX !== newCellX || oldCellY !== newCellY) {
      const oldCell = this.cells[`${oldCellX}-${oldCellY}`];

      if (oldCell) {
        const idx = oldCell.indexOf(circle);
        oldCell.splice(idx, 1);
      }
      
      const newCell = this.cells[`${newCellX}-${newCellY}`];
      
      if (newCell) {
        newCell.push(circle);
      }
    }
  }

  updateDisplay(numStart, numEnd) {
    const numStartLeft = document.getElementById("start-circles-left");
    const numEndLeft = document.getElementById("end-circles-left");
    const timer = document.getElementById("timer");

    numStartLeft.style = `color: ${this.startColor.toCSS()}`;
    numStartLeft.innerText = numStart;

    numEndLeft.style = `color: ${this.endColor.toCSS()}`;
    numEndLeft.innerText = numEnd;

    if (numEnd < this.numCircles) {
      timer.innerText = ((new Date().getTime() - this.startTime) / 1000).toFixed(1) + " s";
    }
  }
}

module.exports = GameView;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map