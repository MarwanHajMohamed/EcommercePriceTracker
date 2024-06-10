from flask import request, jsonify
from config import app, db
from scraper_main import scrape_and_store_data
from flask_cors import CORS
from models import TrackedProducts
from models import ProductResult
from sqlalchemy import func


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
    except Exception as e:
        return jsonify({'message': 'An error occurred during scraping', 'error': str(e)}), 500

@app.route('/api/query', methods=['GET'])
def get_latest_product_data():
    try:
        search_text = request.args.get('searchText')

       # Subquery to get the latest created_at for each URL
        latest_dates_subquery = db.session.query(
            func.max(ProductResult.created_at).label('latest_date')
        ).filter(ProductResult.search_text == search_text)\
         .group_by(ProductResult.url)\
         .subquery()

        # Query to fetch data for each URL with the latest creation date
        latest_product_data = db.session.query(ProductResult)\
                                        .join(latest_dates_subquery,
                                              ProductResult.created_at == latest_dates_subquery.c.latest_date)\
                                        .filter(ProductResult.search_text == search_text)\
                                        .all()

        if latest_product_data:
            # Construct response data
            response_data = [{
                'name': product.name,
                'img': product.img,
                'url': product.url,
                'price': product.price,
                'created_at': product.created_at.isoformat(),
                'search_text': product.search_text
            } for product in latest_product_data]
            return jsonify(response_data)
        else:
            return jsonify({'message': 'No data found for the given search text'}), 404
    except Exception as e:
        print(str(e))
        return jsonify({'message': str(e)}), 500
    
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    
    app.run(debug=True)
