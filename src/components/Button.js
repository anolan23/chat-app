function Button({ type, extended, onClick, children }) {
  return (
    <button
      className={`btn ${extended ? 'btn--extended' : ''}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
