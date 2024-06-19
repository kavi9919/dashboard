import React from 'react'
import MainNav from './components/MainNav'
import AboutSection from './components/AboutSection'
import Hero from './components/Hero'
import FarmerBanner from './components/FarmerBanner'
import CourierBanner2 from './components/CourierBanner2'
const LandingPage = () => {
  return (
    <div className='bg-secondary'>
      <MainNav />
      <Hero/>
      <AboutSection /> 
      <div className='bg-white py-12'>
      <FarmerBanner/>  
      </div>
      <div className='bg-primary py-12'>
      <CourierBanner2/>  
      </div>
     
    </div>
  )
}
export default LandingPage