/*
    getOrders
    getOrder
    addNewOrder
    updateOrder
    deleteOrder

*/
//load all models
const Order = require("../models/order");

//get orders
const getOrders = async () => {
  try {
    const orders = await Order.find().sort({_id: -1});
    return orders;
  } catch (error) {
    throw new Error(error);
  }
};

//get 1 order
const getOrder = async (id) => {
  const order = await Order.findById(id);
  return order;
};

// addNewOrder - sara
const addNewOrder = async (
  customerName,
  customerEmail,
  products,
  totalPrice,
  status
) => {
  const newOrder = new Order({
    customerName,
    customerEmail,
    products,
    totalPrice,
    status,
  });
  await newOrder.save();
  return newOrder;
};

// update order - SEAN
const updateOrder = async (
  order_id,
  customerName,
  customerEmail,
  products,
  totalPrice,
  status,
  billplz_id,
  paid_at
) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      order_id,
      {
        customerName,
        customerEmail,
        products,
        totalPrice,
        status,
        billplz_id,
        paid_at,
      },
      {
        new: true,
      }
    );
    return updatedOrder;
  } catch (error) {
    throw new Error(error);
  }
};

// delete order - le zhang
const deleteOrder = async (id) => {
  try {
    await Order.findByIdAndDelete(id);
    return true;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  getOrders,
  getOrder,
  addNewOrder,
  updateOrder,
  deleteOrder,
};
