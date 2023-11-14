module.exports = (sequelize, Sequelize) => {
    const Usuarios = sequelize.define("usaurios", {
      nombre: {
        type: Sequelize.STRING
      },
      apellidos: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return Usuarios;
  }