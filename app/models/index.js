const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.admin = require("./admin.model.js")(sequelize, Sequelize);
db.award = require("./award.model.js")(sequelize, Sequelize);
db.contactInfo = require("./contactInfo.model.js")(sequelize, Sequelize);
db.education = require("./education.model.js")(sequelize, Sequelize);
db.experience = require("./experience.model.js")(sequelize, Sequelize);
db.interest = require("./interest.model.js")(sequelize, Sequelize);
db.link = require("./link.model.js")(sequelize, Sequelize);
db.person = require("./person.model.js")(sequelize, Sequelize);
db.project = require("./project.model.js")(sequelize, Sequelize);
db.resume = require("./resume.model.js")(sequelize, Sequelize);
db.skill = require("./skill.model.js")(sequelize, Sequelize);

// Relations

// Person and User
db.person.hasMany(db.user, {
  as: "users",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.user.belongsTo(db.person, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// Person and Admin
db.person.hasMany(db.admin, {
  as: "admins",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.admin.belongsTo(db.person, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// Admin and Users
db.admin.hasMany(db.user, {
  as: "users",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.user.belongsTo(db.admin, {
  foreignKey: { allowNull: true }, // optional admin
  onDelete: "CASCADE",
});

// User and Resume
db.user.hasMany(db.resume, {
  as: "resumes",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.resume.belongsTo(db.user, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// Direct associations for User (no ResumeItem)
db.user.hasMany(db.award, {
  as: "awards",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.award.belongsTo(db.user, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

db.user.hasMany(db.contactInfo, {
  as: "contactInfos",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.contactInfo.belongsTo(db.user, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

db.user.hasMany(db.education, {
  as: "educations",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.education.belongsTo(db.user, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

db.user.hasMany(db.experience, {
  as: "experiences",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.experience.belongsTo(db.user, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

db.user.hasMany(db.interest, {
  as: "interests",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.interest.belongsTo(db.user, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

db.user.hasMany(db.link, {
  as: "links",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.link.belongsTo(db.user, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

db.user.hasMany(db.project, {
  as: "projects",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.project.belongsTo(db.user, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

db.user.hasMany(db.skill, {
  as: "skills",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.skill.belongsTo(db.user, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

module.exports = db;
