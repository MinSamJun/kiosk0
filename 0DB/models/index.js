//  0DB/models/index.js

// import
const Item = require("./item.js");
const Item_order_customer = require("./item_order_customer.js");
const Option = require("./option.js");
const Order_customer = require("./order_customer.js");
const Order_item = require("./order_item.js");

// realation

Option.hasOne(Item);

Item.belongsTo(Option);
Item.hasOne(Order_item);

// Item.hasOne(Item_order_customer);

Order_item.belongsTo(Item);

Item_order_customer.belongsTo(Order_customer);
Item.belongsTo(Item_order_customer);

Order_customer.hasOne(Item_order_customer);

module.exports = [
  Item,
  Item_order_customer,
  Option,
  Order_customer,
  Order_item,
];
