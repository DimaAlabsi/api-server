'use strict';

const { server } = require('../src/server'); // destructing assignment 
const supertest = require('supertest');
const mockRequest = supertest(server);
const { db } = require('../src/models/index');


beforeAll(async () => {
    await db.sync();
  });
  
  // after all the tests are done
  afterAll(async () => {
    await db.drop();
  });

describe('Web server', () => {

    test('/home work', async () => {       // Check if server is alive
        const response = await mockRequest.get('/home');
        expect(response.status).toBe(200);
    });

    test('Should respond with 404 status on an invalid method', async () => {      // Check if 404 is handled 
        const response = await mockRequest.get('/foo');
        expect(response.status).toBe(404);
    });

    test('should respond with 500 on an error', async () => {     // Check if general error handling is working
        const response = await mockRequest.get('/error');
        expect(response.status).toBe(500);

    });

    // ---------clothes----

    it('can add a clothes', async () => {

        const response = await mockRequest.post('/clothes').send({
          "dresses": "red",
          "scarves": "white",
          "coats": "white",
          "shoes": "node"
        });
    
        expect(response.status).toBe(201);
    
      });
    
      // test if can read
    
      it('can get all clothes', async () => {
    
        const response = await mockRequest.get('/clothes');
    
        expect(response.status).toBe(200);
    
      });
    
      // test if can read one
      it('can get one clothes', async () => {
        const response= await mockRequest.get('/clothes/1');
        expect(response.status).toBe(201)
    
      });
    
      // test if can update a
      it('can update clothes', async () => {
    const response = await mockRequest.put('/clothes/1');
    expect(response.status).toBe(204);
      });
      // test if can delete a
      it('can delete a record', async () => {
        const response = await mockRequest.delete('/clothes/1');
        expect(response.status).toBe(204);

    
      });
      // ---------- food tests -----------

      it('can add a foodObj', async () => {

        const response = await mockRequest.post('/food').send({
          
            "meat":"yyy",
            "fruits":"knk0",
            "vegetables":"lk"
        
        });
    
        expect(response.status).toBe(201);
    
      });
    
      // test if can read
    
      it('can get all foods', async () => {
    
        const response = await mockRequest.get('/food');
    
        expect(response.status).toBe(200);
    
      });
    
      // test if can read one
      it('can get one foods', async () => {
        const response= await mockRequest.get('/food/1');
        expect(response.status).toBe(201)
    
      });
    
      // test if can update a
      it('can update foods', async () => {
    const response = await mockRequest.put('/food/1');
    expect(response.status).toBe(204);
      });
      // test if can delete a
      it('can delete a food ', async () => {
        const response = await mockRequest.delete('/food/1');
        expect(response.status).toBe(204);

    
      });



});