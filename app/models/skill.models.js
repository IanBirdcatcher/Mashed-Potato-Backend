module.exports = (sequelize, Sequelize) => {
    const skill = sequelize.define("skill", {
      skillId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      skill: {
        type: Sequelize.STRING,
        allowNull: false,
      },

    });
  
    return skill;
  };
  