# Fraudnetic Node integration

## Installation

```bash
npm install fraudnetic-node
```

## Usage

### Express integration
```javascript
import express from 'express';
import { Fraudnetic } from 'fraudnetic-node';
const app = express();
// pay attention to the protocol, not specified in the server address
const fraudnetic = new Fraudnetic({
  servers: ['localhost:3000'],
  key: 'key',
  secret: 'secret',
});
app.use(fraudnetic.express);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send(req.fraudnetic.test);
});
```

### Fastify integration
```javascript
import fastify from 'fastify';
const app = fastify();
const fraudnetic = new Fraudnetic({
  servers: ['http://localhost:3000'],
  key: 'key',
  secret: 'secret',
});
// if fastify integration use
app.addHook('onRequest', fraudnetic.fastify);

app.get('/', (request: FastifyRequest, reply: FastifyReply) => {
  reply.send(request.fraudnetic.test);
});
```

## API methods

### events
```javascript
// User '123' performs a registration
req.fraudnetic.user('123').registration();

// User '123' performs a login action
req.fraudnetic.user('123').login();

// User '123' verifies their phone number
req.fraudnetic.user('123').phoneNumberVerification();

// User '123' verifies their email address
req.fraudnetic.user('123').emailVerification();

// User '123' performs document verification
req.fraudnetic.user('123').documentVerification();

// User '123' initiates a password reset
req.fraudnetic.user('123').passwordReset();

// User '123' changes their email address
req.fraudnetic.user('123').emailChange();

// User '123' changes their phone number
req.fraudnetic.user('123').phoneNumberChange();

// User '123' makes a deposit
req.fraudnetic.user('123').deposit();

// User '123' initiates a withdrawal
req.fraudnetic.user('123').withdraw();

// User '123' places a sports bet
req.fraudnetic.user('123').sportBet();

// User '123' spins a casino slot
req.fraudnetic.user('123').casinoSpin();

// User '123' places a game bet
req.fraudnetic.user('123').gameBet();

// User '123' places a P2P game bet
req.fraudnetic.user('123').p2pGameBet();
```
