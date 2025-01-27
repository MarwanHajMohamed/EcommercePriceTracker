from flask import request, jsonify
from config import app, db
from models import ProductResult
import requests
from bs4 import BeautifulSoup

# Create a function to perform scraping within the application context
def scrape_and_store_data(searchText):
    
    formatted_search = searchText.replace(' ', '+')
    # URL to scrape
    url = f"https://www.ebuyer.com/search?q={formatted_search}"

    # Get results
    result = requests.get(url)
    if result.status_code != 200:
        raise Exception(f"Failed to get data: {result.status_code}")

    # Parse the page
    doc = BeautifulSoup(result.text, "html.parser")

    # Extract product data
    with app.app_context():
        for item in doc.select('#list-view .listing-product')[:15]:
            name = item.select('h3.listing-product-title a')[0].get_text()
            price = item.select('.listing-price .price')[0].get_text()
            
            # Remove pound sign and other text from price
            price = float(price.replace('£', '').replace('inc.vat', '').replace(',', '').strip())

            # Extracting product URLs
            product_url = item.select_one('h3.listing-product-title a')['href']
            
            # Extracting image URLs
            image_url = item.select_one('.listing-image img')['src']

            # Construct the full URL if necessary
            if not product_url.startswith("http"):
                product_url = "https://www.ebuyer.com" + product_url

            # Print the scraped data
            print(f"Name: {name}\nPrice: {price}\nURL: {product_url}\n\nImage: {image_url}\n")


            product_result = ProductResult(
                name=name,
                img=image_url,
                url=product_url,
                price=price,
                search_text=searchText)

            # Add the instance to the database session
            db.session.add(product_result)

            # Commit the session to persist the data into the database
            db.session.commit() 

    # Print a message indicating that the data has been successfully scraped and stored
        print("Scraping and storing data into the database completed successfully.")




