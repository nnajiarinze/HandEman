const request = require('supertest');
const app = require('../src/app');
const Handyman = require('../src/models/handyman');
const {userOneId, userOne, setupDatabase,userTwo,
    taskOne, 
     userTwoId,
    taskTwo,
    taskThree} = require('./fixtures/db');



beforeEach(setupDatabase);

test('Should create task for user', async() => {
    const response = await request(app)
                    .post('/task')
                    .set('Authorization',  `Bearer ${userOne.tokens[0].token}`)
                    .send({
                        description: 'from my test'
                    })
                    .expect(201);
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false);
});
