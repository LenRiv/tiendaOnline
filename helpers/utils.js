const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    const payload = {
        user_id: user._id.toString(),
        user_role: user.role,
        exp: dayjs().add(1, 'week').unix()
    }
    return jwt.sign(payload, process.env.SECRET_KEY);
}

module.exports = { createToken };