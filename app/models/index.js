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


// bridge tables

db.awardResume = require("./awardResume.model.js")(sequelize, Sequelize);
db.contactInfoResume = require("./contactInfoResume.model.js")(sequelize, Sequelize);
db.educationResume = require("./educationResume.model.js")(sequelize, Sequelize);
db.experienceResume = require("./experienceResume.model.js")(sequelize, Sequelize);
db.interestResume = require("./interestResume.model.js")(sequelize, Sequelize);
db.linkResume = require("./linkResume.model.js")(sequelize, Sequelize);
db.projectResume = require("./projectResume.model.js")(sequelize, Sequelize);
db.skillResume = require("./skillResume.model.js")(sequelize, Sequelize);
db.sessionResume = require("./sessionResume.model.js")(sequelize, Sequelize);

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
  foreignKey: "userId", // Use userId
  allowNull: false,
  onDelete: "CASCADE",
});
db.award.belongsTo(db.user, {
  foreignKey: "userId", // Use userId
  allowNull: false,
  onDelete: "CASCADE",
});

db.user.hasMany(db.contactInfo, {
  as: "contactInfos",
  foreignKey: "userId", // Use userId
  allowNull: false,
  onDelete: "CASCADE",
});
db.contactInfo.belongsTo(db.user, {
  foreignKey: "userId", // Use userId
  allowNull: false,
  onDelete: "CASCADE",
});

db.user.hasMany(db.education, {
  as: "educations",
  foreignKey: "userId", // Use userId
  allowNull: false,
  onDelete: "CASCADE",
});
db.education.belongsTo(db.user, {
  foreignKey: "userId", // Use userId
  allowNull: false,
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
  foreignKey: "userId", // Use userId
  allowNull: false,
  onDelete: "CASCADE",
});
db.interest.belongsTo(db.user, {
  foreignKey: "userId", // Use userId
  allowNull: false,
  onDelete: "CASCADE",
});

db.user.hasMany(db.link, {
  as: "links",
  foreignKey: "userId", // Use userId
  allowNull: false,
  onDelete: "CASCADE",
});
db.link.belongsTo(db.user, {
  foreignKey: "userId", // Use userId
  allowNull: false,
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
  foreignKey: "userId", // Use userId
  allowNull: false,
  onDelete: "CASCADE",
});
db.skill.belongsTo(db.user, {
  foreignKey: "userId", // Use userId
  allowNull: false,
  onDelete: "CASCADE",
});


// Resume and Resume Bridge Tables ----------------------
db.resume.hasMany(db.awardResume, {
  as: "awardResumes",
  foreignKey: "resumeId", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.awardResume.belongsTo(db.resume, {
  foreignKey: "resumeId", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.contactInfoResume, {
  as: "contactInfoResumes",
  foreignKey: "resumeId", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.contactInfoResume.belongsTo(db.resume, {
  foreignKey: "resumeId", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.educationResume, {
  as: "educationResumes",
  foreignKey: "resumeId", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.educationResume.belongsTo(db.resume, {
  foreignKey: "resumeId", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.experienceResume, {
  as: "experienceResumes",
  foreignKey: "resumeId", sourceKey: "resumeId", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.experienceResume.belongsTo(db.resume, {
  foreignKey: "resumeId", targetKey: "resumeId", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.interestResume, {
  as: "interestResumes",
  foreignKey: "resumeId", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.interestResume.belongsTo(db.resume, {
  foreignKey: "resumeId", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.linkResume, {
  as: "linkResumes",
  foreignKey: "resumeId", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.linkResume.belongsTo(db.resume, {
  foreignKey: "resumeId", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.projectResume, {
  as: "projectResumes",
  foreignKey: "resumeId", sourceKey: "resumeId", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.projectResume.belongsTo(db.resume, {
  foreignKey: "resumeId", sourceKey: "resumeId", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.skillResume, {
  as: "skillResumes",
  foreignKey: "resumeId", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.skillResume.belongsTo(db.resume, {
  foreignKey: "resumeId", 
  allowNull: true,
  onDelete: "CASCADE",
});


// Resume Bridge Tables and Resume Items ----------------------
db.award.hasMany(db.awardResume, {
  as: "awardResumes",
  foreignKey: "awardId", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.awardResume.belongsTo(db.award, {
  foreignKey: "awardId", 
  allowNull: false,
  onDelete: "CASCADE",
});

db.contactInfo.hasMany(db.contactInfoResume, {
  as: "contactInfoResumes",
  foreignKey: "contactInfoId", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.contactInfoResume.belongsTo(db.contactInfo, {
  foreignKey: "contactInfoId", 
  allowNull: false,
  onDelete: "CASCADE",
});

db.education.hasMany(db.educationResume, {
  as: "educationResumes",
  foreignKey: "educationId", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.educationResume.belongsTo(db.education, {
  foreignKey: "educationId", 
  allowNull: false,
  onDelete: "CASCADE",
});

db.experience.hasMany(db.experienceResume, {
  as: "experienceResumes",
  foreignKey: "experienceId", sourceKey: "experienceId", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.experienceResume.belongsTo(db.experience, {
  foreignKey: "experienceId", targetKey: "experienceId", 
  allowNull: false,
  onDelete: "CASCADE",
});

db.interest.hasMany(db.interestResume, {
  as: "interestResumes",
  foreignKey: "interestId", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.interestResume.belongsTo(db.interest, {
  foreignKey: "interestId", 
  allowNull: false,
  onDelete: "CASCADE",
});

db.link.hasMany(db.linkResume, {
  as: "linkResumes",
  foreignKey: "linkId", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.linkResume.belongsTo(db.link, {
  foreignKey: "linkId", 
  allowNull: false,
  onDelete: "CASCADE",
});

db.project.hasMany(db.projectResume, {
  as: "projectResumes",
  foreignKey: "projectId", sourceKey: "projectId", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.projectResume.belongsTo(db.project, {
  foreignKey: "projectId", sourceKey: "projectId", 
  allowNull: false,
  onDelete: "CASCADE",
});

db.skill.hasMany(db.skillResume, {
  as: "skillResumes",
  foreignKey: "skillId", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.skillResume.belongsTo(db.skill, {
  foreignKey: "skillId", 
  allowNull: false,
  onDelete: "CASCADE",
});

module.exports = db;