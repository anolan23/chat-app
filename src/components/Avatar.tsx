interface Props {
  src: string;
  className: string;
}

function Avatar({ src = '/', className }: Props) {
  return (
    <div
      className={`avatar ${className}`}
      style={{ backgroundImage: `url(${src || '/'})` }}
    ></div>
  );
}

export default Avatar;
