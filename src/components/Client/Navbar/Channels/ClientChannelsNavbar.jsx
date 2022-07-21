import React, { useEffect, useState } from 'react';
import { Text, Button, Group } from '@mantine/core';
import { Hash } from 'tabler-icons-react';

const ClientChannelsNavbar = ({
  channels,
  onCreateChannelModalShown,
  onSelectedChannel,
}) => {
  const [channelsList, setChannels] = useState([]);

  useEffect(() => {
    if (channels !== undefined) {
      setChannels(channels);
    }
  }, [channels]);

  const showNoChannelsMessage = () => {
    if (channels === undefined) {
      return (
        <Text className="client-stack-channels-no-channels">
          No channels available
        </Text>
      );
    }
  };

  return (
    <>
      <Text className="client-stack-channels-header bold-font">
        <Group position="apart">
          Channels
          <Button variant="default" compact onClick={onCreateChannelModalShown}>
            +
          </Button>
        </Group>
      </Text>
      <div className="client-stack-channels-container">
        {showNoChannelsMessage()}
        {channelsList.map((channel, key) => {
          return (
            <Text
              className="client-stack-channels client-nav-hover"
              key={key}
              onClick={() => {
                onSelectedChannel(channel.id, channel.name);
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Hash size={16} style={{ marginRight: '.2rem' }} />
                {channel.name}
              </div>
            </Text>
          );
        })}
      </div>
    </>
  );
};

export default ClientChannelsNavbar;
