module.exports = (sequelize, Sequelize) => {
    const award = sequelize.define("award", {
      awardId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      awardName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      awardDisc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return award;
  };
  