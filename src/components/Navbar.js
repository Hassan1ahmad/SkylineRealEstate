import React,{useContext, useEffect, useState} from 'react'
import '../assets/CSS/nav.css'
import { useNavigate } from 'react-router-dom';
import DashboardContext from "../context/dashboard/DashboardContext";
import axios from 'axios'; 
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import {Link } from 'react-scroll';


function Navbar() {
 
  const navigate = useNavigate()

  const context= useContext(DashboardContext)
  const {fetchSellerDetails} = context 

  useEffect(() => {
    fetchSellerDetails()
    // eslint-disable-next-line
  }, []);


  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [buyerDetails, setBuyerDetails] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [tokenError, setTokenError] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };



  const menuClicked=()=>{
    if(showMobileMenu===false){
      return setShowMobileMenu(true)
    }else{
      setShowMobileMenu(false)
    }
  }

  const handleFetchBuyerDetails=async()=>{
    try {
      const response = await axios.get('https://skylinerealestate-dibreg7o.b4a.run/api/buyers/buyerDetails',{
        withCredentials:true
      })
      if(response.status===200){
        setTokenError(false)
        setBuyerDetails(response.data.buyerDetails)
      }
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 400)) {
        const errorData = error.response.data;
        if (errorData.error === 'unUnauthorized: No token provided' || errorData.error === 'Unauthorized: Invalid token') {
          // If error is related to token, navigate to login page
          setTokenError(true)
        }
      }else{
        console.error('Error fetching seller details:', error);
      }
    }
  }

  const checklogin=()=>{
      navigate('/dashboard/properties')
  }

  const checkloginforbuyer=()=>{
    if (tokenError) {
      navigate('/buyerAuth')
    } else if(!tokenError) {
      setIsLoggedIn(true)
    }
    
  }
  useEffect(() => {
    handleFetchBuyerDetails()
    if(!tokenError){
      setIsLoggedIn(true)
    }else if(tokenError){
      setIsLoggedIn(false)
    }
  }, [tokenError]);
  

  const handleLogOut = async () => {
    try {
      await axios.get('https://skylinerealestate-dibreg7o.b4a.run/api/buyers/logout',{
        withCredentials:true
      });
  
      setBuyerDetails({});
      setIsLoggedIn(false);
      setTokenError(true);
    } catch (error) {
      console.error('Error while logging out:', error);
      // Handle error as needed
    }
  };
  return (
    <div> 
      <div className="nav-wrapper backdrop-blur-md backdrop-brightness-125">
        <div className="desktop-navbar">
            <div className="nav-brand">
                <img src={require("../assets/pictures/Blue Illustrative Luxury Real Estate Logo.png")} alt="" />
            </div>
            <div className="nav-links">
                <ul>
                    <Link to='home' spy={true} smooth={true} offset={-50} duration={500} >
                    <li >Home</li>
                    </Link>
                    <Link to='about' spy={true} smooth={true} offset={-50} duration={500} >
                    <li >About us</li>
                    </Link>
                    <Link to='Sale' spy={true} smooth={true} offset={-50} duration={500} >
                    <li >Sale</li>
                    </Link>
                    <Link to='Rent' spy={true} smooth={true} offset={-50} duration={500} >
                    <li >Rent</li>
                    </Link>
                 <button onClick={checklogin} className="nav-seller">Become a Seller</button>
                 {isLoggedIn? (
                 <div className="relative inline-block text-left ">
                 <div>
                   <button
                     type="button"
                     className="inline-flex nav-sign  justify-center gap-x-1.5 rounded-md bg-customBlue px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-customBlue"
                     id="menu-button"
                     aria-expanded={menuOpen}
                     aria-haspopup="true"
                     onClick={toggleMenu}
                   >
                     {buyerDetails.username}
                     <svg
                       className={`-mr-1 h-5 w-5 text-white ${menuOpen ? 'transform rotate-180' : ''}`}
                       viewBox="0 0 20 20"
                       fill="currentColor"
                       aria-hidden="true"
                     >
                       <path
                         fillRule="evenodd"
                         d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                         clipRule="evenodd"
                       />
                     </svg>
                   </button>
                 </div>
           
                 {menuOpen && (
                   <div
                     className="absolute right-0 z-10 mt-1 w-32  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                     role="menu"
                     aria-orientation="vertical"
                     aria-labelledby="menu-button"
                     tabIndex="-1"
                   >
                     <div className="py-1" role="none">
                         <button
                           type="submit"
                           className="text-gray-700 text-lg block w-full px-4 py-2 text-left "
                           role="menuitem"
                           tabIndex="-1"
                           id="menu-item-3"
                           onClick={handleLogOut}
                         >
                           Sign Out
                         </button>
                        </div>
                   </div>
                 )}
               </div>
                 ):(
                   <button onClick={checkloginforbuyer}  className="nav-sign">SignUp/In</button> 
                 )}
                </ul>
            </div>
        </div>
        {/* mobile */}
        <div className="mobile-navbar">
          <div className="mobile-navbar-wrapper">
            {/* left-content */}
          <div className="left-mobile-nav-brand">
          <img src={require("../assets/pictures/Blue Illustrative Luxury Real Estate Logo.png")} alt="" />
          </div>
          {/* right-content */}
          <div className="right-content">
          <button onClick={checklogin} className="nav-seller">Become a Seller</button>
          <div className="humburger"><i onClick={menuClicked} className="fa-solid fa-bars"></i></div>
          </div>
          <div className={`humburger-menu ${showMobileMenu===false? '' : 'mobile-display'}`} >
          {isLoggedIn ? (
            <div className="user-container">
              <p> <span className='text-black text-lg'><PersonIcon/></span> {buyerDetails.username}</p>
              <p className='mt-3 ' onClick={handleLogOut}> <span className='text-black'><LogoutIcon/></span>  Log Out</p>
            </div>
          ) : (
            <div className="auth-buttons">
              <button onClick={checkloginforbuyer}>Sign Up/in</button>
              
            </div>
          )}
            <div className={`mobile-nav-links`}>
              <ul>
                    <Link to='home' spy={true} smooth={true} offset={-50} duration={500} >
                    <li onClick={()=>setShowMobileMenu(false)} >Home</li>
                    </Link>
                    <Link to='about' spy={true} smooth={true} offset={-50} duration={500} >
                    <li onClick={()=>setShowMobileMenu(false)}>About us</li>
                    </Link>
                    <Link to='Sale' spy={true} smooth={true} offset={-50} duration={500} >
                    <li onClick={()=>setShowMobileMenu(false)}>Sale</li>
                    </Link>
                    <Link to='Rent' spy={true} smooth={true} offset={-50} duration={500} >
                    <li onClick={()=>setShowMobileMenu(false)}>Rent</li>
                    </Link>
              </ul>
            </div>
          </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar
