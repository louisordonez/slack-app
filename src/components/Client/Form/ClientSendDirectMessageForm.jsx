import React, { useState, useEffect } from 'react';
import { TextInput, MultiSelect, Stack, Button, Group } from '@mantine/core';
import { User, Message } from 'tabler-icons-react';
import { getEmailList } from '../../../services/utils/EmailList';

const ClientSendDirectMessageForm = ({ opened, onSendMessage }) => {
  const [emailData, setEmailData] = useState([]);
  const [receiverId, setReceiverId] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (opened === true) {
      getEmailList().then((result) => setEmailData(result));
    }
  }, [opened]);

  const resetSendDirectMessageForm = () => {
    setReceiverId([]);
    setMessage('');
  };

  const handleDirectMessage = () => {
    let newDirectMessage;

    if (receiverId.length === 0 && message !== '') {
      newDirectMessage = {
        receiver_id: '',
        receiver_class: 'User',
        body: message,
      };

      onSendMessage(newDirectMessage);
    } else if (receiverId.length !== 0 && message === '') {
      newDirectMessage = {
        receiver_id: receiverId[0],
        receiver_class: 'User',
        body: '',
      };

      onSendMessage(newDirectMessage);
    } else if (receiverId.length === 0 && message === '') {
      newDirectMessage = {
        receiver_id: '',
        receiver_class: 'User',
        body: '',
      };

      onSendMessage(newDirectMessage);
    } else {
      newDirectMessage = {
        receiver_id: receiverId[0],
        receiver_class: 'User',
        body: message,
      };

      onSendMessage(newDirectMessage);
      resetSendDirectMessageForm();
    }
  };

  return (
    <>
      <Stack>
        <MultiSelect
          required
          searchable
          label="Select user"
          icon={<User size={16} />}
          nothingFound="Nothing found"
          maxDropdownHeight={160}
          limit={20}
          value={receiverId}
          onChange={setReceiverId}
          data={emailData}
          maxSelectedValues={1}
        />
        <TextInput
          required
          label="Message"
          icon={<Message size={16} />}
          onChange={(e) => setMessage(e.target.value)}
        ></TextInput>
      </Stack>
      <Group position="right" mt="xl">
        <Button onClick={handleDirectMessage}>Send</Button>
      </Group>
    </>
  );
};

export default ClientSendDirectMessageForm;
