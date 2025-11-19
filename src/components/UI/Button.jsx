import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon,
  onClick,
  href,
  target,
  rel,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 relative overflow-hidden group';
  
  const variantClasses = {
    primary: 'bg-transparent border-cream text-cream hover:bg-primary hover:text-cream hover:scale-110',
    secondary: 'bg-secondary text-cream hover:scale-110 hover:bg-secondary bg-opacity-90 hover:text-cream',
    outline: 'bg-transparent border-2 border-cream text-cream hover:border-cream bg-cream hover:text-primary',
  };
  
  const sizeClasses = {
    sm: 'px-8 py-3 text-base',
    md: 'px-12 py-4 text-lg',
    lg: 'px-16 py-6 text-xl',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {icon && <span className="relative z-10 mr-4 text-2xl group-hover:text-cream [&>i]:group-hover:text-cream [&>*]:group-hover:text-cream">{icon}</span>}
      <span className="relative z-10 group-hover:text-cream">{children}</span>
      <span className="absolute inset-0 bg-primary rounded-full transform scale-0 group-hover:scale-150 transition-transform duration-500 z-0"></span>
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        target={target} 
        rel={rel}
        className={classes}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button 
      type={type}
      onClick={onClick}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
