import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
    const [searchText, setSearchText] = useState('');
    const [trackedProducts, setTrackedProducts] = useState([]);

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

    const handleSearch = async (e) => {
        e.preventDefault();
        
        try{
          const response = await axios.post('http://127.0.0.1:5000/api/search',{searchText: searchText});
          console.log(response.data);
        }
        catch(error){
          console.log('Error',error);
        }
    };


  return (
    <div className="App">
      <header className="header">
      <h1>Product Price Tracker </h1>
      </header>

      <div className="main">
       
       <form onSubmit={handleSearch}> 
       <label>Search for a new product:</label>
        <input
         type="text" 
        placeholder="Enter Product Name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit">Search</button>
        </form>

      <div className='TrackedList'> 
      <h3>Tracked Products</h3>

      <ul>
        {trackedProducts.map((trackedProducts) => (
        <li key={trackedProducts.id}>{trackedProducts.search_text}</li>
          ))}
      </ul>

      </div>

      </div>
      
    </div>
  );
}

export default App;
