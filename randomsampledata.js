const Contact = require("./Models/Contact.js");
const User = require("./Models/User");
const Spam = require("./Models/SpamReport.js");
const { sequelize } = require("./DBConnection.js");

const RandomSampleData = async () => {
  try {
    const users = await User.bulkCreate([
      {
        name: "Shashikant S",
        PhoneNumber: "937015411",
        password: "Shashi@1",
        email: "shashikants@gmail.com",
      },
      {
        name: "John Smith",
        PhoneNumber: "123456789",
        password: "Password123",
        email: "johnsmith@example.com",
      },
      {
        name: "Emily Johnson",
        PhoneNumber: "987654321",
        password: "Emily@123",
        email: "emilyjohnson@example.com",
      },
      {
        name: "Michael Davis",
        PhoneNumber: "246813579",
        password: "Davis2024",
        email: "michaeldavis@example.com",
      },
      {
        name: "Sarah Brown",
        PhoneNumber: "555666777",
        password: "BrownSarah!",
        email: "sarahbrown@example.com",
      },
      {
        name: "David Wilson",
        PhoneNumber: "112233445",
        password: "WilsonD@1",
        email: "davidwilson@example.com",
      },
      {
        name: "Jennifer Martinez",
        PhoneNumber: "987654321",
        password: "MartinezJen2024",
        email: "jennifermartinez@example.com",
      },
      {
        name: "James Taylor",
        PhoneNumber: "987654321",
        password: "Taylor@2024",
        email: "jamestaylor@example.com",
      },
      {
        name: "Jessica Garcia",
        PhoneNumber: "123456789",
        password: "GarciaJessica1",
        email: "jessicagarcia@example.com",
      },
      {
        name: "Robert Rodriguez",
        PhoneNumber: "987654321",
        password: "RodriguezR2024",
        email: "robertrodriguez@example.com",
      },
      {
        name: "Mary Lopez",
        PhoneNumber: "123456789",
        password: "LopezMary123",
        email: "marylopez@example.com",
      },
      {
        name: "Christopher Perez",
        PhoneNumber: "987654321",
        password: "PerezChris@1",
        email: "christopherperez@example.com",
      },
      {
        name: "Patricia Hernandez",
        PhoneNumber: "123456789",
        password: "HernandezP2024",
        email: "patriciahernandez@example.com",
      },
      {
        name: "Daniel Gonzales",
        PhoneNumber: "987654321",
        password: "GonzalesD123",
        email: "danielgonzales@example.com",
      },
      {
        name: "Linda Martinez",
        PhoneNumber: "123456789",
        password: "MartinezL2024",
        email: "lindamartinez@example.com",
      },
      {
        name: "Matthew Robinson",
        PhoneNumber: "987654321",
        password: "RobinsonM@1",
        email: "matthewrobinson@example.com",
      },
      {
        name: "Barbara Clark",
        PhoneNumber: "123456789",
        password: "ClarkBarbara2024",
        email: "barbaraclark@example.com",
      },
      {
        name: "Kevin Lewis",
        PhoneNumber: "987654321",
        password: "LewisKevin123",
        email: "kevinlewis@example.com",
      },
      {
        name: "Margaret Walker",
        PhoneNumber: "123456789",
        password: "WalkerMargaret@1",
        email: "margaretwalker@example.com",
      },
      {
        name: "Jason Hall",
        PhoneNumber: "987654321",
        password: "HallJason2024",
        email: "jasonhall@example.com",
      },
      {
        name: "Nancy Young",
        PhoneNumber: "123456789",
        password: "YoungNancy123",
        email: "nancyyoung@example.com",
      },
    ]);

    const testNumbers = [];
    for (let i = 0; i < 20; i++) {
        testNumbers.push({
        addedBy: users[Math.floor(Math.random() * users.length)].id,
        UserPhoneNumber: `12345678${i}`,
      });
    }
    await Spam.bulkCreate(testNumbers);

    for (const user of users) {
      const contacts = [];
      for (let i = 0; i < 10; i++) {
        contacts.push({
          userId: user.id,
          name: `xyz ${i + 1}`,
          PhoneNumber: `123456789${i}`,
          email: `xyz${i + 1}@yahooo.com`,
        });
      }
      await Contact.bulkCreate(contacts);
    }
    console.log("Random Data Genrated Successfully!");

   
  } catch (error) {
    console.error(error);
  } finally {
    await sequelize.close();
  }
};

module.exports = RandomSampleData;
