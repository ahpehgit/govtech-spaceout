const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (AuthorisedUserRepository) => {

    const Execute = async (userName, userPassword) => {
        if (!userName || !userPassword) return null;

        const user = await AuthorisedUserRepository.getUser(userName);
        if (user) {
            const isValid = bcrypt.compareSync(userPassword, user.password);
            return isValid ? jwt.sign({id: userName}, process.env.TOKEN_SECRET, { expiresIn: 3600 }) : null;
        }
        return null;
    }

    return {
        Execute
    };
}