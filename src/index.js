const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const handlebars = require('express-handlebars');

const app = express();
const port = 3000;

const SortMiddleware = require('./app/middlewares/SortMiddleware')

const route = require('./routers');
const db = require('./config/db');

//connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
// HTTP logger
// app.use(morgan('combined'));

//custom middleware
app.use(SortMiddleware);

// Template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    helpers: {
      sum: (a,b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
          default: 'fas fa-sort',
          asc: 'fas fa-sort-amount-down-alt',
          desc: 'fas fa-sort-amount-up',
        }

        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        }

        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}">
          <i class="${icon}"></i>
        </a>`
      }
    }
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

//middleware
app.use(express.urlencoded({
  extended: true
}))

app.use(express.json());

//POSt ---> PUT
app.use(methodOverride('_method'));

route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
