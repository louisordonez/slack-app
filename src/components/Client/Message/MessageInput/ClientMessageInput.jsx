import React from 'react';
import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core';
import { Send } from 'tabler-icons-react';
import './ClientMessageInput.scss';

const ClientMessageInput = () => {
  const theme = useMantineTheme();

  return (
    <>
      <form>
        <div className="client-message-input-container">
          <div className="client-message-text-input-container">
            <TextInput
              required
              radius="xl"
              size="md"
              className="client-message-text-input"
              rightSection={
                <ActionIcon
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
          </div>
        </div>
      </form>
    </>
  );
};

export default ClientMessageInput;
