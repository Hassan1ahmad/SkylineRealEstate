import React,{useState,useContext} from 'react';
import DashboardContext from '../context/dashboard/DashboardContext'
import '../assets/CSS/sellerporperties.css';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';
import Swal from 'sweetalert2';



function SellerProperties() {
  const [filter, setFilter] = useState('All');

  const context =useContext(DashboardContext)

  const {properties,loading,fetchSellerProperties} = context 

  

  const handleDeleteProperty=async(id)=>{
    try {
      const response = await axios.delete(`https://skylinerealestate-dibreg7o.b4a.run/api/listing/deletePorperty/${id}`,{
        withCredentials:true,
      })
      const data = response
      if (response.status===200) {
        Swal.fire({
          title: "Deleted!",
          text: `Your property has been deleted with id ${id}.`,
          icon: "success"
        })
        fetchSellerProperties()
      }
      console.log(data)

    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!Please try again later.",
      });
    }
  }

  const handleClickedForDel=(id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteProperty(id)
      }
    });
  }

  const filteredProperties = properties?.filter(property => {
    if (filter === 'All') return true;
    return property.approvalStatus === filter; 
  });

  return (
    <>
    {loading? (<div className='sellerproperties-wrapper flex items-center justify-center'>
      <TailSpin
    visible={true}
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="tail-spin-loading"
    radius="1"
    wrapperStyle={{}}
    wrapperClass=""
    /> 
    </div>) : (
    <div>
    <div className="sellerproperties-wrapper">  
      <p className='font-Quicksand py-2 text-xl max-md:text-lg text-center font-bold text-customColor'>Your Added Properties</p>
      <div className='sellerproperties-nav flex'>
        <p className={`cursor-pointer ml-5 max-md:ml-2 ${filter === 'Approved' ? 'sellerproperties-nav-active' : ''}`} onClick={() => setFilter('Approved')}>Approved</p>
        <p className={`cursor-pointer ${filter === 'pending' ? 'sellerproperties-nav-active' : ''}`} onClick={() => setFilter('pending')}>Pending</p>
        <p className={`cursor-pointer ${filter === 'declined' ? 'sellerproperties-nav-active' : ''}`} onClick={() => setFilter('declined')}>Declined</p>
      </div>
  
      {filteredProperties && filteredProperties.length > 0 ? (
        <div className="sellerproperties-table">
          <table className="modern-table font-Quicksand">
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Property Name</th>
                <th>Property ID</th>
                <th>Added on</th>
                <th>Status</th>
                <th>Type</th>
                <th>Price</th>
                <th>Delete</th>
              </tr>
            </thead> 
            <tbody>
              {filteredProperties.map((property, index) => (
                <tr key={property._id}>
                  <td>{index + 1}</td>
                  <td>{property.name}</td>
                  <td>{property._id}</td>
                  <td>{new Date(Number(property.date)).toLocaleDateString()}</td>
                  <td className={property.approvalStatus === 'Approved' ? 'approved' : property.approvalStatus === 'pending' ? 'pending' : 'declined'}>
                    <span>{property.approvalStatus}</span>
                  </td>
                  <td>{property.status}</td>
                  <td>${property.price}</td>
                  <td>
                    <button onClick={() => handleClickedForDel(property._id)} className="delete-icon">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-2xl font-Quicksand   mt-4 text-customBlue bg-gray-100 p-4 rounded-lg shadow-md mx-auto max-w-md">No properties to display.</p>

      )}
    </div>
  </div>
  
    )}
    </>
  );
}

export default SellerProperties;
