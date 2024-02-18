import React,{useContext, useState} from 'react'
import { TailSpin } from 'react-loader-spinner'
import '../assets/CSS/signup.css'
import '../assets/CSS/signin.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import DashboardContext from "../context/dashboard/DashboardContext";



function SignIn({apiForSignIn,navigateto}) {
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

    const navigate = useNavigate();

    const context= useContext(DashboardContext)
    const {setTokenError} = context 

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({email:'', password:'',});

     // notification for success
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

    const handleSignIn =async(e)=>{
        e.preventDefault();
        try {
            setError([])
            setLoading(true)
            const response =await axios.post(`https://skylinerealestate-dibreg7o.b4a.run/api${apiForSignIn}`,{
                email: userData.email,
                password: userData.password
            },{
                withCredentials: true,
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                setLoading(false)
        if (response.data.success===true) {
          Toast.fire({
            icon: "success",
            title: "Signed in successfully"
          });
          navigate(navigateto);
          if (apiForSignIn==='/seller/logIn') {
            setTokenError(false);  
          }
       }
        } catch (error) {
        if (error.response) {
            setError([error.response.data.error]);
        } else if (error.code) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser
            setError(["An unexpected error occurred. Please try again later"]);
        } else {
            // Something happened in setting up the request that triggered an Error
            setError(["An unexpected error occurred."]);
        }  
        setLoading(false)
        }
    }
  return (
    <div>
      <div className="signin-wrapper signup-wrapper">
             <p className='text-signin'>Welcome Back</p>
             <p className="text-signin2">Login into your account</p>
        <form className='signUp-form signin-form' onSubmit={handleSignIn} method="post">
        <div className="form-group">
        <input 
            type="email" 
            name="email" 
            id="email"
            placeholder='Email'
            autoComplete='email'
            required
            value={userData.email}
            onChange={(e)=>setUserData({...userData, email:e.target.value})} />
        </div>
        <div className="form-group password-input-container">
            <input 
                type={showPassword? 'text' : 'password'}  
                name="password" 
                id="password"
                placeholder='Password'
                autoComplete='password'
                required
                value={userData.password}
                onChange={(e)=>setUserData({...userData, password:e.target.value}) }
                 />
                 {/* show password button  */}
                 <button className='toggle-password-btn' type="button"   onClick={() => setShowPassword(!showPassword)}>
                        {showPassword? (<i className="fa-regular fa-eye"></i>):(<i className="fa-regular fa-eye-slash"></i>)}
                       </button>
        </div>
        <div className="Error text-center">
            {error.map((error, index) => (
          <div key={index}>{error}</div>
        ))}
            </div>
            <button disabled={loading} type="submit" className='submit'>{loading? loader:'Log In'}</button>

            </form>
      </div>
    </div>
  )
}

export default SignIn
