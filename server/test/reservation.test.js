(async () => {
    const chai = await import('chai');
    const chaiHttp = await import('chai-http');
    const server = await import('../index.js');
    const Reservation = await import('../models/Reservation.js');
  
    const { expect } = chai.default;
    chai.default.use(chaiHttp.default);
  
    describe('Reservation API Tests', () => {
      before(async () => {
        // Clear the reservations collection before tests
        await Reservation.default.deleteMany({});
      });
  
      describe('POST /api/reservations', () => {
        it('should create a reservation successfully', async () => {
          const reservationData = {
            name: 'John Doe',
            date: '2025-02-01',
            time: '18:30',
            guests: 4,
            phone: '1234567890',
          };
  
          const res = await chai.default.request(server.default).post('/api/reservations').send(reservationData);
  
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message', 'Reservation created successfully!');
  
          const reservation = await Reservation.default.findOne({ name: 'John Doe' });
          expect(reservation).to.not.be.null;
          expect(reservation.date).to.equal('2025-02-01T00:00:00.000Z');
          expect(reservation.guests).to.equal(4);
        });
  
        it('should fail to create a reservation with missing fields', async () => {
          const incompleteReservation = {
            name: '',
            date: '',
            time: '',
            guests: 4,
            phone: '',
          };
  
          const res = await chai.default.request(server.default).post('/api/reservations').send(incompleteReservation);
  
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'All fields are required');
        });
      });
  
      describe('GET /api/reservations', () => {
        it('should fetch all reservations', async () => {
          // Add some reservations
          await Reservation.default.create([
            { name: 'Alice', date: '2025-02-02', time: '19:00', guests: 2, phone: '9876543210' },
            { name: 'Bob', date: '2025-02-03', time: '20:00', guests: 3, phone: '4567891230' },
          ]);
  
          const res = await chai.default.request(server.default).get('/api/reservations');
  
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(2);
          expect(res.body[0]).to.have.property('name', 'Alice');
        });
      });
  
      describe('DELETE /api/reservations/:id', () => {
        it('should delete a reservation successfully', async () => {
          // Add a reservation to delete
          const reservationToDelete = await Reservation.default.create({
            name: 'Charlie',
            date: '2025-02-04',
            time: '18:00',
            guests: 2,
            phone: '7894561230',
          });
  
          const res = await chai.default.request(server.default).delete(`/api/reservations/${reservationToDelete._id}`);
  
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Reservation deleted successfully');
  
          const reservationExists = await Reservation.default.findById(reservationToDelete._id);
          expect(reservationExists).to.be.null;
        });
      });
    });
  })();
  