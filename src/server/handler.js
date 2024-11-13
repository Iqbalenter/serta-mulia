const predictClassification = require('../services/inferenceService');
const storeData = require('../services/storeData');
const crypto = require('crypto');

async function postPredictHandler(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app;

    if (!image) {
        return h.response({
            status: 'fail',
            message: 'Image is required'
        }).code(400);
    }

    try {
        const { confidenceScore, label, explanation, suggestion } = await predictClassification(model, image);

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    
    const data = {
        "id": id,
        "result": label,
        "explanation": explanation,
        "suggestion": suggestion,
        "confidenceScore": confidenceScore,
        "createdAt": createdAt
    }

    await storeData(id, data);

    const response = h.response({
        status: 'success',
        message: confidenceScore > 99 ? 'Model is predicted successfully.' : 'Model is predicted successfully but under threshold. Please use the correct picture',
        data
      })
      response.code(confidenceScore > 99 ? 200 : 422);
      return response;
    } catch (error) {
        console.error(error);
        return h.response({
            status: 'fail',
            message: 'An error occurred while predicting the image.'
        }).code(500); // Internal Server Error
    }
}

module.exports = postPredictHandler;