import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import UserConsumer from '../../context';
import Window from '../../components/Window';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { ReactComponent as Twitter } from '../../images/Twitter.svg';
import { ReactComponent as Github } from '../../images/Github.svg';
import { ReactComponent as Google } from '../../images/Google.svg';
import { ReactComponent as Facebook } from '../../images/Facebook.svg';
import { useActions } from '../../hooks/useActions';

function Signup() {
  const [{ user }] = UserConsumer();
  const { signup } = useActions();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    async onSubmit(credentials) {
      try {
        await signup(credentials);
        if (!user.id) return;
        navigate(`/users/${user.id}`);
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <div className="auth">
      <Window
        heading="Join thousands of learners from around the world"
        text="Master web development by making real-life projects. There are
          multiple paths for you to choose"
      >
        <form onSubmit={formik.handleSubmit} className="window__form">
          <Input
            className="window__form__input"
            icon="email"
            type="text"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <Input
            className="window__form__input"
            icon="lock"
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <Button type="submit" extended>
            Start coding now
          </Button>
        </form>
        <span className="window__message">
          or continue with these social profiles
        </span>
        <div className="window__socials">
          <Google
            onClick={() => {
              window.location.assign(
                `${process.env.REACT_APP_API_URL}/auth/google`
              );
            }}
          />
          <Facebook />
          <Twitter />
          <Github />
        </div>
        <span className="window__prompt">
          Already a member?{' '}
          <Link to="/login" className="link">
            Login
          </Link>
        </span>
      </Window>
    </div>
  );
}

export default Signup;
