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

  db.gafas = require("./gafas.model.js")(sequelize, Sequelize);
  db.usuarios = require("./usuarios.model.js")(sequelize, Sequelize);
  db.direcciones = require("./direcciones.model.js")(sequelize, Sequelize);
  db.compras = require("./compras.model.js")(sequelize, Sequelize);

  module.exports = db;