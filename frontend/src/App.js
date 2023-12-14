import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/home/home';
import Signup from './page/signup/signup';
import Login from './page/login/login';
import Account from './page/account/account';
import Glasses from './page/glasses/glassesClient/glasses';
import GlassesDetail from './page/glasses/glassesClient/glassesDetail';
import Cart from './page/cart/cart';
import GlassesAdmin from './page/glasses/glassesAdmin/glassesAdmin';
import GlassesUpdate from './page/glasses/glassesAdmin/glassesUpdate';
import GlassesCreate from './page/glasses/glassesAdmin/glassesCreate';
import NavigationHome from './components/navigationSuperAdmin/navigationHomeSuperAdmin';
import NavigationHomeAdmin from './components/navigationAdmin/navigationHomeAdmin';
import UserSuperAdmin from './page/users/usersSuperAdmin/usersSuperAdmin';
import Checkout from './page/checkout/checkout';
import UserAdmin from './page/users/usersAdmin/usersAdmin';


function App() {
  return (
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
        <Route path="/glasses-admin/*" element={<GlassesAdmin />} />
        <Route path="/glasses-update/:id" element={<GlassesUpdate/>} />
        <Route path='/glasses-create' element={<GlassesCreate/>} />
        <Route path='/navigation-home-superadmin' element={<NavigationHome/>}/>
        <Route path='/navigation-home-admin' element={<NavigationHomeAdmin/>}/>
        <Route path='/users-superadmin' element={<UserSuperAdmin/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/users-admin' element={<UserAdmin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
