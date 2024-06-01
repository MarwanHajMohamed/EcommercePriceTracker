from bs4 import BeautifulSoup
import requests

# Get user input
search = input("Enter product to search for: ")
formatted_search = search.replace(' ', '+')

# URL to scrape
url = f"https://www.ebuyer.com/search?q={formatted_search}"



# Get results
result = requests.get(url)
if result.status_code != 200:
    print("Failed to get data: ", result.status_code)
    exit()

# Parse the page
doc = BeautifulSoup(result.text, "html.parser")

#print(doc.prettify())

# Extract product data
products = []
for item in doc.select('#list-view .listing-product')[:15]:
    name = item.select('h3.listing-product-title a')[0].get_text()
    price = item.select('.listing-price .price')[0].get_text()
    products.append({
        'name': name,
        'price': price
    })

# Print the results
for product in products:
    print(f"Name: {product['name']}\nPrice: {product['price']}\n")