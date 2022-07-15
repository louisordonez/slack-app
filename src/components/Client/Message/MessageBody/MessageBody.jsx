import React from 'react';
import { Group, Divider, Text, Textarea, Button } from '@mantine/core';
import { Send } from 'tabler-icons-react';
import './MessageBody.scss';

const MessageBody = () => {
  return (
    <>
      <Group className="client-message-header">
        <Text>Channel/Name</Text>
      </Group>
      <Divider my="sm" className="client-message-divider" />
      <div className="client-message-body">
        <div>Chat</div>
      </div>
      <form>
        <div className="client-message-input-container">
          <div className="client-message-text-input-container">
            <Textarea
              required
              className="client-message-text-input"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.shiftKey) {
                  console.log('Enter and Shift key pressed');
                } else {
                  // Submit
                }
              }}
            />
          </div>
          <div className="client-message-send-button-container">
            <Button className="client-message-send-button" type="submit">
              <Send size={32} strokeWidth={2} color={'white'} />
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default MessageBody;
