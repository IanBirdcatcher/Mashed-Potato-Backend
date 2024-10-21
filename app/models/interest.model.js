module.exports = (sequelize, Sequelize) => {
    const interest = sequelize.define("interest", {
      interestId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      interestName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      interestDesc: {
        type: Sequelize.STRING,
        allowNull: false,
      },

    });
  
    return interest;
  };
  