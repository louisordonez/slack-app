import React, { useState, useEffect } from 'react';
import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core';
import { Message } from 'tabler-icons-react';
import { Send } from 'tabler-icons-react';

const ClientMessageInput = ({
  selectedId,
  receiverClass,
  onSendChatMessage,
}) => {
  const theme = useMantineTheme();

  const [isDisabled, setIsDisabled] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    handleDisabled(); // eslint-disable-next-line
  }, [selectedId]);

  const handleSubmitMessage = () => {
    const messageObj = {
      receiver_id: selectedId,
      receiver_class: receiverClass,
      body: message,
    };

    onSendChatMessage(messageObj);
    setMessage('');
  };

  const handleDisabled = () => {
    selectedId === null || selectedId === undefined
      ? setIsDisabled(true)
      : setIsDisabled(false);
  };

  return (
    <>
      <TextInput
        required
        radius="xl"
        size="md"
        value={message}
        icon={<Message size={16} />}
        disabled={isDisabled}
        rightSection={
          <ActionIcon
            type="submit"
            size={32}
            radius="xl"
            color={theme.primaryColor}
            variant="filled"
            disabled={isDisabled}
            onClick={handleSubmitMessage}
          >
            <Send size={18} />
          </ActionIcon>
        }
        rightSectionWidth={42}
        onChange={(e) => {
          setMessage(e.target.value);
          handleDisabled();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && isDisabled === false) {
            handleSubmitMessage();
          }
        }}
      />
    </>
  );
};

export default ClientMessageInput;
