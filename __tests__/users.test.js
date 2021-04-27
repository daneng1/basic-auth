'use strict';

const supergoose =  require('@code-fellows/supergoose');
const { server } = require('../src/server.js');
const mockRequest = supergoose(server);

describe('____Auth Routes____', () => {
  let newUser = { username: 'Dan', password: '99999'};
  let expected = { username: 'Dan', password: '99999'};

  it('should create a new user on sign up', async () => {
       const response = await mockRequest.post('/signup').send(newUser)
        expect(response.status).toBe(200);
        expect(response.body.username).toEqual(expected.username);
  })

  it('should sign in a user', async () => {
    const request = await mockRequest.post('/signup')
      .send(newUser);
      console.log(request.body);
    const response = await mockRequest.post('/signin')
      .send(newUser)
      .auth(request.body.username, newUser.username);
      console.log(`inside sign in test ${response.body.username}`);
      expect(newUser.username).toEqual('Dan');
  });

});
