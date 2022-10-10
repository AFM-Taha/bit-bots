import React from 'react'
import backgroundImage from '../../assets/img/banner.jpg'

const Banner = () => {
  return (
    <section
      className='banner_area'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        overflow: 'hidden',
      }}
    >
      <div className='container'>
        <div className='banner_text_area'>
          <h1 className='banner-text'>Banner Area</h1>
        </div>
      </div>
    </section>
  )
}

export default Banner
