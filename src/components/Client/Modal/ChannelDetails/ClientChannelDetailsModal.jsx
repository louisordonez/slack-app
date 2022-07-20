import React, { useState, useEffect } from 'react';
import { Modal, Text, Group, MultiSelect, Button, Stack } from '@mantine/core';
import './ClientChannelDetailsModal.scss';
import { getEmailList } from '../../../../services/utils/EmailList';

const ClientChannelDetails = ({
  opened,
  messageHeaderName,
  channelDetails,
  onChannelDetailsModalShown,
}) => {
  const [emailData, setEmailData] = useState([]);
  const [channelOwner, setChannelOwner] = useState('');
  const [userIds, setUserIds] = useState([]);
  const [channelMembers, setChannelMembers] = useState([]);

  useEffect(() => {
    if (opened === true) {
      getEmailList().then((result) => {
        setEmailData(result);
        setChannelMembers(filterUsers(result));
      });
    }
  }, [opened]);

  const filterUsers = (result) => {
    // console.log(result);
    // if (Object.keys(channelDetails).length !== 0) {
    //   const getChannelMembers = () => {
    //     let members = [];
    //     channelDetails['channel_members'].map((member) => {
    //       return members.push(member['user_id']);
    //     });
    //     return members;
    //   };
    //   return getChannelMembers().map((id) =>
    //     result.find((email) => email.value === id)
    //   );
    // }
  };

  return (
    <Modal
      centered
      opened={opened}
      onClose={() => onChannelDetailsModalShown(false)}
      title={`${messageHeaderName}`}
    >
      <Text>John Doe</Text>
      <Text className="channel-details-label">Owner</Text>
      <Group mt="xl" position="apart">
        <MultiSelect
          className="channel-details-multiselect"
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
        <Button compact className="channel-details-button">
          +
        </Button>
      </Group>
      <Stack>
        <Text className="channel-details-members-header">Members:</Text>
        {/* {channelMembers.map((member) => console.log(member))} */}
        {/* <Stack className="channel-details-members-container">
          <Text>John Doe</Text>
          <Text>John Smith</Text>
          <Text>John Doe</Text>
          <Text>John Smith</Text>
          <Text>John Doe</Text>
          <Text>John Smith</Text>
          <Text>John Doe</Text>
          <Text>John Smith</Text>
          <Text>John Doe</Text>
          <Text>John Smith</Text>
          <Text>John Doe</Text>
          <Text>John Smith</Text>
        </Stack> */}
      </Stack>
    </Modal>
  );
};

export default ClientChannelDetails;
