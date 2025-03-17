import { createHash } from "./index.js";
import { faker } from '@faker-js/faker';

export const generateMockUser = async () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName });
  const password = await createHash("coder123");
  const role = faker.helpers.arrayElement(['user', 'admin'], { weights: [0.8, 0.2] });

  return {
    _id: faker.database.mongodbObjectId(),
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
    role: role,
    pets: [],
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    __v: 0,
  };
};

export const generateMockPet = () => {
  const species = ["dog", "cat", "rabbit", "bird", "hamster", "turtle"];
    
  return {
    _id: faker.database.mongodbObjectId(),
    name: faker.animal.petName(),
    specie: faker.helpers.arrayElement(species),
    birthDate: faker.date.between({ from: '2018-01-01', to: new Date() }),
    adopted: faker.datatype.boolean({ probability: 0.3 }),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    __v: 0,
  };
};
