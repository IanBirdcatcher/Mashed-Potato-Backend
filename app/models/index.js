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
db.interst = require("./interest.model.js")(sequelize, Sequelize);
db.link = require("./link.model.js")(sequelize, Sequelize);
db.person = require("./person.model.js")(sequelize, Sequelize);
db.project = require("./project.model.js")(sequelize, Sequelize);
db.resume = require("./resume.model.js")(sequelize, Sequelize);
db.resumeItem = require("./resumeItem.model.js")(sequelize, Sequelize);
db.skill = require("./skill.model.js")(sequelize, Sequelize);


// Relations

// Person and User (one person can be associated with many users)
db.person.hasMany(db.user, {
  as: "users",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.user.belongsTo(db.person, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// Person and Admin (one person can be associated with many admins)
db.person.hasMany(db.admin, {
  as: "admins",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.admin.belongsTo(db.person, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// Admin and Users (an admin manages many users)
db.admin.hasMany(db.user, {
  as: "users",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.user.belongsTo(db.admin, {
  foreignKey: { allowNull: true }, // a user may or may not have an admin -- this is optional 
  onDelete: "CASCADE",
});

// User and Resume (one user can have many resumes)
db.user.hasMany(db.resume, {
  as: "resumes",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.resume.belongsTo(db.user, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
// User and Resume (one user can have many resumes)
db.user.hasMany(db.resume, {
  as: "resumes",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.resume.belongsTo(db.user, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// User and ResumeItem (one user can have many resumeItems)
db.user.hasMany(db.resumeItem, {
  as: "resumeItems",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.resumeItem.belongsTo(db.user, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});




// Resume and ResumeItem 
db.resume.hasMany(db.resumeItem, {
  as: "resumeItems",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.resumeItem.belongsTo(db.resume, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// ResumeItem and Award 
db.resumeItem.hasMany(db.award, {
  as: "awards",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.award.belongsTo(db.resumeItem, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// ResumeItem and ContactInfo (a resume item can have contact information)
db.resumeItem.hasMany(db.contactInfo, {
  as: "contactInfos",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.contactInfo.belongsTo(db.resumeItem, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// ResumeItem and Education (a resume item can include education details)
db.resumeItem.hasMany(db.education, {
  as: "educations",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.education.belongsTo(db.resumeItem, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// ResumeItem and Experience (a resume item can include work experiences)
db.resumeItem.hasMany(db.experience, {
  as: "experiences",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.experience.belongsTo(db.resumeItem, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// ResumeItem and Interest (a resume item can include personal interests)
db.resumeItem.hasMany(db.interest, {
  as: "interests",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.interest.belongsTo(db.resumeItem, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// ResumeItem and Link (a resume item can include external links)
db.resumeItem.hasMany(db.link, {
  as: "links",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.link.belongsTo(db.resumeItem, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// ResumeItem and Project (a resume item can include projects)
db.resumeItem.hasMany(db.project, {
  as: "projects",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.project.belongsTo(db.resumeItem, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

// ResumeItem and Skill (a resume item can include skills)
db.resumeItem.hasMany(db.skill, {
  as: "skills",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.skill.belongsTo(db.resumeItem, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

module.exports = db;