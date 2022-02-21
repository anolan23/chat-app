import { Link, useNavigate } from 'react-router-dom';
import { Message } from '../types';
import Avatar from './Avatar';
import { dateString } from '../lib/helpers';

interface Props {
  message: Message;
}

function MessageComp({ message }: Props) {
  const navigate = useNavigate()
  return (
    <article className="message">
      <Avatar src={message.photo} className="message__avatar" onClick={() => navigate(`/users/${message.user_id}`)}/>
      <div className="message__content">
        <div className="message__content__info">
          <Link to={`/users/${message.user_id}`} className="message__name">
            {message.name}
          </Link>
          {message.created_at ? (
            <span className="message__date">
              {dateString(message.created_at)}
            </span>
          ) : null}
        </div>
        <p className="message__content__text">{message.body}</p>
      </div>
    </article>
  );
}

export default MessageComp;
