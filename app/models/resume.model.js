module.exports = (sequelize, Sequelize) => {
    const resume = sequelize.define("resume", {
      resumeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      resumeName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ProfSummary: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      template: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      resumeContent: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
    });
  
    return resume;
  };
  