module.exports = (sequelize, Sequelize) => {
    const project = sequelize.define("project", {
      projectId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      projectName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      projectDesc: {
        type: Sequelize.STRING,
        allowNull: false,
      },

    });
  
    return project;
  };
  