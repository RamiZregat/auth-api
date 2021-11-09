'use strict'

const {server}=require('../src/server');
const supertest=require('supertest');
const mockReq =supertest(server);
const {db}=require('../src/models/index');



beforeAll(async()=>{
    await db.sync();
})

afterAll(async()=>{
    await db.drop();
})



describe('admin', () => {
    let token;
    let id;
  
    it('sign up', async () => {
      const res = await mockReq.post('/signup').send({ username: 'test', password: 'test', role: 'admin' });
      expect(res.status).toEqual(201);
    });
  
    it('sign in', async () => {
      const res = await mockReq.post('/signin').auth('test', 'test');
      token = res.body.token;
      expect(res.status).toEqual(200);
      expect(res.body.user.role).toEqual('admin');
      expect(res.body.token).toEqual(token);
    });
  
    it('POST', async () => {
      const res = await mockReq.post('/api/v1/food').send({
        name: 'Salad',
        calories: 60,
        type: 'vegetable',
      }).set({ Authorization: `Bearer ${token}` });
      expect(res.status).toEqual(201);
      expect(res.body.id).toBeDefined();
      expect(res.body.name).toEqual('Salad');
      expect(res.body.type).toEqual('vegetable');
      id = res.body.id;
    });
  
    it('GET all', async () => {
      const res1 = await mockReq.post('/api/v1/food').send({
        name: 'Mansaf',
        calories: 1500,
        type: 'protien',
      }).set({ Authorization: `Bearer ${token}` });
      const res = await mockReq.get('/api/v1/food');
      expect(res.status).toEqual(200);
      expect(res.body[1].id).toBeDefined();
      expect(res.body[1].name).toEqual('Mansaf');
      expect(res.body[1].type).toEqual('protien');
      expect(res.body.length).toEqual(2);
    });
  
    it('GET one', async () => {
      const res = await mockReq.get(`/api/v1/food/${id}`);
      expect(res.status).toEqual(200);
      expect(res.body.id).toBeDefined();
      expect(res.body.name).toEqual('Salad');
      expect(res.body.type).toEqual('vegetable');
      expect(res.body.id).toEqual(id);
    });
  
    it('PUT', async () => {
      const res = await mockReq.put(`/api/v1/food/${id}`).send({
        name: 'Fruit Salad',
        calories: 500,
        type: 'fruit',
      }).set({ 'Authorization': `Bearer ${token}` });
      expect(res.status).toEqual(200);
      expect(res.body.id).toBeDefined();
      expect(res.body.name).toEqual('Fruit Salad');
      expect(res.body.type).toEqual('fruit');
      expect(res.body.calories).not.toEqual(60);
      expect(res.body.id).toEqual(id);
    });
  
    it('DELETE', async () => {
      const res = await mockReq.delete(`/api/v1/food/${id}`).set({ 'Authorization': `Bearer ${token}` });
      expect(res.status).toEqual(200);
      const res1 = await mockReq.get(`/api/v1/food/${id}`);
      expect(res1.status).toEqual(200);
      expect(res1.body).toEqual(null);
      const res2 = await mockReq.get('/api/v1/food/');
      expect(res2.body.length).toEqual(1);
    });
  });