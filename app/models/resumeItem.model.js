module.exports = (sequelize, Sequelize) => {
    const resumeItem = sequelize.define("resumeItem", {
      resumeItemId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      
    });
  
    return resume;
  };
  