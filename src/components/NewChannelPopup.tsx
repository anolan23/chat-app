import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { useActions } from '../hooks/useActions';
import { Channel, User } from '../types';
import Button from './Button';
import Input from './Input';
import Popup from './Popup';
import TextArea from './TextArea';
interface Props {
  show: boolean;
  close: () => void;
  user: User;
}
function NewChannelPopup({ show, close, user }: Props) {
  const { createChannel } = useActions();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    onSubmit(channel: Channel, { resetForm }) {
      try {
        if (!user.id) return;
        createChannel({ ...channel, user_id: user.id }, (channel) => {
          navigate(`/channels/${channel.id}`);
        });
        resetForm();
      } catch (error) {
        console.error(error);
      } finally {
        close();
      }
    },
  });
  return (
    <Popup show={show} close={close}>
      <form onSubmit={formik.handleSubmit} className="new-channel-popup">
        <span className="new-channel-popup__title">New channel</span>
        <Input
          className="new-channel-popup__input"
          placeholder="Channel name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <TextArea
          className="new-channel-popup__input"
          placeholder="Channel description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <Button type="submit" className="new-channel-popup__btn">
          Save
        </Button>
      </form>
    </Popup>
  );
}
export default NewChannelPopup;
