import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [searchText, setSearchText] = useState('');
  const [trackedProducts, setTrackedProducts] = useState([]);
  const [selectedTrackedProduct, setSelectedTrackedProduct] = useState(null);
  const [productData, setProductData] = useState([]); // State to store fetched product data as an array

  const fetchTrackedProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/tracked-products');
      setTrackedProducts(response.data.trackedproducts || []);
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    fetchTrackedProducts();
  }, []);

  console.log(trackedProducts);

  const handleItemClick = (searchText) => {
    setSelectedTrackedProduct(searchText);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/query', {
          params: {
            searchText: selectedTrackedProduct
          }
        });
        setProductData(response.data); // Store fetched product data as an array
      } catch (error) {
        console.log('Error', error);
      }
    };

    if (selectedTrackedProduct) {
      fetchData();
    }
  }, [selectedTrackedProduct]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/search', { searchText: searchText });
      console.log(response.data);
    } catch (error) {
      console.log('Error', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false  };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options).replace(',', '');
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Product Price Tracker</h1>
      </header>

      <div className="main">

        <div className='search-container'>
        <form onSubmit={handleSearch}>
          <label className='search-element' id="search-text">Search for a new product:</label>
          <input className='search-element' id='search-input'
            type="text"
            placeholder="Enter Product Name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className='search-element' id='search-button' type="submit">Search</button>
        </form>
        </div>



        <div className='TrackedList'>
          <h3>Tracked Products</h3>

          <p>Tracked products is a list of products you have already scraped.
            <br />You can select a product from the list to view the price history.
          </p>

          <ul className='list'>
            {trackedProducts.map((product) => (
              <li className='product-list' key={product.id} onClick={() => handleItemClick(product.search_text)}>
                {product.search_text}
              </li>
            ))}
          </ul>

           {selectedTrackedProduct && (
            <div>
              <h4>Selected Product:</h4>
              <p>{selectedTrackedProduct}</p>
            </div>
          )}



        </div>

        

          {productData.length > 0 && (
            <div className="list-view">
              <h4 className='list-view-text'>Product Data:</h4>
              
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date of last Scrape</th>
                <th className="price-column">Price</th>
                
              </tr>
            </thead>
            <tbody>
              {productData.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{formatDate(product.created_at)}</td>
                  <td className="price-column-data">£{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
          )}

      </div>

    </div>
  );
}

export default App;
