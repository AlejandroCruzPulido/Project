module.exports = (sequelize, Sequelize) => {
  const db = require("../models");
    const Contain = sequelize.define("contain", {
      id_buys: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      id_glasses: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      paymentMethod: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      }
    }, {timestamps: false});
    return Contain;
  }