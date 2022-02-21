interface Props {
  src?: string;
  className: string;
  onClick?: () => void;
}

function Avatar({ src, className, onClick }: Props) {
  const defaultSrc =
    'https://secure.gravatar.com/avatar/8a90b937065fcce90a1cf5ce8bd0f539?s=256&d=mm&r=g';
  return (
    <div
      className={`avatar ${className}`}
      style={{ backgroundImage: `url(${src || defaultSrc})` }}
      onClick={onClick}
    ></div>
  );
}

export default Avatar;
