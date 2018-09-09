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
    const bgOpacity = document.getElementById("background-opacity").value;

    const canvas = document.createElement("canvas");
    canvas.id = "myCanvas";
    canvas.width = width;
    canvas.height = height;

    const rgb = getRGB(bgColor);

    canvas.style = `background: rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${bgOpacity}`;

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
    play.style.display = "none";
    pause.style.display = "block";
  });

  pause.addEventListener("click", () => {
    gameView.paused = true;
    play.style.display = "block";
    pause.style.display = "none";
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
const MAX_NUM_CIRCLES = 1000;
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

class GameView {
  constructor(options) {
    this.numCircles = parseInt(options.numCircles) || NUM_CIRCLES;
    this.radius = parseInt(options.radius) || RADIUS;
    this.startColor = options.startColor ?  new paper.Color(options.startColor) : START_COLOR;
    this.endColor = options.endColor ?  new paper.Color(options.endColor) : END_COLOR;
    this.numEndCircles = parseInt(options.numEndCircles) || NUM_END_CIRCLES;
    this.speed = (parseInt(options.speed) || SPEED) / SPEED_SCALE;
    this.startTime = new Date().getTime();
    this.paused = false;
  }

  start() {
    paper.setup("myCanvas");
    this.createCircles();
    this.animateCircles();
  }

  createCircles() {
    for (let i = 0; i < this.numCircles; i++) {
      let centerX = Point.random().x * (view.size.width - 2 * this.radius) + this.radius;
      let centerY = Point.random().y * (view.size.height - 2 * this.radius) + this.radius;
      let center = new Point(centerX, centerY);
      let circle = new Path.Circle(center, this.radius);
      circle.fillColor = this.startColor;
      circle.direction = new Point(this.speed, this.speed);
      circle.direction.angle = Math.random() * 360;
    }

    for (let i = 0; i < this.numEndCircles; i++) {
      project.activeLayer.children[i].fillColor = this.endColor;
    }
  }

  animateCircles() {
    view.onFrame = () => {
      if (this.paused) {
      } else {
        const children = project.activeLayer.children;
        for(let i = 0; i < children.length; i++) {
          var child = children[i];
          this.updatePosition(child);
        }

        const startCircles = [], endCircles = [];
        children.forEach(circle => {
          if (circle.fillColor.toString() === this.startColor.toString()) {
            startCircles.push(circle);
          } else {
            endCircles.push(circle);
          }
        });

        for(let i = 0; i < startCircles.length; i++) {
          for(let j = 0; j < endCircles.length; j++) {
            const startCircle = startCircles[i];
            const endCircle = endCircles[j];
            this.checkCollision(startCircle, endCircle);
          }
        }

        this.updateDisplay(startCircles.length, endCircles.length);
      }
    };
  }

  checkCollision(start, end) {
    const xDist = start.position.x - end.position.x;
    const yDist = start.position.y - end.position.y;
    const dist = (xDist * xDist) + (yDist * yDist);

    if (dist <= (2 * this.radius) * (2 * this.radius)) {
      start.fillColor = this.endColor;
    }
  }

  updatePosition(circle) {
    const dx = circle.direction.x;
    const dy = circle.direction.y;

    if (circle.position.x + dx + this.radius > view.bounds.right) {
      circle.direction.x = -circle.direction.x;
    }

    if (circle.position.x + dx - this.radius < 0) {
      circle.direction.x = -circle.direction.x;
    }

    if (circle.position.y + dy > view.bounds.height - this.radius) {
      circle.direction.y = -circle.direction.y;
    }

    if (circle.position.y + dy - this.radius < 0) {
      circle.direction.y = -circle.direction.y;
    }

    circle.position.x += dx;
    circle.position.y += dy;
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
      timer.innerText = new Date().getTime() - this.startTime + "ms";
    }
  }
}

module.exports = GameView;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map