var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
//admin router
const adminrouter = require('./routes/adminroutes/admins.js');
const usersRouter = require('./routes/adminroutes/users.js');
const categoryrouter = require('./routes/adminroutes/categories.js');
const productrouter = require('./routes/adminroutes/products.js');
const orderrouters = require('./routes/adminroutes/orders.js');
const bagsrouters = require('./routes/adminroutes/bags.js');
const repairrouters = require('./routes/adminroutes/repairs.js');
const samplerouters = require('./routes/adminroutes/samples.js');
//user router
const categorys = require('./routes/userroutes/categories.js');
const userrouter = require('./routes/userroutes/users.js');
const orderrouter = require('./routes/userroutes/order.js');
const cartrouter = require('./routes/userroutes/carts.js');
const repairrouter = require('./routes/userroutes/repairs.js');
const samplerouter = require('./routes/userroutes/sample.js');
const productsrouter = require('./routes/userroutes/product.js');

const connectDB = require('./utilities/connection.js');

dotenv.config(); // Load environment variables

const DATABASE_URL = process.env.DATABASE_URL;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Connect to the database
if (!DATABASE_URL || !process.env.JWT_SECRET) {
  console.error("Missing environment variables. Please check DATABASE_URL and JWT_SECRET.");
  process.exit(1);
}
connectDB(DATABASE_URL);

// Define routes
//Admin routers
app.use('/admin', adminrouter);
app.use('/users', usersRouter);
app.use('/category', categoryrouter);
app.use('/product', productrouter);
app.use('/orders', orderrouters);
app.use('/bags', bagsrouters);
app.use('/repairorders', repairrouters);
app.use('/sampleorders', samplerouters);

//User routers
app.use('/order', orderrouter);
app.use('/userlogin', userrouter);
app.use('/cart', cartrouter);
app.use('/categorys', categorys);
app.use('/repairorder', repairrouter);
app.use('/sampleorder', samplerouter);
app.use('/products', productsrouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
