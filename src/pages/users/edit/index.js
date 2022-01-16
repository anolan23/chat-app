import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';

import Container from '../../../components/Container';
import Input from '../../../components/Input';
import InputGroup from '../../../components/InputGroup';
import TextArea from '../../../components/TextArea';
import Title from '../../../components/Title';
import Avatar from '../../../components/Avatar';
import { useAuth } from '../../../hooks/useAuth';
import { updateUser } from '../../../api';
import UserConsumer from '../../../context/user';
import { updatePhoto } from '../../../api';

function EditUser({ user }) {
  const { name, bio, phone, email, id } = user;
  const { authorized } = useAuth('/login');
  const navigate = useNavigate();
  const { setUser } = UserConsumer();

  const formik = useFormik({
    initialValues: {
      name: name || '',
      bio: bio || '',
      phone: phone || '',
      email: email || '',
    },
    async onSubmit(cols) {
      try {
        const updatedUser = await updateUser(id, cols);
        setUser(updatedUser);
        navigate(`/users/${id}`);
      } catch (error) {
        console.error(error);
      }
    },
    enableReinitialize: true,
  });

  const onChange = async (e) => {
    const [photo] = e.target.files;
    const newUser = await updatePhoto(user.id, photo);
    setUser(newUser);
  };

  if (!authorized) return <div>Loading...</div>;
  return (
    <div className="edit-user">
      <Link to={-1} className="edit-user__back">
        <span className="material-icons edit-user__back__icon">
          chevron_left
        </span>
        <span className="edit-user__back__text">Back</span>
      </Link>
      <Container>
        <form onSubmit={formik.handleSubmit} className="edit-user__form">
          <Title
            main="Change info"
            sub="Changes will be reflected to every service"
          />
          <div className="edit-user__form__upload">
            <label className="edit-user__form__upload__label" for="upload">
              <Avatar
                className="edit-user__form__upload__label__image"
                src={user.photo}
              />
              <span class="material-icons edit-user__form__upload__label__icon">
                photo_camera
              </span>
            </label>
            <label className="edit-user__form__upload__text" for="upload">
              change photo
            </label>
            <input id="upload" type="file" onChange={onChange} />
          </div>
          <InputGroup labelText="Name" htmlFor="name">
            <Input
              type="text"
              name="name"
              placeHolder="Enter your name..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </InputGroup>
          <InputGroup labelText="Bio" htmlFor="bio">
            <TextArea
              name="bio"
              placeHolder="Enter your bio..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bio}
            />
          </InputGroup>
          <InputGroup labelText="Phone" htmlFor="phone">
            <Input
              type="text"
              name="phone"
              placeHolder="Enter your phone..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
          </InputGroup>
          <InputGroup labelText="Email" htmlFor="email">
            <Input
              type="text"
              name="email"
              placeHolder="Enter your email..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </InputGroup>
          <Button type="submit">Save</Button>
        </form>
      </Container>
    </div>
  );
}

export default EditUser;
