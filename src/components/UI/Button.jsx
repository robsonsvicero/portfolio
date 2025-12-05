import React, { useRef } from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'outline', // outline, primary, secondary
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
  const btnRef = useRef(null);
  const circleRef = useRef(null);
  const [circleSize, setCircleSize] = React.useState(0);

  React.useEffect(() => {
    if (btnRef.current) {
      const width = btnRef.current.offsetWidth;
      const height = btnRef.current.offsetHeight;
      // O círculo cobre toda a diagonal do botão
      const size = Math.sqrt(width * width + height * height) * 1.2;
      setCircleSize(size);
    }
  }, [btnRef.current, size, className]);

  // Classes base
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-primary';
  const sizeClasses = {
    sm: 'px-6 py-2 text-base',
    md: 'px-8 py-3 text-lg',
    lg: 'px-12 py-4 text-xl',
  };

  // Variações de estilo
  let variantClasses = '';
  let outlineHoverClass = '';
  if (variant === 'primary') {
    variantClasses = 'bg-primary border-none text-cream';
  } else if (variant === 'secondary') {
    variantClasses = 'bg-secondary border-none text-cream';
  } else if (variant === 'outline') {
    variantClasses = 'bg-transparent border-2 border-primary text-cream outline-hover';
    outlineHoverClass = 'outline-hover';
  }

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses} ${className}`;

  // Centraliza o círculo no centro do botão
  const handleMouseEnter = () => {
    const btn = btnRef.current;
    const circle = circleRef.current;
    if (!btn || !circle) return;
    const width = btn.offsetWidth;
    const height = btn.offsetHeight;
    circle.style.left = `${width / 2}px`;
    circle.style.top = `${height / 2}px`;
    circle.classList.add('btn-fill-animate');
  };
  const handleMouseLeave = () => {
    const circle = circleRef.current;
    if (circle) {
      circle.classList.remove('btn-fill-animate');
    }
  };

  // Cor do preenchimento animado
  let fillColor = '#042C5A'; // primary
  if (variant === 'secondary') fillColor = '#5C0028'; // secondary

  const content = (
    <>
      {/* Círculo animado para preenchimento */}
      <span
        ref={circleRef}
        className="btn-fill absolute rounded-full z-0"
        style={{ width: circleSize, height: circleSize, background: fillColor }}
        aria-hidden="true"
      />
      {icon && <span className="relative z-10 mr-2 text-xl group-hover:text-cream text-cream transition-colors duration-300">{icon}</span>}
      <span className="relative z-10 group-hover:text-cream text-cream transition-colors duration-300">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={classes}
        ref={btnRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
      ref={btnRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
