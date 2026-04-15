// 🔥 email sender setup
const nodemailer = require("nodemailer");

// transporter config (Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sandeshsingh9648@gmail.com",        // ⚠️ your email
    pass: "ggnf gred qrco bzhk",           // ⚠️ Gmail App Password
  },
});

// 🔥 SEND ORDER EMAIL
const sendOrderEmail = async (to, orderId, total) => {
  await transporter.sendMail({
    from: "Flipkart Clone sandeshsingh9648@gmail.com",
    to,
    subject: "Order Placed Successfully 🛒",
    html: `
      <h2>Order Confirmed 🎉</h2>
      <p>Your order <b>#${orderId}</b> has been placed.</p>
      <p>Total Amount: ₹${total}</p>
      <p>Thank you for shopping with us!</p>
    `,
  });
};

// 🔥 SEND CANCEL EMAIL
const sendCancelEmail = async (to, orderId) => {
  await transporter.sendMail({
    from: "Flipkart Clone sandeshsingh9648@gmail.com",
    to,
    subject: "Order Cancelled ❌",
    html: `
      <h2>Order Cancelled</h2>
      <p>Your order <b>#${orderId}</b> has been cancelled.</p>
    `,
  });
};

module.exports = {
  sendOrderEmail,
  sendCancelEmail,
};