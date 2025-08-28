import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../src/Pages/LoginPage';
import {HomePage  } from "../src/Pages/HomePage";
import { ProductsPage } from '../src/Pages/ProductsPage';
import { UserPage } from './Pages/UserPage';
import {NoAdminPage} from './Pages/NoAdminPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Products" element={<ProductsPage />} />
        <Route path="/Admin" element={<UserPage />} />
        <Route path="/User" element={<NoAdminPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
