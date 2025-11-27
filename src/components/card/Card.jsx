import React from 'react';
import clsx from 'clsx';

const Card = ({ children, title, maxWidth, cardAlignment, className }) => {
  return (
    <div
      className={clsx(
        // Base styles (only apply default bg if no custom className provided)
        !className && 'bg-card',
        'backdrop-blur-md p-3 sm:p-4 md:p-6 mt-4 rounded-2xl sm:rounded-3xl shadow-lg',
        // Only apply border-border if no custom className (for AQI cards that have custom bg)
        !className && 'border border-border',
        // Responsive width
        maxWidth || 'w-full sm:max-w-md md:max-w-lg lg:max-w-3xl',
        // Alignment
        cardAlignment || 'mx-auto',
        // Custom className override (applied last for proper specificity)
        className
      )}
    >

      {title && (
        <div className="mb-4">
          <h1 className="text-lg sm:text-xl font-medium text-card-foreground">{title}</h1>
        </div>
      )}

      {/* Content */}
      <div className="grid gap-2 text-card-foreground overflow-auto">{children}</div>
    </div>
  );
};

export default Card;