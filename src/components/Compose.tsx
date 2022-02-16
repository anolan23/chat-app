import React from 'react';

function Compose() {
  const onSubmit = function (event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('submit');
  };

  return (
    <form onSubmit={onSubmit} className="compose">
      <input
        className="compose__input"
        placeholder="Type a message here"
        spellCheck="false"
      />
      <button type="submit" className="compose__btn">
        <span className="material-icons compose__btn__icon">send</span>
      </button>
    </form>
  );
}

export default Compose;
