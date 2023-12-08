import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './page/home/home';
import Signup from './page/signup/signup';
import Login from './page/login/login';
import Account from './page/account/account';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/account' element={<Account/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
