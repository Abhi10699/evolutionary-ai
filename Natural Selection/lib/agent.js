class Agent {
  position = createVector(); // in terms of vector
  brain = null;
  isAlive = true;

  // HYPER PARAMS
  speed = 7; // will be a hyperparameter
  energy = 100;
  vision = 50;

  // 
  



  constructor(startX, startY) {
    this.position = createVector(startX, startY);
    this.brain = new Brain();
  }

  navigate(destination) {
    let direction = p5.Vector.sub(destination, this.position);
    direction.normalize();
    direction.mult(this.speed);
    this.position.add(direction);
  }

  move(direction) {
    this.drainEnergy();

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
    push();
    rectMode(CENTER);
    fill(this.isAlive ? "white" : "red");
    rect(this.position.x, this.position.y, 10, 10);
    push();
      noFill();
      stroke(255, 255, 255,50);
      circle(this.position.x, this.position.y, this.vision)
    pop();
    
    pop();
  }

  createBrain() {
    const model = tf.sequential();
    model.add(
      tf.layers.dense({ units: 4, inputShape: [2], activation: "softmax" })
    );
    this.brain = model;
  }

  async chooseAction(foodLocation) {
    if (!foodLocation) {
      const action = Math.floor(random(0, 5));
      this.move(action);
    } else {
      const brainAction = await this.brain.chooseAction([
        this.position.x,
        this.position.y,
        foodLocation[0],
        foodLocation[1],
      ]);
      this.move(brainAction);
      await tf.nextFrame();
    }
  }

  drainEnergy() {
    this.energy -= 0.5;
    if(this.energy < 0) {
      this.killAgent();
    }
  }

  killAgent() {
    this.isAlive = false;
  }

  searchFood() {
    // TODO: Implementation pending
    return;
  }

  live() {
    if (this.isAlive) {
      const food = this.searchFood();
      this.chooseAction(food);
    }
    
    this.draw();
  }
}
