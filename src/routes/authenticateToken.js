const jwt = require('jsonwebtoken');

const TOKEN_SECRET='a46bfb4ed7af4c6357f2b69b3ba98faef16e55f58b0d2a72415651bf3bfa3d3998921468c584c5e70d1a342b5ca8d72c576f0a9fed68b4d5c249d07b127324c8';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.length > 1 && authHeader.split(' ')[1];

    if (token == null) { 
        return res.sendStatus(401)
    }
    
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
	    console.log(err)

	    if (err) return res.sendStatus(403)

	    req.user = user

	    next()
    })
}

module.exports = authenticateToken