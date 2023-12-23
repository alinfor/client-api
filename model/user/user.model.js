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

module.exports = {
    insertUser
}