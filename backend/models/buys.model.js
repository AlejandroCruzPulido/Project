module.exports = (sequelize, Sequelize) => {
    const Buys = sequelize.define("buys", {
      orderState: {
        type: Sequelize.STRING
      }
    }, {timestamps: false});
    return Buys;
  }