let agents = new Array(200);
let food = new Array(50);

function setup() {
  createCanvas(1280, 720);
  
  // generate population
  for (let i = 0; i < agents.length; i++) {
    const posX = 10
    const posY = i*14 + 10;
    agents[i] = new Agent(posX, posY);
  }

  // generate food

  for(let i=0;i<food.length;i++) {
    const posX = random(width/2  - 100, width/2 + 400);
    const posY = random(height/2 - 200,height/2 + 200);

    food[i] = new Food(posX, posY);
  }

}

function draw() {
  background(51);
  food.forEach(food => food.draw())
  agents.forEach(agent => {
    agent.move(Math.floor(random(0,5)))
    agent.draw()
  })

  noLoop()
}
