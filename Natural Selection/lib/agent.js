class Agent {
  position = createVector(); // in terms of vector
  brain = null;
  isAlive = true;

  // HYPER PARAMS
  speed = random(5, 20); // will be a hyperparameter
  energy = 10;
  vision = random(50, 100);
  eatRadius = random(10, 50);

  //

  constructor(startX, startY, brainCopy) {
    this.position = createVector(startX, startY);
    if (brainCopy) {
      this.brain = brainCopy;
    } else {
      this.brain = new Brain();
    }
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
    circle(this.position.x, this.position.y, 10, 10);
    push();
    noFill();
    stroke(255, 255, 255, 50);
    circle(this.position.x, this.position.y, this.vision);
    push();
    stroke("orange")
    circle(this.position.x, this.position.y, this.eatRadius);
    pop();
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
        food.isPoison,
        this.energy,
      ]);
      this.move(brainAction);
    }
  }

  drainEnergy() {
    this.energy -= this.eatRadius / this.vision;
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
    if (food.position.dist(this.position) <= this.eatRadius) {
      this.energy += food.foodEnergy;
      food.eat();
    }
  }

  clone() {
    const posX = random(0, 100);
    const posY = random(0, height);
    const copyBrain = new Brain();
    copyBrain.brain.setWeights(this.brain.brain.getWeights());
    const agentClone = new Agent(posX, posY, copyBrain);
    agentClone.eatRadius = this.eatRadius;
    agentClone.vision = this.vision;
    agentClone.speed = this.speed;
    return agentClone;
  }

  reproduce(moreReProductionProbablity) {
    // update their brain
    const reproducibleKids = random(0, 1) < moreReProductionProbablity ? 3 : 1;
    const kids = [];
    for (let i = 0; i < reproducibleKids; i++) {
      const parentCopy = this.clone();
      const mutationProbablity = random(0, 1);
      if (mutationProbablity < 0.25) {
        parentCopy.brain.mutateBrain();
        parentCopy.vision += random(2, 5);
        parentCopy.speed += random(2, 5);
      }
      kids.push(parentCopy);
    }

    return kids;
  }
}
