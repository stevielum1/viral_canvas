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
  }

  start() {
    paper.setup("myCanvas");
    this.createCircles();
    this.animateCircles();
  }

  createCircles() {
    // const display = document.querySelector(".display");
    // display.removeChild(display.lastChild);
    //
    // const ul = document.createElement("ul");
    // ul.id = "test";
    // display.appendChild(ul);

    for (let i = 0; i < this.numCircles; i++) {
      let centerX = Point.random().x * (view.size.width - 2 * this.radius) + this.radius;
      let centerY = Point.random().y * (view.size.height - 2 * this.radius) + this.radius;
      let center = new Point(centerX, centerY);
      let circle = new Path.Circle(center, this.radius);
      circle.fillColor = this.startColor;
      circle.direction = new Point(this.speed, this.speed);
      circle.direction.angle = Math.random() * 360;

      // const li = document.createElement("li");
      // li.style = `color: ${circle.fillColor.toCSS()}`;
      // li.id = circle.id;
      // ul.appendChild(li);
    }

    for (let i = 0; i < this.numEndCircles; i++) {
      project.activeLayer.children[i].fillColor = this.endColor;
    }
  }

  animateCircles() {
    view.onFrame = () => {
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
    // project.activeLayer.children.forEach(child => {
    //   document.getElementById(child.id).style = `color: ${child.fillColor.toCSS()}`;
    // });
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
