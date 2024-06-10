// import './App.css';
// import {useState, useEffect} from 'react';
// import axios from 'axios';

// function App() {
//     const [searchText, setSearchText] = useState('');
//     const [trackedProducts, setTrackedProducts] = useState([]);
//     const [selectedTrackedProduct, setSelectedTrackedProduct] = useState(null);
//     const [productData, setProductData] = useState(null); // State to store fetched product data

//     const fetchTrackedProducts = async () => {
//         try {
//             const response = await axios.get('http://127.0.0.1:5000/api/tracked-products');
//             setTrackedProducts(response.data.trackedproducts || []);
//         } catch (error) {
//             console.log('Error', error);
//         }

//     };
    
//     useEffect(() => {
//         fetchTrackedProducts();
//     }, []);

//     console.log(trackedProducts);

//     const handleItemClick = (searchText) => {
//       setSelectedTrackedProduct(searchText);
      
//     };

//     useEffect(() => {
//       const fetchData = async () => {
//         try {
//           const response = await axios.get('http://127.0.0.1:5000/api/query', {
//             params: {
//               searchText: selectedTrackedProduct
//             }
//           });
//           setProductData(response.data);
//         } catch (error) {
//           console.log('Error', error);
//         }
//       };
  
//       if (selectedTrackedProduct) {
//         fetchData();
//       }
//     }, [selectedTrackedProduct]);

//     const handleSearch = async (e) => {
//         e.preventDefault();
        
//         try{
//           const response = await axios.post('http://127.0.0.1:5000/api/search',{searchText: searchText});
//           console.log(response.data);
//         }
//         catch(error){
//           console.log('Error',error);
//         }
//     };


//   return (
//     <div className="App">
//       <header className="header">
//       <h1>Product Price Tracker </h1>
//       </header>

//       <div className="main">
       
//        <form onSubmit={handleSearch}> 
//        <label>Search for a new product:</label>
//         <input
//          type="text" 
//         placeholder="Enter Product Name"
//         value={searchText}
//         onChange={(e) => setSearchText(e.target.value)}
//         />
//         <button type="submit">Search</button>
//         </form>

//       <div className='TrackedList'> 
//       <h3>Tracked Products</h3>

//       <p>Tracked products is a list of products you have already scraped.
//         <br></br>You can select a product from the list to view the price history.
//       </p>
  
//       <ul>
//             {trackedProducts.map((product) => (
//               <li key={product.id} onClick={() => handleItemClick(product.search_text)}>
//                 {product.search_text}
//               </li>
//             ))}
//           </ul>

//           {selectedTrackedProduct && (
//             <div>
//               <h4>Selected Product:</h4>
//               <p>{selectedTrackedProduct}</p>
//             </div>
//           )}

// {productData && (
//             <div>
//               <h4>Product Data:</h4>
//               <p>Name: {productData.name}</p>
//               <p>Image: {productData.img}</p>
//               <p>URL: {productData.url}</p>
//               <p>Price: {productData.price}</p>
//               <p>Created At: {productData.created_at}</p>
//             </div>
//           )}

//       </div>

//       </div>
      
//     </div>
//   );
// }

// export default App;


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

  return (
    <div className="App">
      <header className="header">
        <h1>Product Price Tracker</h1>
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

          <p>Tracked products is a list of products you have already scraped.
            <br />You can select a product from the list to view the price history.
          </p>

          <ul>
            {trackedProducts.map((product) => (
              <li key={product.id} onClick={() => handleItemClick(product.search_text)}>
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

          {productData.length > 0 && (
            <div>
              <h4>Product Data:</h4>
              {productData.map((product, index) => (
                <div key={index}>
                  <p>Name: {product.name}</p>
                  <p>Image: {product.img}</p>
                  <p>URL: {product.url}</p>
                  <p>Price: {product.price}</p>
                  <p>Created At: {product.created_at}</p>
                  <hr />
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default App;
