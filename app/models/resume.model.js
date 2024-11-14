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
      jobTitle:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      templateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
      
    });
  
    return resume;
  };
  