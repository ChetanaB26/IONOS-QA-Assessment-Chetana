// billingApiTests/evn/evnTests.cjs

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

// Config for mock server
const baseUrl = 'http://localhost:3000';
const validToken = 'VALID_TOKEN';
const invalidToken = 'INVALID_TOKEN';

describe('EVN API Tests', function() {

  // -----------------------------
  // Test Scenario 1: Status Code Validation – evnGet
  // -----------------------------

  it('Should return 200 OK for valid evnGet request', function(done) {
    chai.request(baseUrl)
      .get('/evnGet')
      .set('Authorization', `Bearer ${validToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);

        // Check that the evnCSV array exists and has at least one line
        expect(res.body).to.have.property('evnCSV').that.is.an('array');
        expect(res.body.evnCSV.length).to.be.greaterThan(0);

        // Optional: check the CSV header contains expected columns
        const header = res.body.evnCSV[0];
        expect(header).to.include('contractId');
        expect(header).to.include('ResourceUUID');

        done();
      });
  });

  /*it('Should return 200 OK for valid evnGet request', function(done) {
    chai.request(baseUrl)
      .get('/evnGet')
      .set('Authorization', `Bearer ${validToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('evnId');
        expect(res.body).to.have.property('description');
        done();
      });
  });
*/
  // -----------------------------
  // Test Scenario 2: Authentication with Invalid Credentials – evnFindByPeriod
  // -----------------------------
  it('Should return 401 Unauthorized for evnFindByPeriod with invalid token', function(done) {
    chai.request(baseUrl)
      .get('/evnFindByPeriod')
      .set('Authorization', `Bearer ${invalidToken}`)
      .query({ period: '2026-01' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message', 'Unauthorized');
        done();
      });
  });

  // -----------------------------
  // Missing period parameter
  // -----------------------------
  it('Should return 400 Bad Request when period is missing', function(done) {
    chai.request(baseUrl)
      .get('/evnFindByPeriod')
      .set('Authorization', `Bearer ${validToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message', 'Missing period parameter');
        done();
      });
  });

});
