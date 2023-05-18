class Agent {
  position = createVector(); // in terms of vector
  brain = null;
  isAlive = true;

  // HYPER PARAMS
  speed = 7; // will be a hyperparameter
  energy = 10;
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
    stroke(255, 255, 255, 50);
    circle(this.position.x, this.position.y, this.vision);
    pop();

    pop();
  }

  async chooseAction(food) {
    if (!food) {
      const action = Math.floor(random(0, 5));
      this.move(action);
    } else {
      const brainAction = await this.brain.chooseAction([
        this.position.x,
        this.position.y,
        food[0],
        food[1],
      ]);
      this.move(brainAction);
    }
  }

  drainEnergy() {
    this.energy -= 0.5;
    if (this.energy < 0) {
      this.killAgent();
    }
  }

  killAgent() {
    this.isAlive = false;
  }

  searchFood(foods) {
    let nearbyFood = [];

    foods.forEach((food) => {
      const distance = food.position.dist(this.position);
      if (distance < this.vision) {
        nearbyFood.push(food);
      }
    });

    return nearbyFood;
  }

  live(enviornment) {
    if (this.isAlive) {
      const foods = this.searchFood(enviornment.food);
      const randomFood = random(foods);
      this.chooseAction(randomFood).then((_) => {
        if (randomFood) {
          this.eatFood(randomFood);
        }
      });
    }
    this.draw();
  }

  eatFood(food) {
    if (food.position.dist(this.position) <= this.vision) {
      this.energy += 10;
      food.eat();
    }
  }
}
