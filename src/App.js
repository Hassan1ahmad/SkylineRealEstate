import Home from './components/Home';
import './App.css';
import Navbar from './components/Navbar';
import Properites from './components/Properites';
import AssistBuyer from './components/AssistBuyer';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import Footer from './components/Footer';
import UserSignUpIn from './components/UserSignUpIn';
import { BrowserRouter, Routes, Route,Outlet } from "react-router-dom";
import Dashboard from './components/Dashboard';
import SellerProperties from './components/SellerProperties';
import AddProperty from './components/AddProperty';
import Profile from './components/Profile';
import DashState from './context/dashboard/DashState';
import SaleAndRent from './components/SaleAndRent';
import { Element } from 'react-scroll';

 


function App() {
  const home = <>
  <Navbar/>
    <Element name='home' className='element'>
    <Home/>
    </Element>
    
      <Properites/>
      <AssistBuyer/>
      <SaleAndRent/>
      <Element name='about' className='element'>
      <Testimonials/>
      </Element>
      <Partners/>
      <Footer/>
  </>
  return (
    <div className="App">
      <DashState> 
      <BrowserRouter>
      <Routes>
        <Route path='/' element={home} />
        <Route path='/sellerAuth' element={<UserSignUpIn  apiForSignUp={'/seller/signUp'} apiForSignIn={'/seller/logIn'} navigate={'/dashboard/properties'} />} />
        <Route path='/buyerAuth'  element={<UserSignUpIn apiForSignUp={'/buyers/signUp'} apiForSignIn={'/buyers/logIn'} navigate={'/'} />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Outlet />} />
          <Route path="properties" element={<SellerProperties />} />
          <Route path="addproperties" element={<AddProperty/>} />
          <Route path="myprofile" element={<Profile/>} />
        </Route>
      </Routes>
      </BrowserRouter>
      </DashState>
    </div>
  );
}

export default App;
