const { Router } = require("express");
const router = Router();
const stripe = require("stripe")("secret_stripe_key"); //secret key

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/checkout", async (req, res) => {
  console.log(req.body);
  const customer = await stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken,
  });
  const charge = await stripe.charges.create({
    amount: "7700",
    currency: "usd",
    customer: customer.id,
    description: "Abono organico x 3 dm3",
  });
  console.log(charge.id);
  res.render("download");
});

module.exports = router;
