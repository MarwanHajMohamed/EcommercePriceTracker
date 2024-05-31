from flask import Flask, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.comfid['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class ProductSearchResults(db.Model):
     
     # define the columns of the table, name of column, datatype of column, length of string
     id = db.Column("id",db.Integer, primary_key=True)
     name = db.Column("name",db.String(1000))
     img = db.Column("image",db.String(1000))
     url = db.Column("url",db.String(1000))
     price = db.Column("price", db.Float)
     created_at = db.Column(db.DateTime, default=datetime.utcnow)
     search_text = db.Column(db.String(255))
     source = db.Column(db.String(255))

     def __init__(self, name, img, url, price, search_text, source):
        self.name = name
        self.url = url
        self.img = img
        self.price = price
        self.search_text = search_text
        self.source = source

class TrackedProducts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    tracked = db.Column(db.Boolean, default=True)

    def __init__(self, name, tracked=True):
        self.name = name
        self.tracked = tracked




@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    db.create_all()
    app.run(debig=True)
    