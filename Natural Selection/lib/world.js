const POPULATION_SIZE = 50;
const TOTAL_FOOD_COUNT = 50;
const TIME_LIMIT = 100;

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

  init(width, height, initializePopulation = true) {
    this.width = width;
    this.height = height;

    this.agents = new Array(POPULATION_SIZE);
    this.food = new Array(TOTAL_FOOD_COUNT);

    // initialize agents

    if (initializePopulation) {
      for (let i = 0; i < POPULATION_SIZE; i++) {
        const posX = 50;
        const posY = i * 14 + 10;
        this.agents[i] = new Agent(posX, posY);
      }
    }

    // generate food

    for (let i = 0; i < TOTAL_FOOD_COUNT; i++) {
      const posX = random(0,width);
      const posY = random(0, height);
      this.food[i] = new Food(posX, posY);
    }

    this.totalFrames = TIME_LIMIT;
  }

  evolve() {
    if (this.totalFrames < 0) {
      const fittest = this.agents
        .filter((agent) => agent.energy >= 5)
        .sort((a, b) => a.position.x - b.position.x);

      const allEnergySum = Math.floor(
        fittest.map((a) => a.energy).reduce((p, c) => p + c, 0)
      );

      if (fittest.length) {
        const offsprings = fittest.map((individual) =>
          individual.reproduce(individual.energy / allEnergySum)
        );
        const newPopulation = [...offsprings.flat()];
        this.reset(newPopulation);
      } else {
        this.reset([]);
      }
    } else {
      this.food = this.food.filter((f) => !f.isEaten);
      this.food.forEach((food) => food.draw());
      this.agents.forEach((agent) => agent.live(this));
      this.totalFrames -= 1;
    }
  }

  reset(newPopulation) {
    if (newPopulation && newPopulation.length != 0) {
      this.init(this.width, this.height, false);
      this.agents = newPopulation;
    } else {
      this.init(this.width, this.height);
    }
  }
}
