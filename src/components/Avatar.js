function Avatar({ src = '/', className }) {
  return (
    <div
      className={`avatar ${className}`}
      style={{ backgroundImage: `url(${src || '/'})` }}
    ></div>
  );
}

export default Avatar;
