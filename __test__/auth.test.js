'use strict'

const {server}=require('../src/server');
const supertest=require('supertest');
const mockReq =supertest(server);
const {db}=require('../src/models/index');
require('dotenv').config();

process.env.SECRET ='anything';


beforeAll(async()=>{
    await db.sync();
})

afterAll(async()=>{
    await db.drop();
})


let users = {
    admin: { username: 'test1', password: 'test', role: 'admin' },
    editor: { username: 'test2', password: 'test', role: 'editor' },
    user: { username: 'test3', password: 'test', role: 'user' },
  };
  
  describe('sign-up sign-in', () => {
    Object.keys(users).forEach(admin => {
      it('sign up', async () => {
        const res = await mockReq.post('/signup').send(users[admin]);
        expect(res.status).toEqual(201);
        expect(res.body.token).toBeDefined();
        expect(res.body.user.id).toBeDefined();
        expect(res.body.user.username).toEqual(users[admin].username);
      });
  
      it('sign in', async () => {
        const res = await mockReq.post('/signin').auth(users[admin].username, users[admin].password);
        expect(res.status).toEqual(200);
        expect(res.body.token).toBeDefined();
        expect(res.body.user.id).toBeDefined();
        expect(res.body.user.username).toEqual(users[admin].username);
      });
    });
  });
  
  let token;
  
  describe('/users && secret', () => {
    it('/secret', async () => {
      const res = await mockReq.post('/signin').auth(users.user.username, users.user.password);
      token = res.body.token;
      const res2 = await mockReq.get('/secret').set(`Authorization`, `Bearer ${token}`);
      expect(res2.status).toEqual(200);
      expect(res2.text).toEqual('Welcome to the secret area');
    });
  
    it('/users', async () => {
      const res1 = await mockReq.post('/signin').auth(users.admin.username, users.admin.password);
      token = res1.body.token;
      const res = await mockReq.get('/users').set({Authorization : `Bearer ${token}`});
      expect(res.status).toEqual(200);
      expect(res.body.length).toEqual(3);
    });
  });
