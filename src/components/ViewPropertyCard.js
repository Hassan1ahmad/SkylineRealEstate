import React,{useEffect,useRef,useState} from 'react';
import { formatDistanceToNow } from 'date-fns';
import Slider from 'react-slick';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ReCAPTCHA from 'react-google-recaptcha';
import '../assets/CSS/viewproperty.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { TailSpin } from 'react-loader-spinner';



// toast
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
// loader
const loader = <TailSpin
visible={true}
height="80"
width="80"
color="#4fa94d"
ariaLabel="tail-spin-loading"
radius="1"
wrapperStyle={{}}
wrapperClass=""
/>



function ViewPropertyCard({ setIsModelOpen,propertyInfo }) {



  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    description: '',
    formType: 'Form2',
    recaptchaToken: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formSuccess=()=>{
    Toast.fire({
      icon: "success",
      title: "Submitted successfully. We will contact you soon"
    });
    setSuccess('Submitted successfully. The agent will contact you soon.')
    setTimeout(() => {
      setSuccess('')
    }, 4000);
    setFormData({
      name: '',
      number: '',
      email: '',
      description: '',
      formType: 'Form1'
    })

  }

  const handleSubmit=async(e)=>{
    e.preventDefault() 
   
      try {
        setLoading(true)
        setError('')
        setSuccess('')
        const response = await axios.post('https://skylinerealestate-dibreg7o.b4a.run/api/form/submitform',formData)
        setLoading(false)
        if(response.status===201){
          formSuccess()
        }
        console.log(response)
      } catch (error) {
        setLoading(false)
        if(error.response){
          if(error.response?.data.message){
              setError(error.response.data.message)
          }else{
            setError('An error occurred.Please try again')
          }
        }else{
          setError('An error occurred.Please try again')
        }
      }
  }

// showmore logic
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore); 
  };
  const description = propertyInfo.description

  const displayDescription = showMore
    ? description
    : description.split(' ').slice(0, 50).join(' ');

    useEffect(() => {
      const wordCount = description.split(' ').length;
  
      if (wordCount <= 50) {
        setShowMore(true);
      }
    }, [description]);
    
    // date logic
    const propertyDate= parseInt(propertyInfo.date) 

    const timeAgo = formatDistanceToNow(propertyDate , { addSuffix: true });

  // next previous buttons
  const sliderRef = useRef(null);

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

   // slider Settings
   const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false

        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };

  // image  
  const images = propertyInfo.image
  
  useEffect(() => {
    // Disable scrolling when the modal is open
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when the modal is closed
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleCloseModal = () => {
    setIsModelOpen(false);
  };



  const handleVirtualGuide=()=>{
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your request has been sent",
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        container: 'custom-swal-container' // Define a custom class name
      }
    });
    setTimeout(() => {
      setIsSent(false)
    }, 2000);
  }
  return (
    <div className="viewproperty-background">
      <div className="viewproperty-wrapper">
        {/* close  */}
        <div className='viewproperty-close'>
        <i className="fa-solid fa-xmark float-right cursor-pointer 	" onClick={handleCloseModal}></i>
        </div>
        <p className="text-center text-2xl font-bold">Poperties Details</p>
        {/* listing detail */}
      <fieldset className='fieldset'>
        <legend >Listing Detail</legend>
          <div className="viewproperty-pic">
              <Slider ref={sliderRef} {...settings} > 
                {images.map((image,index)=>(
                  <div key={index}>
                       <img src={image.url} alt={image.name} /> 
                  </div>
                ))}
              </Slider>
              <div className="img-details">
                <div><i className="fa-regular fa-file-image"></i>{images.length} {images.length>1?'Photos':'photo'}</div>
                <div><i onClick={previous} className="fa-solid fa-arrow-left left"></i><i onClick={next} className="fa-solid fa-arrow-right"></i></div>
              </div>
          </div>
          <div className="viewproperty-info">
            <div className='text-3xl	pt-5 font-semibold	'>{propertyInfo.type} {propertyInfo.status} in {propertyInfo.location.city} </div>
            <div className='text-2xl py-3'>Price: PKR {propertyInfo.price} </div>
            <div>
              <p>{propertyInfo.builtArea} Sq Ft</p>
              <div className="vertical-line"></div>
              <p>{propertyInfo.floor} Floors</p>
              <div className="vertical-line"></div>
              <p>{propertyInfo.bedrooms} Bedrooms</p>
              </div>
          </div>
          <div className="viewproperty-whislist my-4 font-bold">
          <i className="fa-solid fa-shield-heart"></i> Add to wishlist
          </div>
        </fieldset>
        {/* property description */}
        <fieldset className='fieldset mt-5'>
          <legend>Property Description</legend>
          <div className='viewproperty-description'><p>{displayDescription} {!showMore && (
          <button className='underline text-customColor	' onClick={toggleShowMore}>See more</button>
        )} </p></div>
          
        </fieldset>
        {/* Features */}
        <fieldset className='fieldset mt-5'>
          <legend>Features</legend>
          <div className='feature-lists'>
            {propertyInfo.additionalFeatures.map((feature,index)=>(
              <ul className='inline-block text-xl max-[640px]:block'  key={index}>
                <li className='custom-list-item min-w-96 max-[640px]:min-w-9 mb-3'>{feature}</li>
              </ul>
            ))}
            <hr className='	border-t-2 border-customColor' />
            <div className='text-lg py-3'><i className="fa-solid fa-circle-exclamation text-customColor"></i> Listing updated {timeAgo}</div>
          </div>
        </fieldset>
        {/* guide */}
        <div className='viewProperty-guide md:flex p-5 max-[640px]:p-3'>
              <div>
                <img className='pr-3 max-[640px]:ml-24' src={require('../assets/pictures/location 1.png')} alt="" />
              </div>
              <div>
                <p className='text-2xl font-semibold max-[640px]:text-base	'>Visit this property without leaving home</p>
                <p className='py-4 max-[640px]:py-1 text-justify	'>You can contact and request a guided tour of this property with complete peace of mind and without having to travel.</p>
                <p onClick={handleVirtualGuide} className='text-customColor underline hover:underline-offset-2 cursor-pointer text-lg	'>  {isSent ? 'Your request has been sent' : 'Request a virtual guide tour'}</p>
              </div>
        </div>
        {/* location */}
        <fieldset className='fieldset mt-5'>
          <legend>Location</legend>
          <div className='flex'>
            <ul className='font-semibold text-xl max-[640px]:text-base location-li'>
              <li>Country</li>
              <li>State/Region/Province</li>
              <li>City</li>
              <li>Address</li>
            </ul>
            <ul className='text-xl max-[640px]:text-base location-li'>
              <li>{propertyInfo.location.country}</li>
              <li>{propertyInfo.location.state}</li>
              <li>{propertyInfo.location.city}</li>
              <li>{propertyInfo.location.address}</li>
            </ul>
          </div>
        </fieldset>
        {/* seen error */}
        <div className="viewProperty-error md:flex  p-5 max-[640px]:p-2">
          <div>
            <img className='pr-10 max-[640px]:ml-28' src={require('../assets/pictures/error 1.png')} alt="" />
          </div>
          <div>
            <p className='text-2xl font-semibold max-[640px]:text-lg max-[640px]:text-center 	'>Have you seen an Error ?</p>
            <p className='py-4 max-[640px]:py-1'>Inform us in order to correct it and help others.</p>
            <p className='text-customColor underline hover:underline-offset-2 cursor-pointer text-lg max-[640px]:text-base' >Reach out to us, and tell us about Error</p>
          </div>
        </div>
        {/*agent  */}
        <fieldset className='fieldset mt-5'>
          <legend>Agent</legend>
          <div className='viewproperty-form'>
            {loading? (
              <div className='flex justify-center items-center h-96'>
                {loader}
              </div>
            ): (
              <>
              {success? (<p className='text-green-500'>{success}</p>):(
            <form action="" onSubmit={handleSubmit}>
              <p className='text-center'>Ask the advertiser</p>

              <input type="text" name="name" id="name"
               placeholder='Name'
               value={formData.name}
               onChange={(e)=>setFormData({...formData, name: e.target.value})}
                required />

              <input type="email" name="email" id="email"
               placeholder='Email'
               value={formData.email}
               onChange={(e)=>setFormData({...formData, email: e.target.value})} required />

              <div className='mt-3'><PhoneInput
              country={'pk'}
              className='phone-input'
              value={formData.number}
              onChange={(value) => setFormData({...formData, number:value})}
              placeholder='Your Number'
              inputProps={{
                required: true 
               }}

            /></div>

             <textarea className='' name="" id="" cols="3" rows="1"  placeholder='Hi, i’m interested in this property and would like to arrange a viewing.'
              value={formData.description}
              onChange={(e)=>setFormData({...formData, description: e.target.value})}
             ></textarea>

             <ReCAPTCHA
             sitekey='6LfRj2MpAAAAAKHkhpHT_EjPV-MybQn_zwV__VMH'
             onChange={(token)=>{setFormData({...formData, recaptchaToken:token})}} />
            {error && <p className='text-red-500 py-1'>{error}</p>}

             <button type="submit">Submit</button>
            </form>
              )}
              </>
            ) }
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default ViewPropertyCard;
