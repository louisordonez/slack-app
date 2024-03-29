import React, { useState } from 'react';
import { TextInput, MultiSelect, Stack, Button, Group } from '@mantine/core';
import { Hash, Users } from 'tabler-icons-react';

const ClientCreateChannelForm = ({ opened, emailList, onCreateChannel }) => {
  const [channelName, setChannelName] = useState('');
  const [userIds, setUserIds] = useState([]);

  const resetCreateChannelForm = () => {
    setChannelName('');
    setUserIds([]);
  };

  const handleChannel = () => {
    let newChannel = { name: channelName, user_ids: userIds };

    if (userIds.length === 0) {
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
          icon={<Hash size={16} />}
          label="Channel name"
          onChange={(e) => setChannelName(e.target.value)}
          value={channelName}
        ></TextInput>
        <MultiSelect
          required
          searchable
          clearable
          icon={<Users size={16} />}
          label="Select users"
          nothingFound="Nothing found"
          maxDropdownHeight={160}
          limit={20}
          value={userIds}
          onChange={setUserIds}
          data={emailList}
        />
      </Stack>
      <Group position="right" mt="xl">
        <Button onClick={handleChannel}>Create</Button>
      </Group>
    </>
  );
};

export default ClientCreateChannelForm;
