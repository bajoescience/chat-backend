const User = require('../models/users')

const initialUsers = [{
    firstName: 'a',
    lastName: 'b',
    username: 'abc',
    password: 'abc',
    email: 'abc'
}, {
    firstName: 'x',
    lastName: 'y',
    username: 'xyz',
    password: 'xyz',
    email: 'xyz'
}]

const userInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialUsers,
    userInDb,
}