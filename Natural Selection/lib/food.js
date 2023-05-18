class Food {
  position;
  isPoison = 0;
  isEaten = false;
  foodEnergy = 5;

  constructor(posX, posY) {
    this.position = createVector(posX, posY);
    if(random() < 0.2) {
      this.isPoison = 1;
      this.foodEnergy = -100;
    }
    else {
      this.foodEnergy = 5;
    }
  }

  draw() {
    push();
    fill(this.isPoison == 1 ? "red" : "green");
    circle(this.position.x, this.position.y, 10, 10);
    pop();
  }

  eat() {
    this.isEaten = true;
  }
}
