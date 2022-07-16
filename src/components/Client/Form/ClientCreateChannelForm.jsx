import React, { useState } from 'react';
import { TextInput, MultiSelect, Stack, Button, Group } from '@mantine/core';

const DATA = [
  { value: 1, label: 'React' },
  { value: 2, label: 'Angular' },
  { value: 3, label: 'Svelte' },
  { value: 4, label: 'Vue' },
  { value: 5, label: 'Next.js' },
  { value: 6, label: 'Blitz.js' },
];

const ClientCreateChannelForm = () => {
  const [value, setValue] = useState();
  const [channelName, setChannelName] = useState('');
  const [channel, setChannel] = useState({});

  const handleChannel = () => {
    const newChannel = {
      name: channelName,
      user_ids: value,
    };

    setChannel(newChannel);
  };

  return (
    <>
      <Stack>
        <TextInput
          required
          label="Channel name"
          onChange={(e) => setChannelName(e.target.value)}
        ></TextInput>
        <MultiSelect
          required
          searchable
          clearable
          label="Select users"
          nothingFound="Nothing found"
          maxDropdownHeight={160}
          limit={20}
          value={value}
          onChange={setValue}
          data={DATA}
        />
      </Stack>
      <Group position="right" mt="xl">
        <Button onClick={handleChannel}>Create</Button>
      </Group>
    </>
  );
};

export default ClientCreateChannelForm;
