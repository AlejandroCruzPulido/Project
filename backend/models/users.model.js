module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      name: {
        type: Sequelize.STRING
      },
      surname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    }, {timestamps: false});
    return Users;
  }