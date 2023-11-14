module.exports = (sequelize, Sequelize) => {
    const Contienen = sequelize.define("contienen", {
      id_compras: {
        type: Sequelize.INTEGER,
        primarykey: true
      },
      id_gafas: {
        type: Sequelize.INTEGER,
        primarykey: true
      },
      metodoPago: {
        type: Sequelize.STRING,
      },
      fecha: {
        type: Sequelize.DATE,
      }
    });

    return Contienen;
  }