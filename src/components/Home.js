import React,{useState} from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import '../assets/CSS/home.css'
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import Swal from 'sweetalert2';

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

function Home() {
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    description: '',
    consent: false,
    formType: 'Form1'
  });

  const formSuccess=()=>{
    Toast.fire({
      icon: "success",
      title: "Submitted successfully. We will contact you soon"
    });
    setFormData({
      name: '',
      number: '',
      email: '',
      description: '',
      consent: false,
      formType: 'Form1'
    })

  }

  const handleSubmit=async(e)=>{
    e.preventDefault() 
    if(formData.consent){
      try {
        setLoading(true)
        const response = await axios.post('https://skylinerealestate-dibreg7o.b4a.run/api/form/submitform',formData)
        setLoading(false)
        if(response.status===201){
          formSuccess()
        }
      } catch (error) {
        setLoading(false)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  }

  

  return (
    <div className='home-container'>
     <div className="home-wrapper">
      <div className="home-left-content">
        <div className="home-heading">
        Unlock the door to your ideal home
        </div>
        <div className="home-description">
        Browse, explore, and find the perfect property with our innovative website. Seamlessly connect with sellers, agents, and a vibrant community of home seekers. <br /> Your dream home awaits!
        </div>
      </div>
      <div className="home-right-content">
        <div className="home-contact-us">
          {/* form */}
          {loading? (
            <div className='home-contact-us flex justify-center items-center'>
              {loader}
            </div>
            ) : 
          <form className='home-form' action="" onSubmit={handleSubmit}>
            <h3 className='font-bold text-xl'>Let us call you</h3>
            <div>To help you choose your property</div>
          <div className="first-line-input">
            <input
             type="text"
              placeholder='Your name'
              value={formData.name}
              required
              onChange={(e)=>setFormData({...formData, name:e.target.value})} />  
            <PhoneInput
              country={'pk'}
              value={formData.number}
              onChange={(value) => setFormData({...formData, number:value})}
              placeholder='Your Number'
              inputProps={{
                required: true 
               }}

            />
          </div>
          <input 
          className='home-input-email' 
          type="email" 
          placeholder='Email' 
          value={formData.email}
          required
          onChange={(e)=>setFormData({...formData, email:e.target.value})} />  
          <textarea placeholder='Tell us about desired property'  
          className='home-text-area'
          required
          value={formData.description}
          onChange={(e)=>setFormData({...formData, description:e.target.value})}

          cols="56" rows="4"></textarea>
          <br />
          <input 
          type="checkbox" 
          id="agreement" 
          name="consent" 
          required
          checked={formData.consent}
          onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
        />
              <label required className='checkbox-lable' htmlFor="agreemant"> I consent to having this website store my submitted information so they can respond to my inquiry.</label><br/>
              <button className='home-submit' type='submit'>Submit</button>
          </form> 
          }
        </div>
      </div>
     </div>
    </div>
  )
}

export default Home
