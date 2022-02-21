import React, { useState } from 'react';
import { Message } from '../types';
import useStore from '../context';
import { useActions } from '../hooks/useActions';

function Compose() {
  const [{ user, channel }] = useStore();
  const [body, setBody] = useState<string>('');
  const { createMessage } = useActions();

  const handleSubmit = async function (
    event: React.ChangeEvent<HTMLFormElement>
  ) {
    try {
      event.preventDefault();
      if (!user.id || !channel.id) return;
      const message: Message = {
        user_id: user.id,
        channel_id: channel.id,
        body,
      };
      setBody('');
      await createMessage(message);
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setBody(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="compose">
      <input
        className="compose__input"
        placeholder="Type a message here"
        spellCheck="false"
        value={body}
        onChange={onChange}
      />
      <button type="submit" className="compose__btn">
        <span className="material-icons compose__btn__icon">send</span>
      </button>
    </form>
  );
}

export default Compose;
