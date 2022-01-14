function Button({ type, extended, onClick, className = '', children }) {
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
