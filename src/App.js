import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductPage from './components/Products';
// import './styles.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';


function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={ <ResponsiveAppBar />} />
          <Route path="/categories" element={ <HomePage /> } />
          <Route path="/product/category/:item" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
