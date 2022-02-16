import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';

import Container from '../../../components/Container';
import Input from '../../../components/Input';
import InputGroup from '../../../components/InputGroup';
import TextArea from '../../../components/TextArea';
import Title from '../../../components/Title';
import Avatar from '../../../components/Avatar';
import { useAuth } from '../../../hooks/useAuth';
import { updateUser } from '../../../api';
import useStore from '../../../context/user';
import { updatePhoto } from '../../../api';
import { User } from '../../../types';

interface Props {
  user: User;
}

function EditUser({ user: userProfile }: Props) {
  const { name, bio, phone, email, id, photo = '/' } = userProfile.data;
  const { authorized } = useAuth('/login');
  const navigate = useNavigate();
  const {
    user: { setUser },
  } = useStore();

  const formik = useFormik({
    initialValues: {
      name: name || '',
      bio: bio || '',
      phone: phone || '',
      email: email || '',
    },
    async onSubmit(cols) {
      try {
        if (!id) return;
        const updatedUser = await updateUser(id, cols);
        setUser(updatedUser);
        navigate(`/users/${id}`);
      } catch (error) {
        console.error(error);
      }
    },
    enableReinitialize: true,
  });

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const photo = event.target.files?.item(0);
    if (!photo || !id) return;
    const newUser = await updatePhoto(id, photo);
    setUser(newUser);
  };

  if (!authorized) return <div>Loading...</div>;
  return (
    <div className="edit-user">
      <div onClick={() => navigate(-1)} className="edit-user__back">
        <span className="material-icons edit-user__back__icon">
          chevron_left
        </span>
        <span className="edit-user__back__text">Back</span>
      </div>
      <Container>
        <form onSubmit={formik.handleSubmit} className="edit-user__form">
          <Title
            main="Change info"
            sub="Changes will be reflected to every service"
          />
          <div className="edit-user__form__upload">
            <label className="edit-user__form__upload__label" htmlFor="upload">
              <Avatar
                className="edit-user__form__upload__label__image"
                src={photo}
              />
              <span className="material-icons edit-user__form__upload__label__icon">
                photo_camera
              </span>
            </label>
            <label className="edit-user__form__upload__text" htmlFor="upload">
              change photo
            </label>
            <input id="upload" type="file" onChange={onChange} />
          </div>
          <InputGroup labelText="Name" htmlFor="name">
            <Input
              type="text"
              name="name"
              placeholder="Enter your name..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </InputGroup>
          <InputGroup labelText="Bio" htmlFor="bio">
            <TextArea
              name="bio"
              placeholder="Enter your bio..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bio}
            />
          </InputGroup>
          <InputGroup labelText="Phone" htmlFor="phone">
            <Input
              type="text"
              name="phone"
              placeholder="Enter your phone..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
          </InputGroup>
          <InputGroup labelText="Email" htmlFor="email">
            <Input
              type="text"
              name="email"
              placeholder="Enter your email..."
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
