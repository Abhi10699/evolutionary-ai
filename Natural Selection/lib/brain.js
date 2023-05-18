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
      // tf.layers.dense({ units: 4, inputShape: [6], activation: "relu" }),
      tf.layers.dense({ units: 4, inputShape: [6], activation: "softmax" })
    );
  }

  mutateBrain() {
    const layerCoefs = this.brain.getWeights();
    const weights = layerCoefs[0];
    const bias = layerCoefs[1];
    
    const randomUniformWeights = tf.randomUniform(weights.shape);
    const updatedWeights = tf.add(randomUniformWeights, weights);
   
    const randomUniformBias = tf.randomUniform(bias.shape);
    const updatedBias = tf.add(randomUniformBias, bias);
    this.brain.setWeights([updatedWeights, updatedBias]);
  }

  async chooseAction(inputs) {
      const inputTensor = tf.tensor2d([inputs]);
      const actionProbablities = await this.brain.predict(inputTensor).data()
      const maxActionProbablity = await tf.argMax(actionProbablities).data();
      return maxActionProbablity[0];
  }
}
