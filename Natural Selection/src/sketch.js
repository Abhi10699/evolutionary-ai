let world = new World();
function setup() {
  createCanvas(1280, 720);
  world.init(width, height);
}

function draw() {
  background(51);
  world.evolve();
}
