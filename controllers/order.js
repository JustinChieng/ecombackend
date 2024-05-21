const axios = require("axios");

/*
    getOrders
    getOrder
    addNewOrder
    updateOrder
    deleteOrder

*/
//load all models
const Order = require("../models/order");

//load data from config
const {
  BILLPLZ_API_URL,
  BILLPLZ_API_KEY,
  BILLPLZ_COLLECTION_ID,
} = require("../config");

//get orders
const getOrders = async () => {
  try {
    const orders = await Order.find().sort({ _id: -1 });
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

// addNewOrder
const addNewOrder = async (
  customerName,
  customerEmail,
  products,
  totalPrice,
  status
) => {
  // 1. create a bill in billplz
  const billplz = await axios({
    method: "POST",
    url: BILLPLZ_API_URL + "v3/bills",
    auth: {
      username: BILLPLZ_API_KEY,
      password: "",
    },
    data: {
      collection_id: BILLPLZ_COLLECTION_ID,
      email: customerEmail,
      name: customerName,
      amount: parseFloat(totalPrice) * 100,
      description: "Payment for order",
      callback_url: "http://localhost:3000/verify-payment",
      redirect_url: "http://localhost:3000/verify-payment",
    },
  });
  // 2. retrieve the bill_url and bill id
  const billplz_id = billplz.data.id;
  const billplz_url = billplz.data.url;

  // 3. create a new order
  const newOrder = new Order({
    customerName,
    customerEmail,
    products,
    totalPrice,
    status,
    billplz_id: billplz_id,
  });
  await newOrder.save();
  // 4. return back the new order with bill_url
  return {
    ...newOrder,
    billplz_url: billplz_url,
  };
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
