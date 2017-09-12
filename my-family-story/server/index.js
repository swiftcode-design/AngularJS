const express = require('express')
  , session = require('express-session')
  , cors = require('cors')
  , bodyParser = require('body-parser')
  , mongoose = require('mongoose');

//* CONFIG *//
const config = require('./config');

//* EXPRESS *//
const app = module.exports = express();

//* EXPRESS PUBLIC SERVICE *//
app.use(express.static(__dirname + './../dist'));

//* BODYPARSER *//
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

//* DATABASE CONNECTION *//
const mongoURI = config.MONGO_URI;
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB at', mongoURI);
});

//* SESSION AND PASSPORT *//
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.SESSION_SECRET
}));

let passport = require('./services/passport.service');
app.use(passport.initialize());
app.use(passport.session());

//* PASSPORT ENDPOINTS *//
app.get('/api/auth', (req, res, next) => {
  // provide a different state for callback
  if (req.query.state) req.session.state = req.query.state;
  passport.authenticate('auth0')(req, res, next);
});
app.get('/api/auth/callback', (req, res, next) => {
  // check if user should be redirected to a specific state
  let state = 'home';
  if (req.session.state) state = req.session.state;
  req.session.state = null;
  passport.authenticate('auth0', {
    successRedirect: `/#!/${state}`,
    failureRedirect: `/#!/`
  })(req, res, next);
});

app.get('/api/logout', function(req, res, next) {
  req.logout();
  res.status(200).send('logged out');
});

//* STRIPE *//
const stripe = require('stripe')(config.STRIPE_KEYS.test_secret_key);  //Q. JAK, is this necessary here? A. Everyone else has one; why you gotta be like that?

//* AMAZONS3 ENDPOINT CONTROLLER *//
const s3 = require('./controllers/s3.controller');

//* ENDPOINT CONTROLLERS *//
const addressController = require('./controllers/address.controller');
const bookController = require('./controllers/book.controller');
const orderController = require('./controllers/order.controller');
//const pageController = require('./controllers/page.controller');
const productController = require('./controllers/product.controller');
const userController = require('./controllers/user.controller');

//* ENDPOINT SERVICES *//
const bookService = require('./services/book.service');
const paymentService = require('./services/payment.service')

//* ADDRESS ENDPOINTS *//
app.post('/api/address', addressController.createAddress);
app.get('/api/address', addressController.readAddress);
app.put('/api/address/:id', addressController.updateAddress);
app.delete('/api/address/:id', addressController.deleteAddress);

//* BOOK ENDPOINTS *//
app.post('/api/book', bookController.createBook);
app.delete('/api/book/:id', bookController.deleteBook);
app.put('/api/book/:id', bookController.updateBook);
app.get('/api/book', bookController.readBook);
app.get('/api/book/:id', bookController.readBookById);
app.get('/api/book/user/:id', bookService.getBooksByUser);


//* ORDER ENDPOINTS *//
app.post('/api/order', orderController.createOrder);
app.put('/api/order/:id', orderController.updateOrder);
app.delete('/api/order/:id', orderController.deleteOrder);
app.get('/api/order/:id', orderController.getOrderDetails);
app.get('/api/activeorder/:user', orderController.getActiveOrder);
app.get('/api/order', orderController.readOrder);
app.get('/api/allactiveorders', orderController.getAllActiveOrders);
app.get('/api/allarchivedorders', orderController.getAllArchivedOrders);

//* PRODUCT ENDPOINTS *//
app.post('/api/product', productController.createProduct);
app.get('/api/product', productController.readProduct);
app.put('/api/product/:id', productController.updateProduct);
app.delete('/api/product/:id', productController.deleteProduct);

//* USER ENDPOINTS *//
app.post('/api/user', userController.createUser);
app.get('/api/user', userController.readUser);
app.get('/api/auth/me', userController.getCurrentUser);
app.put('/api/user/:id', userController.updateUser);

//* PAYMENT ENDPOINTS *//
app.post('/api/payment', paymentService.postPayment);

//* AMAZON ENDPOINTS *//
app.post('/api/upload-photos', s3.sendImageData);

//* LISTEN *//
app.listen(config.PORT, () => console.log(`Express is running on port ${config.PORT}`));
