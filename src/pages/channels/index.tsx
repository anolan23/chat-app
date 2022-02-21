import { useParams } from 'react-router-dom';

import MessageComp from '../../components/MessageComp';
import Compose from '../../components/Compose';
import Sidebar from '../../components/Sidebar';
import NewChannelPopup from '../../components/NewChannelPopup';
import { useActions } from '../../hooks/useActions';
import useStore from '../../context';
import { Message } from '../../types';
import { useEffect, useRef } from 'react';
import { scrollToBottom } from '../../lib/helpers';

function Channels() {
  const { id } = useParams();
  const chatListRef = useRef<HTMLDivElement>(null);
  const [{ showAddChannelPopup, user, messages, channel }] = useStore();
  const { setShowAddChannelPopup, fetchMessagesByChannelId } = useActions();

  useEffect(() => {
    if (!id) return;
    fetchMessagesByChannelId(+id);
  }, [id]);

  useEffect(() => {
    scrollToBottom(chatListRef);
  }, [messages, chatListRef]);

  const renderMessages = function () {
    return messages.map((message: Message, index) => {
      return <MessageComp key={index} message={message} />;
    });
  };


  return (
    <div className="channels">
      <Sidebar />
      <main className="channels__main">
        <div className="channels__bar">
          <span className="channels__bar__text">{channel.name}</span>
        </div>
        <div className="channels__chat" ref={chatListRef}>
          {renderMessages()}
        </div>
        <div className="channels__compose">
          <Compose />
        </div>
      </main>
      <NewChannelPopup
        show={showAddChannelPopup}
        close={() => setShowAddChannelPopup(false)}
        user={user}
      />
    </div>
  );
}

export default Channels;
