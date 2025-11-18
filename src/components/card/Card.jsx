import React from 'react';
import clsx from 'clsx';

const Card = ({ children, title, maxWidth, cardAlignment }) => {

  return (
    <div className={clsx(
      'bg-[#1A202C] backdrop-blur-md p-6 mt-4 border border-[#AEEEEE] rounded-3xl shadow-lg',
      maxWidth || 'max-w-3xl', cardAlignment || 'mx-auto')}>
      {/* Header */}
      <div className='mb-4'>
        <h1 className='text-xl font-medium text-white'>{title}</h1>
      </div>

      {/*  Content */}
      <div className={`grid gap-2 text-white overflow-auto`}>
        {children}
                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */} 
      </div>
    </div>
  );
};

export default Card;