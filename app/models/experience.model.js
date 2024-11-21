module.exports = (sequelize, Sequelize) => {
    const experience = sequelize.define("experience", {
      experienceId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      jobTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jobDesc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dateRange: {
        type: Sequelize.JSON,
        allowNull: true,
      },
    });
  
    return experience;
  };
  