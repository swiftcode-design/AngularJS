const Order = require('../models/order.model.js');

module.exports = {

  createOrder: (req, res, next) => {
    Order.create(req.body, (err, order) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      };
      res.status(200).send(order);
    });
  },

  readOrder: (req, res, next) => {
    Order.find(req.query, (err, order) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      };
      res.status(200).send(order);
    });
  },

  updateOrder: (req, res, next) => {
    Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate({
        path: 'books',
        populate: { path: 'print_qty' }
      })
      .exec((err, order) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        };
        res.status(200).send(order);
      });
  },

  deleteOrder: (req, res, next) => {
    Order.findByIdAndRemove(req.params.id, (err, order) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      };
      res.status(200).send(order);
    });
  },

  getOrderDetails: (req, res, next) => {
    Order
      .findById(req.params.id)
      .populate({
        path: 'books',
        populate: { path: 'print_qty' }
      })
      .populate("user")
      .exec((err, order) => {
        if (err) {
          return res.status(500).send(err);
        }
        return res.status(200).send(order);
      })
  },

  getActiveOrder: (req, res, next) => {
    Order.find({
      "user": req.params.user,
      "completed": { $exists: false }
    })
      .exec((err, order) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        } else if (order.length === 0) {
          return res.status(200).send('No active orders')
        } else {
          res.status(200).send(order);
        }
      });
  },

  getAllActiveOrders: (req, res, next) => {
    Order.find({
      "completed": { $exists: true, $ne: null },
      "archived": { $ne: true }
    })
      .populate({
        path: 'books',
        populate: { path: 'print_qty' }
      })
      .populate({
        path: 'user'
      })
      .exec((err, orders) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        } else if (orders.length === 0) {
          return res.status(200).send('No active orders')
        } else {
          res.status(200).send(orders);
        }
      });
  },

  getAllArchivedOrders: (req, res, next) => {
    Order.find({
      "completed": { $exists: true, $ne: null },
      "archived": { $exists: true, $ne: false }
    })
      .populate({
        path: 'books',
        populate: { path: 'print_qty' }
      })
      .populate({
        path: 'user'
      })
      .exec((err, orders) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        } else if (orders.length === 0) {
          return res.status(200).send('No active orders')
        } else {
          res.status(200).send(orders);
        }
      });
  }

};
