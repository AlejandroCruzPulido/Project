import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/home/home';
import Signup from './page/signup/signup';
import Login from './page/login/login';
import Account from './page/account/account';
import Glasses from './page/glasses/glasses';
import GlassesDetail from './page/glasses/glassesDetail';
import Cart from './page/cart/cart';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/glasses" element={<Glasses />} />
          <Route path="/glasses/:id" element={<GlassesDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
