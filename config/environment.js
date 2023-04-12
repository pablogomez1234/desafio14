require('dotenv').config();

module.exports.port = process.env.PORT;
module.exports.mongoUrl = process.env.MONGO_URL;
module.exports.persistence = process.env.PERSISTENCE;