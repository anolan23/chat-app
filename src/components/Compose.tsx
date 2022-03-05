import React, { useState } from 'react';
import { Message } from '../types';
import useStore from '../context';
import { useActions } from '../hooks/useActions';

function Compose() {
  const [{ user, channel }] = useStore();
  const [body, setBody] = useState<string>('');
  const { createMessage, sendMessage } = useActions();

  const handleSubmit = async function (
    event: React.ChangeEvent<HTMLFormElement>
  ) {
    try {
      event.preventDefault();
      if (!user.id || !channel.id || !body) return;
      const message: Message = {
        user_id: user.id,
        channel_id: channel.id,
        body,
      };
      setBody('');
      sendMessage(message);
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setBody(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`compose ${!user.isSignedIn ? 'compose--disabled' : ''}`}
    >
      <input
        className="compose__input"
        placeholder="Type a message here"
        spellCheck="false"
        value={body}
        onChange={onChange}
        disabled={!user.isSignedIn}
      />
      <button
        type="submit"
        className="compose__btn"
        disabled={!user.isSignedIn}
      >
        <span className="material-icons compose__btn__icon">send</span>
      </button>
    </form>
  );
}

export default Compose;
