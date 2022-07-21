import React from 'react';
import { Modal, Text } from '@mantine/core';
import ClientAddChannelMemberForm from '../Form/ClientAddChannelMemberForm';

const ClientChannelDetailsModal = ({
  opened,
  messageHeaderName,
  channelDetails,
  onChannelDetailsModalShown,
}) => {
  const showChannelOwnerDetails = () => {
    if (channelDetails.length !== 0) {
      return (
        <>
          <Text>{channelDetails['owner_email']}</Text>
          <Text className="client-channel-details-label">Owner</Text>
        </>
      );
    }
  };

  const showChannelMembersDetails = () => {
    if (channelDetails.length !== 0) {
      return (
        <>
          <Text>Members</Text>
          <div className="client-channel-details-members-container">
            {channelDetails['channel_members'].map((member, key) => {
              return <Text key={key}>{member.label}</Text>;
            })}
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={() => onChannelDetailsModalShown(false)}
        title={`${messageHeaderName}`}
      >
        {showChannelOwnerDetails()}
        <ClientAddChannelMemberForm />
        {showChannelMembersDetails()}
      </Modal>
    </>
  );
};

export default ClientChannelDetailsModal;
