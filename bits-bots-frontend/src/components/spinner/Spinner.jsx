import React from 'react'
import spinner from '../../assets/img/spinner.svg'

const Spinner = () => {
  return (
    <div className='d-flex vh-100 justify-content-center align-items-center'>
      <img src={spinner} alt='' />
    </div>
  )
}

export default Spinner
