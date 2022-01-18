import { useFormik } from 'formik';

import Window from '../../components/Window';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { ReactComponent as Twitter } from '../../images/Twitter.svg';
import { ReactComponent as Github } from '../../images/Gihub.svg';
import { ReactComponent as Google } from '../../images/Google.svg';
import { ReactComponent as Facebook } from '../../images/Facebook.svg';
import { Link, useNavigate } from 'react-router-dom';

import UserConsumer from '../../context/user';

function Login() {
  const navigate = useNavigate();
  const { login } = UserConsumer();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    async onSubmit({ email, password }) {
      try {
        const user = await login({
          email,
          password,
        });
        navigate(`/users/${user.id}`);
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <div className="auth">
      <Window heading="Login">
        <form onSubmit={formik.handleSubmit} className="window__form">
          <Input
            className="window__form__input"
            icon="email"
            type="text"
            name="email"
            placeHolder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <Input
            className="window__form__input"
            icon="lock"
            type="password"
            name="password"
            placeHolder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <Button type="submit" extended>
            Login
          </Button>
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
            Sign up
          </Link>
        </span>
      </Window>
    </div>
  );
}

export default Login;
