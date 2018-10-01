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
