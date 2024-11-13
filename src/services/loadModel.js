const tf = require('@tensorflow/tfjs-node');
async function loadModel() {
    try {
        const model = await tf.loadGraphModel('https://storage.googleapis.com/dicoding-model-bucket/model-in-prod/model.json');
        console.log('Model loaded successfully');
        return model;
    } catch (error) {
        console.error('Error loading model:', error.message, error.stack);
        throw error;
    }
}

module.exports = loadModel;