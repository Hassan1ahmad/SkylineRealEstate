import React from 'react'
import '../assets/CSS/partner.css'

function Partners() {
  return (
    <div>
      <div className="partner-wrapper">
        <div className="partner-text">
        <p>Our</p> <p>Partners</p> <p>We honoured to have thses Amazing Partners.</p>
        </div>
        <div className="partners-images">
            <img src={require('../assets/pictures/partner 1.png')} alt="" />
            <img src={require('../assets/pictures/partner-2.png')} alt="" />
            <img src={require('../assets/pictures/partner-3.png')} alt="" />
            <img src={require('../assets/pictures/partner-4.png')} alt="" />
            <img src={require('../assets/pictures/partner-5.png')} alt="" />
            <img src={require('../assets/pictures/partner-6.png')} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Partners
