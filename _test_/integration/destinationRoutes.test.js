const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../app'); // Adjust the path as needed

describe('Destination Routes', function() {
  it('should get a list of destinations', function(done) {
    request(app)
      .get('/api/destinations')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
