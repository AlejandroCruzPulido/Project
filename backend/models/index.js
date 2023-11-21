const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, 
  dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

  const db= {};

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.glasses = require("./glasses.model.js")(sequelize, Sequelize);
  db.users = require("./users.model.js")(sequelize, Sequelize);
  db.directions = require("./directions.model.js")(sequelize, Sequelize);
  db.buys = require("./buys.model.js")(sequelize, Sequelize);
  db.contain = require("./contain.model.js")(sequelize, Sequelize);

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

  db.buys.belongsToMany(db.contain, {
    through: 'contain',
    foreignKey: 'id_buys'
  });
  
  db.glasses.belongsToMany(db.contain, {
    through: 'contain',
    foreignKey: 'id_glasses'
  });

  module.exports = db;