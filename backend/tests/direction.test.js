const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../index.js');
const { sequelize } = require('../models/index.js');

describe('Directions routes', () => {
    describe('POST /api/directions', () => {
        test('should return 400 if directions is created whitout direction', async () => {
            const res = await request(app)
                .post('/api/directions')
                .field('direction', '')
                .field('postal', '35200')
                .field('province', 'Las Palmas')
                .expect(httpStatus.BAD_REQUEST);
        });
    });
});

//command to init the test: npx jest tests/user.test.js --forceExit