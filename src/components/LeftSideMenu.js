import React,{useContext, useEffect, useState} from "react";
import "../assets/CSS/leftMenu.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import HomeIcon from '@mui/icons-material/Home';
// import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import DashboardContext from "../context/dashboard/DashboardContext";
import axios from 'axios';





 
function LeftSideMenu() {

  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  
  // context Api
  const context= useContext(DashboardContext)
  const {loading, sellerDetails, fetchSellerDetails,fetchSellerProperties,setError,tokenError} = context





  useEffect(() => {
    setError(null)
    fetchSellerDetails();
    fetchSellerProperties()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleTokenError = () => {
      if(loading===false){
        if (tokenError) {
          navigate('/sellerAuth'); 
        }
      };

      }
  
    handleTokenError();
  }, [tokenError, navigate,loading]);
  
  

  const toggleMenu = () => {
    setExpanded(!expanded); // Toggle menu expansion state
  };

  const imageUrl =  
    "https://firebasestorage.googleapis.com/v0/b/skylinerealestate-6660c.appspot.com/o/skyline-images%2Fanonymous_avatars_grey_circles.jpg?alt=media&token=9d1c9c6e-6281-41e0-8849-fb35ae6d7702";

    const handleLogOut = async () => {
      try {
        await axios.get('https://skylinerealestate-dibreg7o.b4a.run/api/seller/logout',{
          withCredentials:true
        });
           navigate('/')
      } catch (error) {
        console.error('Error while logging out:', error);
        // Handle error as needed
      }
    };

 
  return (
    <>
      {loading? (<div className="leftMenu-wrapper flex items-center justify-center"> 
      <TailSpin
    visible={true}
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""
    /> </div>) : 
    (<>
    <>
       {/* for pc */}
       <div className="leftMenu-wrapper flex flex-col	justify-between	  ">
         <div className="leftMenu-sellerInfo">
        
           <div className="sellerImg px-11 py-3">
             <img src={sellerDetails.profilePhoto?.url? sellerDetails.profilePhoto?.url : imageUrl} alt="" />
           </div>
           <div className="text-white font-Quicksand text-center ">
             <p className="text-xl tracking-wide font-bold">{sellerDetails?.username}</p>
             <p className="text-darkWhite">{sellerDetails.userType? sellerDetails.userType : 'Not Set yet'}</p>
           </div>
         </div>
         <div className="menu-listItems">
           <ul className="text-darkWhite font-semibold" id="sidebar">
   
             <NavLink to="/dashboard/properties"><li><DashboardIcon /> Dashboard</li>
             </NavLink>
             
             <NavLink to="/dashboard/addproperties">
             <li>
               <AddHomeWorkIcon /> Add Property
             </li>
             </NavLink>
             
             <NavLink to='/dashboard/myprofile'>
             <li>
               <AccountCircleIcon /> Your Profile
             </li>
             </NavLink>
           </ul>
         </div>
         <div>
         <ul className="menu-listItems">
                 <li  className="text-darkWhite" onClick={()=>{navigate('/')}}><HomeIcon/>Back To Home</li>
                 <li onClick={handleLogOut} className="text-darkWhite"><LogoutIcon />LogOut</li>
               </ul>
         </div>
       </div>
       {/* for mobile */}
         {/* for mobile */}
         <div className={`leftMenu-wrapperForMobile ${expanded ? 'expanded' : ''}`}>
           <div className="icons-only">
             <div className={`p-2 pt-7 list-none	 humburger-forMobile  ${expanded ? 'expanded' : ''}`} onClick={toggleMenu}>
               <li className="text-darkWhite">{expanded? <MenuOpenIcon/> :  <MenuIcon /> }</li>
             </div>
             {/*image  */}
             <div>
             <div className={`sellerImg ${expanded ? 'expanded' : ''} `}>
               <img  src={sellerDetails.profilePhoto?.url? sellerDetails.profilePhoto?.url : imageUrl} alt="" />
             </div>
             {expanded &&  <div className="text-white font-Quicksand text-center ">
               <p className="text-lg  font-bold">{sellerDetails?.username}</p>
               <p className="text-darkWhite">{sellerDetails.userType? sellerDetails.userType : 'Not Set yet'}</p>
             </div>}
             
             </div>
             {/* nav icons */}
             <div className="menu-listItems text-xl ">
               <ul className="text-darkWhite font-semibold" id="sidebar">
                 <NavLink to="/dashboard/properties">
                   <li><DashboardIcon />
                   {expanded && 'Dashboard'}</li>
                 </NavLink>
                 <NavLink to="/dashboard/addproperties">
                   <li><AddHomeWorkIcon /> {expanded && "Add Property"}</li>
                 </NavLink>
                 <NavLink to="/dashboard/myprofile">
                   <li><AccountCircleIcon />{expanded && "Your Profile"}</li>
                 </NavLink>
               </ul>
             </div>
             {/* logout */}
             <div className="logout">
               <ul className="menu-listItems">
                <li onClick={()=>{navigate('/')}} className="text-darkWhite" ><HomeIcon/>{expanded && 'Back To Home'}</li>
                 <li onClick={handleLogOut} className="text-darkWhite"><LogoutIcon /> {expanded && "Log Out"}</li>
               </ul>
             </div>
           </div>
         </div>
      </>
    </>)
   }
   
    </>


  );
}

export default LeftSideMenu;
