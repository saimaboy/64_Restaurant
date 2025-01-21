(async () => {
    const chai = await import('chai');
    const chaiHttp = await import('chai-http');
    const server = await import('../index.js');
    const User = await import('../models/User.js');
  
    const { expect } = chai.default;
    chai.default.use(chaiHttp.default);
  
    describe('Login API Tests', () => {
      before(async () => {
        // Clear users collection and create a test user
        await User.default.deleteMany({});
        await User.default.create({
          name: 'Test User',
          email: 'testuser@example.com',
          password: 'password123', // Ensure password is hashed in your actual implementation
        });
      });
  
      describe('POST /api/users/login', () => {
        it('should login successfully with valid credentials', async () => {
          const loginPayload = {
            email: 'testuser@example.com',
            password: 'password123',
          };
  
          const res = await chai.default
            .request(server.default)
            .post('/api/users/login')
            .send(loginPayload);
  
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('message', 'Login successful');
        });
  
        it('should fail with invalid credentials', async () => {
          const loginPayload = {
            email: 'testuser@example.com',
            password: 'wrongpassword',
          };
  
          const res = await chai.default
            .request(server.default)
            .post('/api/users/login')
            .send(loginPayload);
  
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error', 'Invalid email or password');
        });
  
        it('should fail with missing fields', async () => {
          const loginPayload = {
            email: '',
            password: '',
          };
  
          const res = await chai.default
            .request(server.default)
            .post('/api/users/login')
            .send(loginPayload);
  
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Email and password are required');
        });
  
        it('should fail with a non-existent user', async () => {
          const loginPayload = {
            email: 'nonexistent@example.com',
            password: 'password123',
          };
  
          const res = await chai.default
            .request(server.default)
            .post('/api/users/login')
            .send(loginPayload);
  
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error', 'Invalid email or password');
        });
      });
    });
  })();
  