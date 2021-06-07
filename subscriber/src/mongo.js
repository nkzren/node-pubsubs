const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

module.exports = MongoClient("mongodb://subscriber_db:27017/myAwesomeDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});