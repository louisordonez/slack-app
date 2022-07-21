import React, { useState, useEffect } from 'react';
import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core';
import { Send } from 'tabler-icons-react';

const ClientMessageInput = ({ selectedId, receiverClass, onSendMessage }) => {
  const theme = useMantineTheme();

  const [isDisabled, setIsDisabled] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    handleDisabled();
  }, [message]);

  const handleSubmitMessage = () => {
    const messageObj = {
      receiver_id: selectedId,
      receiver_class: receiverClass,
      body: message,
    };

    onSendMessage(messageObj);
    setMessage('');
  };

  const handleDisabled = () => {
    message !== '' && selectedId !== null
      ? setIsDisabled(false)
      : setIsDisabled(true);
  };

  return (
    <>
      <TextInput
        required
        radius="xl"
        size="md"
        className="client-message-text-input"
        value={message}
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
