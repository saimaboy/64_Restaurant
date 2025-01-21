(async () => {
    const chai = await import('chai');
    const chaiHttp = await import('chai-http');
    const server = await import('../index.js');
    const User = await import('../models/User.js');
  
    const { expect } = chai.default;
    chai.default.use(chaiHttp.default);
  
    describe('Signup API Tests', () => {
      before(async () => {
        // Clear users collection before tests
        await User.default.deleteMany({});
      });
  
      describe('POST /api/users/register', () => {
        it('should register a user successfully with valid input', async () => {
          const signupPayload = {
            name: 'New User',
            email: 'newuser@example.com',
            password: 'password123',
          };
  
          const res = await chai.default
            .request(server.default)
            .post('/api/users/register')
            .send(signupPayload);
  
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message', 'User registered successfully');
        });
  
        it('should fail to register with a duplicate email', async () => {
          const duplicateEmailPayload = {
            name: 'Another User',
            email: 'newuser@example.com', // Same email as above
            password: 'anotherpassword123',
          };
  
          const res = await chai.default
            .request(server.default)
            .post('/api/users/register')
            .send(duplicateEmailPayload);
  
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Email is already registered');
        });
  
        it('should fail to register with missing fields', async () => {
          const incompletePayload = {
            name: 'Incomplete User',
            email: '', // Missing email
            password: '',
          };
  
          const res = await chai.default
            .request(server.default)
            .post('/api/users/register')
            .send(incompletePayload);
  
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'All fields are required');
        });
  
        it('should fail to register with invalid email format', async () => {
          const invalidEmailPayload = {
            name: 'Invalid Email User',
            email: 'not-an-email', // Invalid email format
            password: 'password123',
          };
  
          const res = await chai.default
            .request(server.default)
            .post('/api/users/register')
            .send(invalidEmailPayload);
  
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'Invalid email format');
        });
      });
    });
  })();
  