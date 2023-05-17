const POPULATION_SIZE = 50;
const TOTAL_FOOD_COUNT = 10;
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

    // initialize agents

    for (let i = 0; i < this.agents.length; i++) {
      const posX = 10;
      const posY = i * 14 + 10;
      this.agents[i] = new Agent(posX, posY);
    }

    // generate food

    for (let i = 0; i < this.food.length; i++) {
      const posX = random(100, width / 2 + 100);
      const posY = random(200, height / 2 + 100);
      this.food[i] = new Food(posX, posY);
    }

    this.totalFrames = TIME_LIMIT;
  }

  evolve() {
    const allAlive = this.agents.every(agent => agent.isAlive);
    if (this.totalFrames < 0 || !allAlive) {
      // do reproduction


      // start again
      this.reset();
    } else {
      this.food.forEach((food) => food.draw());
      this.agents.forEach((agent) => agent.live());
      this.totalFrames -= 1;
    }
  }

  reset() {
    this.init(this.width, this.height);
  }
}
