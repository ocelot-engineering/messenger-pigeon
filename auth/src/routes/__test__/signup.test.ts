import { describe, test, expect } from '@jest/globals';
import request from 'supertest';
import { app } from '../../app';

describe('POST /api/users/signup', () => {
    const EMAIL = 'test@test.com';
    const PASSWORD = 'password';

    test('returns a 201 on successful sign up', async () => {
        return request(app)
            .post('/api/users/signup')
            .send({ email: EMAIL, password: PASSWORD })
            .expect(201);
    });

    test('returns a 400 with invalid email', async () => {
        return request(app)
            .post('/api/users/signup')
            .send({ email: 'bademail', password: PASSWORD })
            .expect(400);
    });

    test('returns a 400 with invalid password', async () => {
        return request(app)
            .post('/api/users/signup')
            .send({ email: EMAIL, password: 'abc' })
            .expect(400);
    });

    test('returns a 400 with missing email or password', async () => {
        await request(app)
            .post('/api/users/signup')
            .send({ email: EMAIL })
            .expect(400);

        return request(app)
            .post('/api/users/signup')
            .send({ password: PASSWORD })
            .expect(400);
    });

    test('rejects an email already in use', async () => {
        await request(app)
            .post('/api/users/signup')
            .send({ email: EMAIL, password: PASSWORD })
            .expect(201);

        return request(app)
            .post('/api/users/signup')
            .send({ email: EMAIL, password: PASSWORD })
            .expect(400);
    });

    test('sets a cookie after successful sign up', async () => {
        const response = await request(app)
            .post('/api/users/signup')
            .send({ email: EMAIL, password: PASSWORD })
            .expect(201);

        expect(response.get('Set-Cookie')).toBeDefined();
    });
});
