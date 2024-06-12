from config import app, db
from models import ProductResult
from models import TrackedProducts

if __name__ == '__main__':
    with app.app_context():
        # Retrieve all product results from the database
        product_results = ProductResult.query.all()

        # Print out the details of each product
        for product in product_results:
            print(f"ID: {product.id}")
            print(f"Name: {product.name}")
            print(f"Price: {product.price}")
            print(f"URL: {product.url}")
            print(f"Image: {product.img}")
            print(f"Search Text: {product.search_text}")
            print(f"Created At: {product.created_at}")
            print("\n")

       
