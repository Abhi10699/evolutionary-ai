class Agent {
  position; // in terms of vector
  speed = 10; // will be a hyperparameter

  constructor(startX, startY) {
    this.position = createVector(startX, startY);
  }

  navigate(destination) {
    let direction = p5.Vector.sub(destination, this.position);
    direction.normalize();
    direction.mult(this.speed);
    this.position.add(direction);
  }

  move(direction) {
    switch (direction) {
      // up
      case 0:
        this.position.y -= this.speed;
        break;

      // down
      case 1:
        this.position.y += this.speed;
        break;
      
      // left
      case 2:
        this.position.x -= this.speed;
        break;

      // right
      case 3:
        this.position.x += this.speed;
        break;
    }
  }

  draw() {
    rect(this.position.x, this.position.y, 10, 10);
  }
}
