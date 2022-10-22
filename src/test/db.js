const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');


let mongoServer

exports.dbConnect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
};

exports.dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

exports.dropCollections = async () => {
  if (mongoServer) {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.remove();
    }
  }
};