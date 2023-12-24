const jwt = require("jsonwebtoken");
const { setJWT, getJWT } = require("./redis.help");
const {storeUserRefreshJWT}= require("../user/user.model");

const createJWT = async (email, _id) => {
    console.log(email, _id);
  try {
    const accesJWT = await jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    await setJWT(accesJWT, _id);
    return Promise.resolve(accesJWT);
  } catch (error) {
    return Promise.reject(error);
  }
};
const createrefreshJWT = async (email,_id) => {
    try {
        const refreshJWT = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
          expiresIn: "30d",
        });
    
        await storeUserRefreshJWT(_id, refreshJWT);
    
        return Promise.resolve(refreshJWT);
      } catch (error) {
        return Promise.reject(error);
      }
};

module.exports = {
  createJWT,
  createrefreshJWT,
};
