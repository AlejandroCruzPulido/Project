module.exports = (sequelize, Sequelize) => {
    const Compras = sequelize.define("compras", {
      estadoenvio: {
        type: Sequelize.STRING
      }
    });
  
    return Compras;
  }