const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { userModelConfig } = require(__dirname + '/../config/db.config.js');
const env = process.env.NODE_ENV || 'development';
const dbConfig = require(__dirname + '/../config/db.config.js')[env];
const db = {};
const basename = path.basename(__filename);

let sequelize;
if (dbConfig && dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.glasses = require("./glasses.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.directions = require("./directions.model.js")(sequelize, Sequelize);
db.buys = require("./buys.model.js")(sequelize, Sequelize);
db.contain = require("./contain.model.js")(sequelize, Sequelize);

const User = userModelConfig(sequelize, Sequelize);
db.users = User;

db.users.hasMany(db.buys, {
  foreignKey: 'id_user'
});

db.buys.belongsTo(db.users, {
  foreignKey: 'id_user'
});

db.users.hasMany(db.directions, {
  foreignKey: 'id_user'
});

db.buys.belongsTo(db.directions, {
  foreignKey: 'id_user'
});

db.buys.belongsToMany(db.glasses, {
  through: 'contain',
  foreignKey: 'id_buys',
});

db.glasses.belongsToMany(db.buys, {
  through: 'contain',
  foreignKey: 'id_glasses',
});

module.exports = db;
