module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
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
      },
      role: {
        type: Sequelize.STRING
      }
    }, {timestamps: false});
    return Users;
  }