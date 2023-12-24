const { UserSchema } = require("./user.schema");

const insertUser = (userObj) => {
  return new Promise((resolve, reject) => {
    const userInstance = new UserSchema(userObj);
    console.log(userInstance);
    userInstance.save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
const findOneByEmail = (email) => {
  return UserSchema.findOne({ email }).exec();
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    if (!email) {
      reject("Email is required");
      return;
    }

    findOneByEmail(email)
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Utilisation de la fonction
getUserByEmail()
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.error(error);
  });


module.exports = {
    insertUser,
    getUserByEmail,
}