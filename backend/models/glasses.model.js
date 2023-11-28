module.exports = (sequelize, Sequelize) => {
    const Glasses = sequelize.define("glasses", {
      color: {
        type: Sequelize.STRING
      },
      glass: {
        type: Sequelize.STRING
      },
      mount: {
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