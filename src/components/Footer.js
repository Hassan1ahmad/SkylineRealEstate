import React from 'react'
import '../assets/CSS/footer.css'
import yt from '../assets/pictures/yt.svg'
import fb from '../assets/pictures/fb.svg'
import insta from '../assets/pictures/insta.svg'

function Footer() {
    const d = new Date();
    let year = d.getFullYear();
  return (
    <div>
      <div className="footer-wrapper">
        <div className="footer-1stSection">
        <div className="footer-left">
                <div className="footer-logo">
                    <img src={require('../assets/pictures/Blue Illustrative Luxury Real Estate Logo.png')} alt="" />
                </div>
                <div className="footer-text">
                    <p> Our experts can provide valuable insights and assist you in identifying properties.</p>
                </div>
                <div className="footer-links">
                    <img src={yt} alt="" />
                    <img src={fb} alt="" />
                    <img src={insta} alt="" />
                </div>
            </div>
            <div className="footer-right">
                <div className="footer-coloumn1">
                    <ul>
                        <li className='font-bold'>Products</li>
                        <li>Features</li>
                        <li>Integrations</li>
                        <li>Pricing</li>
                    </ul>
                </div>
                <div className="footer-coloumn2">
                    <ul>
                        <li className='font-bold'>Company</li>
                        <li>About us</li>
                        <li>Careers</li>
                        <li>Blogs</li>
                        <li>Customers</li>
                        <li>Brands</li>
                    </ul>
                </div>
                <div className="footer-coloumn3">
                    <ul>
                        <li className='font-bold'>Resources</li>
                        <li>Community</li>
                        <li>Contract</li>
                        <li>Terms of services</li>
                        <li>DPA</li>
                    </ul>
                </div>
            </div>
        </div>
        <hr />
        <div className="footer-2ndSection">
           <p>@{year}SkylineRealEstate.All Rights Reserved</p>
           <p>Term & Condition</p>
        </div>
          
      </div>
    </div>
  )
}

export default Footer
