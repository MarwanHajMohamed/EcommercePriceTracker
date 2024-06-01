from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Create a Flask application instance
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy with the Flask application
db = SQLAlchemy(app)

# Run the scraping process within the application context
if __name__ == "__main__":
    with app.app_context():
       db.create_all()
