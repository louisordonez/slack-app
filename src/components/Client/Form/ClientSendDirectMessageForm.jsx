import React, { useState, useEffect } from 'react';
import { TextInput, MultiSelect, Stack, Button, Group } from '@mantine/core';
import { getEmailList } from '../../../services/utils/EmailList';

const ClientSendDirectMessageForm = ({ opened, onSendDirectMessage }) => {
  const [emailData, setEmailData] = useState([]);
  const [receiverId, setReceiverId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (opened === true) {
      getEmailList().then((result) => setEmailData(result));
    }
  }, [opened]);

  const resetSendDirectMessageForm = () => {
    setReceiverId(null);
    setMessage('');
  };

  const handleDirectMessage = () => {
    let newDirectMessage;

    if (receiverId === null && message !== '') {
      newDirectMessage = {
        receiver_id: '',
        receiver_class: 'User',
        body: message,
      };
    } else if (receiverId !== null && message === '') {
      newDirectMessage = {
        receiver_id: receiverId[0],
        receiver_class: 'User',
        body: '',
      };
    } else if (receiverId === null && message === '') {
      newDirectMessage = {
        receiver_id: '',
        receiver_class: 'User',
        body: '',
      };
    } else {
      newDirectMessage = {
        receiver_id: receiverId[0],
        receiver_class: 'User',
        body: message,
      };
    }

    onSendDirectMessage(newDirectMessage);
    resetSendDirectMessageForm();
  };

  return (
    <>
      <Stack>
        <MultiSelect
          required
          searchable
          label="Select user"
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
