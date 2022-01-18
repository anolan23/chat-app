import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import Window from '../../components/Window';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { ReactComponent as Twitter } from '../../images/Twitter.svg';
import { ReactComponent as Github } from '../../images/Gihub.svg';
import { ReactComponent as Google } from '../../images/Google.svg';
import { ReactComponent as Facebook } from '../../images/Facebook.svg';

import UserConsumer from '../../context/user';

function Signup() {
  const { signup } = UserConsumer();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    async onSubmit({ email, password }) {
      try {
        const user = await signup({ email, password });
        navigate(`/users/${user.id}`);
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <div className="signup">
      <Window
        heading="Join thousands of learners from around the world"
        text="Master web development by making real-life projects. There are
          multiple paths for you to choose"
      >
        <form onSubmit={formik.handleSubmit} className="window__form">
          <Input
            icon="email"
            type="text"
            name="email"
            placeHolder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <Input
            icon="lock"
            type="password"
            name="password"
            placeHolder="Password"
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
