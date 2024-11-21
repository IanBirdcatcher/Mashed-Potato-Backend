const db = require("../models");
const Session = db.session;

authenticate = (req, res, next) => {
  let token = null;
  console.log("authenticate");
  let authHeader = req.get("authorization");
  if (authHeader != null) {
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);

      Session.findAll({ where: { token: token } })
        .then((data) => {
          let session = data[0];
          console.log(session.expirationDate);
          if (session != null) {
            if (session.expirationDate >= Date.now()) {
              next();
              return;
            } else
              return res.status(401).send({
                message: "Unauthorized! Expired Token, Logout and Login again",
              });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  } else {
    return res.status(401).send({
      message: "Unauthorized! No Auth Header",
    });
  }
};

checkAdmin = (req, res, next) => {
  let token = null;
  console.log("checkAdmin");
  let authHeader = req.get("authorization");
  if (authHeader != null) {
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);

      Session.findOne({ where: { token: token } })
        .then((session) => {
          if (session != null) {
            console.log(session.expirationDate);
            if (session.expirationDate >= Date.now()) {
              User.findOne({ where: { id: session.userId } })
                .then((user) => {
                  if (user && user.isAdmin) {
                    next();
                    return;
                  } else {
                    return res.status(403).send({
                      message: "Forbidden! Admin access required.",
                    });
                  }
                })
                .catch((err) => {
                  console.log(err.message);
                  return res.status(500).send({
                    message: "Error retrieving user information.",
                  });
                });
            } else {
              return res.status(401).send({
                message: "Unauthorized! Expired Token, Logout and Login again",
              });
            }
          } else {
            return res.status(401).send({
              message: "Unauthorized! Invalid Token",
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
          return res.status(500).send({
            message: "Error verifying session.",
          });
        });
    }
  } else {
    return res.status(401).send({
      message: "Unauthorized! No Auth Header",
    });
  }
};

const auth = {
  authenticate: authenticate,
  checkAdmin: checkAdmin,
};

module.exports = auth;

