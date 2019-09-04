const chai = require('chai');
const { expect } = chai;

const { app } = require('../../src/server')

describe('testing server.js', () => {
    it('GET/', async () => {
        const response = await chai
            .request(app)
            .get('/')
        expect(response.status).to.equals(200);
        expect(response.text).to.equal('hello, CRUEL WORLD');
    })
})