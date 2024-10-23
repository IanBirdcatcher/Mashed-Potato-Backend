module.exports = (sequelize, Sequelize) => {
    const education = sequelize.define("education", {
      educationInfoId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      school: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      GPA: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      degree:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      major:{
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  
    return education;
  };
  