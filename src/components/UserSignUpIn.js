import React,{useState} from 'react'
import '../assets/CSS/signupIn.css'
import SignUp from './SignUp'
import SignIn from './SignIn'
import { Link, useNavigate } from 'react-router-dom'

function UserSignUpIn({apiForSignUp,apiForSignIn,navigate}) {

  const Navigate = useNavigate()
  const [showSignIn, setshowSignIn] = useState(true)
  const handleSignIn =()=>{
    setshowSignIn(!showSignIn)
  }
  return (
    <div> 
        <div className={`user-wrapper flex `}> 
            <div className="user-left">
                <div className={`user-img`}>
                    <img src={require('../assets/pictures/Blue Illustrative Luxury Real Estate Logo.png')} alt="" />
                </div>
            </div> 
            <div className="user-right">
              {showSignIn? (<><div className='flex justify-between'>
                               <p onClick={()=>{Navigate('/')}} className='user-text'><span>Go Back</span></p>
                                <p className='user-text' > Don’t have an account?<span onClick={handleSignIn}>Sign Up!</span></p>
                              </div>
              <div className="user-signin-comp">
              <SignIn apiForSignIn={apiForSignIn} navigateto={navigate} />
              </div></>) : (<><div className='flex justify-between'>  
                               <Link to="/"><p className='user-text'><span>Go Back</span></p></Link> 
                              <p className='user-text' >Have an account?<span onClick={handleSignIn}>Sign in!</span></p> 
                            </div>
              <div className="user-signup-comp">
              <SignUp apiForSignUp={apiForSignUp} navigateto={navigate}/>
              </div></>)}
              
            </div>
        </div>
    </div>
  )
}

export default UserSignUpIn
