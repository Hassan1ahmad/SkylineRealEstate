
import { useState } from 'react';
import DashboardContext from './DashboardContext' ;
import axios from 'axios';


const DashState = (props)=>{
 
  
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sellerDetails, setSellerDetails] = useState({});
  const [tokenError, setTokenError] = useState(false)
  const [properties, setproperties] = useState();

  const fetchSellerDetails = async () => {
    try {
      setError(null);
      setLoading(true);
      setSellerDetails({})
      setTokenError(false)
      const response = await axios.get('https://skylinerealestate-dibreg7o.b4a.run/api/seller/sellerDetails', {
        withCredentials: true,
      });
      const data = response.data;
      setTokenError(false)
      setLoading(false);
      setSellerDetails(data.sellerDetails);
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 400)) {
        const errorData = error.response.data;
        if (errorData.error === 'unUnauthorized: No token provided' || errorData.error === 'Unauthorized: Invalid token') {
          // If error is related to token, navigate to login page
          setTokenError(true)
        }
      }else{
        console.error('Error fetching seller details:', error);
        setError('Network error. Please check your internet connection.');
      }
    }
          setLoading(false);

  };

  const fetchSellerProperties= async ()=>{
      try {
        setError(null);
        setLoading(true);
        setTokenError(false)
        const response = await axios.get('https://skylinerealestate-dibreg7o.b4a.run/api/listing/SellerProperties', {
          withCredentials: true,
        })
        const data = response.data;
        setTokenError(false)
        setLoading(false);
        setproperties(data.SellerProperties)
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 400)) {
          const errorData = error.response.data;
          if (errorData.error === 'Unauthorized: No token provided' || errorData.error === 'Unauthorized: Invalid token') {
            // If error is related to token, navigate to login page
            setTokenError(true)
          }
        }
      }
  }

 
    return (
        <DashboardContext.Provider value={{properties,loading, setTokenError,error,setError, sellerDetails, fetchSellerDetails,fetchSellerProperties,tokenError}}>
            {props.children}
        </DashboardContext.Provider> 
    )
}

export default DashState;