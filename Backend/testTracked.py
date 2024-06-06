from config import app, db
from models import ProductResult
from models import TrackedProducts

if __name__ == '__main__':
    with app.app_context():
       
        tracked_products = TrackedProducts.query.all()

        for product in tracked_products:
            print(f"ID: {product.id}")
            print(f"Search Text: {product.search_text}")
            print("\n")