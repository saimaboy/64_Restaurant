(async () => {
    const chai = await import('chai');
    const chaiHttp = await import('chai-http');
    const server = await import('../index.js');
    const Promotion = await import('../models/Promotion.js');
  
    const { expect } = chai.default;
    chai.default.use(chaiHttp.default);
  
    describe('Promotion API Tests', () => {
      before(async () => {
        // Clear the promotions collection before tests
        await Promotion.default.deleteMany({});
      });
  
      describe('POST /api/promotions', () => {
        it('should create a promotion successfully', async () => {
          const promotionData = {
            title: 'Buy 1 Get 1 Free Pizza',
            description: 'Order a pizza and get another one free!',
            image: 'https://example.com/pizza.jpg',
            validTill: '2025-12-31',
          };
  
          const res = await chai.default.request(server.default).post('/api/promotions').send(promotionData);
  
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message', 'Promotion created successfully!');
  
          const promotion = await Promotion.default.findOne({ title: 'Buy 1 Get 1 Free Pizza' });
          expect(promotion).to.not.be.null;
          expect(promotion.description).to.equal('Order a pizza and get another one free!');
        });
  
        it('should fail to create a promotion with missing fields', async () => {
          const incompletePromotion = {
            title: '',
            description: '',
            image: '',
            validTill: '',
          };
  
          const res = await chai.default.request(server.default).post('/api/promotions').send(incompletePromotion);
  
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'All fields are required');
        });
      });
  
      describe('GET /api/promotions', () => {
        it('should fetch all promotions', async () => {
          // Add some promotions
          await Promotion.default.create([
            {
              title: '20% Off on Burgers',
              description: 'Enjoy a 20% discount on all our delicious burgers.',
              image: 'https://example.com/burger.jpg',
              validTill: '2025-12-25',
            },
            {
              title: 'Family Combo for $50',
              description: 'Treat your family to a special combo.',
              image: 'https://example.com/combo.jpg',
              validTill: '2025-11-30',
            },
          ]);
  
          const res = await chai.default.request(server.default).get('/api/promotions');
  
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(2);
          expect(res.body[0]).to.have.property('title', '20% Off on Burgers');
        });
      });
  
      describe('DELETE /api/promotions/:id', () => {
        it('should delete a promotion successfully', async () => {
          // Add a promotion to delete
          const promotionToDelete = await Promotion.default.create({
            title: 'Limited Time Offer',
            description: 'Hurry up! Limited offer on our best meals.',
            image: 'https://example.com/limited.jpg',
            validTill: '2025-12-15',
          });
  
          const res = await chai.default.request(server.default).delete(`/api/promotions/${promotionToDelete._id}`);
  
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Promotion deleted successfully');
  
          const promotionExists = await Promotion.default.findById(promotionToDelete._id);
          expect(promotionExists).to.be.null;
        });
      });
    });
  })();
  