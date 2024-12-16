import os

class Config:
    # Flask settings
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'sk_test_51QWY5cEiBFlDw3TFGoOZn1AwInTNnNBGFwHcPLw5atKbuWeAxosHfcDU85aLTyfo17Y8fG9GSErIrbZLsS95BSHW00WAivKrZz'

    # Database settings
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://postgres:said.9090@localhost/mydatabase'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Stripe API keys
    STRIPE_PUBLIC_KEY = os.environ.get('STRIPE_PUBLIC_KEY') or 'pk_test_51QWY5cEiBFlDw3TFU4W7pRzlBWwsBMgbHrPNukv5ZiTe4GV4MiipQJkKF8mEpVeJcrNokn1QnnQ1wTXAJJdKi8o900d6l0BLg5'
    STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY') or 'sk_test_51QWY5cEiBFlDw3TFGoOZn1AwInTNnNBGFwHcPLw5atKbuWeAxosHfcDU85aLTyfo17Y8fG9GSErIrbZLsS95BSHW00WAivKrZz'
