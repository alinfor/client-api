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

  
  const storeUserRefreshJWT = (_id, token) => {
    console.log("ali");
    return new Promise((resolve, reject) => {
      try {
        UserSchema.findOneAndUpdate(
          { _id },
          {
            $set: { "refreshJWT.token": token, "refreshJWT.addedAt": Date.now() },
          },
          { new: true }
        )
          .then((data) => resolve(data))
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };
module.exports = {
    insertUser,
    getUserByEmail,
    storeUserRefreshJWT,
}