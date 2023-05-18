class Brain {
  brain = null;


  /**
   * Input -> [posX, posY, foodPosX, foodPosY]
   * Output -> action probablities
   * 
   */

  constructor() {
    this.brain = tf.sequential();
    this.brain.add(
      tf.layers.dense({ units: 4, inputShape: [4], activation: "softmax" })
    );
  }

  mutateBrain() {}

  async chooseAction(inputs) {
      const inputTensor = tf.tensor2d([inputs]);
      const actionProbablities = await this.brain.predict(inputTensor).data()
      const maxActionProbablity = await tf.argMax(actionProbablities).data();
      return maxActionProbablity[0];
  }
}
