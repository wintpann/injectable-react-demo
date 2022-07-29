/* eslint-disable */
const faker = require('faker');

const getAmount = () => {
  const amount = faker.datatype.number({ min: -20, max: 20, precision: 0.25 });
  return amount === 0 ? 2 : amount;
};

const generate = () => {
  const cards = new Array(150).fill(null).map(() => ({
    id: faker.finance.account(),
    cardID: faker.finance.account(),
    cardAccount: faker.finance.account(),
    cardNumber: faker.finance.creditCardNumber().replace(/-/g, ''),
    expireDate: faker.date.future(),
    currency: faker.random.arrayElement(['USD', 'EUR', 'AZN']),
    status: faker.random.arrayElement(['active', 'blocked']),
    balance: faker.datatype.number(),
    cardholderName: 'John Doe',
  }));

  const transactions = new Array(150).fill(null).map(() => {
    const linkedCard = faker.random.arrayElement(cards);
    return {
      id: faker.finance.account(),
      transactionID: faker.finance.account(),
      cardAccount: linkedCard.cardAccount,
      cardID: linkedCard.cardID,
      amount: getAmount(),
      currency: linkedCard.currency,
      transactionDate: new Date(faker.date.past()).toISOString(),
      merchantInfo: {
        companyName: faker.company.companyName(),
        address: [parseFloat(faker.address.latitude()), parseFloat(faker.address.longitude())],
      },
      cardNumber: linkedCard.cardNumber,
      cardExpireDate: linkedCard.expireDate,
      cardholderName: linkedCard.cardholderName,
      cardStatus: linkedCard.status,
    };
  });

  return {
    cards,
    transactions,
  };
};

module.exports = generate();
