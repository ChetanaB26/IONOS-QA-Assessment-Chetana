const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

describe('EVN API – CSV Schema Validation', () => {

  it('Should validate EVN CSV response schema', (done) => {
    chai.request('http://localhost:3000')
      .get('/evnFindByPeriod?period=2026-01&format=csv')
      .set('Authorization', 'Bearer VALID_TOKEN')
      .end((err, res) => {

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('evnCSV');
        expect(res.body.evnCSV).to.be.an('array');
        expect(res.body.evnCSV.length).to.be.greaterThan(1);

        const header = res.body.evnCSV[0];
        const dataRow = res.body.evnCSV[1];

        expect(header).to.be.a('string');
        expect(dataRow).to.be.a('string');

        const headerColumns = header.split(',');
        const dataColumns = dataRow.split(',');

        expect(headerColumns).to.include.members([
          'contractId',
          'VDCUUID',
          'VDCName',
          'ResourceType',
          'ResourceUUID',
          'IntervalMin',
          'IntervalDivisor',
          'From',
          'To',
          'ItemStub',
          'Value',
          'ValueDivisor'
        ]);

        expect(dataColumns.length).to.equal(headerColumns.length);

        done();
      });
  });

});
