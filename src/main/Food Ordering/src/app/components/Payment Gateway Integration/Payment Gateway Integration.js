document.getElementById("checkout-button").addEventListener("click", function () {
    // Call the backend to initiate the payment
    fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify(cart),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = data.paymentUrl; // Redirect to payment page
        } else {
            alert("Payment initiation failed.");
        }
    });
});
const stripe = require('stripe')('your-stripe-secret-key');

app.post('/api/checkout', async (req, res) => {
    const { cart } = req.body;

    // Calculate total price
    const totalAmount = calculateCartTotal(cart); 

    // Create Stripe payment session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: cart.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,  // Price in cents
            },
            quantity: 1,
        })),
        mode: 'payment',
        success_url: 'https://yourwebsite.com/success',
        cancel_url: 'https://yourwebsite.com/cancel',
    });

    res.json({ success: true, paymentUrl: session.url });
});
