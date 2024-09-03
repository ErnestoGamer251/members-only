const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const db = require('./models');
const routes = require('./routes');

const app = express();

// Setup middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/', routes);

// Passport config
require('./config/passport')(passport);

// Set EJS as the template engine
app.set('view engine', 'ejs');

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});
