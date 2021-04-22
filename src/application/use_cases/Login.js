const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (AuthorisedUserRepository) => {

    const Execute = async (userName, userPassword) => {
        if (!userName || !userPassword) return null;

        const user = await AuthorisedUserRepository.getUser(userName);
        if (user) {
            const oneHour = 3600;
            const isValid = bcrypt.compareSync(userPassword, user.password);
            return isValid ? jwt.sign({id: userName}, process.env.TOKEN_SECRET, { expiresIn: oneHour }) : null;
        }
        return null;
    }

    return {
        Execute
    };
}