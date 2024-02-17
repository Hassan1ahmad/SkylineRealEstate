import React from 'react'
import '../assets/CSS/propertycard.css'


function PropertyCard(props) {
  const{type,name,city,address,bedrooms,bathrooms,area,price,status,image,date,allInfo,onViewPropertyClick}= props
  //  view properties details function
  const handleViewPropertyClick=()=>{
    onViewPropertyClick(allInfo)
  }
  // image decoding function
  const imageDataUrl = image[0]
  ? `${image[0].url }`
  : require('../assets/pictures/PC-1.png'); 
  // Check if the property is for rent
  const isForRent = status.toLowerCase() === 'for rent';
  const formattedPrice = isForRent ? `PKR: ${price} Monthly` : `PKR: ${price}`;
  
  return (
    <div className='card-container'>
      <div className="card-wrapper"> 
        {/* image section */}
        <div className="card-img"  style={{ 'backgroundImage' : `url('${imageDataUrl}')` }}>
        <div className="hover-overlay ">
            <button onClick={handleViewPropertyClick} className="view-property-button">View Property</button>
          </div>
            <div className="card-user ">
                <div className="card-user-details">
                    <div className="card-user-img invisible">
                       <div> <img src={require('../assets/pictures/seller.png')} alt="" /></div>
                        <div className="card-user-name"><p>Melissa Villiam</p><p>Real Estate Agent</p></div>
                    </div>
                    <div className="card-user-right-for">
                        {status}
                    </div>
                </div>
            </div>
        </div>
        {/* name and type */}
        <div className="card-property-nameAndType">
            <div className="card-property-name">{name} </div>
            <div className="card-property-type">{type}</div>
        </div>
        {/* address */}
        <div className="card-address">
        <i className="fa-solid fa-location-dot"></i>{city},{address.split(' ').slice(0,4).join(' ')}{address.split(' ').length>4? '...': ''}
        </div>
        {/* date added */}
        <div className="card-date-added">
           <strong>Year OF Construction: </strong>{date}
        </div>
        {/* bedroom */}
        <div className="card-property-details">
          <div className="card-bedroom pr-3">
            <p>Bedrooms</p>
            <div><i className="fa-solid fa-bed"></i>{bedrooms}</div>
          </div>
          <div className="card-bathroom pr-3">
            <p>Bathrooms</p>
            <div><i className="fa-solid fa-bath"></i>{bathrooms}</div>
          </div>
          <div className="card-area">
            <p>Area</p>
            <div><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18" fill="none">
            <path d="M2.9527 8.34221C3.02447 8.35254 3.09611 8.35765 3.16735 8.35765C3.33725 8.35765 3.50429 8.32822 3.66275 8.27147V13.8105C3.66275 14.0885 3.886 14.3138 4.16138 14.3138H14.7988C15.0742 14.3138 15.2974 14.0885 15.2974 13.8105V8.27144C15.4558 8.32802 15.6233 8.35741 15.7953 8.35741C16.2642 8.35741 16.7118 8.13158 16.9927 7.75339C17.2325 7.43075 17.3334 7.03314 17.2769 6.63378C17.2204 6.23443 17.0132 5.88121 16.6935 5.63924L15.2974 4.58221V1.05901C15.2974 0.781029 15.0742 0.555664 14.7988 0.555664H12.8043C12.5289 0.555664 12.3057 0.781029 12.3057 1.05901V2.31711L10.3773 0.857203C9.84901 0.457746 9.11111 0.457746 8.58263 0.85737L2.26669 5.63917C1.947 5.88118 1.73977 6.23439 1.68329 6.63375C1.62678 7.0331 1.7277 7.43071 1.96738 7.75323C2.20709 8.07601 2.55702 8.2852 2.9527 8.34221ZM4.66001 13.3071V7.60246L9.48009 3.95312L14.3002 7.60246V13.3071H4.66001ZM13.3029 1.56236H14.3002V3.82719L13.3029 3.07216V1.56236ZM2.67055 6.77609C2.68936 6.64294 2.75847 6.52519 2.86504 6.44452L9.18075 1.66293C9.26887 1.59625 9.37455 1.56296 9.48016 1.56296C9.58574 1.56296 9.69125 1.59625 9.77921 1.66276L16.0952 6.44456C16.2018 6.52523 16.2708 6.64298 16.2897 6.77609C16.3085 6.90921 16.2749 7.04173 16.1949 7.14938C16.0999 7.27733 15.9542 7.35072 15.7953 7.35072C15.6871 7.35072 15.5839 7.31588 15.497 7.25018L9.77927 2.92123C9.60196 2.787 9.35823 2.787 9.18092 2.92123L3.4633 7.25011C3.35679 7.33072 3.22539 7.36454 3.09365 7.34565C2.96178 7.32666 2.84517 7.25693 2.76522 7.14924C2.68534 7.04173 2.6517 6.90921 2.67055 6.77609Z" fill="#626262"/>
            <path d="M17.8436 15.5356L16.5139 14.1934C16.3192 13.9968 16.0035 13.9968 15.8087 14.1934C15.614 14.3899 15.614 14.7086 15.8087 14.9052L16.2872 15.3881H2.67213L3.15062 14.9051C3.34535 14.7086 3.34535 14.3899 3.15062 14.1933C2.95592 13.9968 2.64018 13.9968 2.44545 14.1933L1.11578 15.5355C0.921044 15.7321 0.921044 16.0508 1.11578 16.2473L2.44545 17.5895C2.54282 17.6878 2.6704 17.737 2.79802 17.737C2.92563 17.737 3.05325 17.6878 3.15058 17.5895C3.34531 17.393 3.34531 17.0743 3.15058 16.8777L2.67213 16.3948H16.2872L15.8087 16.8778C15.614 17.0743 15.614 17.393 15.8087 17.5896C15.9061 17.6878 16.0337 17.737 16.1613 17.737C16.2889 17.737 16.4165 17.6878 16.5139 17.5895L17.8435 16.2473C18.0383 16.0508 18.0383 15.7321 17.8436 15.5356Z" fill="#626262"/>
            <path d="M12.4715 7.60352H6.48789C6.21251 7.60352 5.98926 7.82888 5.98926 8.10686V11.127C5.98926 11.4049 6.21251 11.6303 6.48789 11.6303H12.4715C12.7468 11.6303 12.9701 11.4049 12.9701 11.127V8.10686C12.9701 7.82888 12.7468 7.60352 12.4715 7.60352ZM6.98652 8.61021H8.98104V10.6236H6.98652V8.61021ZM11.9728 10.6236H9.9783V8.61021H11.9728V10.6236Z" fill="#626262"/>
                </svg>   <p>{area} Sq Ft</p>
                </div>
          </div>
        </div>
        {/* price and like */}
        <div className="card-price-like">
          <div className="card-price">
            {/* if for rent add monthly */}
            <p>{status}</p>
            <div>{formattedPrice}</div>
          </div>
          <div className="card-like hidden">
          <i className="fa-solid fa-heart"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
