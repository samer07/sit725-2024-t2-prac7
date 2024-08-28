// import chai from 'chai';
// import request from 'supertest';
// import app from '../../app'; // Adjust the path if necessary

// const chai = require('chai');
// const expect = chai.expect;
// const request = require('supertest');
// const app = require('../app'); // Adjust the path as needed

// describe('GET /api/home', function() {
//   it('should return a 200 status', function(done) {
//     request(app)
//       .get('/api/home')
//       .expect(200, done);
//   });
// });


// import { expect } from 'chai';
// import request from 'supertest';
// import { fileURLToPath } from 'url';
// import path from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const app = await import(path.join(__dirname, '../../app.js')).then(module => module.default);

// describe('Basic Test', () => {
//   it('should return 200 for the /api/home route', (done) => {
//     request(app)
//       .get('/api/home')
//       .expect(200, done);
//   });
// });

const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app'); // No need for .js extension


describe('Basic Test', () => {
  it('should return 200 for the /api/home route', (done) => {
    request(app)
      .get('/api/home')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
  });
});


