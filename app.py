from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import stripe
import os

# Initialize the Flask app
app = Flask(__name__)

# Load configuration from the config.py file (we will define secret keys and db URL here)
app.config.from_object('config.Config')

# Initialize the database
db = SQLAlchemy(app)

stripe.api_key = app.config['STRIPE_SECRET_KEY']
# Define the database model for saving user emails
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

# Route to serve the landing page
@app.route('/')
def index():
    return render_template('landing_page.html')

# Route to create a PaymentIntent with Stripe
@app.route('/create-payment-intent', methods=['POST'])
def create_payment():
    try:
        data = request.get_json()  # Get the incoming JSON data
        email = data['email']  # Extract the email from the request

        # Create a PaymentIntent with Stripe API
        intent = stripe.PaymentIntent.create(
            amount=5000,  # Amount in cents (i.e., $50.00)
            currency='usd',
            receipt_email=email  # Send the receipt to the provided email
        )

        # Save the user's email to the database
        user = User(email=email)
        db.session.add(user)
        db.session.commit()

        # Return the client secret needed to complete the payment on the frontend
        return jsonify({
            'clientSecret': intent.client_secret
        })
    except Exception as e:
        return jsonify(error=str(e)), 400

if __name__ == "__main__":
    app.run(debug=True)
