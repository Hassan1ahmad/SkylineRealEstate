import React,{ useState,useContext} from 'react'
import "../assets/CSS/profile.css";
import CreateIcon from '@mui/icons-material/Create';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PhoneInput from 'react-phone-input-2'
import DashboardContext from "../context/dashboard/DashboardContext";
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import { TailSpin } from "react-loader-spinner";
import Swal from 'sweetalert2';






function Profile() { 
    const [editProfile, setEditProfile] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [formDetails, setFormDetails] = useState({
        photo: "",
        userType: "",
        homeAddress: "",
        phoneNumber: "" 
    });
    const [formLoading, setFormLoading] = useState(false);

    const context= useContext(DashboardContext)
    const {sellerDetails,loading,fetchSellerDetails} = context

    const details = sellerDetails

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormLoading(true)
        try {
            // Filter out fields with empty values
            const formDataToSend = Object.fromEntries(
                Object.entries(formDetails).filter(([key, value]) => value !== "")
            );
    
            // Send the request with filtered form data

            const response = await axios.put('https://skylinerealestate-dibreg7o.b4a.run/api/seller/updateProfile', formDataToSend,{
                withCredentials: true,
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
            });
            
            // Handle response as needed
            setFormLoading(false)
            
            if (response.status === 200) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Profile details updated",
                    showConfirmButton: false,
                    timer: 3000
                  });
                  setEditProfile(false);
                  setFormDetails({
                    photo: "",
                    userType: "",
                    homeAddress: "",
                    phoneNumber: "" 
                  })
            }
            fetchSellerDetails()
        } catch (error) {
            // Handle errors
            setFormLoading(false)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Please try again",
              });
            console.error('Error:', error);
        }
    };



    const defaultImageUrl = details.profilePhoto?.url? details.profilePhoto?.url : 
    "https://firebasestorage.googleapis.com/v0/b/skylinerealestate-6660c.appspot.com/o/skyline-images%2Fanonymous_avatars_grey_circles.jpg?alt=media&token=9d1c9c6e-6281-41e0-8849-fb35ae6d7702";

    const handleImageUpload = (event) => {
        setFormDetails({...formDetails , photo:event.target.files[0]});


        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setImageUrl(e.target.result);
        };

        reader.readAsDataURL(file);
    };

       // date logic
        let timeAgo;
       if(details.dateJoined){
            timeAgo = formatDistanceToNow(new Date(details?.dateJoined), { addSuffix: true });
       }

  return (
    <div>
        {loading? 
        <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        /> :
         <div className="profile-wrapper font-Quicksand">
        {editProfile?
         <div className='editProfile-form font-Quicksand relative'>
            
            <form action="" onSubmit={handleSubmit}>
         <p onClick={()=>setEditProfile(false)} className='font-semibold text-lg cursor-pointer'><i className="fa-solid fa-angle-left"></i> Edit profile</p>
         <div className='profile-edit-photo'>
             <img src={imageUrl || defaultImageUrl} alt="Uploaded Profile" />
         </div>
         {/* picture input */}
         <div className='mt-2 ml-5 flex justify-between px-10 max-md:flex-col max-md:px-1 max-md:ml-1 max-md:mt-2'>
             <p htmlFor="profilePhoto" className="inline-block  text-2xl max-md:text-xl text-slate-500  font-semibold ">Change Profile photo: </p>
            <input type="file" id="profilePhoto" accept="image/*" onChange={handleImageUpload}  className="border border-gray-300 px-2 py-1 rounded-md w-1/3 max-md:w-68 max-md:mt-2" />
         </div>
         <hr className='border-slate-500/30 mt-5' />
         {/* checkbox */}
         <div className='md:flex justify-between px-10 mt-2 ml-5 max-md:flex-col max-md:px-1 max-md:ml-2 max-md:mt-2'>
        <h2 className="font-semibold text-2xl max-md:text-xl mb-2 text-slate-500">User Type</h2>
        <div className='mr-36 max-md:mr-1'>
            <div className="flex items-center mb-2">
            <input
                type="radio"
                id="houseOwner"
                name="userType"
                value="House Owner"
                onChange={(e)=>setFormDetails({...formDetails, userType:e.target.value})}

                className="mr-2"
            />
            <label htmlFor="houseOwner">House Owner</label>
            </div>
            <div className="flex items-center">
            <input
                type="radio"
                id="realEstateAgent"
                name="userType"
                className="mr-2"
                value="Real Estate Agent"
                onChange={(e)=>setFormDetails({...formDetails, userType:e.target.value})}

            />
            <label htmlFor="realEstateAgent">Real Estate Agent</label>
            </div>
        </div>
        </div>
        <hr className='border-slate-500/30 mt-5' />

         {/* address */}
         <div className='mt-2 ml-5 flex justify-between px-10 max-md:flex-col max-md:px-1 max-md:ml-1 max-md:mt-2'>
        <label htmlFor="address" className="inline-block text-2xl max-md:text-xl text-slate-500  font-semibold ">
            Address: 
        </label>
        <input 
        type="text" 
        id="address"  
        placeholder='Your Address' 
        value={formDetails.homeAddress} 
        onChange={(e) => setFormDetails({...formDetails, homeAddress: e.target.value})} 
        className="border border-gray-300 px-2 py-1 rounded-md w-1/3 h-10 max-md:w-68 max-md:mt-2" 
    />
        </div>
        <hr className='border-slate-500/30 mt-5' />
        {/* PHONE number */}
        <div className='mt-2 ml-5 flex  justify-between px-10 max-md:px-1 max-md:ml-1 max-md:mt-3 max-md:flex-col'>
           <div className=''>
             <p className=" text-2xl max-md:text-xl text-slate-500  font-semibold ">Your Phone Number  </p>
            </div>
            <div className='profile-phone mt-3'>
            <PhoneInput
                country={'pk'}
                placeholder='Your Number'
                value={formDetails.phoneNumber }
                onChange={(phoneNumber) => setFormDetails({ ...formDetails, phoneNumber })}
            />
            </div>
        </div>
        <div className='text-center'>
        <button type="submit" className="bg-customBlue text-white py-2 px-4 mt-5 rounded hover:bg-opacity-80 ">Save Changes</button>
        </div>

            </form>
            {formLoading && (
                <div className="loading-overlay absolute rounded  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
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
                </div>
            )}
        
     </div> :
        // show details
         <div >
        <p className='text-4xl font-bold text-customBlue pt-7 text-center max-md:text-2xl max-md:pt-1 '>My Profile</p>
        {/*profile photo and name */}
        <div className='md:flex max-md:text-center p-3'>
            {/* photo */}
            <div className='profile-photo'>
                <img src={defaultImageUrl} alt="profile pic" />
            </div>
            {/* name */}
            <div className='profile-name ml-2 md:flex justify-between	'>
               <div>
               <p className='text-2xl font-semibold'>{details?.username}</p> 
                <p className='text-slate-400 text-sm'>Joined {timeAgo}</p>
                <p className='text-xl font-semibold text-customBlue mt-4'>Profile Status: <span className='text-lime-400'>{details.isApproved===true? 'Approved' : 'Not Approved yet'}</span>  </p>
                <p>User Type : {details.userType? details.userType : 'Not set Yet'}</p>
               </div>
               <div className='max-md:py-3'>
                {/* edit button */}
                <button onClick={() => setEditProfile(true)} className='font-semibold text-lg text-white bg-customBlue p-1 rounded-lg	 cursor-pointer'>
                <CreateIcon/> Edit Profile
                </button>               
                </div>
                </div>
        </div>
        <div className="profile-contact p-5 pl-10 max-md:p-1 max-md:pl-2 max-md:mt-3 ">
            {/* address */}
            <div>
                <p className=' text-2xl max-md:text-xl '><span className='location text-slate-400'><FmdGoodIcon/></span> {details.homeAddress? details.homeAddress : 'Not set Yet'}</p>
                <p className='text-slate-400 pl-10 text-lg'>Address</p>
            </div>
            <div className='md:flex gap-36 mt-5'>
                <div>
                    <p className='text-2xl max-md:text-xl ' ><span className='location text-slate-400'><PhoneIcon/></span> {details.phoneNumber? details.phoneNumber : 'Not set Yet'}</p>
                    <p className='text-slate-400 pl-10 text-lg'>Phone</p>
                </div>
                <div>
                    <p className='text-2xl max-md:text-sm  ' ><span className='location text-slate-400'><EmailIcon/></span> {details.email}</p>
                    <p className='text-slate-400 pl-10 text-lg'>Email</p>
                </div>
            </div>
        </div>
      </div> }

        </div>
        }
     
    </div>
  )
}

export default Profile
