const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const TOKEN_SECRET='a46bfb4ed7af4c6357f2b69b3ba98faef16e55f58b0d2a72415651bf3bfa3d3998921468c584c5e70d1a342b5ca8d72c576f0a9fed68b4d5c249d07b127324c8';

module.exports = (AuthorisedUserRepository) => {

    const Execute = async (userName, userPassword) => {
        if (!userName || !userPassword) return null;

        const user = await AuthorisedUserRepository.getUser(userName);
        if (user) {
            const isValid = bcrypt.compareSync(userPassword, user.password);
            return isValid ? jwt.sign({id: userName}, TOKEN_SECRET, { expiresIn: 1800 }) : null;
        }
        return null;
    }

    return {
        Execute
    };
}