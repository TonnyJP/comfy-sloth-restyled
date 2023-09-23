// domain/.netlify/functions/create-payment-intent

require('dotenv').config()

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);
console.log(stripe)

exports.handler = async function(event, context){
    //console.log(event)
    console.log("befor if")
    if(event.body){
        console.log("in handler")
        const { shipping_fee, total_amount} = JSON.parse(event.body);

        const calculateOrderAmount = () => {
            return shipping_fee + total_amount;
        }

        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: calculateOrderAmount(),
                currency: 'usd'
            })
            console.log("payment intent", paymentIntent)
            return {
              statusCode: 200,
              body: JSON.stringify({clientSecret: paymentIntent.client_secret})
            }
        } catch (error) {
            console.log("in error")
            return {
                statusCode: 500,
                body: JSON.stringify({msg: error.message})
            }
        }
    }
    return {
        statusCode: 200,
        body: 'Create Payment Intent'
    }
}