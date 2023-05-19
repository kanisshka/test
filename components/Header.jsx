import React from 'react';
import Image from 'next/image'

const Header = ({ imageUrl }) => {
  return (
    <div className='header-main'>
      <Image src={imageUrl} 
      fill={true} 
      alt="Header Image" >
      </Image>
    </div>
  );
};

export default Header;
