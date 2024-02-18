import React from 'react'
import ForSale from './ForSale'
import { Element } from 'react-scroll';


function SaleAndRent() {

    

    
  return (
    <div>
      <Element name='Sale' className='element'>
      <ForSale sale={'Sale'}/>
      </Element>
      <Element name='Rent' className='element'>
      <ForSale sale={'Rent'}/>
      </Element>
    </div>
  )
}

export default SaleAndRent
