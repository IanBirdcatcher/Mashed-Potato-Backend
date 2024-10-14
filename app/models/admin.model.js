module.exports = (sequelize, Sequelize) => {
    const admin = sequelize.define("admin", {
      adminId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

    });
  
    return admin;
  };
  