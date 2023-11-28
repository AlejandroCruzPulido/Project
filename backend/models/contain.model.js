module.exports = (sequelize, Sequelize) => {
  const Contain = sequelize.define("contain", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_buys: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    id_glasses: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    paymentMethod: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
  }, {
    timestamps: false,
    tableName: 'contain',
  });
  return Contain;
};
