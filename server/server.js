const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const winRouter = require('./routes/winrate.router')
const deckRouter = require('./routes/deck.router')
const winnerPlayerRouter = require('./routes/winnerplayer.router')
const winnerDeckRouter = require('./routes/winnerdeck.router')
const loserDeckRouter = require('./routes/loserdeck.router')
const loserPlayerRouter = require('./routes/loserplayer.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/winrate', winRouter);
app.use('/api/decks', deckRouter);
app.use('/api/playerwin', winnerPlayerRouter);
app.use('/api/deckwin', winnerDeckRouter)
app.use('/api/deckloser', loserDeckRouter)
app.use('/api/playerloser', loserPlayerRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
