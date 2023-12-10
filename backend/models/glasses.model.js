module.exports = (sequelize, Sequelize) => {
    const Glasses = sequelize.define("glasses", {
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      stock: {
        type: Sequelize.BOOLEAN
      },
      image: {
        type: Sequelize.STRING
       }
      }, {timestamps: false});
    return Glasses;
  }