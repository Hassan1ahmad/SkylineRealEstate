import React,{useState,useEffect} from 'react'
import '../assets/CSS/properties.css'
import axios from 'axios';
import PropertyCard from './PropertyCard';
import ViewPropertyCard from './ViewPropertyCard';
import { ColorRing } from 'react-loader-spinner'
import Slider from 'react-slick'; 



// const properties= [{
//   "_id": {
//     "$oid": "65b670ddfa35d4e5ca6de2d6"
//   },
//   "seller": {
//     "$oid": "658eaffab3c0103cff800d5b"
//   },
//   "type": "Apartment",
//   "name": "My Property",
//   "description": "Birdie & Falcon. Residential complex consisting of 205 exclusive homes finished on the first line of the golf course, all of them with large terraces or private gardens and magnificent views of the sea. The complex has houses with modern architecture from 1 to 3 bedrooms, kitchens furnished and equipped with high-end appliances, an excellent distribution and orientation, with a garage space and storage room included in the sale price.",
//   "status": "For Sale",
//   "price": 70000,
//   "bedrooms": 2,
//   "bathrooms": 7,
//   "kitchen": 1,
//   "floor": 3,
//   "builtArea": 1200,
//   "yearOfConstruction": 2020,
//   "location": {
//     "address": "123 Main Street",
//     "city": "Lahore",
//     "state": "Punjab",
//     "country": "Pakistan"
//   },
//   "additionalFeatures": [
//     "Swimming Pool",
//     "Garden","Basement",
//     "Fitted Wardrobes",
//     "Air Conditioning",
//     "Swimming Pool",
//     "Family Room",
//     "Disability Features",
//     "Lift",
//     "Spa/Hot Tub",
//     "Storage Room",
//     "Garden",
//     "Terrace"
//   ],
//   "image": [
//     {
//       "url": "https://firebasestorage.googleapis.com/v0/b/skylinerealestate-6660c.appspot.com/o/skyline-images%2FPC%201.png_2024-1-28%2020%3A20%3A11?alt=media&token=e017f702-e477-497e-98d5-0a028a054c53",
//       "name": "PC 1.png_2024-1-28 20:20:11",
//       "_id": {
//         "$oid": "65b670ddfa35d4e5ca6de2d7"
//       }
//     },
//     {
//       "url": "https://firebasestorage.googleapis.com/v0/b/skylinerealestate-6660c.appspot.com/o/skyline-images%2Fluxury%20pool%20villa%20spectacular%20contemporary%20design%20digital_2024-1-28%2020%3A20%3A11?alt=media&token=a4554e83-4cde-449c-9fa8-0d93f1cce5eb",
//       "name": "luxury pool villa spectacular contemporary design digital_2024-1-28 20:20:11",
//       "_id": {
//         "$oid": "65b670ddfa35d4e5ca6de2d8"
//       }
//     }
//   ],
//   "date": "1706455083003",
//   "__v": 0
// },{
//   "_id": {
//     "$oid": "65b61a5d75ff50684fee1309"
//   },
//   "seller": {
//     "$oid": "658eaffab3c0103cff800d5b"
//   },
//   "type": "Apartment",
//   "name": "My Property",
//   "description": "A beautiful apartment",
//   "status": "For Sale",
//   "price": 5000,
//   "bedrooms": 2,
//   "bathrooms": 4,
//   "kitchen": 1,
//   "floor": 3,
//   "builtArea": 1200,
//   "yearOfConstruction": 2020,
//   "location": {
//     "address": "123 Main Street",
//     "city": "Lahore",
//     "state": "Punjav",
//     "country": "Pakistan"
//   },
//   "additionalFeatures": [
//     "Swimming Pool",
//     "Garden","Basement",
//     "Fitted Wardrobes",
//     "Air Conditioning",
//     "Swimming Pool",
//     "Family Room",
//     "Disability Features",
//     "Lift",
//     "Spa/Hot Tub",
//     "Storage Room",
//     "Garden",
//     "Terrace"
//   ],
//   "image": [
//     {
//       "url": "https://firebasestorage.googleapis.com/v0/b/skylinerealestate-6660c.appspot.com/o/skyline-images%2Fluxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge%20(1).jpg_2024-1-28%2014%3A11%3A37?alt=media&token=e5b3a36f-f514-44e7-af26-82693b20fa30",
//       "name": "luxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge (1).jpg_2024-1-28 14:11:37",
//       "_id": {
//         "$oid": "65b61a5d75ff50684fee130a"
//       }
//     }
//   ],
//   "date": "1706431277854",
//   "__v": 0
// },
// {
//   "_id": {
//     "$oid": "65b61c5ec45c014e8ce74689"
//   },
//   "seller": {
//     "$oid": "658eaffab3c0103cff800d5b"
//   },
//   "type": "Apartment",
//   "name": "My Property",
//   "description": "A beautiful apartment",
//   "status": "For Sale",
//   "price": 5000,
//   "bedrooms": 2,
//   "bathrooms": 4,
//   "kitchen": 1,
//   "floor": 3,
//   "builtArea": 1200,
//   "yearOfConstruction": 2020,
//   "location": {
//     "address": "123 Main Street",
//     "city": "Lahore",
//     "state": "Punjav",
//     "country": "Pakistan"
//   },
//   "additionalFeatures": [
//     "Swimming Pool",
//     "Garden"
//   ],
//   "image": [
//     {
//       "url": "https://firebasestorage.googleapis.com/v0/b/skylinerealestate-6660c.appspot.com/o/skyline-images%2Fluxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge%20(1).jpg_2024-1-28%2014%3A11%3A37?alt=media&token=e5b3a36f-f514-44e7-af26-82693b20fa30",
//       "name": "luxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge (1).jpg_2024-1-28 14:11:37",
//       "_id": {
//         "$oid": "65b61a5d75ff50684fee130a"
//       }
//     }
//   ],
//   "date": "1706431277854",
//   "__v": 0
// },
// {
//   "_id": {
//     "$oid": "65b61c5ec45c014e8ce7468a"
//   },
//   "seller": {
//     "$oid": "658eaffab3c0103cff800d5b"
//   },
//   "type": "Apartment",
//   "name": "My Property",
//   "description": "A beautiful apartment",
//   "status": "For Rent",
//   "price": 5000,
//   "bedrooms": 2,
//   "bathrooms": 4,
//   "kitchen": 1,
//   "floor": 3,
//   "builtArea": 1200,
//   "yearOfConstruction": 2020,
//   "location": {
//     "address": "123 Main Street",
//     "city": "Lahore",
//     "state": "Punjav",
//     "country": "Pakistan"
//   },
//   "additionalFeatures": [
//     "Swimming Pool",
//     "Garden"
//   ],
//   "image": [
//     {
//       "url": "https://firebasestorage.googleapis.com/v0/b/skylinerealestate-6660c.appspot.com/o/skyline-images%2Fluxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge%20(1).jpg_2024-1-28%2014%3A11%3A37?alt=media&token=e5b3a36f-f514-44e7-af26-82693b20fa30",
//       "name": "luxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge (1).jpg_2024-1-28 14:11:37",
//       "_id": {
//         "$oid": "65b61a5d75ff50684fee130a"
//       }
//     }
//   ],
//   "date": "1706431277854",
//   "__v": 0
// },
// {
//   "_id": {
//     "$oid": "65b61c5ec45c014e8ce7468b"
//   },
//   "seller": {
//     "$oid": "658eaffab3c0103cff800d5b"
//   },
//   "type": "Apartment",
//   "name": "My Property",
//   "description": "A beautiful apartment",
//   "status": "For Sale",
//   "price": 5000,
//   "bedrooms": 2,
//   "bathrooms": 4,
//   "kitchen": 1,
//   "floor": 3,
//   "builtArea": 1200,
//   "yearOfConstruction": 2020,
//   "location": {
//     "address": "123 Main Street",
//     "city": "Lahore",
//     "state": "Punjav",
//     "country": "Pakistan"
//   },
//   "additionalFeatures": [
//     "Swimming Pool",
//     "Garden"
//   ],
//   "image": [
//     {
//       "url": "https://firebasestorage.googleapis.com/v0/b/skylinerealestate-6660c.appspot.com/o/skyline-images%2Fluxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge%20(1).jpg_2024-1-28%2014%3A11%3A37?alt=media&token=e5b3a36f-f514-44e7-af26-82693b20fa30",
//       "name": "luxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge (1).jpg_2024-1-28 14:11:37",
//       "_id": {
//         "$oid": "65b61a5d75ff50684fee130a"
//       }
//     }
//   ],
//   "date": "1706431277854",
//   "__v": 0
// },
// {
//   "_id": {
//     "$oid": "65b61c5ec45c014e8ce7468c"
//   },
//   "seller": {
//     "$oid": "658eaffab3c0103cff800d5b"
//   },
//   "type": "Apartment",
//   "name": "My Property",
//   "description": "A beautiful apartment",
//   "status": "For Rent",
//   "price": 5000,
//   "bedrooms": 2,
//   "bathrooms": 4,
//   "kitchen": 1,
//   "floor": 3,
//   "builtArea": 1200,
//   "yearOfConstruction": 2020,
//   "location": {
//     "address": "123 Main Street",
//     "city": "Lahore",
//     "state": "Punjav",
//     "country": "Pakistan"
//   },
//   "additionalFeatures": [
//     "Swimming Pool",
//     "Garden"
//   ],
//   "image": [
//     {
//       "url": "https://firebasestorage.googleapis.com/v0/b/skylinerealestate-6660c.appspot.com/o/skyline-images%2Fluxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge%20(1).jpg_2024-1-28%2014%3A11%3A37?alt=media&token=e5b3a36f-f514-44e7-af26-82693b20fa30",
//       "name": "luxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge (1).jpg_2024-1-28 14:11:37",
//       "_id": {
//         "$oid": "65b61a5d75ff50684fee130a"
//       }
//     }
//   ],
//   "date": "1706431277854",
//   "__v": 0
// },
// {
//   "_id": {
//     "$oid": "65b61c5ec45c014e8ce7468d"
//   },
//   "seller": {
//     "$oid": "658eaffab3c0103cff800d5b"
//   },
//   "type": "Apartment",
//   "name": "My Property",
//   "description": "A beautiful apartment",
//   "status": "For Sale",
//   "price": 5000,
//   "bedrooms": 2,
//   "bathrooms": 4,
//   "kitchen": 1,
//   "floor": 3,
//   "builtArea": 1200,
//   "yearOfConstruction": 2020,
//   "location": {
//     "address": "123 Main Street",
//     "city": "Lahore",
//     "state": "Punjav",
//     "country": "Pakistan"
//   },
//   "additionalFeatures": [
//     "Swimming Pool",
//     "Garden"
//   ],
//   "image": [
//     {
//       "url": "https://firebasestorage.googleapis.com/v0/b/skylinerealestate-6660c.appspot.com/o/skyline-images%2Fluxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge%20(1).jpg_2024-1-28%2014%3A11%3A37?alt=media&token=e5b3a36f-f514-44e7-af26-82693b20fa30",
//       "name": "luxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge (1).jpg_2024-1-28 14:11:37",
//       "_id": {
//         "$oid": "65b61a5d75ff50684fee130a"
//       }
//     }
//   ],
//   "date": "1706431277854",
//   "__v": 0
// },
// {
//   "_id": {
//     "$oid": "65b61c5ec45c014e8ce7468e"
//   },
//   "seller": {
//     "$oid": "658eaffab3c0103cff800d5b"
//   },
//   "type": "Apartment",
//   "name": "My Property",
//   "description": "A beautiful apartment",
//   "status": "For Rent",
//   "price": 5000,
//   "bedrooms": 2,
//   "bathrooms": 4,
//   "kitchen": 1,
//   "floor": 3,
//   "builtArea": 1200,
//   "yearOfConstruction": 2020,
//   "location": {
//     "address": "123 Main Street",
//     "city": "Lahore",
//     "state": "Punjav",
//     "country": "Pakistan"
//   },
//   "additionalFeatures": [
//     "Swimming Pool",
//     "Garden"
//   ],
//   "image": [
//     {
//       "url": "https://firebasestorage.googleapis.com/v0/b/skylinerealestate-6660c.appspot.com/o/skyline-images%2Fluxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge%20(1).jpg_2024-1-28%2014%3A11%3A37?alt=media&token=e5b3a36f-f514-44e7-af26-82693b20fa30",
//       "name": "luxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge (1).jpg_2024-1-28 14:11:37",
//       "_id": {
//         "$oid": "65b61a5d75ff50684fee130a"
//       }
//     }
//   ],
//   "date": "1706431277854",
//   "__v": 0
// },
// {
//   "_id": {
//     "$oid": "65b61c5ec45c014e8ce7468f"
//   },
//   "seller": {
//     "$oid": "658eaffab3c0103cff800d5b"
//   },
//   "type": "Apartment",
//   "name": "My Property",
//   "description": "A beautiful apartment",
//   "status": "For Sale",
//   "price": 5000,
//   "bedrooms": 2,
//   "bathrooms": 4,
//   "kitchen": 1,
//   "floor": 3,
//   "builtArea": 1200,
//   "yearOfConstruction": 2020,
//   "location": {
//     "address": "123 Main Street",
//     "city": "Lahore",
//     "state": "Punjav",
//     "country": "Pakistan"
//   },
//   "additionalFeatures": [
//     "Swimming Pool",
//     "Garden"
//   ],
//   "image": [
//     {
//       "url": "https://firebasestorage.googleapis.com/v0/b/skylinerealestate-6660c.appspot.com/o/skyline-images%2Fluxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge%20(1).jpg_2024-1-28%2014%3A11%3A37?alt=media&token=e5b3a36f-f514-44e7-af26-82693b20fa30",
//       "name": "luxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge (1).jpg_2024-1-28 14:11:37",
//       "_id": {
//         "$oid": "65b61a5d75ff50684fee130a"
//       }
//     }
//   ],
//   "date": "1706431277854",
//   "__v": 0
// },
// {
//   "_id": {
//     "$oid": "65b61c5ec45c014e8ce74690"
//   },
//   "seller": {
//     "$oid": "658eaffab3c0103cff800d5b"
//   },
//   "type": "Apartment",
//   "name": "My Property",
//   "description": "A beautiful apartment",
//   "status": "For Rent",
//   "price": 5000,
//   "bedrooms": 2,
//   "bathrooms": 4,
//   "kitchen": 1,
//   "floor": 3,
//   "builtArea": 1200,
//   "yearOfConstruction": 2020,
//   "location": {
//     "address": "123 Main Street",
//     "city": "Lahore",
//     "state": "Punjav",
//     "country": "Pakistan"
//   },
//   "additionalFeatures": [
//     "Swimming Pool",
//     "Garden"
//   ],
//   "image": [
//     {
//       "url": "https://firebasestorage.googleapis.com/v0/b/skylinerealestate-6660c.appspot.com/o/skyline-images%2Fluxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge%20(1).jpg_2024-1-28%2014%3A11%3A37?alt=media&token=e5b3a36f-f514-44e7-af26-82693b20fa30",
//       "name": "luxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge (1).jpg_2024-1-28 14:11:37",
//       "_id": {
//         "$oid": "65b61a5d75ff50684fee130a"
//       }
//     }
//   ],
//   "date": "1706431277854",
//   "__v": 0
// },{
//   "_id": {
//     "$oid": "65b63f46f49294b6efd7858c"
//   },
//   "seller": {
//     "$oid": "658eaffab3c0103cff800d5b"
//   },
//   "type": "Apartment",
//   "name": "My Property",
//   "description": "A beautiful apartment",
//   "status": "For Sale",
//   "price": 70000,
//   "bedrooms": 2,
//   "bathrooms": 7,
//   "kitchen": 1,
//   "floor": 3,
//   "builtArea": 1200,
//   "yearOfConstruction": 2020,
//   "location": {
//     "address": "123 Main Street",
//     "city": "Lahore",
//     "state": "Punjav",
//     "country": "Pakistan"
//   },
//   "additionalFeatures": [
//     "Swimming Pool",
//     "Garden"
//   ],
//   "image": [
//     {
//       "url": "https://firebasestorage.googleapis.com/v0/b/skylinerealestate-6660c.appspot.com/o/skyline-images%2FPC%201.png_2024-1-28%2016%3A49%3A18?alt=media&token=c9dc4953-9a2d-47b4-8ada-c05053d32c2e",
//       "name": "PC 1.png_2024-1-28 16:49:18",
//       "_id": {
//         "$oid": "65b63f46f49294b6efd7858d"
//       }
//     }
//   ],
//   "date": "1706442554689",
//   "__v": 0
// }]



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
