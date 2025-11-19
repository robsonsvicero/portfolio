import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  ...props 
}) => {
  const baseClasses = 'rounded-xl transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-dark-gray border border-gray-800',
    project: 'bg-dark-gray sticky top-0',
    service: 'bg-dark-gray h-full',
  };
  
  const hoverClasses = hover ? 'hover:shadow-2xl hover:transform' : '';

  const classes = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Subcomponentes
Card.Image = ({ src, alt, className = '' }) => (
  <div className={`overflow-hidden rounded-t-xl ${className}`}>
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
    />
  </div>
);

Card.Content = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

Card.Title = ({ children, className = '' }) => (
  <h3 className={`font-title text-2xl font-normal text-cream mb-6 ${className}`}>
    {children}
  </h3>
);

Card.Description = ({ children, className = '' }) => (
  <p className={`text-base text-cream/60 mb-6 leading-relaxed ${className}`}>
    {children}
  </p>
);

Card.Actions = ({ children, className = '' }) => (
  <div className={`flex flex-col gap-4 ${className}`}>
    {children}
  </div>
);

Card.Button = ({ children, href, variant = 'outline', className = '' }) => {
  const variantClasses = {
    outline: 'border border-cream/40 hover:bg-cream/10 hover:border-cream',
    filled: 'bg-primary text-cream hover:bg-primary/80',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-full flex items-center justify-center py-3 px-4 rounded transition-all duration-300 text-cream/60 hover:text-cream ${variantClasses[variant]} ${className}`}
    >
      {children}
    </a>
  );
};

Card.Badge = ({ children, variant = 'default', className = '' }) => {
  const variantClasses = {
    default: 'bg-blue-100 text-primary',
    designer: 'bg-pink-100 text-pink-700',
    'ui-ux': 'bg-orange-100 text-orange-700',
    developer: 'bg-green-100 text-green-700',
    cta: 'bg-transparent text-light-gray border-cream hover:bg-cream hover:border-primary hover:text-primary hover:border',
  };

  return (
    <span className={`inline-block text-sm font-medium px-3 py-1.5 rounded-full w-fit my-4 transition-all duration-300 ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Card;
