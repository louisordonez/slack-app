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

const ClientSendDirectMessageForm = () => {
  const [value, setValue] = useState();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleDirectMessage = () => {};

  return (
    <>
      <Stack>
        <MultiSelect
          required
          searchable
          clearable
          label="Select user"
          nothingFound="Nothing found"
          maxDropdownHeight={160}
          limit={20}
          value={value}
          onChange={setValue}
          data={DATA}
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
