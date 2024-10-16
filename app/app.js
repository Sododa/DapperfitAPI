import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import express from 'express';
import dbConnect from '../config/dbConnect.js';
import { globalerrhandler, notFound } from "../middlewares/globalerrhandler.js";
import productsRouter from "../routes/productsRoute.js";
import UserRoutes from "../routes/UsersRoute.js";
import categoriesRouter from "../routes/categoriesRouter.js";
import brandsRouter from "../routes/brandsRouter.js";
import colorRouter from "../routes/colorsRouter.js";
import reviewRouter from "../routes/reviewRouter.js";
import orderRouter from "../routes/ordersRouter.js";
import Order from "../model/Order.js";
Order
// database connector
dbConnect();
const app = express();
// stripe webhook
// STRIPE instance
const stripe = new Stripe(process.env.STRIPE_KEY);

// Replace this endpoint secret with your endpoint's unique secret
// If you are testing with the CLI, find the secret by running 'stripe listen'
// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
// at https://dashboard.stripe.com/webhooks
const endpointSecret = 'whsec_98dbace27d42a6bf8a0b85b809206811347ea8d805dd6b7b1c662153fac71189';

app.post('/webhook', express.raw({type: 'application/json'}), async(request, response) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
      console.log("event");
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }
  if (event.type ==="checkout.session.completed"){
    // updating the order
    const session = event.data.object;
    const  {orderId}  = session.metadata;
    const paymentStatus = session.payment_status;
    const paymentMethod = session.payment_method_types[0];
    const totalAmount = session.amount_total;
    const currency = session.currency;
    const order = await Order.findByIdAndUpdate(JSON.parse(orderId),
      {
      totalPrice: totalAmount / 10,
      currency,
      paymentMethod,
      paymentStatus,
    },
    {
      new : true,

    }
  );
  console.log(order);
  } else {
    return;
  }

  // Handle the event
  //switch (event.type) {
    //case 'payment_intent.succeeded':
     // const paymentIntent = event.data.object;
      //console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
     // break;
    //case 'payment_method.attached':
     // const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
     // break;
    //default:
      // Unexpected event type
     // console.log(`Unhandled event type ${event.type}.`);
 // }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});
//pass incoming data
app.use(express.json());
//route for users
app.use('/api/v1/Users/', UserRoutes);
// route for products
app.use('/api/v1/Products/', productsRouter);
// router for categories
app.use('/api/v1/categories/', categoriesRouter);
// Route for brands
app.use('/api/v1/brands/', brandsRouter);
// Route for color
app.use('/api/v1/colors/', colorRouter);
// Route for review
app.use('/api/v1/reviews/', reviewRouter);
// Route for orders
app.use('/api/v1/orders/', orderRouter);




// 404 error not found
app.use(notFound);
// error middlemare
app.use(globalerrhandler);

export default app;


