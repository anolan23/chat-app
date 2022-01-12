import { ReactComponent as Logo } from '../images/devchallenges.svg';

function Window({ heading = 'Heading', text, children }) {
  return (
    <div className="window">
      <span className="window__logo">
        <Logo />
      </span>
      <span className="window__heading">{heading}</span>
      {text ? <p className="window__text">{text}</p> : null}
      {children}
    </div>
  );
}

export default Window;
