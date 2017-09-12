const config = require('../config.js')
const stripe = require('stripe')(config.STRIPE_KEYS.test_secret_key);
const orderController = require('../controllers/order.controller');
const Order = require('../models/order.model.js');


module.exports = {



  postPayment: (req, res, next) => {
    //convert amount to pennies
    const chargeAmt = req.body.amount;
    const amountArray = chargeAmt.toString().split('');
    const pennies = [];

    for (var i = 0; i < amountArray.length; i++) {
      if(amountArray[i] === ".") {
        if (typeof amountArray[i + 1] === "string") {
          pennies.push(amountArray[i + 1]);
        } else {
          pennies.push("0");
        }
        if (typeof amountArray[i + 2] === "string") {
          pennies.push(amountArray[i + 2]);
        } else {
          pennies.push("0");
        }
      	break;
      } else {
      	pennies.push(amountArray[i])
      }
    }

    const convertedAmt = parseInt(pennies.join(''));
    stripe.charges.create({
      amount: convertedAmt, // amount in cents, again
      currency: 'usd',
      source: req.body.payment.token,
      description: 'Test charge from My Family Story'
    },
    function(err, charge) {
  		if (err) {
  			console.log(err);
  		}
  		else {
        var obj = {stripe_transaction_id: charge.id, date: new Date(), total: charge.amount / 100 };
        Order.findByIdAndUpdate(req.body.orderId, {completed: obj}, function(err, res) {
          if (err) {
            console.log('error: ', error);
          }
        })
      }
    });
    res.sendStatus(200);
      // if (err && err.type === 'StripeCardError') {
      //   // The card has been declined
      // }
  }



}
