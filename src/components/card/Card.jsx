import React from 'react';
import clsx from 'clsx';

const Card = ({ children, title, maxWidth, cardAlignment }) => {
  return (
    <div
      className={clsx(
        // Base styles
        'bg-[#1A202C] backdrop-blur-md p-4 sm:p-6 mt-4 rounded-3xl shadow-lg',
        // Responsive width
        maxWidth || 'w-full sm:max-w-md md:max-w-lg lg:max-w-3xl',
        // Alignment
        cardAlignment || 'mx-auto'
      )}
    >

      {title && (
        <div className="mb-4">
          <h1 className="text-lg sm:text-xl font-medium text-white">{title}</h1>
        </div>
      )}

      {/* Content */}
      <div className="grid gap-2 text-white overflow-auto">{children}</div>
    </div>
  );
};

export default Card;