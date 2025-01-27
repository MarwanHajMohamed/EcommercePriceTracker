from config import db
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime



class ProductResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000))
    img = db.Column(db.String(1000))
    url = db.Column(db.String(1000))
    price = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    search_text = db.Column(db.String(255))

    def __init__(self, name, img, url, price, search_text):
        self.name = name
        self.url = url
        self.img = img
        self.price = price
        self.search_text = search_text

class TrackedProducts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    search_text = db.Column(db.String(255), unique=True)



