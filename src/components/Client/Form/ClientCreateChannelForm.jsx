import React, { useEffect, useState } from 'react';
import { TextInput, MultiSelect, Stack, Button, Group } from '@mantine/core';
import { USERS_ENDPOINT } from '../../../services/constants/App/SlackAvionApiUrl';
import { axiosGetCall } from '../../../services/utils/AxiosApiCall';
import { getLocalStorageItem } from '../../../services/utils/LocalStorage';

const ClientCreateChannelForm = ({ opened }) => {
  const [value, setValue] = useState();
  const [channelName, setChannelName] = useState('');
  const [channel, setChannel] = useState({});
  const [emailData, setEmailData] = useState([]);

  useEffect(() => {
    if (opened === true) {
      getEmailList();
    }
  }, [opened]);

  const onSuccess = (response) => {
    const filterEmailList = (list) => {
      list.forEach((object) => {
        const newData = {
          value: object.id,
          label: object.email,
        };

        setEmailData((state) => [...state, newData]);
      });
    };

    filterEmailList(response.data.data);
  };

  const onError = (error) => {
    console.log(error);
  };

  const getEmailList = () => {
    const userHeaders = getLocalStorageItem('userHeaders');

    axiosGetCall(USERS_ENDPOINT, userHeaders[0], onSuccess, onError);
  };

  const handleChannel = () => {
    const newChannel = {
      name: channelName,
      user_ids: value,
    };

    // setChannel(newChannel);
    console.log(newChannel);
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
