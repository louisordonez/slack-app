import React from 'react';
import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core';
import { Send } from 'tabler-icons-react';
import './ClientMessageInput.scss';

const ClientMessageInput = () => {
  const theme = useMantineTheme();

  return (
    <>
      <form>
        <TextInput
          required
          radius="xl"
          size="md"
          className="client-message-text-input"
          rightSection={
            <ActionIcon
              type="submit"
              size={32}
              radius="xl"
              color={theme.primaryColor}
              variant="filled"
            >
              <Send size={18} />
            </ActionIcon>
          }
          rightSectionWidth={42}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              console.log('Submit');
            }
          }}
        />
      </form>
    </>
  );
};

export default ClientMessageInput;
