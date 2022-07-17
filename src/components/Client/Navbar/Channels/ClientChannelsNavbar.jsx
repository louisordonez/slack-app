import React, { useEffect, useState } from 'react';
import { Text, Button, Group } from '@mantine/core';
import './ClientChannelsNavbar.scss';

const ClientChannelsNavbar = ({ channels, onCreateChannelModalShown }) => {
  const [channelsList, setChannels] = useState([]);

  useEffect(() => {
    if (channels !== undefined) {
      setChannels(channels);
    }
  }, [channels]);

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
      {channelsList.map((channel, key) => {
        return (
          <Text
            className="client-stack-channels client-nav-hover"
            key={key}
            channelid={channel.id}
          >
            {channel.name}
          </Text>
        );
      })}
    </>
  );
};

export default ClientChannelsNavbar;
