let timeLeft = 30; // 30 seconds
const timerElement = document.getElementById('timer');
const signupBtn = document.getElementById('signupBtn');
const modal = new bootstrap.Modal(document.getElementById('paymentModal'));

setInterval(function() {
    if (timeLeft > 0) {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
        signupBtn.disabled = false;
    }
}, 1000);

// Trigger the popup on button click
signupBtn.addEventListener('click', function() {
    modal.show();
});

// Initialize Stripe Elements
const stripe = Stripe('pk_test_51QWY5cEiBFlDw3TFU4W7pRzlBWwsBMgbHrPNukv5ZiTe4GV4MiipQJkKF8mEpVeJcrNokn1QnnQ1wTXAJJdKi8o900d6l0BLg5')
const elements = stripe.elements();
const card = elements.create('card');
card.mount('#card-element');

// Handle form submission for payment
document.getElementById('paymentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;

    // Create a PaymentIntent on the server
    const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
    });
    const { clientSecret } = await response.json();

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: card,
            billing_details: { email: email }
        }
    });

    if (error) {
        alert(error.message);
    } else if (paymentIntent.status === 'succeeded') {
        alert('Payment successful!');
    }
});