import React from "react";
import "../assets/CSS/testimonials.css";
import comas from '../assets/pictures/commas.svg'
import stars from '../assets/pictures/stars.svg'
import verified from '../assets/pictures/verified.svg'


    function TestimonialsCard({ description, name, role }) {
        return (
        <div className="ttmls-first-card">
            <div className="ttmls-first-row">
            <div className="ttmls-commas">
                <img src={comas} alt="" />
            </div>
            <div className="ttmls-stars">
                <img src={stars} alt="" />
            </div>
            </div>
            <div className="desc">
            <p>{description}</p>
            </div>
            <div className="ttmls-last-row">
            <div className="ttmls-name">
                <p>{name}</p>
                <p>{role}</p>
            </div>
            <div className="ttmls-verifed">
                <img src={verified} alt="" />
            </div>
            </div>
        </div>
        );
    }
    

function Testimonials() {
  return (
    <div>
      {/* ttmls=Testimonials */}
      <div className="ttmls-wrapper">
        <div className="ttmls-text">
          <p>Our <span>customers</span> think we’re the best</p>
        </div>
         <div className="ttmls-cards">
         <TestimonialsCard
            description="I had the pleasure of working with Skyline RealEstate to find my dream home, and I couldn't be happier with the entire experience. From the moment I walked into their office, I felt welcomed and supported by their friendly team."
            name="Sarah M."
            role="Property Buyer"
          />
         <TestimonialsCard
            description="Once we found the perfect home, Sarah guided me through every step of the buying process, making it feel effortless on my part. She was an excellent negotiator, and thanks to her skills, I was able to secure a fantastic deal on my new home."
            name="Awais"
            role="Property Buyer"
          />
         </div>
      </div>
    </div>
  );
}

export default Testimonials;
