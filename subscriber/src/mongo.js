const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

module.exports = MongoClient(`mongodb://${process.env.MONGO_URL}:27017/myAwesomeDb`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});