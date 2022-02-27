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
  const [{ showAddChannelPopup, user, messages, channel, socket }] = useStore();
  const {
    setShowAddChannelPopup,
    fetchMessagesByChannelId,
    addMessage,
    join,
    setMembers,
    fetchChannel,
    setChannel,
    setMessages,
  } = useActions();

  useEffect(() => {
    socket.on('message', (message) => {
      addMessage(message);
    });

    socket.on('action', (message) => {
      console.log(message);
    });

    socket.on('members', (members) => {
      setMembers(members);
    });
  }, []);

  useEffect(() => {
    if (!id) return;
    fetchChannel(+id);
    fetchMessagesByChannelId(+id);
    return () => {
      setChannel({});
      setMessages([]);
    };
  }, [id]);

  useEffect(() => {
    if (!id || !Object.keys(user).length) return;
    join(user, +id);
  }, [user, id]);

  useEffect(() => {
    if (!messages) return;
    scrollToBottom(chatListRef);
  }, [messages]);

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
