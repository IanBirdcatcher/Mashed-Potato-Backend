module.exports = (sequelize, Sequelize) => {
  
  const User = sequelize.define("user", {
    userId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fName:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    lName:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });

  return User;
};
