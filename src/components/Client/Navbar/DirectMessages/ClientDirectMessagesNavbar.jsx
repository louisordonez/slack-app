import React, { useEffect, useState } from 'react';
import { Text, Button, Group } from '@mantine/core';
import './ClientDirectMessagesNavbar.scss';

const ClientDirectMessagesNavbar = ({
  onSendDirectMessageModalShown,
  directMessages,
  onSelected,
}) => {
  const [directMessagesList, setDirectMessagesList] = useState([]);

  useEffect(() => {
    if (directMessages !== undefined) {
      setDirectMessagesList(directMessages);
    }
  }, [directMessages]);

  const showNoDirectMessages = () => {
    if (directMessages === undefined) {
      return <Text>No direct messages available</Text>;
    }
  };

  return (
    <>
      <Text className="client-stack-direct-messages-header bold-font">
        <Group position="apart">
          Direct Messages
          <Button
            variant="default"
            compact
            onClick={onSendDirectMessageModalShown}
          >
            +
          </Button>
        </Group>
      </Text>
      <div className="client-stack-direct-messages-container">
        {showNoDirectMessages()}
        {directMessagesList.map((directMessage, key) => {
          return (
            <Text
              className="client-stack-direct-messages client-nav-hover"
              key={key}
              onClick={() => onSelected(directMessage.id, directMessage.email)}
            >
              {directMessage.email}
            </Text>
          );
        })}
      </div>
    </>
  );
};

export default ClientDirectMessagesNavbar;
