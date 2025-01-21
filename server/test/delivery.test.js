(async () => {
  const chai = await import('chai');
  const chaiHttp = await import('chai-http');
  const server = await import('../index.js');
  const Delivery = await import('../models/Delivery.js');

  const { expect } = chai.default;
  chai.default.use(chaiHttp.default);

  describe('Delivery API Tests', () => {
    before(async () => {
      await Delivery.default.deleteMany({});
    });

    describe('POST /api/delivery', () => {
      it('should save delivery and payment details successfully', async () => {
        const deliveryPayload = {
          deliveryDetails: {
            name: 'John Doe',
            address: '123 Main St',
            phone: '1234567890',
          },
          cartItems: [
            { id: '1', name: 'Pizza', price: 20, quantity: 2 },
            { id: '2', name: 'Burger', price: 15, quantity: 1 },
          ],
          totalAmount: 55,
        };

        const res = await chai.default
          .request(server.default)
          .post('/api/delivery')
          .send(deliveryPayload);

        expect(res).to.have.status(201);
        expect(res.body).to.have.property(
          'message',
          'Delivery and payment details saved successfully!'
        );

        const delivery = await Delivery.default.findOne({ 'deliveryDetails.name': 'John Doe' });
        expect(delivery).to.not.be.null;
        expect(delivery.cartItems).to.have.lengthOf(2);
        expect(delivery.totalAmount).to.equal(55);
      });

      it('should fail when required fields are missing', async () => {
        const incompletePayload = {
          deliveryDetails: {
            name: 'John Doe',
            address: '',
            phone: '',
          },
          cartItems: [],
          totalAmount: 0,
        };

        const res = await chai.default
          .request(server.default)
          .post('/api/delivery')
          .send(incompletePayload);

        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error', 'Failed to save delivery and payment details.');
      });

      it('should handle invalid cart items', async () => {
        const invalidCartPayload = {
          deliveryDetails: {
            name: 'Jane Doe',
            address: '456 Elm St',
            phone: '9876543210',
          },
          cartItems: [
            { id: '3', name: 'Invalid Item', price: -10, quantity: 1 },
          ],
          totalAmount: -10,
        };

        const res = await chai.default
          .request(server.default)
          .post('/api/delivery')
          .send(invalidCartPayload);

        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error', 'Failed to save delivery and payment details.');
      });

      it('should handle database errors gracefully', async () => {
        // Simulating a database error by mocking the Delivery model
        const DeliveryMock = await import('sinon');
        const saveStub = DeliveryMock.stub(Delivery.default.prototype, 'save');
        saveStub.throws(new Error('Database error'));

        const validPayload = {
          deliveryDetails: {
            name: 'Alice',
            address: '789 Pine St',
            phone: '5555555555',
          },
          cartItems: [
            { id: '1', name: 'Pizza', price: 20, quantity: 1 },
          ],
          totalAmount: 20,
        };

        const res = await chai.default
          .request(server.default)
          .post('/api/delivery')
          .send(validPayload);

        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error', 'Failed to save delivery and payment details.');

        saveStub.restore();
      });
    });
  });
})();
