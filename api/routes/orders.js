const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkauth');
const OrdersController = require('../controllers/orders');






router.get("/",checkAuth, OrdersController.orders_get_all);

router.post("/",checkAuth, OrdersController.orders_create_order);

router.get('/:orderId',checkAuth, OrdersController.orders_get_singleorder);

router.delete('/:orderId', checkAuth, OrdersController.orders_deleteorder);



module.exports = router;