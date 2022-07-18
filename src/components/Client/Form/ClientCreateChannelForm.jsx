import React, { useEffect, useState } from 'react';
import { TextInput, MultiSelect, Stack, Button, Group } from '@mantine/core';
import { getEmailList } from '../../../services/utils/EmailList';

const ClientCreateChannelForm = ({ opened, onCreateChannel }) => {
  const [userIds, setUserIds] = useState();
  const [channelName, setChannelName] = useState('');
  const [emailData, setEmailData] = useState([]);

  useEffect(() => {
    if (opened === true) {
      getEmailList().then((result) => setEmailData(result));
    } // eslint-disable-next-line
  }, [opened]);

  const resetCreateChannelForm = () => {
    setUserIds('');
    setChannelName('');
  };

  const handleChannel = () => {
    let newChannel = { name: channelName, user_ids: userIds };

    if (userIds === undefined) {
      newChannel = { name: channelName, user_ids: [] };
    }

    onCreateChannel(newChannel);
    resetCreateChannelForm();
  };

  return (
    <>
      <Stack>
        <TextInput
          required
          label="Channel name"
          onChange={(e) => setChannelName(e.target.value)}
          value={channelName}
        ></TextInput>
        <MultiSelect
          required
          searchable
          clearable
          label="Select users"
          nothingFound="Nothing found"
          maxDropdownHeight={160}
          limit={20}
          value={userIds}
          onChange={setUserIds}
          data={emailData}
        />
      </Stack>
      <Group position="right" mt="xl">
        <Button onClick={handleChannel}>Create</Button>
      </Group>
    </>
  );
};

export default ClientCreateChannelForm;
