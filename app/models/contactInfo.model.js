module.exports = (sequelize, Sequelize) => {
    const contactInfo = sequelize.define("contactInfo", {
      contactInfoId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address:{
        type: sequelize.STRING,
        allowNull: false,
      }
    });
  
    return contactInfo;
  };
  