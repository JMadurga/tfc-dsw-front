import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../Pages/LoginPage';
import {HomePage  } from "../Pages/HomePage";
import { ProductsPage } from '../Pages/ProductsPage';
import { WorkersPage } from '../Pages/WorkersPage';

function route() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/Products" element={<ProductsPage />} />
        <Route path="/Workers" element={<WorkersPage />} />
        <Route path="/User" element={<UserPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default route;