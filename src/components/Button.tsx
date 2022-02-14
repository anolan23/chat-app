interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  extended?: boolean;
}

function Button({
  type,
  extended,
  onClick,
  className = '',
  children,
}: ButtonProps) {
  return (
    <button
      className={`btn ${extended ? 'btn--extended' : ''} ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
