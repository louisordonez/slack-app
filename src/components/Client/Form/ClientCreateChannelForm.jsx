import React, { useEffect, useState } from 'react';
import { TextInput, MultiSelect, Stack, Button, Group } from '@mantine/core';
import { USERS_ENDPOINT } from '../../../services/constants/SlackAvionApiUrl';
import { getLocalStorageItem } from '../../../services/utils/LocalStorage';
import { axiosGetCall } from '../../../services/utils/AxiosApiCall';
import { showErrorToast } from '../../../components/Toast/Toast';

const ClientCreateChannelForm = ({ opened, onCreateChannel }) => {
  const [userIds, setUserIds] = useState();
  const [channelName, setChannelName] = useState('');
  const [emailData, setEmailData] = useState([]);

  useEffect(() => {
    if (opened === true) {
      getEmailList();
    } // eslint-disable-next-line
  }, [opened]);

  const onSuccess = (response) => {
    const createNewEmailList = (list) => {
      let newEmailListArray = [];

      list.forEach((object) => {
        const newEmailData = {
          value: object.id,
          label: object.email,
        };

        newEmailListArray.push(newEmailData);
      });

      setEmailData(
        newEmailListArray.sort((a, b) => {
          return a.value - b.value;
        })
      );
    };

    createNewEmailList(response.data.data);
  };

  const onError = (error) => {
    const errorMessage = error.response.data.errors;

    errorMessage.map((message) => showErrorToast(message));
  };

  const getEmailList = () => {
    const userHeaders = getLocalStorageItem('userHeaders')[0];

    axiosGetCall(USERS_ENDPOINT, userHeaders, onSuccess, onError);
  };

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
