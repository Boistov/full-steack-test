// Countdown Timer Setup
let timeLeft = 30; // 30 seconds countdown
const timerElement = document.getElementById('timer');
const signupBtn = document.getElementById('signupBtn');
const modal = new bootstrap.Modal(document.getElementById('paymentModal'));

// Update Timer Every Second
setInterval(function() {
    if (timeLeft > 0) {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        // Display time in MM:SS format
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    } else {
        // Enable signup button when the timer reaches 0
        signupBtn.disabled = false;
    }
}, 1000);

// Show Modal on Button Click
signupBtn.addEventListener('click', function() {
    modal.show();
});

// Stripe Setup
const stripe = Stripe('pk_test_51QWY5cEiBFlDw3TFU4W7pRzlBWwsBMgbHrPNukv5ZiTe4GV4MiipQJkKF8mEpVeJcrNokn1QnnQ1wTXAJJdKi8o900d6l0BLg5');
const elements = stripe.elements();
const card = elements.create('card');
card.mount('#card-element');

// Handle Payment Form Submission
document.getElementById('paymentForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;

    // Create Payment Intent on Server
    try {
        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email }) // Send email to server
        });

        const { clientSecret } = await response.json(); // Get client secret from server

        // Confirm Card Payment with Stripe
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: { email: email } // Include email in billing details
            }
        });

        if (error) {
            // Handle error
            alert(error.message);
        } else if (paymentIntent.status === 'succeeded') {
            // Payment successful
            alert('Payment successful!');
        }
    } catch (err) {
        // Handle fetch errors
        alert('An error occurred: ' + err.message);
    }
});