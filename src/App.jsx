import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProviders } from './context/AppContext';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}
