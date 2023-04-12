const express = require('express');
const { engine } = require('express-handlebars');
const usersRouter = require('./routes/user');
const { port } = require('./config/environment');
const MemoryDao = require('./dao/memory');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/user', usersRouter);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
