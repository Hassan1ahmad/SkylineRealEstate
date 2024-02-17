import React,{useState,useEffect} from 'react'
import '../assets/CSS/forsale.css'
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner'
import Slider from 'react-slick'; 
import PropertyCard from './PropertyCard';
import ViewPropertyCard from './ViewPropertyCard';


function ForSale(props) {
    const [forSaleProperties, setForSaleProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Error, setError] = useState(null);
    const [isModelOpen,setIsModelOpen] = useState(false);
    const [viewproperty, setViewproperty] = useState();

    const handleViewPropertyClick=(propertyInfo)=>{
      setIsModelOpen(true)
      setViewproperty(propertyInfo)
    }

    // fetching data from API
    const Fetchdata=async()=>{
        // try Catch
        try {
            setLoading(true)
            const response = await axios.get(`https://skylinerealestate-dibreg7o.b4a.run/api/listing/search-Properties?propertyStatus=For ${props.sale}`)
            if(response.data.searchedProperties.length ===0){
                setLoading(false)
                setError(`Sorry! No properties available For ${props.sale}`)
            }else{
                setLoading(false)
                setForSaleProperties(response.data.searchedProperties)
                setError(null)
            }

        } catch (error) {
            setError(`Error fetching For ${props.sale} properties. Please try again later.`); // Set error state
        }
    }
        // use Effect
    useEffect(() => {
    Fetchdata()
    // eslint-disable-next-line
    }, []);
   
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
                if (Error) {
                  return (
                    <div className="error-message text-center flex justify-center items-center	">
                      {Error}
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
                      {forSaleProperties.map((property) => (
                        <div key={property._id} className=''>
                          <PropertyCard
                            image={property.image}
                            allInfo={property}
                            onViewPropertyClick={handleViewPropertyClick}
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
      <div className="forSale-wrapper">
        <p className='text-center font-bold text-3xl pt-5'>For {props.sale}</p>
        <div className="property-cardForProperties">
            {renderProperties()}
        </div>
        {isModelOpen && <> <ViewPropertyCard propertyInfo={viewproperty} setIsModelOpen={setIsModelOpen} /> </>}


      </div>
    </div>
  )
}

export default ForSale
