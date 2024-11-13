const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, data) {
    const db = new Firestore({
        projectId: 'deploy-model-441207',
        keyFilename: './src/services/deploy-model-441207-818a77951609.json' // Ganti path ini dengan path file JSON kredensial Anda
    });
   
    const predictCollection = db.collection('prediction');
    return predictCollection.doc(id).set(data);
  }
   
  module.exports = storeData;