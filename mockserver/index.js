/* eslint-disable */
const jsonServer = require('json-server');
const db = require('./db.js');

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

const auth = {
  user: {
    name: 'John Doe',
    id: '0000000000000000',
  },
  signedIn: true,
};

const simulateDelay = (req, res, next) => {
  setTimeout(() => next(), 1500);
};

server.use(simulateDelay);

server.use(middlewares);

server.post('/user/login', (req, res) => {
  auth.signedIn = true;
  res.json({ name: auth.user.name, id: auth.user.id });
});

server.get('/user', (req, res) => {
  auth.signedIn ? res.json(auth.user) : res.status(403).json({ message: 'Sign in first!' });
});

server.post('/user/logout', (req, res) => {
  auth.signedIn = false;
  res.json({ message: 'You are logged out' });
});

server.get('/lookup/cards', (req, res) => {
  const cardIDs = Array.from(new Set(db.cards.map(({ cardID }) => cardID)));
  const cardAccounts = Array.from(new Set(db.cards.map(({ cardAccount }) => cardAccount)));
  const currencies = Array.from(new Set(db.cards.map(({ currency }) => currency)));
  const statuses = ['blocked', 'active'];
  res.json({ cardIDs, cardAccounts, currencies, statuses });
});

server.get('/lookup/transactions', (req, res) => {
  const cardIDs = Array.from(new Set(db.transactions.map(({ cardID }) => cardID)));
  const cardAccounts = Array.from(new Set(db.transactions.map(({ cardAccount }) => cardAccount)));
  const currencies = Array.from(new Set(db.cards.map(({ currency }) => currency)));
  res.json({ cardIDs, cardAccounts, currencies });
});

router.use((req, res, next) => {
  if (auth.signedIn) return next();
  res.status(403).json({ message: 'Sign in first!' });
});

server.use(router);
server.listen(4000, () => console.log('JSON Server is running'));
