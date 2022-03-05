interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  extended?: boolean;
  color?: 'dark' | 'darker' | 'darkest';
}

function Button({
  type,
  extended,
  color,
  onClick,
  className = '',
  children,
}: ButtonProps) {
  return (
    <button
      className={`btn ${
        extended ? 'btn--extended' : ''
      } ${className} btn--${color}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
