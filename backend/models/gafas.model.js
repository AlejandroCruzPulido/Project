module.exports = (sequelize, Sequelize) => {
    const Gafas = sequelize.define("gafas", {
      color: {
        type: Sequelize.STRING
      },
      cristal: {
        type: Sequelize.STRING
      },
      montura: {
        type: Sequelize.STRING
      },
      precio: {
        type: Sequelize.INTEGER
      },
      categoria: {
        type: Sequelize.BOOLEAN
      },
      stock: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Gafas;
  }