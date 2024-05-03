const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;

const stripe = require("stripe")(STRIPE_SECRET_KEY);

const createCustomer = async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      name: req.body.name,
      email: req.body.email,
    });

    res.status(200).send(customer);
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const addNewCard = async (req, res) => {
  try {
    const card = await stripe.customers.createSource(req.body.customer_id, {
      source: "tok_mastercard",
    });
    res.status(200).send({ card: card.id });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

// const addNewCard = async(req,res)=>{
//     try {
//         const {
//             customer_id,
//             card_Name,
//             card_ExpYear,
//             card_ExpMonth,
//             card_Number,
//             card_CVC,
//         } = req.body;
//         const card_token = await stripe.tokens.create({
//             card:{
//                 name: card_Name,
//                 number: card_Number,
//                 exp_year: card_ExpYear,
//                 exp_month: card_ExpMonth,
//                 cvc: card_CVC
//             }
//         });
//         const card = await stripe.customers.createSource(customer_id, {
//             source: `${card_token.id}`
//         });
//         res.status(200).send({ card: card.id });
//     } catch (error) {
//         res.status(400).send({success:false,msg:error.message});
//     }

// }

const createCharges = async (req, res) => {
  try {
    console.log(req.body);
    const createCharge = await stripe.paymentIntents.create({
      receipt_email: "sandeep@gmail.com",
      amount: parseInt(req.body.amount) * 100, //amount*100
      currency: "INR",
      payment_method: req.body.card_id,
      customer: req.body.customer_id,
      confirm: true,
    });

    res.status(200).send(createCharge);
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

module.exports = {
  createCustomer,
  addNewCard,
  createCharges,
};
