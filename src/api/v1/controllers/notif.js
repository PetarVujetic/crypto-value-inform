const Contact = require('../models/Contact');

exports.notif = async function (req, res, next) {
  let { email, coin, priceUp, priceDown } = req.body;

  if (!priceUp && !priceDown)
    res.status(400).json({
      success: false,
      msg: "No values set for price"
    });

  let contact = await Contact.create({ email, coin, priceUp, priceDown });

  res.status(200).json({
    success: true,
    data: contact
  })
}