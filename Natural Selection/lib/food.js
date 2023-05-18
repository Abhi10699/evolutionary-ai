class Food {
  position;
  isPoison = false;
  isEaten = false;

  constructor(posX, posY) {
    this.position = createVector(posX, posY);
    // if(random() < 0.3) {
    //   this.isPoison = true;
    // }
  }

  draw() {
    push();
    fill(this.isPoison ? "red" : "green");
    circle(this.position.x, this.position.y, 10, 10);
    pop();
  }

  eat() {
    this.isEaten = true;
  }
}
