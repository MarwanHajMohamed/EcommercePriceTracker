from flask import request, jsonify
from config import app, db
from scraper_main import scrape_and_store_data
from flask_cors import CORS
from models import TrackedProducts

CORS(app)




@app.route('/api/tracked-products', methods=['GET'])
def get_tracked_products():
    tracked_products = TrackedProducts.query.all()
    tracked_prodcuts_list = [{'id': product.id, 'search_text': product.search_text} for product in tracked_products]
    print(*tracked_prodcuts_list)
    return jsonify({'trackedproducts': tracked_prodcuts_list})




@app.route('/api/search', methods=['POST'])
def search_product():
    search_text = request.json.get('searchText')
    if not search_text:
        return jsonify({'message': 'No search text provided'}), 400
    
    # Check if the search text is already tracked
    tracked_product = TrackedProducts.query.filter_by(search_text=search_text).first()
    if not tracked_product:
        # If not tracked yet, add to TrackedProducts table
        tracked_product = TrackedProducts(search_text=search_text)
        db.session.add(tracked_product)
        db.session.commit()
    try:
        scrape_and_store_data(search_text)
        return jsonify({'message': 'Scraping complete'}), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred during scraping', 'error': str(e)}), 500




if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    
    app.run(debug=True)
