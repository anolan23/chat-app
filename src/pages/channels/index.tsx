import MessageComp from '../../components/MessageComp';
import Compose from '../../components/Compose';
import Sidebar from '../../components/Sidebar';
import NewChannelPopup from '../../components/NewChannelPopup';
import { useActions } from '../../hooks/useActions';
import useStore from '../../context';
import { Message } from '../../types';

function Channels() {
  const [{ showAddChannelPopup, user, messages }] = useStore();
  const { setShowAddChannelPopup } = useActions();

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
          <span className="channels__bar__text">Front-end developers</span>
        </div>
        <div className="channels__chat">{renderMessages()}</div>
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
