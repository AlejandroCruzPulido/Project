module.exports = (sequelize, Sequelize) => {
    const Direction = sequelize.define("directions", {
      direction: {
        type: Sequelize.STRING
      },
      postal: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      }
    }, {timestamps: false});
    return Direction;
  }