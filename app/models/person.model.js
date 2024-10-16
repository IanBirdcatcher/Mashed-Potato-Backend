module.exports = (sequelize, Sequelize) => {
    const person = sequelize.define("person", {
      personId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

    });
  
    return person;
  };
  