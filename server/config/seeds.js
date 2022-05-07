const db = require('./connection');
const { Contact } = require('../models');

db.once('open', async () => {

  await Contact.deleteMany();

  await Contact.create({
    name: 'Friend 01',
    email: 'Friend01@gmail.com',
    phoneNumber: '(801)111-2222',
  });

  await Contact.create({
    name: 'Friend 02',
    email: 'Friend02@gmail.com',
    phoneNumber: '(801)222-3333'
  });

  console.log('Contacts seeded');

  process.exit();
});
