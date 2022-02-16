import { Link } from 'react-router-dom';
import Avatar from './Avatar';

interface Props {
  message: {
    src: string;
    name: string;
    date: string;
    body: string;
  };
}

function Message({ message }: Props) {
  return (
    <article className="message">
      <Avatar src={message.src} className="message__avatar" />
      <div className="message__content">
        <div className="message__content__info">
          <Link to="/" className="message__name">
            {message.name}
          </Link>
          <span className="message__date">{message.date}</span>
        </div>
        <p className="message__content__text">{message.body}</p>
      </div>
    </article>
  );
}

export default Message;
