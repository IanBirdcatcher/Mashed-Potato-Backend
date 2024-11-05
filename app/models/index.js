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
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models (user and resume know about all of the resume items)-----------
db.user = require("./user.model.js")(sequelize, Sequelize);
db.resume = require("./resume.model.js")(sequelize, Sequelize);

// resume items 
db.award = require("./award.model.js")(sequelize, Sequelize);
db.contactInfo = require("./contactInfo.model.js")(sequelize, Sequelize);
db.education = require("./education.model.js")(sequelize, Sequelize);
db.experience = require("./experience.model.js")(sequelize, Sequelize);
db.interest = require("./interest.model.js")(sequelize, Sequelize);
db.link = require("./link.model.js")(sequelize, Sequelize);
db.project = require("./project.model.js")(sequelize, Sequelize);
db.skill = require("./skill.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);

// Relations

// User and Resume
db.user.hasMany(db.resume, {
  as: "resumes",
  foreignKey: "userId", sourceKey: "userId", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.resume.belongsTo(db.user, {
  foreignKey: "userId", sourceKey: "userId", 
  allowNull: true,
  onDelete: "CASCADE",
});

//user(admin) know about users
db.user.hasMany(db.user, {
  as: "users",
  foreignKey:  "adminId", sourceKey: "userId", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.user.belongsTo(db.user, {
  foreignKey:  "adminId", targetKey: "userId", 
  allowNull: true,
  onDelete: "CASCADE",
});

// User and Resume Items --------------------
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
  foreignKey: "userId", targetKey: "userId", 
  onDelete: "CASCADE",
});
db.education.belongsTo(db.user, {
  foreignKey: "userId", targetKey: "userId", 
  onDelete: "CASCADE",
});

db.user.hasMany(db.experience, {
  as: "experiences",
  foreignKey: "userId", sourceKey: "userId", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.experience.belongsTo(db.user, {
  foreignKey: "userId", targetKey: "userId", 
  allowNull: false,
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
  foreignKey: "userId", sourceKey: "userId", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.project.belongsTo(db.user, {
  foreignKey: "userId", targetKey: "userId", 
  allowNull: false,
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

// Resume and resume items ----------------------
db.resume.hasMany(db.award, {
  as: "awards",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.award.belongsTo(db.resume, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

db.resume.hasMany(db.contactInfo, {
  as: "contactInfos",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.contactInfo.belongsTo(db.resume, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

db.resume.hasMany(db.education, {
  as: "educations",
  foreignKey: "resumeId", sourceKey: "resumeId", 
  onDelete: "CASCADE",
});
db.education.belongsTo(db.resume, {
  foreignKey: "resumeId", sourceKey: "resumeId", 
  onDelete: "CASCADE",
});

db.resume.hasMany(db.experience, {
  as: "experiences",
  foreignKey: "resumeId", sourceKey: "resumeId", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.experience.belongsTo(db.resume, {
  foreignKey: "resumeId", targetKey: "resumeId", 
  allowNull: false,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.interest, {
  as: "interests",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.interest.belongsTo(db.resume, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

db.resume.hasMany(db.link, {
  as: "links",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.link.belongsTo(db.resume, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

db.resume.hasMany(db.project, {
  as: "projects",
  foreignKey: "resumeId", sourceKey: "resumeId", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.project.belongsTo(db.resume, {
  foreignKey: "resumeId", sourceKey: "resumeId", 
  allowNull: false,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.skill, {
  as: "skills",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.skill.belongsTo(db.resume, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

module.exports = db;
