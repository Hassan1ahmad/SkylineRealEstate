import React,{useState,useEffect} from 'react'
import '../assets/CSS/properties.css'
import axios from 'axios';
import PropertyCard from './PropertyCard';
import ViewPropertyCard from './ViewPropertyCard';
import { ColorRing } from 'react-loader-spinner'
import Slider from 'react-slick'; 



function Properites() {

    const [error, setError] = useState(null);
    const [loading, setloading] = useState(true);
    const [showSearchedProperties, setShowSearchedProperties] = useState(false);
    const [allProperties, setAllProperties] = useState([]);
    const [searchParam, setSearchParam] = useState({
        type : 'Apartment',
        propertyStatus : 'For Sale',
        city: 'Lahore'
    });
    const [isModelOpen,setIsModelOpen] = useState(false);
    const [viewproperty, setViewproperty] = useState();

    //  fetching  all properties
   const fetchdata=async()=>{
    try {
      const fetch= await axios.get('https://skylinerealestate-dibreg7o.b4a.run/api/listing/allProperites')
        setloading(true)
      const response = await fetch
      if (!response) {
        setError('Error fetching properties. Please try again later.')
      } else{

        setAllProperties(response.data.AllProperties)
      }
      setloading(true)
         setloading(false)
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching properties. Please try again later.')
      setloading(false)
    } 
      }


    // useEffect for all properties
   useEffect(() => {
    fetchdata()
   }, []);


    // function when user select a option
    const handleSelectChange=(e)=>{
        setSearchParam({
            ...searchParam,
            [e.target.name]:e.target.value   
        })
    }

    // fetching searched properties from api
    const handleSearch = async () => {
      try {
        setAllProperties([]); // Empty the array
        setShowSearchedProperties(true);
        setloading(true)
    
        let response = await axios.get('https://skylinerealestate-dibreg7o.b4a.run/api/listing/search-Properties', {
          params: searchParam,
        });
    
        if (response.data.searchedProperties.length === 0) {
          setloading(false)
          setError('No Properties found matching your search.'); // Set error state
        } else {
          setAllProperties(response.data.searchedProperties); // Update with searched properties
          setError(null)
          setloading(false)
        }
      } catch (error) {
        setError('Error fetching properties. Please try again later.'); // Set error state
      }
    };  

    const handleViewPropertyClick=(propertyInfo)=>{
      setIsModelOpen(true)
      setViewproperty(propertyInfo)
    }
    
  


    // slider Settings
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true

          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
          }
        }
      ]
    };
  


  // render properties
  const renderProperties = () => {
    if (error) {
      return (
        <div className="error-message text-center flex justify-center items-center	">
          {error}
        </div>
      );
    } else if (loading===true ) {
      return (
        <div className='flex justify-center items-center loader'>
            <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        </div>
      );
    } else {
      return (
        
          <Slider {...settings}>
          {allProperties.map((property) => (
            <div key={property._id} className=''>
              <PropertyCard
                allInfo={property}
                onViewPropertyClick={handleViewPropertyClick}
                image={property.image}
                type={property.type}
                name={property.name}
                city={property.location.city}
                address={property.location.address}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                area={property.builtArea}
                price={property.price}
                status={property.status}
                date={property.yearOfConstruction}
              />
            </div>
          ))}
          </Slider>
        
      );
    }
  };
  
  return (
    <div>
      <div className="property-wrapper">
          <p className='text-center dreams'>Find you dream Property</p>
          {/* Search bar */}
        <div className="search-bar">
            <div className="property-type-search">
                <label className='font-semibold label' htmlFor="Property-type">Prperty-Type:</label> <br />
                <select
                className="select-dropdown" 
                id='Property-type'
                name='type'
                onChange={handleSelectChange}
                >
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
            <div className="property-listing-search">
                <label  className='font-semibold label' htmlFor="property-listing">Property Status:</label> <br /> 
                <select className="select-dropdown" onChange={handleSelectChange} name="propertyStatus" id="property-listing">
                    <option value="For Sale">For sale</option>
                    <option value="For Rent">For Rent</option>
                </select>
            </div>
            <div className="cityName-search">
            <label  className='font-semibold label' htmlFor="cityDropdown">Select City:</label> <br />
                <select className="select-dropdown" onChange={handleSelectChange} id="cityDropdown" name="city">
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Karachi">Karachi</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Multan">Multan</option>
                <option value="Peshawar">Peshawar</option>
                <option value="Quetta">Quetta</option>
                <option value="Lahore">Lahore</option>
                 </select>
            </div>
            <button className="search-button" onClick={handleSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                <path d="M40.2292 39.375C41.1459 37.9375 41.6667 36.2083 41.6667 34.375C41.6667 29.1667 37.5 25 32.2917 25C27.0834 25 22.9167 29.1667 22.9167 34.375C22.9167 39.5833 27.0834 43.75 32.2917 43.75C34.1042 43.75 35.8125 43.2292 37.25 42.3333L43.75 48.7292L46.6459 45.8333L40.2292 39.375ZM32.2917 39.5833C30.9104 39.5833 29.5856 39.0346 28.6088 38.0578C27.6321 37.0811 27.0834 35.7563 27.0834 34.375C27.0834 32.9937 27.6321 31.6689 28.6088 30.6922C29.5856 29.7154 30.9104 29.1667 32.2917 29.1667C33.673 29.1667 34.9978 29.7154 35.9745 30.6922C36.9513 31.6689 37.5 32.9937 37.5 34.375C37.5 35.7563 36.9513 37.0811 35.9745 38.0578C34.9978 39.0346 33.673 39.5833 32.2917 39.5833ZM10.4167 41.6667V25H4.16669L25 6.25L45.8334 25H42.0417C39.5834 22.4375 36.125 20.8333 32.2917 20.8333C24.8334 20.8333 18.75 26.9167 18.75 34.375C18.75 37.0625 19.5417 39.5833 20.8959 41.6667H10.4167Z" fill="#FFF"/>
                </svg>
            </button>
        </div>
        {showSearchedProperties? ( 
        // show searched properties
         <div className="property-card-forSearchedProperties">
           <p onClick={()=>{setError(null);setAllProperties([]);setShowSearchedProperties(false);setloading(true);fetchdata();setError(null)}} className='text-center hover:underline text-sky-400 cursor-pointer decoration-sky-500'>See All Properties</p>
          <p className='text-center font-bold text-2xl'>Searched Properties</p>
          {renderProperties()}

        </div>) :
        ( 
          // show all properties
        <div className="property-Card-forAllProperties">
         <p className='text-center font-bold text-2xl'>Properties</p>
         <p className='text-center'>Check Out some of our latest properties</p>
         
         {renderProperties()}
       </div> ) }
       {isModelOpen && <> <ViewPropertyCard propertyInfo={viewproperty} setIsModelOpen={setIsModelOpen} /> </>}
        
       
      </div>
    </div>
  )
}

export default Properites
