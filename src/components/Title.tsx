interface Props {
  main: string;
  sub: string;
}

function Title({ main, sub }: Props) {
  return (
    <div className="title">
      <span className="title__main">{main}</span>
      <span className="title__sub">{sub}</span>
    </div>
  );
}
export default Title;
