(async () => {
    const chai = await import('chai');
    const chaiHttp = await import('chai-http');
    const server = await import('../index.js');
    const Contact = await import('../models/Contact.js');
  
    const { expect } = chai.default;
    chai.default.use(chaiHttp.default);
  
    describe('Contact Us API Tests', () => {
      before(async () => {
        // Clear the contact collection before tests
        await Contact.default.deleteMany({});
      });
  
      describe('POST /api/contact', () => {
        it('should submit contact inquiry successfully', async () => {
          const contactData = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            message: 'I have a question about your services.',
          };
  
          const res = await chai.default.request(server.default).post('/api/contact').send(contactData);
  
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message', 'Contact inquiry submitted successfully!');
  
          const contact = await Contact.default.findOne({ email: 'johndoe@example.com' });
          expect(contact).to.not.be.null;
          expect(contact.message).to.equal('I have a question about your services.');
        });
  
        it('should fail to submit contact inquiry with missing fields', async () => {
          const incompleteContact = {
            name: '',
            email: 'incomplete@example.com',
            message: '',
          };
  
          const res = await chai.default.request(server.default).post('/api/contact').send(incompleteContact);
  
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'All fields are required');
        });
      });
  
      describe('GET /api/contact', () => {
        it('should fetch all contact inquiries', async () => {
          // Add some contact inquiries
          await Contact.default.create([
            { name: 'Alice', email: 'alice@example.com', message: 'Do you offer catering services?' },
            { name: 'Bob', email: 'bob@example.com', message: 'Is the restaurant open on weekends?' },
          ]);
  
          const res = await chai.default.request(server.default).get('/api/contact');
  
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(2);
          expect(res.body[0]).to.have.property('name', 'Alice');
        });
      });
  
      describe('DELETE /api/contact/:id', () => {
        it('should delete contact inquiry successfully', async () => {
          // Add a contact inquiry to delete
          const contactToDelete = await Contact.default.create({
            name: 'Charlie',
            email: 'charlie@example.com',
            message: 'Do you have vegan options?',
          });
  
          const res = await chai.default.request(server.default).delete(`/api/contact/${contactToDelete._id}`);
  
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Contact inquiry deleted successfully');
  
          const contactExists = await Contact.default.findById(contactToDelete._id);
          expect(contactExists).to.be.null;
        });
      });
    });
  })();
  