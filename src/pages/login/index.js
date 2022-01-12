import Window from '../../components/Window';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { ReactComponent as Twitter } from '../../images/Twitter.svg';
import { ReactComponent as Github } from '../../images/Gihub.svg';
import { ReactComponent as Google } from '../../images/Google.svg';
import { ReactComponent as Facebook } from '../../images/Facebook.svg';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login">
      <Window heading="Login">
        <form className="window__form">
          <Input icon="email" type="text" name="email" placeHolder="Email" />
          <Input
            icon="lock"
            type="password"
            name="password"
            placeHolder="Password"
          />
          <Button extended>Login</Button>
        </form>
        <span className="window__message">
          or continue with these social profiles
        </span>
        <div className="window__socials">
          <Google />
          <Facebook />
          <Twitter />
          <Github />
        </div>
        <span className="window__prompt">
          Don't have an account yet?{' '}
          <Link to="/signup" className="link">
            Register
          </Link>
        </span>
      </Window>
    </div>
  );
}

export default Login;
