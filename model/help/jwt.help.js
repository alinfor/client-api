const jwt = require('jsonwebtoken');


const createJWT =(payload)=>{
    const accesJWT = jwt.sign(
        {payload},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn:'15m'}
        
        );
    return Promise.resolve(accesJWT)

}
const createrefreshJWT =(payload)=>{
    const refreshJWT= jwt.sign(        {payload},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn:'15m'}
        
        );
    return Promise.resolve(refreshJWT)
}

module.exports = {
createJWT,
createrefreshJWT,
};