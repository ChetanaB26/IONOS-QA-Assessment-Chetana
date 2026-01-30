const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('../../config/config.cjs');

chai.use(chaiHttp);


describe('Traffic API Tests', function() {

    it('Should return traffic array in correct format', function(done) {
        chai.request(config.baseUrl)
            .get('/billing/v3/traffic')
            .set('Authorization', `Bearer ${config.validToken}`)
            .end((err, res) => {
                expect(res).to.have.status(200);

                // --- Top-level checks ---
                expect(res.body).to.have.property('type', 'vdc');
                expect(res.body).to.have.property('trafficObj').that.is.an('object');
                expect(res.body).to.have.property('trafficArr').that.is.an('array');
                expect(res.body).to.have.property('traffic').that.is.an('array');

                // --- trafficObj.ip checks ---
                expect(res.body.trafficObj).to.have.property('ip').that.is.an('array');
                const ipEntry = res.body.trafficObj.ip[0];
                expect(ipEntry).to.have.property('vdcUUID').that.is.a('string');
                expect(ipEntry).to.have.property('vdcName').that.is.a('string');
                expect(ipEntry).to.have.property('ip').that.is.a('string');
                expect(ipEntry).to.have.property('dates').that.is.an('array');
                
                // Check first date entry
                const dateEntry = ipEntry.dates[0];
                expect(dateEntry).to.have.property('Date').that.is.a('string');
                expect(dateEntry).to.have.property('In');
                expect(dateEntry).to.have.property('Out');

                // --- trafficArr and traffic minimal checks ---
                expect(res.body.trafficArr[0]).to.include.members(['In/Out', 'VDC UUID', 'VDC Name', 'IP']);
                expect(res.body.traffic[0]).to.be.a('string').that.includes('In/Out');

                done();
            });
    });

});


/*
describe('Traffic API Tests', function() {

    it('Should return traffic array in correct format', function(done) {
        chai.request(config.baseUrl)
            .get('/billing/v3/traffic')
            .set('Authorization', `Bearer ${config.validToken}`)
            .set('Accept', 'application/json')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.traffic).to.be.an('array');
                done();
            });
    });

});
*/