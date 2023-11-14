module.exports = (sequelize, Sequelize) => {
    const Direccion = sequelize.define("direcciones", {
      direccion: {
        type: Sequelize.STRING
      }
    });
  
    return Direccion;
  }