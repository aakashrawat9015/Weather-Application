import React from 'react';
import clsx from 'clsx';

const Card = ({ children, title, maxWidth, cardAlignment, className }) => {
  return (
    <div
      className={clsx(
        // Only apply defaults if no custom className provided
        !className && 'bg-card border border-border rounded-2xl sm:rounded-3xl shadow-lg',
        'backdrop-blur-md p-3 sm:p-4 md:p-6 mt-4',
        maxWidth || 'w-full sm:max-w-md md:max-w-lg lg:max-w-3xl',
        cardAlignment || 'mx-auto',
        // Custom override applied last
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