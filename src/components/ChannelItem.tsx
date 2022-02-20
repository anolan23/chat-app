import { Channel } from '../types';
import { getChannelAbbrev } from '../lib/helpers';

interface Props {
  channel: Channel;
  onClick: () => void;
}

function ChannelItem({ channel, onClick }: Props) {
  return (
    <div className="channel-item" onClick={onClick}>
      <div className="channel-item__logo">
        <span className="channel-item__logo__abbrev">
          {getChannelAbbrev(channel.name || '')}
        </span>
      </div>
      <span className="channel-item__name">{channel.name}</span>
    </div>
  );
}

export default ChannelItem;
