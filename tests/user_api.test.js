const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app)
const User = require('../models/users')
const helper = require('./helper')

// Initialize the database with initial user's
beforeEach(async () => {
    // Clear database before initializing
    await User.deleteMany({})
    console.log('cleared');


    const userObjects = helper.initialUsers.map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
    console.log('done');
}, 100000)


describe('Simple api requests on users', () => {
    test('should check a list of user', async () => {
       api
       .get('/api/users')
       .expect(200)
    }, 100000)

    /*test('should confirm amount of users', async () => {
        const res = await api.get('/api/users')
        expect(res.body).toHaveLength(helper.initialUsers.length)
    }, 100000)

    test('get messages of user with id "id" ', async () => {
        const users = await helper.userInDb()
        const res = await api.get(`/api/users/getmessages/${users[0].id}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveLength(0)
    })

    test('populate user contact of user with username "username" ', async () => {
        const users = await helper.userInDb()
        const res = await api.get(`/api/users/getcontacts/${users[0].username}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveLength(1)
    })*/
})

afterAll(() => {
    mongoose.connection.close()
})