
import { useState } from 'react';
import DashboardContext from './DashboardContext' ;
import axios from 'axios';


const DashState = (props)=>{
 
  
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sellerDetails, setSellerDetails] = useState({});
  const [properties, setproperties] = useState();

  const fetchSellerDetails = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get('https://skylinerealestate-dibreg7o.b4a.run/api/seller/sellerDetails', {
        withCredentials: true,
      });
      const data = response.data;
      setLoading(false);
      setSellerDetails(data.sellerDetails);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching seller details:', error);
      setError('Network error. Please check your internet connection.');
    }
  };

  const fetchSellerProperties= async ()=>{
      try {
        setError(null);
        setLoading(true);
        const response = await axios.get('https://skylinerealestate-dibreg7o.b4a.run/api/listing/SellerProperties', {
          withCredentials: true,
        })
        const data = response.data;
        setLoading(false);
        setproperties(data.SellerProperties)
      } catch (error) {
        
      }
  }
    
    return (
        <DashboardContext.Provider value={{properties,loading, error,setError, sellerDetails, fetchSellerDetails,fetchSellerProperties}}>
            {props.children}
        </DashboardContext.Provider>
    )
}

export default DashState;