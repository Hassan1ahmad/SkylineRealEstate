import React from 'react'
import '../assets/CSS/assist.css'

function AssistBuyer() {
  return (
    <div>
       <div className="assist-wrapper">
        <div className="assist-left">
            <div className="assist-head">
                <p>We assist buyers in finding their </p> <p>dream homes.</p> 
            </div>
            <div className="assist-description">
                <div className="assist-button">
                    <button>GET Started Free</button>
                </div>
                <div>Our agents will guide you through the entire buying process, from property </div>
            </div>
        </div>
        <div className="assist-right">
            <img src={require('../assets/pictures/assistPic1.png')} alt="" />
        </div>
       </div>
    </div>
  )
}

export default AssistBuyer
