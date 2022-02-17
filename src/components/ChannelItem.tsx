import { Channel } from '../types';
import { getChannelAbbrev } from '../lib/helpers';

interface Props {
  channel: Channel;
}

function ChannelItem({ channel }: Props) {
  return (
    <div className="channel-item">
      <div className="channel-item__logo">
        <span className="channel-item__logo__abbrev">
          {getChannelAbbrev(channel.name)}
        </span>
      </div>
      <span className="channel-item__name">{channel.name}</span>
    </div>
  );
}

export default ChannelItem;
