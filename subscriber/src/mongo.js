const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

module.exports = MongoClient("mongodb://subscriber_db:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});