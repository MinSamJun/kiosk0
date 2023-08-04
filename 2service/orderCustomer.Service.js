//  2service/orderCustomerService.js

const OrderCustomerRepository = require("../3repository/orderCustomer.Repository");

class OrderCustomerServices {
  orderCustomerRepository = new OrderCustomerRepository();
}

module.exports = OrderCustomerServices;
