
import React,{useState,useMemo,useEffect, useContext} from 'react';
import '../assets/CSS/addproperty.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { TailSpin } from 'react-loader-spinner' 
import Swal from 'sweetalert2'
import DashboardContext from "../context/dashboard/DashboardContext";



// loader
const loader =  <div className='flex justify-center'><TailSpin
visible={true}
height="40"
width="40"
color="#4fa94d"
ariaLabel="tail-spin-loading"
radius="3"
wrapperStyle={{}}
wrapperClass=""
/></div>

// styles for picture dropzone
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};



const propertyFeatures = [
  'Basement',
  'Fitted Wardrobes',
  'Air Conditioning',
  'Swimming Pool',
  'Family Room',
  'Disability Features',
  'Lift',
  'Spa/Hot Tub',
  'Storage Room',
  'Garden',
  'Terrace',
];


function AddProperty() {
    const [showForm, setShowForm] = useState(false);
    const [imageErrors, setImageErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectAllFeatures, setSelectAllFeatures] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [propertyDetail, setPropertyDetail] = useState({
        propertyType:'',
        propertyStatus:'',
        description:'',
        title:'',
        price:0,
        bedrooms:0,
        bathrooms:0,
        floors:0,
        builtArea: 0,
        yearOfConstruction: new Date().getFullYear(), // Set default value to current year
        plotArea: 0,
        country:'',
        state:'',
        city:'', 
        address:'',
        additionalFeatures:[],
        
    });
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState(null);
    const [apiErrors, setApiErrors] = useState(null);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    // Event listener to update online status
  window.addEventListener('online', () => setIsOnline(true));
  window.addEventListener('offline', () => setIsOnline(false));

  // context Api
  const context= useContext(DashboardContext)
  const {sellerDetails,fetchSellerProperties} = context

    // form dirty
    useEffect(() => {
      const handleBeforeUnload = (event) => {
        if (isFormDirty) {
          const message = "You have unsaved changes. Are you sure you want to leave?";
          event.returnValue = message; // Standard for most browsers
          return message; // For some older browsers
        }
        if(isFormDirty){
           window.confirm('You have unsaved changes. Are you sure you want to leave?');

        }
      };
  
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        // Remove the event listener when the component is unmounted
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, [isFormDirty]);
    // validate form
    const validateForm=()=>{
      setApiErrors(null)
      const errors={}
      const numericFields = ['bedrooms', 'bathrooms', 'floors', 'price', 'builtArea'];
       numericFields.forEach(field => {
    if (propertyDetail[field] <= 0) {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} should be greater than 0`;
    }
      });
      if (images.length === 0) {
        errors['image'] = 'Please Select at least one image';
        setImageErrors('Please Select at least one image')

      }
      // Check if user is offline
    if (!isOnline) {
      errors['offline'] = 'You are currently offline. Please check your internet connection.';
    }
    if(propertyDetail.additionalFeatures.length === 0 ){
      errors['additionalFeatures'] = 'Please Select at least one additionalFeatures';

    }
      setErrors(errors);
        // Return true if there are no errors, else false
      return Object.keys(errors).length === 0;
    }
   

    // handle for add property
    const handleAddClicked=()=>{
      if (sellerDetails.isApproved===false) {
        Swal.fire({
          title: "Profile Not Approved",
          text: "Your profile must be approved before adding properties.",
          icon: "warning"
        });
      }else{
        setShowForm(true);
      }
    }

    // handle for description change
    const handleDescriptionChange = (event) => {
        const { value } = event.target;
        // Ensure description does not exceed 2000 characters
        if (value.length <= 2000) {
          setPropertyDetail({ ...propertyDetail, description: value });
        }
        setIsFormDirty(true)
      };

      // handle increment
      const handleIncrement = (field) => {
        setPropertyDetail((prev) => ({ ...prev, [field]: prev[field] + 1 }));
        setIsFormDirty(true)
      };
    
      // handle decrement
      const handleDecrement = (field) => {
        setPropertyDetail((prev) => ({ ...prev, [field]: Math.max(prev[field] - 1, 0) }));
        setIsFormDirty(true)

      };
      
      // handle for input number fields
      const handleInputChangeForNumber = (field, value) => {
        setPropertyDetail((prev) => ({ ...prev, [field]: value }));
        setIsFormDirty(true)

      };

      // handle for select all checkbox
      const handleSelectAllFeatures = () => {
        setPropertyDetail({
          ...propertyDetail,
          additionalFeatures: propertyFeatures,
        });
        setSelectAllFeatures(true);
        setIsFormDirty(true)

      };
      
            // handle for unselect all checkbox
      const handleUnselectAllFeatures = () => {
        setPropertyDetail({
          ...propertyDetail,
          additionalFeatures: [],
        });
        setSelectAllFeatures(false);
      };
      
            // handle for checkbox change
      const handleFeatureCheckboxChange = (feature) => {
        const updatedFeatures = [...propertyDetail.additionalFeatures];
      
        if (updatedFeatures.includes(feature)) {
          // Feature is already selected, remove it
          updatedFeatures.splice(updatedFeatures.indexOf(feature), 1);
        } else {
          // Feature is not selected, add it
          updatedFeatures.push(feature);
        }
      
        setPropertyDetail({
          ...propertyDetail,
          additionalFeatures: updatedFeatures,
        });
      
        // Check if all features are selected or not
        setSelectAllFeatures(updatedFeatures.length === propertyFeatures.length);
      };

     

          const {
            getRootProps,
            getInputProps,
            isFocused,
            isDragAccept,
          } = useDropzone({
        'image/*': ['.jpeg', '.jpg', '.png'],
        onDrop: acceptedFiles => {
          // Handle dropped files here, you can set the files to the images state
          setImages([...images, ...acceptedFiles]);
        },
        maxFiles: 3,
      });
      const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
      }), [
        isFocused,
        isDragAccept,
      ]);
     
      

      const handleSubmit = async(e) => {
        e.preventDefault();
        


        const formData = new FormData();

        formData.append('type', propertyDetail.propertyType);
        formData.append('status', propertyDetail.propertyStatus);
        formData.append('description', propertyDetail.description);
        formData.append('name', propertyDetail.title);
        formData.append('price', propertyDetail.price);
        formData.append('bedrooms', propertyDetail.bedrooms);
        formData.append('bathrooms', propertyDetail.bathrooms);
        formData.append('floor', propertyDetail.floors);
        formData.append('builtArea', propertyDetail.builtArea);
        formData.append('yearOfConstruction', propertyDetail.yearOfConstruction);
        formData.append('kitchen', 3);
        propertyDetail.additionalFeatures.forEach((feature, index) => {
          formData.append(`additionalFeatures[${index}]`, feature);
        });
              // Append location object properties
        formData.append('location[city]', propertyDetail.city);
        formData.append('location[state]', propertyDetail.state);
        formData.append('location[country]', propertyDetail.country);
        formData.append('location[address]', propertyDetail.address);
        // formData.append('images',images)
        images.forEach((image,index) =>{
          formData.append(`images`,image)
        })

        
        if (validateForm()) {
          try {
            setLoading(true)
            setErrors(null)
           setImageErrors(null)
           setApiErrors(null)
            const response =await axios.post('https://skylinerealestate-dibreg7o.b4a.run/api/listing/addProperty', formData,
             {
              withCredentials: true,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            const data = response.data
            setLoading(false)
            setSuccessMessage(data.message)
            fetchSellerProperties()
          } catch (error) {
            setLoading(false);
            if (error.response) {
              // Server responded with a status code
              if (error.response.status === 400) {
                setApiErrors(`One or more input fields are incorrect.${error.response.data.errors}`,error.response.data.errors);
              } else if (error.response.status === 500) {
                setApiErrors('Internal server error. Please try again later.');
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                });
              } else {
                setApiErrors('An error occurred. Please try again later.');
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                });
              }
            } else if (error.request) {
              // The request was made but no response was received
              // This usually indicates a network error
              setApiErrors('Network error. Please check your internet connection.');
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Network error. Please check your internet connection!",
              });
            } else {
              // Something else happened in setting up the request
              setApiErrors('An error occurred. Please try again later.');
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            }
          }
        }
       
        
    
        // Remove all files after submission
        // images.allFiles.forEach((f) => f.remove());
      };

      const handleRemoveImage = (index, e) => {
        e.preventDefault(); 
        // Remove the image at the specified index from the images array
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
      };
      const maxImageCount = 3; // Set your maximum image count

      
      const validateImageCount = () => {
        if (images.length > maxImageCount) {
          // Automatically remove excess images from the beginning of the array
          const updatedImages = images.slice(0,maxImageCount);
          setImageErrors(`Cannot upload more than ${maxImageCount} images`);
          setTimeout(() => {
            setImageErrors(null)
          }, 5000);
          // You can also set an error state if needed
          setImages(updatedImages);
        }
      };
      
      if (images.length> maxImageCount) {
       validateImageCount()
      }

      const handleMoreProperty=()=>{
        setSuccessMessage(null)
        setApiErrors(null)

        setPropertyDetail({
          propertyType:'',
          propertyStatus:'',
          description:'',
          title:'',
          price:0,
          bedrooms:0,
          bathrooms:0,
          floors:0,
          builtArea: 0,
          yearOfConstruction: new Date().getFullYear(), // Set default value to current year
          plotArea: 0,
          country:'',
          state:'',
          city:'', 
          address:'',
          additionalFeatures:[],
          
      });

      }

      
    

  return (
    <div>
      <div className="addproperties-wrapper font-Quicksand ">
      <h2 className='text-center font-bold text-customBlue text-3xl max-md:text-2xl'>Add New Property</h2>
        {showForm? (<div className='form-background	'>
        {successMessage ? <>
        <p className='text-customColor font-bold text-center mt-32 text-3xl'>{successMessage}</p>
        <button onClick={handleMoreProperty} className="bg-customBlue mt-5 text-center ml-96 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add More Properties
        </button>
        </> : 
         <form action="" onSubmit={handleSubmit} method="post">
         {/* add a listing */}
         <fieldset className='addproperty-fieldset '>
             <legend>Add a Listing</legend>
             {/* dropdowns */}
             <div className='md:flex gap-10'>
                 {/* dropdown for property type */}
             <div className='propertyType'>
             <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
             Property Type
             </label>
             <select
                     id="propertyType"
                     required
                     name="propertyType"
                     value={propertyDetail.propertyType}
                     onChange={(e)=>setPropertyDetail({...propertyDetail, propertyType:e.target.value})}
                     className="mt-1 block w-96 max-md:w-68 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 sm:text-sm"
                     
             >
                 <option  disabled value="">--Select the Property Type--</option>
                 <option value="Apartment">Apartment</option>
                 <option value="Building">Building</option>
                 <option value="House">House</option>
                 <option value="Commercial Property">Commercial Property</option>
                 <option value="Country House">Country House</option>
                 <option value="Land">Land</option>
                 <option value="Office">Office</option>
                 <option value="Parking Space or Garage">Parking Space or Garage</option>
                 <option value="Storage Room">Storage Room</option>
                 <option value="TownHouse">TownHouse</option>

             </select>
             </div>
             {/* drop down for property status */}
             <div className='propertyStatus'>
             <label htmlFor="propertyStatus" className="block text-sm font-medium text-gray-700">
             Property Status
             </label>
             <select 
                    id="propertyStatus"
                    required
                    name="propertyStatus"
                    value={propertyDetail.propertyStatus}
                    onChange={(e)=>setPropertyDetail({...propertyDetail, propertyStatus:e.target.value})}
                    className="mt-1 block w-96 max-md:w-68 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 sm:text-sm">
                 <option disabled value="">--Select the Property Status--</option>
                 <option value="For Sale">For Sale</option>
                 <option value="For Rent">For Rent</option>
             </select>
                 
             </div>
             </div>
             {/* desciption */}
             <div className="mt-4">
             <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                 Description
               </label>
               <textarea
                 required
                 id="description"
                 name="description"
                 value={propertyDetail.description}
                 onChange={handleDescriptionChange}
                 className="mt-1 block w-full max-md:w-68 min-h-24 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 sm:text-sm"
                 rows="4"
                 maxLength="2000"
               ></textarea>
               <p className="mt-2 text-sm text-gray-500">
                 Characters Left: {2000 - propertyDetail.description.length}
               </p>
             </div>
         </fieldset>
         
         {/* common detail */}
         <fieldset className='addproperty-fieldset' >
             <legend>Common Detailes</legend>
             {/* title and price= first line */}
             <div className="md:flex gap-10">
               {/* title */}
                 <div className='title'>
                 <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                 Title
                 </label>
                 <input
                 type="text"
                 name="title"
                 id="title"
                 required
                 pattern="[A-Za-z]+"
                 title="Please enter only alphabets"
                 value={propertyDetail.title}
                 onChange={(e)=>{setPropertyDetail({...propertyDetail, title:e.target.value})}}
                 className="mt-1 block w-96 max-md:w-68 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 sm:text-sm"
                 /> 
                 </div>
              {/* Input for price */}
                 <div className="price max-md:mt-3">
                 <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                     Price (Rs)
                 </label>
                 <div className="relative">
                     <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-500">Rs</span>
                     <input
                     type="number"
                     name="price"
                     id="price"
                     required
                     value={propertyDetail.price}
                     onChange={(e)=>setPropertyDetail({...propertyDetail, price: e.target.value})}
                     className="pl-8 mt-1 block w-96 max-md:w-68   p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 sm:text-sm"
                     style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                     />
                 </div>
                     {errors && <p className='text-red-500 font-semibold'>{errors.price}</p>}
                 </div>
             
             </div>
             {/* bedroom,bathroom and number of floors = 2nd line */}
             <div className='md:flex gap-10 mt-4 '>
                       {/* Bedrooms */}
             <div className="bedrooms">
             <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
                 Bedrooms
             </label>
             <div className="flex items-center border  border-gray-300 rounded-md	 w-52 max-md:w-68">
                 <button
                 type="button"
                 onClick={() => handleDecrement('bedrooms')}
                 className="p-2 w-20 max-md:w-28 bg-customBlue text-white hover:bg-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-500"
                 >
                 -
                 </button>
                 <div className="p-2  w-16 text-center">
                 {propertyDetail.bedrooms}
                 </div>
                 <button
                 type="button"
                 onClick={() => handleIncrement('bedrooms')}
                 className="p-2 w-20 max-md:w-28 bg-customBlue text-white hover:bg-gray-300 rounded-r-md focus:outline-none focus:ring focus:border-blue-500"
                 >
                 +
                 </button>
             </div>
             {errors && <p className='text-red-500 text-sm font-semibold'>{errors.bedrooms}</p>}
             </div>
                       {/* Bathrooms */}
             <div className="bathrooms max-md:mt-4">
             <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 ">
                 Bathrooms
             </label>
             <div className="flex items-center border border-gray-300 rounded-md w-52 max-md:w-68">
                 <button
                 type="button"
                 onClick={() => handleDecrement('bathrooms')}
                 className="p-2 w-20 max-md:w-28  bg-customBlue text-white hover:bg-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-500"
                 >
                 -
                 </button>
                 <div className="p-2 w-16 text-center">
                 {propertyDetail.bathrooms}
                 </div>
                 <button
                 type="button"
                 onClick={() => handleIncrement('bathrooms')}
                 className="p-2 w-20 max-md:w-28 bg-customBlue text-white hover:bg-gray-300 rounded-r-md focus:outline-none focus:ring focus:border-blue-500"
                 >
                 +
                 </button>
             </div>
             {errors && <p className='text-red-500 text-sm font-semibold'>{errors.bathrooms}</p>}

             </div>
                {/* Number of Floors */}
             <div className="floors max-md:mt-4">
             <label htmlFor="floors" className="block text-sm font-medium text-gray-700">
                 Number of Floors
             </label>
             <div className="flex items-center border border-gray-300 rounded-md w-52 max-md:w-68">
                 <button
                 type="button"
                 onClick={() => handleDecrement('floors')}
                 className="p-2 w-20  max-md:w-28 bg-customBlue text-white hover:bg-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-500"
                 >
                 -
                 </button>
                 <div className="p-2 w-16 text-center">
                 {propertyDetail.floors}
                 </div>
                 <button
                 type="button"
                 onClick={() => handleIncrement('floors')}
                 className="p-2  w-20 max-md:w-28 bg-customBlue text-white hover:bg-gray-300 rounded-r-md focus:outline-none focus:ring focus:border-blue-500"
                 >
                 +
                 </button>
             </div>
             {errors && <p className='text-red-500 text-sm font-semibold'>{errors.floors}</p>}

             </div>
             </div>
             {/* Built are, contruction area = 3 line*/}
             <div className="md:flex mt-4 gap-10 mb-5"> 
                   {/* built area */}
                   <div className="builtarea">
                   <label htmlFor="builtArea" className="block text-sm font-medium text-gray-700">
                     Built Area
                   </label>
                   <div className="relative flex items-center w-72 max-md:w-68  ">
                     <input
                       type="number"
                       required
                       name="builtArea"
                       id="builtArea"
                       value={propertyDetail.builtArea}
                       onChange={(e) => handleInputChangeForNumber('builtArea', e.target.value)}

                       className="p-2 border  border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 flex-1"
                     />
                     <span className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-500">Sq Ft</span>
                   </div>
                   {errors && <p className='text-red-500 font-semibold'>{errors.builtArea}</p>}

                   </div>
                   {/* Year of Construction */}
                 <div className="yearOfConstruction">
                   <label htmlFor="yearOfConstruction" className="block text-sm font-medium text-gray-700">
                     Year of Construction
                   </label>
                   <select
                     id="yearOfConstruction"
                     required
                     name="yearOfConstruction"
                     value={propertyDetail.yearOfConstruction}
                     onChange={(e) => handleInputChangeForNumber('yearOfConstruction', e.target.value)}
                     className=" block w-72 max-md:w-68  p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 sm:text-sm"
                   >
                     {/* Populate options with years from 1800 to present */}
                     {Array.from({ length: new Date().getFullYear() - 1799 }, (_, index) => 1800 + index).map((year) => (
                       <option key={year} value={year}>
                         {year}
                       </option>
                     ))}
                   </select>
                 </div>
                   {/* Plot Area (optional) */}
                 <div className="plotArea ">
                   <label htmlFor="plotArea" className="block text-sm font-medium text-gray-700">
                     Plot Area (optional)
                   </label>
                   <div className="relative flex items-center w-72 max-md:w-68 ">
                     <input
                       type="number"
                       name="plotArea"
                       id="plotArea"
                       value={propertyDetail.plotArea}
                       onChange={(e) => handleInputChangeForNumber('plotArea', e.target.value)}
                       className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 flex-1"
                     />
                     <span className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-500">Sq Ft</span>
                   </div>
                 </div>

             </div>
         </fieldset>

        {/* Location */}
       <fieldset className="addproperty-fieldset ">
         <legend>Location</legend>

         {/* Country and State/Region/Province */}
         <div className="md:flex gap-10">
           {/* Country */}
           <div className="country">
             <label htmlFor="country" className="block text-sm font-medium text-gray-700">
               Country
             </label>
             <input
               type="text"
               name="country"
               id="country"
               required
               value={propertyDetail.country}
               onChange={(e) => setPropertyDetail({ ...propertyDetail, country: e.target.value })}
               className="mt-1 block w-72 max-md:w-68  p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 sm:text-sm"
             />
           </div>

           {/* State/Region/Province */}
           <div className="state max-md:mt-4">
             <label htmlFor="state" className="block text-sm font-medium text-gray-700">
               State/Region/Province
             </label>
             <input
               type="text"
               name="state"
               id="state"
               required
               value={propertyDetail.state}
               onChange={(e) => setPropertyDetail({ ...propertyDetail, state: e.target.value })}
               className="mt-1 block w-72 max-md:w-68  p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 sm:text-sm"
             />
           </div>
         </div>

         {/* City and Address */}
         <div className="md:flex gap-10 mt-4 mb-5">
           {/* City */}
           <div className="city">
             <label htmlFor="city" className="block text-sm font-medium text-gray-700">
               City
             </label>
             <input
               type="text"
               name="city"
               id="city"
               required
               value={propertyDetail.city}
               onChange={(e) => setPropertyDetail({ ...propertyDetail, city: e.target.value })}
               className="mt-1 block w-72 max-md:w-68  p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 sm:text-sm"
             />
           </div>

           {/* Address */}
           <div className="address max-md:mt-4">
             <label htmlFor="address" className="block text-sm font-medium text-gray-700">
               Address
             </label>
             <input
               type="text"
               name="address"
               id="address"
               required
               value={propertyDetail.address}
               onChange={(e) => setPropertyDetail({ ...propertyDetail, address: e.target.value })}
               className="mt-1 block w-72 max-md:w-68  p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500 sm:text-sm"
             />
           </div>
         </div>
       </fieldset>

       {/* Additional Features */}
       <fieldset className="addproperty-fieldset mt-4">
         <legend>Additional Information</legend>

         {/* Check All and Uncheck All checkboxes */}
         <div className='md:flex justify-between 	 items-center	'>
         <div>
           <p className='text-xl max-md:text-lg font-bold text-customBlue'>Property Features</p>
         </div>
         <div className="flex items-center max-md:justify-end	  mt-2">
           <label className="inline-flex items-center">
             <input
               type="checkbox"
               className="form-checkbox text-blue-500"
               checked={selectAllFeatures}
               onChange={() => handleSelectAllFeatures()}
             />
             <span className="ml-2 text-customBlue font-semibold">Select All</span>
           </label>

           <label className="inline-flex items-center ml-4">
             <input
               type="checkbox"
               className="form-checkbox"
               checked={!selectAllFeatures}
               onChange={() => handleUnselectAllFeatures()}
             />
             <span className="ml-2 text-customBlue font-semibold">Unselect All</span>
           </label>
         </div>
         </div>

         {/* Checkboxes for property features */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 mb-5 ">
           {propertyFeatures.map((feature) => (
             <label key={feature} className="inline-flex items-center">
               <input
                 type="checkbox"
                 className="form-checkbox text-blue-500"
                 checked={propertyDetail.additionalFeatures.includes(feature)}
                 onChange={() => handleFeatureCheckboxChange(feature)}
               />
               <span className="ml-2 text-gray-700">{feature}</span>
             </label>
           ))}
         </div>
          {errors && <p className='text-red-500 font-semibold'>{errors.additionalFeatures} </p>}

         <hr className='border-customBlue' /> 
         {/* digital Showing */}
         <div className='mb-4'>
         <p className='font-bold text-xl text-customBlue mt-3 '>Showing</p>
         <p className='mt-1'>Select  if you’re able to do a digital showing of this property using, for example, Video Call, Etc</p>
         <label className="inline-flex items-center">
             <input
               type="checkbox"
               className="digital-checkbox text-blue-500"
             />
             <span className="ml-2  font-semibold">Digital Showing (Optional)</span>
           </label>
         </div>

         <hr className='border-customBlue' />
         {/* Add media */}
         <div>
         <p className='font-bold text-xl text-customBlue mt-3 '>Add Media</p>
         <div {...getRootProps({style})} className="dropzone">
         <input {...getInputProps()} />
         <p>Drag 'n' drop some files here, or click to select files</p>
         {/* Display uploaded files */}
       </div>
         <div className="file-previews">
           {images.map((file, index) => (
             <div key={index} className="file-preview">
               <img src={URL.createObjectURL(file)} alt={`preview-${index}`} />
               <button onClick={(e) => handleRemoveImage(index,e)}>Remove</button>
             </div>
           ))}
         </div>
         {imageErrors &&  <div className="bg-red-500 text-white p-4">{imageErrors}</div>}

       <hr className='border-customBlue' />
       <div className='text-center'>
       {errors && <p className='text-red-500 font-semibold'>Please Fill out all the fields</p>}
       {errors && <p className='text-red-500 font-semibold'>{errors.offline } </p>}
       {apiErrors && <p className='text-red-500 font-semibold'>{apiErrors}</p>}
       


       <button disabled={loading}  type="submit" className="w-96 max-md:w-68 bg-blue-500 text-white p-2 rounded my-5 ">{loading? loader: 'Publish Posting'}</button>
       </div>
         </div>
       </fieldset>
     </form>
        } 
        </div>): (
        <>
        <div className="rules-section max-md:p-2">
          <h3 className='border-b-2 text-2xl max-md:text-lg    font-semibold'>Rules for Adding Properties:</h3>
          <ul className='text-xl max-md:text-lg text-justify 	 mt-3 '>
            <li> <ArrowForwardIcon/>Your property information should be accurate and up-to-date.</li>
            <li> <ArrowForwardIcon/>Upload high-quality images showcasing your property.</li>
            <li> <ArrowForwardIcon/>Provide detailed information about amenities and features.</li>
            <li> <ArrowForwardIcon/>Ensure the property complies with local regulations.</li>
          </ul>
          {sellerDetails.isApproved===false && <> 
          <p className='text-red-700 text-lg max-md:text-base max-md:text-center  font-semibold'>Your account must be approved before adding properties.</p>
          <p className='text-red-700 text-lg max-md:text-base max-md:text-center  font-semibold'>Complete your profile to approve your account as soon as possible.</p>
          </>}
        </div>
        <div className="add-property-button">
          <button  onClick={handleAddClicked} >Add Property</button>
        </div>
        </>)}
        
      </div>
    </div>
  );
}

export default AddProperty;
