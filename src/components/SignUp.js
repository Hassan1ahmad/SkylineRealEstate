import React,{useContext, useState} from 'react'
import '../assets/CSS/signup.css'
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DashboardContext from "../context/dashboard/DashboardContext";


function SignUp({apiForSignUp,navigateto}) {
  // loader
  const loader =  <div className='flex justify-center'><TailSpin
  visible={true}
  height="40"
  width="40"
  color="#4fa94d"
  ariaLabel="tail-spin-loading"
  radius="3"
  wrapperStyle={{}}
  wrapperclass=""
  /></div>

  const navigate = useNavigate();
  
  const context= useContext(DashboardContext)
    const {setTokenError} = context 


  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfimrPassword] = useState(false);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

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
  
  const handleSignUp=async (e)=>{
    e.preventDefault()
    try {
      setError([])
      setLoading(true)
        const response= await axios.post(`https://skylinerealestate-dibreg7o.b4a.run/api${apiForSignUp}`,{
            "username" :fullName,
            "email" : email,
            "password" : password,
            "passwordConfirmation" : confirmPassword,
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
            title: "Signed Up successfully"
          });
           navigate(navigateto) ; 
           if (apiForSignUp==='/seller/signUp') {
            setTokenError(false);  
          }
        }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.errors);
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
      <div className="signup-wrapper">
                        <p className='text-signup'>Create Account</p>
        <form className='signUp-form' method="post"  onSubmit={handleSignUp}>
            <div className="form-group">
                <input 
                type="text"
                id='fullname'
                placeholder='Your Full Name'
                required
                value={fullName}
                onChange={(e)=>{setFullName(e.target.value)}} />
            </div>
            <div className="form-group">
                <input type="email"
                        name="email"
                         id="email"
                         placeholder='Enter Email'
                         required
                         autoComplete='email'
                         value={email}
                         onChange={(e)=>{setEmail(e.target.value)}} />
            </div>
            <div className="form-group password-input-container">
                <input type={showPassword? 'text' : 'password'} 
                       name="password"
                       id="pass"
                       className='password-input'
                       placeholder='Password'
                       required
                       autoComplete="new-password"
                       value={password}
                       onChange={(e)=>{setPassword(e.target.value)}} />
                       {/* show password button  */}
                       <button className='toggle-password-btn' type="button"   onClick={() => setShowPassword(!showPassword)}>
                        {showPassword? (<i className="fa-regular fa-eye"></i>):(<i className="fa-regular fa-eye-slash"></i>)}
                       </button>
            </div>
            <div className="form-group  password-input-container">
                <input type={showConfirmPassword? 'text' : 'password'}
                       name="confirm-password"
                       id="confirm-pass"
                       placeholder='confirm Password'
                       required
                       autoComplete="new-password"
                       value={confirmPassword}
                       onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                        <button className='toggle-password-btn' type="button"   onClick={() => setShowConfimrPassword(!showConfirmPassword)}>
                        {showConfirmPassword? (<i className="fa-regular fa-eye"></i>):(<i className="fa-regular fa-eye-slash"></i>)}
                       </button>
            </div>
            <div className="Error text-center">
            {error.map((error, index) => (
          <div key={index}>{error}</div>
        ))}
            </div>
            <button disabled={loading} type="submit" className='submit'>{loading? loader:'Create Account'}</button>
        </form>
      </div>
        <div className='termofuse'>By continuing you indicate that you read and agreed to the Terms of Use.</div>
    </div>
  )
}

export default SignUp
