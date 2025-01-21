(async () => {
    const chai = await import('chai');
    const chaiHttp = await import('chai-http');
    const server = await import('../index.js');
    const Feedback = await import('../models/Feedback.js');
  
    const { expect } = chai.default;
    chai.default.use(chaiHttp.default);
  
    describe('Feedback API Tests', () => {
      before(async () => {
        // Clear the feedback collection before tests
        await Feedback.default.deleteMany({});
      });
  
      describe('POST /api/feedback', () => {
        it('should submit feedback successfully', async () => {
          const feedbackData = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            message: 'Great service!',
          };
  
          const res = await chai.default.request(server.default).post('/api/feedback').send(feedbackData);
  
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message', 'Feedback submitted successfully!');
  
          const feedback = await Feedback.default.findOne({ email: 'johndoe@example.com' });
          expect(feedback).to.not.be.null;
          expect(feedback.message).to.equal('Great service!');
        });
  
        it('should fail to submit feedback with missing fields', async () => {
          const incompleteFeedback = {
            name: '',
            email: 'missingfields@example.com',
            message: '',
          };
  
          const res = await chai.default.request(server.default).post('/api/feedback').send(incompleteFeedback);
  
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'All fields are required');
        });
      });
  
      describe('GET /api/feedback', () => {
        it('should fetch all feedback entries', async () => {
          // Add some feedback entries
          await Feedback.default.create([
            { name: 'Alice', email: 'alice@example.com', message: 'Loved the food!' },
            { name: 'Bob', email: 'bob@example.com', message: 'Great ambiance!' },
          ]);
  
          const res = await chai.default.request(server.default).get('/api/feedback');
  
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(2);
          expect(res.body[0]).to.have.property('name', 'Alice');
        });
      });
  
      describe('DELETE /api/feedback/:id', () => {
        it('should delete feedback successfully', async () => {
          // Add a feedback entry to delete
          const feedbackToDelete = await Feedback.default.create({
            name: 'Charlie',
            email: 'charlie@example.com',
            message: 'Nice place!',
          });
  
          const res = await chai.default.request(server.default).delete(`/api/feedback/${feedbackToDelete._id}`);
  
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Feedback deleted successfully');
  
          const feedbackExists = await Feedback.default.findById(feedbackToDelete._id);
          expect(feedbackExists).to.be.null;
        });
      });
    });
  })();
  