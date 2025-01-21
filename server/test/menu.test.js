(async () => {
    const chai = await import('chai');
    const chaiHttp = await import('chai-http');
    const server = await import('../index.js');
    const Menu = await import('../models/Menu.js');
  
    const { expect } = chai.default;
    chai.default.use(chaiHttp.default);
  
    describe('Menu API Tests', () => {
      before(async () => {
        // Clear the menu collection before tests
        await Menu.default.deleteMany({});
      });
  
      describe('GET /api/menu', () => {
        it('should fetch all menu items', async () => {
          // Seed the database with some menu items
          await Menu.default.create([
            { name: 'Pizza', price: 20, category: 'Main Course', description: 'Delicious pizza' },
            { name: 'Burger', price: 15, category: 'Main Course', description: 'Tasty burger' },
          ]);
  
          const res = await chai.default.request(server.default).get('/api/menu');
  
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(2);
          expect(res.body[0]).to.have.property('name', 'Pizza');
        });
      });
  
      describe('POST /api/menu', () => {
        it('should add a new menu item successfully', async () => {
          const newItem = {
            name: 'Pasta',
            price: 18,
            category: 'Main Course',
            description: 'Creamy pasta',
          };
  
          const res = await chai.default.request(server.default).post('/api/menu').send(newItem);
  
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message', 'Menu item added successfully');
        });
  
        it('should fail to add a menu item with missing fields', async () => {
          const incompleteItem = {
            name: 'Incomplete Item',
            price: 10, // Missing category and description
          };
  
          const res = await chai.default.request(server.default).post('/api/menu').send(incompleteItem);
  
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('error', 'All fields are required');
        });
      });
  
      describe('DELETE /api/menu/:id', () => {
        it('should delete a menu item successfully', async () => {
          // Add a new item to delete
          const itemToDelete = await Menu.default.create({
            name: 'Item to Delete',
            price: 25,
            category: 'Dessert',
            description: 'Item for deletion test',
          });
  
          const res = await chai.default.request(server.default).delete(`/api/menu/${itemToDelete._id}`);
  
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Menu item deleted successfully');
  
          const itemExists = await Menu.default.findById(itemToDelete._id);
          expect(itemExists).to.be.null;
        });
      });
    });
  })();
  