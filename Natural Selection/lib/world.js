const POPULATION_SIZE = 50;
const TOTAL_FOOD_COUNT = 100;
const TIME_LIMIT = 1000;

class World {
  // world

  width = undefined;
  height = undefined;

  // entities
  agents = new Array(POPULATION_SIZE);
  food = new Array(TOTAL_FOOD_COUNT);

  // evolutions
  generations = [];
  totalFrames = 0;

  init(width, height) {

    this.width = width;
    this.height = height;

    this.agents = new Array(POPULATION_SIZE);
    this.food = new Array(TOTAL_FOOD_COUNT);


    // initialize agents

    for (let i = 0; i < this.agents.length; i++) {
      const posX = random(0, width);
      const posY = random(0, height);
      this.agents[i] = new Agent(posX, posY);
    }

    // generate food

    for (let i = 0; i < this.food.length; i++) {
      const posX = random(0, width);
      const posY = random(0, height);
      this.food[i] = new Food(posX, posY);
    }

    this.totalFrames = TIME_LIMIT;
  }

  evolve() {
    const allAlive = this.agents.every((agent) => agent.isAlive);
    if (this.totalFrames < 0 || !allAlive) {
      // find fittest
      const fittest = this.findFittest();
      // do reproduction

      // start again
      this.reset();
      // noLoop();
    } else {
      this.food = this.food.filter((f) => !f.isEaten);
      this.food.forEach((food) => food.draw());
      this.agents.forEach((agent) => agent.live(this));
      this.totalFrames -= 1;
    }
  }

  findFittest() {
    const fittest = this.agents.filter(agent => agent.energy >= 10);
    return fittest;
  }

  reset() {
    this.init(this.width, this.height);
  }
}
