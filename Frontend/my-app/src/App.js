import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
      <h1>Amazon Product Price Tracker </h1>
      </header>

      <div className="main">
       
       <form>
        <h3>Search Products</h3>
        <input type="text" placeholder="Enter Product Name" />
        <button>Search</button>
        
        </form>
      </div>
      
    </div>
  );
}

export default App;
